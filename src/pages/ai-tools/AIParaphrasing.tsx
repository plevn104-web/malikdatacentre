import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAIToolGenerator } from "@/hooks/useAIToolGenerator";
import { Loader2, Copy } from "lucide-react";

interface ParaResult { paraphrased: string; changes: string[] }

const AIParaphrasing = () => {
  const [text, setText] = useState("");
  const [tone, setTone] = useState("formal");
  const { result, isLoading, generate, copyToClipboard } = useAIToolGenerator<ParaResult>("paraphrasing");

  return (
    <AIToolLayout title="Paraphrasing Tool" metaTitle="AI Paraphrasing Tool" metaDescription="Paraphrase text with AI. Change tone, improve clarity, and refine your writing." canonical="/ai-tools/paraphrasing">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 text-center">AI Paraphrasing Tool</h1>
      <p className="text-muted-foreground text-center mb-8">Rewrite text with improved clarity in any tone.</p>
      <div className="space-y-4 mb-8">
        <Textarea placeholder="Paste text to paraphrase..." value={text} onChange={(e) => setText(e.target.value)} rows={6} maxLength={3000} />
        <Select value={tone} onValueChange={setTone}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="formal">Formal</SelectItem><SelectItem value="casual">Casual</SelectItem><SelectItem value="academic">Academic</SelectItem><SelectItem value="simplified">Simplified</SelectItem></SelectContent></Select>
        <Button onClick={() => text.trim() && generate({ text: text.trim(), tone })} disabled={isLoading || text.trim().length < 20} className="w-full">{isLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Paraphrasing...</> : "Paraphrase"}</Button>
      </div>
      {isLoading && <div className="h-40 bg-muted/30 rounded-lg animate-pulse" />}
      {result && !isLoading && (
        <div className="space-y-5">
          <div className="border border-primary/30 bg-primary/5 rounded-lg p-5"><h3 className="font-semibold text-foreground mb-2">Paraphrased Text</h3><p className="text-sm text-foreground whitespace-pre-wrap">{result.paraphrased}</p><Button variant="ghost" size="sm" className="mt-3" onClick={() => copyToClipboard(result.paraphrased)}><Copy className="h-3 w-3 mr-1" /> Copy</Button></div>
          <div className="border border-border/50 rounded-lg p-5"><h3 className="font-semibold text-foreground mb-2">Improvements Made</h3><ul className="space-y-1">{result.changes?.map((c, i) => <li key={i} className="text-sm text-muted-foreground">✓ {c}</li>)}</ul></div>
        </div>
      )}
    </AIToolLayout>
  );
};

export default AIParaphrasing;
