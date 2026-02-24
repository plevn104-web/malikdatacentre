import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

interface PlanInfo {
  name: string;
  limit: number; // -1 = unlimited
  adsVisible: boolean;
  historyDays: number; // 0 = none, -1 = unlimited
  advancedTools: boolean;
}

const FREE_PLAN: PlanInfo = {
  name: "Free",
  limit: 10,
  adsVisible: true,
  historyDays: 0,
  advancedTools: false,
};

const PLAN_MAP: Record<string, PlanInfo> = {
  Free: FREE_PLAN,
  Starter: { name: "Starter", limit: 200, adsVisible: false, historyDays: 0, advancedTools: false },
  "Creator Pro": { name: "Creator Pro", limit: 600, adsVisible: false, historyDays: 30, advancedTools: true },
  "Elite Creator": { name: "Elite Creator", limit: -1, adsVisible: false, historyDays: -1, advancedTools: true },
};

export const useToolUsage = () => {
  const { user } = useAuth();
  const [usage, setUsage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState<PlanInfo>(FREE_PLAN);

  const currentMonth = new Date().toISOString().slice(0, 7);

  const fetchUsage = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      // Usage count
      const { count, error } = await (supabase as any)
        .from("tool_usage")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("month_year", currentMonth);

      if (!error) setUsage(count || 0);

      // Active subscription with plan info
      const { data: subs } = await supabase
        .from("user_subscriptions")
        .select("id, plan_id, premium_plans(name)")
        .eq("user_id", user.id)
        .eq("status", "active")
        .gt("expires_at", new Date().toISOString())
        .limit(1);

      if (subs && subs.length > 0) {
        const planName = (subs[0] as any).premium_plans?.name || "Free";
        setPlan(PLAN_MAP[planName] || FREE_PLAN);
      } else {
        setPlan(FREE_PLAN);
      }
    } catch (err) {
      console.error("Error fetching usage:", err);
    } finally {
      setLoading(false);
    }
  }, [user, currentMonth]);

  useEffect(() => {
    fetchUsage();
  }, [fetchUsage]);

  const recordUsage = async (toolName: string): Promise<boolean> => {
    if (!user) return false;

    const isUnlimited = plan.limit === -1;
    if (!isUnlimited && usage >= plan.limit) return false;

    const { error } = await (supabase as any).from("tool_usage").insert({
      user_id: user.id,
      tool_name: toolName,
      month_year: currentMonth,
    });

    if (!error) {
      setUsage((prev) => prev + 1);
      return true;
    }
    return false;
  };

  const isUnlimited = plan.limit === -1;
  const canUse = isUnlimited || usage < plan.limit;
  const remaining = isUnlimited ? Infinity : Math.max(0, plan.limit - usage);
  const isProUser = plan.name !== "Free";
  const limit = isUnlimited ? Infinity : plan.limit;

  return {
    usage,
    limit,
    canUse,
    remaining,
    isProUser,
    isUnlimited,
    plan,
    loading,
    recordUsage,
  };
};
