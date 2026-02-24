import { supabase } from "@/integrations/supabase/client";

export const adminApi = async (action: string, params: Record<string, any> = {}) => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("Not authenticated");

  const res = await supabase.functions.invoke("admin-api", {
    body: { action, ...params },
  });

  if (res.error) throw new Error(res.error.message);
  return res.data;
};
