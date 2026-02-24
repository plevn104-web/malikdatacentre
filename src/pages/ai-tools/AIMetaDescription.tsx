import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAIToolGenerator } from "@/hooks/useAIToolGenerator";
import { Loader2, Copy } from "lucide-react";

interface MetaResult { description: string; characterCount: number }

const AIMetaDescription = () => {
  const [topic, setTopic] = useState("");
  const [keyword, setKeyword] = useState("");
  const { result, isLoading, generate, copyToClipboard } = useAIToolGenerator<MetaResult[]>("meta-description");

  return (
    <AIToolLayout title="Meta Description Generator" metaTitle="AI Meta Description Generator" metaDescription="Generate SEO-optimized meta descriptions under 160 characters with AI." canonical="/ai-tools/meta-description">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 text-center">AI Meta Description Generator</h1>
      <p className="text-muted-foreground text-center mb-8">Generate 5 SEO meta descriptions under 160 characters.</p>
      <div className="space-y-4 mb-8">
        <Input placeholder="Page topic" value={topic} onChange={(e) => setTopic(e.target.value)} maxLength={200} />
        <Input placeholder="Target keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)} maxLength={100} />
        <Button onClick={() => topic.trim() && generate({ topic: topic.trim(), keyword: keyword.trim() })} disabled={isLoading || !topic.trim()} className="w-full">{isLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generating...</> : "Generate Descriptions"}</Button>
      </div>
      {isLoading && <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-16 bg-muted/30 rounded-lg animate-pulse" />)}</div>}
      {result && !isLoading && (
        <div className="space-y-3">{result.map((r, i) => (
          <div key={i} className="border border-border/50 rounded-lg p-4 flex items-start justify-between gap-3">
            <div className="flex-1"><p className="text-sm text-foreground">{r.description}</p><span className={`text-xs ${r.characterCount <= 160 ? "text-green-500" : "text-red-400"}`}>{r.characterCount} chars</span></div>
            <Button variant="ghost" size="sm" onClick={() => copyToClipboard(r.description)}><Copy className="h-3 w-3" /></Button>
          </div>
        ))}</div>
      )}
    </AIToolLayout>
  );
};

export default AIMetaDescription;
