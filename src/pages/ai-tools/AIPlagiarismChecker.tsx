import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useAIToolGenerator } from "@/hooks/useAIToolGenerator";
import { Loader2 } from "lucide-react";

interface PlagResult { similarityScore: number; flaggedPhrases: { phrase: string; reason: string }[]; verdict: string; suggestions: string[] }

const AIPlagiarismChecker = () => {
  const [text, setText] = useState("");
  const { result, isLoading, generate } = useAIToolGenerator<PlagResult>("plagiarism-checker");

  return (
    <AIToolLayout title="Plagiarism Checker" metaTitle="AI Plagiarism Checker" metaDescription="Check text originality with AI-powered similarity detection. Get similarity scores and improvement suggestions." canonical="/ai-tools/plagiarism-checker">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 text-center">AI Plagiarism Checker</h1>
      <p className="text-muted-foreground text-center mb-8">Analyze text originality with AI-powered pattern detection.</p>
      <div className="space-y-4 mb-8">
        <Textarea placeholder="Paste text to check..." value={text} onChange={(e) => setText(e.target.value)} rows={8} maxLength={3000} />
        <Button onClick={() => text.trim() && generate({ text: text.trim() })} disabled={isLoading || text.trim().length < 50} className="w-full">{isLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Analyzing...</> : "Check Plagiarism"}</Button>
      </div>
      {isLoading && <div className="h-40 bg-muted/30 rounded-lg animate-pulse" />}
      {result && !isLoading && (
        <div className="space-y-5">
          <div className="border border-border/50 rounded-lg p-5 text-center">
            <p className="text-4xl font-bold text-foreground mb-2">{result.similarityScore}%</p>
            <Progress value={result.similarityScore} className="h-3 mb-2" />
            <p className={`text-sm font-medium ${result.similarityScore < 20 ? "text-green-500" : result.similarityScore < 50 ? "text-yellow-500" : "text-red-500"}`}>{result.verdict}</p>
          </div>
          {result.flaggedPhrases?.length > 0 && (
            <div className="border border-border/50 rounded-lg p-5"><h3 className="font-semibold text-foreground mb-2">Flagged Phrases</h3>{result.flaggedPhrases.map((f, i) => <div key={i} className="mb-2 last:mb-0"><p className="text-sm text-foreground italic">"{f.phrase}"</p><p className="text-xs text-muted-foreground">{f.reason}</p></div>)}</div>
          )}
          <div className="border border-border/50 rounded-lg p-5"><h3 className="font-semibold text-foreground mb-2">Suggestions</h3><ul className="space-y-1">{result.suggestions?.map((s, i) => <li key={i} className="text-sm text-muted-foreground">💡 {s}</li>)}</ul></div>
        </div>
      )}
    </AIToolLayout>
  );
};

export default AIPlagiarismChecker;
