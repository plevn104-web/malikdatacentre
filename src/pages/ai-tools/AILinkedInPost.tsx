import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAIToolGenerator } from "@/hooks/useAIToolGenerator";
import { Loader2, Copy } from "lucide-react";

interface PostResult { post: string; hashtags: string[] }

const AILinkedInPost = () => {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("professional");
  const { result, isLoading, generate, copyToClipboard } = useAIToolGenerator<PostResult[]>("linkedin-post");

  return (
    <AIToolLayout title="LinkedIn Post Generator" metaTitle="AI LinkedIn Post Generator" metaDescription="Generate professional LinkedIn posts with AI. Optimize for engagement and reach." canonical="/ai-tools/linkedin-post">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 text-center">AI LinkedIn Post Generator</h1>
      <p className="text-muted-foreground text-center mb-8">Generate 3 professional LinkedIn posts with hashtags.</p>
      <div className="space-y-4 mb-8">
        <Input placeholder="Topic or idea" value={topic} onChange={(e) => setTopic(e.target.value)} maxLength={200} />
        <Select value={tone} onValueChange={setTone}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="professional">Professional</SelectItem><SelectItem value="thought-leadership">Thought Leadership</SelectItem><SelectItem value="storytelling">Storytelling</SelectItem><SelectItem value="casual">Casual</SelectItem></SelectContent></Select>
        <Button onClick={() => topic.trim() && generate({ topic: topic.trim(), tone })} disabled={isLoading || !topic.trim()} className="w-full">{isLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generating...</> : "Generate Posts"}</Button>
      </div>
      {isLoading && <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-32 bg-muted/30 rounded-lg animate-pulse" />)}</div>}
      {result && !isLoading && (
        <div className="space-y-4">
          {result.map((p, i) => (
            <div key={i} className="border border-border/50 rounded-lg p-5">
              <p className="text-sm text-foreground whitespace-pre-wrap mb-3">{p.post}</p>
              <div className="flex flex-wrap gap-1 mb-3">{p.hashtags?.map((h, j) => <span key={j} className="text-xs text-primary">#{h}</span>)}</div>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(`${p.post}\n\n${p.hashtags?.map(h => `#${h}`).join(" ")}`)}><Copy className="h-3 w-3 mr-1" /> Copy</Button>
            </div>
          ))}
        </div>
      )}
    </AIToolLayout>
  );
};

export default AILinkedInPost;
