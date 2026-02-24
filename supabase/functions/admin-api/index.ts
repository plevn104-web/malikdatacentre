import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing auth" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    // Verify caller is admin using their JWT
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: userError } = await userClient.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check admin role
    const adminClient = createClient(supabaseUrl, serviceKey);
    const { data: roleData } = await adminClient
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { action, ...params } = await req.json();

    switch (action) {
      case "dashboard_stats": {
        // Get users from auth
        const { data: authUsers } = await adminClient.auth.admin.listUsers({ perPage: 10000 });
        const users = authUsers?.users || [];
        const totalUsers = users.length;
        const verifiedUsers = users.filter((u: any) => u.email_confirmed_at).length;

        // Get subscriptions
        const { data: subs } = await adminClient
          .from("user_subscriptions")
          .select("*, premium_plans(name)")
          .eq("status", "active");

        const planCounts: Record<string, number> = { Free: 0, Starter: 0, "Creator Pro": 0, "Elite Creator": 0 };
        const subscribedUserIds = new Set<string>();
        (subs || []).forEach((s: any) => {
          const name = s.premium_plans?.name;
          if (name && planCounts[name] !== undefined) {
            planCounts[name]++;
            subscribedUserIds.add(s.user_id);
          }
        });
        planCounts.Free = totalUsers - subscribedUserIds.size;

        // Get tool usage this month
        const now = new Date();
        const monthYear = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
        const { count: toolRunsThisMonth } = await adminClient
          .from("tool_usage")
          .select("*", { count: "exact", head: true })
          .eq("month_year", monthYear);

        // Revenue
        const { data: completedTx } = await adminClient
          .from("transactions")
          .select("amount_pkr, created_at")
          .eq("status", "completed")
          .eq("type", "purchase");

        const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
        let revenueThisMonth = 0;
        let revenueAllTime = 0;
        (completedTx || []).forEach((tx: any) => {
          const amt = Number(tx.amount_pkr) || 0;
          revenueAllTime += amt;
          if (tx.created_at >= thisMonthStart) revenueThisMonth += amt;
        });

        return new Response(JSON.stringify({
          totalUsers, verifiedUsers, planCounts,
          toolRunsThisMonth: toolRunsThisMonth || 0,
          revenueThisMonth, revenueAllTime,
        }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      case "list_users": {
        const { page = 1, perPage = 50, search, planFilter } = params;
        const { data: authUsers } = await adminClient.auth.admin.listUsers({
          page,
          perPage,
        });
        const users = authUsers?.users || [];

        // Get all profiles, subscriptions, and usage
        const userIds = users.map((u: any) => u.id);
        const { data: profiles } = await adminClient.from("profiles").select("*").in("id", userIds);
        const { data: subs } = await adminClient
          .from("user_subscriptions")
          .select("*, premium_plans(name)")
          .eq("status", "active")
          .in("user_id", userIds);

        const now = new Date();
        const monthYear = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
        const { data: usage } = await adminClient
          .from("tool_usage")
          .select("user_id")
          .eq("month_year", monthYear)
          .in("user_id", userIds);

        // Count usage per user
        const usageMap: Record<string, number> = {};
        (usage || []).forEach((u: any) => {
          usageMap[u.user_id] = (usageMap[u.user_id] || 0) + 1;
        });

        const profileMap = Object.fromEntries((profiles || []).map((p: any) => [p.id, p]));
        const subMap = Object.fromEntries((subs || []).map((s: any) => [s.user_id, s]));

        let result = users.map((u: any) => ({
          id: u.id,
          email: u.email,
          full_name: profileMap[u.id]?.full_name || "",
          verified: !!u.email_confirmed_at,
          plan: subMap[u.id]?.premium_plans?.name || "Free",
          usage: usageMap[u.id] || 0,
          created_at: u.created_at,
          banned: u.banned_until ? true : false,
        }));

        if (search) {
          const s = search.toLowerCase();
          result = result.filter((u: any) => u.email?.toLowerCase().includes(s) || u.full_name?.toLowerCase().includes(s));
        }
        if (planFilter && planFilter !== "all") {
          result = result.filter((u: any) => u.plan === planFilter);
        }

        return new Response(JSON.stringify({ users: result, total: result.length }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "update_user_plan": {
        const { userId, planName } = params;
        // Find plan
        const { data: plan } = await adminClient
          .from("premium_plans")
          .select("id")
          .eq("name", planName)
          .eq("is_active", true)
          .maybeSingle();

        if (planName === "Free") {
          // Remove active subscription
          await adminClient
            .from("user_subscriptions")
            .update({ status: "cancelled" })
            .eq("user_id", userId)
            .eq("status", "active");
        } else if (plan) {
          // Cancel existing
          await adminClient
            .from("user_subscriptions")
            .update({ status: "cancelled" })
            .eq("user_id", userId)
            .eq("status", "active");
          // Create new
          const expiresAt = new Date();
          expiresAt.setMonth(expiresAt.getMonth() + 1);
          await adminClient.from("user_subscriptions").insert({
            user_id: userId,
            plan_id: plan.id,
            status: "active",
            starts_at: new Date().toISOString(),
            expires_at: expiresAt.toISOString(),
          });
        }

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "reset_usage": {
        const { userId } = params;
        const now = new Date();
        const monthYear = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
        await adminClient.from("tool_usage").delete().eq("user_id", userId).eq("month_year", monthYear);
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "ban_user": {
        const { userId, ban } = params;
        if (ban) {
          await adminClient.auth.admin.updateUserById(userId, { ban_duration: "876000h" });
        } else {
          await adminClient.auth.admin.updateUserById(userId, { ban_duration: "none" });
        }
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "delete_user": {
        const { userId } = params;
        await adminClient.auth.admin.deleteUser(userId);
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "analytics": {
        const now = new Date();
        const monthYear = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

        // All usage this month
        const { data: usageData } = await adminClient
          .from("tool_usage")
          .select("tool_name, used_at")
          .eq("month_year", monthYear);

        // Tool counts
        const toolCounts: Record<string, number> = {};
        const dailyCounts: Record<string, number> = {};
        (usageData || []).forEach((u: any) => {
          toolCounts[u.tool_name] = (toolCounts[u.tool_name] || 0) + 1;
          const day = u.used_at?.substring(0, 10);
          if (day) dailyCounts[day] = (dailyCounts[day] || 0) + 1;
        });

        // Monthly totals (last 6 months)
        const monthlyCounts: Record<string, number> = {};
        for (let i = 0; i < 6; i++) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const my = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
          const { count } = await adminClient
            .from("tool_usage")
            .select("*", { count: "exact", head: true })
            .eq("month_year", my);
          monthlyCounts[my] = count || 0;
        }

        return new Response(JSON.stringify({ toolCounts, dailyCounts, monthlyCounts }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "subscriptions": {
        const { data: allSubs } = await adminClient
          .from("user_subscriptions")
          .select("*, premium_plans(name)")
          .order("created_at", { ascending: false })
          .limit(200);

        // Get user emails
        const userIds = [...new Set((allSubs || []).map((s: any) => s.user_id))];
        const { data: profiles } = await adminClient.from("profiles").select("id, email, full_name").in("id", userIds);
        const profileMap = Object.fromEntries((profiles || []).map((p: any) => [p.id, p]));

        const result = (allSubs || []).map((s: any) => ({
          ...s,
          plan_name: s.premium_plans?.name || "Unknown",
          user_email: profileMap[s.user_id]?.email || "",
          user_name: profileMap[s.user_id]?.full_name || "",
        }));

        return new Response(JSON.stringify({ subscriptions: result }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      default:
        return new Response(JSON.stringify({ error: "Unknown action" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
  } catch (err: any) {
    console.error("Admin API error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
