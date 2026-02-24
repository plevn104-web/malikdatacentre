import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type ToolType =
  | "keyword-explorer"
  | "tag-optimization"
  | "competitor-breakdown"
  | "ctr-assistant"
  | "script-builder"
  | "content-repurposing"
  | "content-planner";

export const useCreatorStudioGenerator = <T = unknown>(toolType: ToolType) => {
  const [result, setResult] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generate = async (inputs: Record<string, string>) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("creator-studio-generate", {
        body: { toolType, inputs },
      });

      if (error) throw error;
      if (data?.result) {
        setResult(data.result as T);
      } else {
        throw new Error("No results returned");
      }
    } catch (err) {
      console.error("Generation error:", err);
      toast({
        title: "Generation Failed",
        description: "Please try again. If the issue persists, try different input.",
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
