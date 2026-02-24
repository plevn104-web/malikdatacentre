import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAIToolGenerator } from "@/hooks/useAIToolGenerator";
import { Loader2, Copy } from "lucide-react";

interface NotesResult { title: string; keyPoints: string[]; summary: string; sections: { heading: string; content: string }[] }

const AIPdfToNotes = () => {
  const [text, setText] = useState("");
  const { result, isLoading, generate, copyToClipboard } = useAIToolGenerator<NotesResult>("pdf-to-notes");

  return (
    <AIToolLayout title="PDF to Notes" metaTitle="AI PDF to Notes Converter" metaDescription="Convert text content into structured study notes with AI. Extract key points and summaries." canonical="/ai-tools/pdf-to-notes">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 text-center">AI PDF to Notes Converter</h1>
      <p className="text-muted-foreground text-center mb-8">Paste extracted PDF text to get structured notes.</p>
      <div className="space-y-4 mb-8">
        <Textarea placeholder="Paste your PDF text content here..." value={text} onChange={(e) => setText(e.target.value)} rows={8} maxLength={5000} />
        <Button onClick={() => text.trim() && generate({ text: text.trim() })} disabled={isLoading || text.trim().length < 50} className="w-full">{isLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Converting...</> : "Convert to Notes"}</Button>
      </div>
      {isLoading && <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-24 bg-muted/30 rounded-lg animate-pulse" />)}</div>}
      {result && !isLoading && (
        <div className="space-y-5">
          <h2 className="font-display text-xl font-bold text-foreground">{result.title}</h2>
          <div className="border border-primary/30 bg-primary/5 rounded-lg p-5"><h3 className="font-semibold text-foreground mb-2">Key Points</h3><ul className="space-y-1">{result.keyPoints?.map((p, i) => <li key={i} className="text-sm text-foreground">• {p}</li>)}</ul></div>
          <div className="border border-border/50 rounded-lg p-5"><h3 className="font-semibold text-foreground mb-2">Summary</h3><p className="text-sm text-muted-foreground">{result.summary}</p></div>
          {result.sections?.map((s, i) => (
            <div key={i} className="border border-border/50 rounded-lg p-5"><h3 className="font-semibold text-foreground mb-2">{s.heading}</h3><p className="text-sm text-muted-foreground whitespace-pre-wrap">{s.content}</p></div>
          ))}
          <Button variant="outline" size="sm" onClick={() => copyToClipboard(`# ${result.title}\n\n## Key Points\n${result.keyPoints?.map(p => `- ${p}`).join("\n")}\n\n## Summary\n${result.summary}\n\n${result.sections?.map(s => `## ${s.heading}\n${s.content}`).join("\n\n")}`)}><Copy className="h-3 w-3 mr-1" /> Copy Notes</Button>
        </div>
      )}
    </AIToolLayout>
  );
};

export default AIPdfToNotes;
