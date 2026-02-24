import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAIToolGenerator } from "@/hooks/useAIToolGenerator";
import { Loader2, Copy } from "lucide-react";

interface HashtagResult { trending: string[]; niche: string[]; broad: string[]; tips: string[] }

const AIHashtagResearch = () => {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const { result, isLoading, generate, copyToClipboard } = useAIToolGenerator<HashtagResult>("hashtag-research");

  return (
    <AIToolLayout title="Hashtag Research Tool" metaTitle="AI Hashtag Research Tool" metaDescription="Research trending, niche, and broad hashtags for any platform with AI." canonical="/ai-tools/hashtag-research">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 text-center">AI Hashtag Research Tool</h1>
      <p className="text-muted-foreground text-center mb-8">Get 30 categorized hashtags with strategic tips.</p>
      <div className="space-y-4 mb-8">
        <Input placeholder="Topic or niche" value={topic} onChange={(e) => setTopic(e.target.value)} maxLength={100} />
        <Select value={platform} onValueChange={setPlatform}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Instagram">Instagram</SelectItem><SelectItem value="TikTok">TikTok</SelectItem><SelectItem value="Twitter">Twitter/X</SelectItem><SelectItem value="LinkedIn">LinkedIn</SelectItem></SelectContent></Select>
        <Button onClick={() => topic.trim() && generate({ topic: topic.trim(), platform })} disabled={isLoading || !topic.trim()} className="w-full">{isLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Researching...</> : "Research Hashtags"}</Button>
      </div>
      {isLoading && <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-20 bg-muted/30 rounded-lg animate-pulse" />)}</div>}
      {result && !isLoading && (
        <div className="space-y-5">
          {([["🔥 Trending", result.trending], ["🎯 Niche", result.niche], ["🌐 Broad", result.broad]] as const).map(([label, tags]) => (
            <div key={label} className="border border-border/50 rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2 text-sm">{label}</h3>
              <div className="flex flex-wrap gap-2">{tags?.map((t, i) => <button key={i} onClick={() => copyToClipboard(`#${t}`)} className="px-2 py-1 bg-primary/10 hover:bg-primary/20 rounded-full text-xs text-foreground cursor-pointer">#{t}</button>)}</div>
            </div>
          ))}
          <div className="border border-border/50 rounded-lg p-4"><h3 className="font-semibold text-foreground mb-2 text-sm">💡 Tips</h3><ul className="space-y-1">{result.tips?.map((t, i) => <li key={i} className="text-xs text-muted-foreground">• {t}</li>)}</ul></div>
          <Button variant="outline" size="sm" onClick={() => copyToClipboard([...result.trending || [], ...result.niche || [], ...result.broad || []].map(t => `#${t}`).join(" "))}><Copy className="h-3 w-3 mr-1" /> Copy All</Button>
        </div>
      )}
    </AIToolLayout>
  );
};

export default AIHashtagResearch;
