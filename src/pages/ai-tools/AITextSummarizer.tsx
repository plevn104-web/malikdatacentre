import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAIToolGenerator } from "@/hooks/useAIToolGenerator";
import { Loader2, Copy } from "lucide-react";

interface SumResult { keyPoints: string[]; bulletSummary: string[]; shortSummary: string; detailedSummary: string }

const AITextSummarizer = () => {
  const [text, setText] = useState("");
  const { result, isLoading, generate, copyToClipboard } = useAIToolGenerator<SumResult>("text-summarizer");

  return (
    <AIToolLayout title="Text Summarizer" metaTitle="AI Text Summarizer" metaDescription="Summarize any text with AI. Get key points, bullet summaries, and both short and detailed summaries." canonical="/ai-tools/text-summarizer">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 text-center">AI Text Summarizer</h1>
      <p className="text-muted-foreground text-center mb-8">Paste text and get structured summaries instantly.</p>
      <div className="space-y-4 mb-8">
        <Textarea placeholder="Paste your text here (up to 5000 characters)..." value={text} onChange={(e) => setText(e.target.value)} rows={8} maxLength={5000} />
        <p className="text-xs text-muted-foreground text-right">{text.length}/5000</p>
        <Button onClick={() => text.trim() && generate({ text: text.trim() })} disabled={isLoading || text.trim().length < 50} className="w-full">{isLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Summarizing...</> : "Summarize"}</Button>
      </div>
      {isLoading && <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-20 bg-muted/30 rounded-lg animate-pulse" />)}</div>}
      {result && !isLoading && (
        <div className="space-y-5">
          <div className="border border-primary/30 bg-primary/5 rounded-lg p-5"><h3 className="font-semibold text-foreground mb-2">Key Points</h3><ul className="space-y-1">{result.keyPoints?.map((p, i) => <li key={i} className="text-sm text-foreground">• {p}</li>)}</ul></div>
          <div className="border border-border/50 rounded-lg p-5"><h3 className="font-semibold text-foreground mb-2">Short Summary</h3><p className="text-sm text-muted-foreground">{result.shortSummary}</p></div>
          <div className="border border-border/50 rounded-lg p-5"><h3 className="font-semibold text-foreground mb-2">Detailed Summary</h3><p className="text-sm text-muted-foreground whitespace-pre-wrap">{result.detailedSummary}</p></div>
          <Button variant="outline" size="sm" onClick={() => copyToClipboard(`Key Points:\n${result.keyPoints?.join("\n")}\n\nShort Summary:\n${result.shortSummary}\n\nDetailed Summary:\n${result.detailedSummary}`)}><Copy className="h-3 w-3 mr-1" /> Copy All</Button>
        </div>
      )}
    </AIToolLayout>
  );
};

export default AITextSummarizer;
