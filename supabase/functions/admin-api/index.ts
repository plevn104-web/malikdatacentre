import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const jsonResponse = (data: unknown, cacheSeconds = 0) => {
  const headers: Record<string, string> = {
    ...corsHeaders,
    "Content-Type": "application/json",
  };
  if (cacheSeconds > 0) {
    headers["Cache-Control"] = `private, max-age=${cacheSeconds}`;
  }
  return new Response(JSON.stringify(data), { headers });
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
        const now = new Date();
        const monthYear = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
        const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

        // Run all queries in parallel
        const [authUsersRes, subsRes, toolRunsRes, revenueRes] = await Promise.all([
          adminClient.auth.admin.listUsers({ perPage: 10000 }),
          adminClient.from("user_subscriptions").select("*, premium_plans(name)").eq("status", "active"),
          adminClient.from("tool_usage").select("id", { count: "exact", head: true }).eq("month_year", monthYear),
          adminClient.from("transactions").select("amount_pkr, created_at").eq("status", "completed").eq("type", "purchase"),
        ]);

        const users = authUsersRes.data?.users || [];
        const totalUsers = users.length;
        const verifiedUsers = users.filter((u: any) => u.email_confirmed_at).length;

        const planCounts: Record<string, number> = { Free: 0, Starter: 0, "Creator Pro": 0, "Elite Creator": 0 };
        const subscribedUserIds = new Set<string>();
        (subsRes.data || []).forEach((s: any) => {
          const name = s.premium_plans?.name;
          if (name && planCounts[name] !== undefined) {
            planCounts[name]++;
            subscribedUserIds.add(s.user_id);
          }
        });
        planCounts.Free = totalUsers - subscribedUserIds.size;

        let revenueThisMonth = 0;
        let revenueAllTime = 0;
        (revenueRes.data || []).forEach((tx: any) => {
          const amt = Number(tx.amount_pkr) || 0;
          revenueAllTime += amt;
          if (tx.created_at >= thisMonthStart) revenueThisMonth += amt;
        });

        return jsonResponse({
          totalUsers, verifiedUsers, planCounts,
          toolRunsThisMonth: toolRunsRes.count || 0,
          revenueThisMonth, revenueAllTime,
        }, 60); // Cache for 60s
      }

      case "list_users": {
        const { page = 1, perPage = 50, search, planFilter } = params;
        const { data: authUsers } = await adminClient.auth.admin.listUsers({ page, perPage });
        const users = authUsers?.users || [];

        const userIds = users.map((u: any) => u.id);
        if (userIds.length === 0) return jsonResponse({ users: [], total: 0 });

        const now = new Date();
        const monthYear = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

        // Run all lookups in parallel
        const [profilesRes, subsRes, usageRes] = await Promise.all([
          adminClient.from("profiles").select("id, email, full_name").in("id", userIds),
          adminClient.from("user_subscriptions").select("user_id, premium_plans(name)").eq("status", "active").in("user_id", userIds),
          adminClient.from("tool_usage").select("user_id").eq("month_year", monthYear).in("user_id", userIds),
        ]);

        const usageMap: Record<string, number> = {};
        (usageRes.data || []).forEach((u: any) => {
          usageMap[u.user_id] = (usageMap[u.user_id] || 0) + 1;
        });

        const profileMap = Object.fromEntries((profilesRes.data || []).map((p: any) => [p.id, p]));
        const subMap = Object.fromEntries((subsRes.data || []).map((s: any) => [s.user_id, s]));

        let result = users.map((u: any) => ({
          id: u.id,
          email: u.email,
          full_name: profileMap[u.id]?.full_name || "",
          verified: !!u.email_confirmed_at,
          plan: subMap[u.id]?.premium_plans?.name || "Free",
          usage: usageMap[u.id] || 0,
          created_at: u.created_at,
          banned: !!u.banned_until,
        }));

        if (search) {
          const s = search.toLowerCase();
          result = result.filter((u: any) => u.email?.toLowerCase().includes(s) || u.full_name?.toLowerCase().includes(s));
        }
        if (planFilter && planFilter !== "all") {
          result = result.filter((u: any) => u.plan === planFilter);
        }

        return jsonResponse({ users: result, total: result.length }, 30);
      }

      case "update_user_plan": {
        const { userId, planName } = params;
        const { data: plan } = await adminClient
          .from("premium_plans")
          .select("id")
          .eq("name", planName)
          .eq("is_active", true)
          .maybeSingle();

        // Cancel existing active subscription
        await adminClient
          .from("user_subscriptions")
          .update({ status: "cancelled" })
          .eq("user_id", userId)
          .eq("status", "active");

        if (planName !== "Free" && plan) {
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

        return jsonResponse({ success: true });
      }

      case "reset_usage": {
        const { userId } = params;
        const now = new Date();
        const monthYear = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
        await adminClient.from("tool_usage").delete().eq("user_id", userId).eq("month_year", monthYear);
        return jsonResponse({ success: true });
      }

      case "ban_user": {
        const { userId, ban } = params;
        await adminClient.auth.admin.updateUserById(userId, {
          ban_duration: ban ? "876000h" : "none",
        });
        return jsonResponse({ success: true });
      }

      case "delete_user": {
        const { userId } = params;
        await adminClient.auth.admin.deleteUser(userId);
        return jsonResponse({ success: true });
      }

      case "analytics": {
        const now = new Date();
        const monthYear = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

        // Get current month usage and last 6 months counts in parallel
        const monthlyPromises: Promise<any>[] = [];
        const monthKeys: string[] = [];
        for (let i = 0; i < 6; i++) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const my = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
          monthKeys.push(my);
          monthlyPromises.push(
            adminClient.from("tool_usage").select("id", { count: "exact", head: true }).eq("month_year", my)
          );
        }

        const [usageDataRes, ...monthlyResults] = await Promise.all([
          adminClient.from("tool_usage").select("tool_name, used_at").eq("month_year", monthYear),
          ...monthlyPromises,
        ]);

        const toolCounts: Record<string, number> = {};
        const dailyCounts: Record<string, number> = {};
        (usageDataRes.data || []).forEach((u: any) => {
          toolCounts[u.tool_name] = (toolCounts[u.tool_name] || 0) + 1;
          const day = u.used_at?.substring(0, 10);
          if (day) dailyCounts[day] = (dailyCounts[day] || 0) + 1;
        });

        const monthlyCounts: Record<string, number> = {};
        monthKeys.forEach((key, i) => {
          monthlyCounts[key] = monthlyResults[i]?.count || 0;
        });

        return jsonResponse({ toolCounts, dailyCounts, monthlyCounts }, 120); // Cache 2 min
      }

      case "subscriptions": {
        const { data: allSubs } = await adminClient
          .from("user_subscriptions")
          .select("*, premium_plans(name)")
          .order("created_at", { ascending: false })
          .limit(200);

        const userIds = [...new Set((allSubs || []).map((s: any) => s.user_id))];
        const { data: profiles } = await adminClient
          .from("profiles")
          .select("id, email, full_name")
          .in("id", userIds);
        const profileMap = Object.fromEntries((profiles || []).map((p: any) => [p.id, p]));

        const result = (allSubs || []).map((s: any) => ({
          ...s,
          plan_name: s.premium_plans?.name || "Unknown",
          user_email: profileMap[s.user_id]?.email || "",
          user_name: profileMap[s.user_id]?.full_name || "",
        }));

        return jsonResponse({ subscriptions: result }, 60);
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
