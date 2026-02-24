import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type ToolType = "title-generator" | "description-generator" | "tag-generator" | "thumbnail-headline" | "hashtag-generator";

export const useYouTubeToolGenerator = (toolType: ToolType) => {
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const generate = async (inputs: Record<string, string>) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("youtube-tool-generate", {
        body: { toolType, inputs },
      });

      if (error) throw error;
      if (data?.results) {
        setResults(data.results);
      } else {
        throw new Error("No results returned");
      }
    } catch (err) {
      console.error("Generation error:", err);
      toast({
        title: "Generation Failed",
        description: "Please try again. If the issue persists, try a different keyword.",
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

  const copyAll = () => {
    const allText = results.join("\n");
    navigator.clipboard.writeText(allText);
    toast({ title: "All Copied!", description: "All results copied to clipboard." });
  };

  return { results, isLoading, generate, copyToClipboard, copyAll, setResults };
};
