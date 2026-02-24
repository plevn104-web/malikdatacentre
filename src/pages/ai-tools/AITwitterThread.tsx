import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAIToolGenerator } from "@/hooks/useAIToolGenerator";
import { Loader2, Copy } from "lucide-react";

interface ThreadResult { tweets: string[]; hashtags: string[] }

const AITwitterThread = () => {
  const [topic, setTopic] = useState("");
  const { result, isLoading, generate, copyToClipboard } = useAIToolGenerator<ThreadResult>("twitter-thread");

  return (
    <AIToolLayout title="Twitter/X Thread Generator" metaTitle="AI Twitter Thread Generator" metaDescription="Generate viral Twitter/X threads with AI. Get structured, engaging threads on any topic." canonical="/ai-tools/twitter-thread">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 text-center">AI Twitter/X Thread Generator</h1>
      <p className="text-muted-foreground text-center mb-8">Generate engaging 7-10 tweet threads on any topic.</p>
      <div className="space-y-4 mb-8">
        <Input placeholder="Thread topic" value={topic} onChange={(e) => setTopic(e.target.value)} maxLength={200} />
        <Button onClick={() => topic.trim() && generate({ topic: topic.trim() })} disabled={isLoading || !topic.trim()} className="w-full">{isLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generating...</> : "Generate Thread"}</Button>
      </div>
      {isLoading && <div className="space-y-3">{Array.from({ length: 7 }).map((_, i) => <div key={i} className="h-16 bg-muted/30 rounded-lg animate-pulse" />)}</div>}
      {result && !isLoading && (
        <div className="space-y-3">
          {result.tweets?.map((t, i) => (
            <div key={i} className="border border-border/50 rounded-lg p-4 flex gap-3">
              <span className="text-xs text-primary font-bold mt-1">{i + 1}/</span>
              <p className="text-sm text-foreground flex-1">{t}</p>
            </div>
          ))}
          <div className="flex flex-wrap gap-1 mt-2">{result.hashtags?.map((h, i) => <span key={i} className="text-xs text-primary">#{h}</span>)}</div>
          <Button variant="outline" size="sm" onClick={() => copyToClipboard(result.tweets?.map((t, i) => `${i + 1}/ ${t}`).join("\n\n") + "\n\n" + result.hashtags?.map(h => `#${h}`).join(" "))}><Copy className="h-3 w-3 mr-1" /> Copy Thread</Button>
        </div>
      )}
    </AIToolLayout>
  );
};

export default AITwitterThread;
