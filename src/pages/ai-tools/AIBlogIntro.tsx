import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAIToolGenerator } from "@/hooks/useAIToolGenerator";
import { Loader2, Copy } from "lucide-react";

interface IntroResult { intro: string; style: string }

const AIBlogIntro = () => {
  const [topic, setTopic] = useState("");
  const [keyword, setKeyword] = useState("");
  const { result, isLoading, generate, copyToClipboard } = useAIToolGenerator<IntroResult[]>("blog-intro");

  return (
    <AIToolLayout title="Blog Intro Generator" metaTitle="AI Blog Intro Generator" metaDescription="Generate compelling blog introductions with AI. Multiple styles optimized for SEO." canonical="/ai-tools/blog-intro">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 text-center">AI Blog Intro Generator</h1>
      <p className="text-muted-foreground text-center mb-8">Generate 5 SEO-optimized blog introductions in different styles.</p>
      <div className="space-y-4 mb-8">
        <Input placeholder="Blog topic" value={topic} onChange={(e) => setTopic(e.target.value)} maxLength={200} />
        <Input placeholder="Target keyword (optional)" value={keyword} onChange={(e) => setKeyword(e.target.value)} maxLength={100} />
        <Button onClick={() => topic.trim() && generate({ topic: topic.trim(), keyword: keyword.trim() })} disabled={isLoading || !topic.trim()} className="w-full">{isLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generating...</> : "Generate Intros"}</Button>
      </div>
      {isLoading && <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-24 bg-muted/30 rounded-lg animate-pulse" />)}</div>}
      {result && !isLoading && (
        <div className="space-y-4">{result.map((r, i) => (
          <div key={i} className="border border-border/50 rounded-lg p-5">
            <span className="text-xs text-primary font-medium mb-2 inline-block">{r.style}</span>
            <p className="text-sm text-foreground">{r.intro}</p>
            <Button variant="ghost" size="sm" className="mt-2" onClick={() => copyToClipboard(r.intro)}><Copy className="h-3 w-3 mr-1" /> Copy</Button>
          </div>
        ))}</div>
      )}
    </AIToolLayout>
  );
};

export default AIBlogIntro;
