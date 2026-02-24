import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useToolUsage } from "./useToolUsage";

export const useAIToolGenerator = <T = unknown>(toolType: string) => {
  const [result, setResult] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { canUse, recordUsage } = useToolUsage();

  const generate = async (inputs: Record<string, string>) => {
    if (!canUse) {
      toast({ title: "Usage Limit Reached", description: "Upgrade your plan for more runs.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("ai-tools-generate", {
        body: { toolType, inputs },
      });

      if (error) throw error;
      if (data?.result) {
        setResult(data.result as T);
        await recordUsage(toolType);
      } else if (data?.error) {
        throw new Error(data.error);
      } else {
        throw new Error("No results returned");
      }
    } catch (err: any) {
      console.error("AI Tool error:", err);
      toast({
        title: "Generation Failed",
        description: err?.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: "Content copied to clipboard." });
  };

  return { result, isLoading, generate, copyToClipboard, setResult };
};
