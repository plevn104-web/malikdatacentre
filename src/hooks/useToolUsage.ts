import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

const FREE_LIMIT = 10;

export const useToolUsage = () => {
  const { user } = useAuth();
  const [usage, setUsage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isProUser, setIsProUser] = useState(false);

  const currentMonth = new Date().toISOString().slice(0, 7); // "2026-02"

  const fetchUsage = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      // Check usage count
      const { count, error } = await (supabase as any)
        .from("tool_usage")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("month_year", currentMonth);

      if (!error) {
        setUsage(count || 0);
      }

      // Check pro status via active subscription
      const { data: subs } = await supabase
        .from("user_subscriptions")
        .select("id")
        .eq("user_id", user.id)
        .eq("status", "active")
        .gt("expires_at", new Date().toISOString())
        .limit(1);

      setIsProUser(!!subs && subs.length > 0);
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
    if (isProUser) {
      // Pro users: unlimited, still record
      await (supabase as any).from("tool_usage").insert({
        user_id: user.id,
        tool_name: toolName,
        month_year: currentMonth,
      });
      setUsage((prev) => prev + 1);
      return true;
    }

    if (usage >= FREE_LIMIT) return false;

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

  const canUse = isProUser || usage < FREE_LIMIT;
  const remaining = isProUser ? Infinity : Math.max(0, FREE_LIMIT - usage);

  return { usage, limit: FREE_LIMIT, canUse, remaining, isProUser, loading, recordUsage };
};
