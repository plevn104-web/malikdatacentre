import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAIToolGenerator } from "@/hooks/useAIToolGenerator";
import { Loader2, Copy } from "lucide-react";

interface CaptionResult { caption: string; hashtags: string[] }

const AIInstagramCaption = () => {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("engaging");
  const { result, isLoading, generate, copyToClipboard } = useAIToolGenerator<CaptionResult[]>("instagram-caption");

  return (
    <AIToolLayout title="Instagram Caption Generator" metaTitle="AI Instagram Caption Generator" metaDescription="Generate engaging Instagram captions with AI. Get optimized captions with relevant hashtags." canonical="/ai-tools/instagram-caption">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 text-center">AI Instagram Caption Generator</h1>
      <p className="text-muted-foreground text-center mb-8">Generate 5 engaging captions with optimized hashtags.</p>
      <div className="space-y-4 mb-8">
        <Input placeholder="Topic or theme" value={topic} onChange={(e) => setTopic(e.target.value)} maxLength={200} />
        <Select value={tone} onValueChange={setTone}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="engaging">Engaging</SelectItem><SelectItem value="funny">Funny</SelectItem><SelectItem value="inspirational">Inspirational</SelectItem><SelectItem value="professional">Professional</SelectItem></SelectContent></Select>
        <Button onClick={() => topic.trim() && generate({ topic: topic.trim(), tone })} disabled={isLoading || !topic.trim()} className="w-full">{isLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generating...</> : "Generate Captions"}</Button>
      </div>
      {isLoading && <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-24 bg-muted/30 rounded-lg animate-pulse" />)}</div>}
      {result && !isLoading && (
        <div className="space-y-4">
          {result.map((c, i) => (
            <div key={i} className="border border-border/50 rounded-lg p-5">
              <p className="text-sm text-foreground mb-3">{c.caption}</p>
              <div className="flex flex-wrap gap-1 mb-3">{c.hashtags?.map((h, j) => <span key={j} className="text-xs text-primary">#{h}</span>)}</div>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(`${c.caption}\n\n${c.hashtags?.map(h => `#${h}`).join(" ")}`)}><Copy className="h-3 w-3 mr-1" /> Copy</Button>
            </div>
          ))}
        </div>
      )}
    </AIToolLayout>
  );
};

export default AIInstagramCaption;
