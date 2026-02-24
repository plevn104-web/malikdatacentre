import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAIToolGenerator } from "@/hooks/useAIToolGenerator";
import { Loader2, Copy } from "lucide-react";

interface BriefResult { projectType: string; objectives: string[]; deliverables: string[]; estimatedScope: string; potentialChallenges: string[]; suggestedQuestions: string[] }

const AIClientBriefAnalyzer = () => {
  const [brief, setBrief] = useState("");
  const { result, isLoading, generate, copyToClipboard } = useAIToolGenerator<BriefResult>("client-brief-analyzer");

  return (
    <AIToolLayout title="Client Brief Analyzer" metaTitle="AI Client Brief Analyzer" metaDescription="Analyze client briefs with AI. Extract objectives, deliverables, and get clarifying questions." canonical="/ai-tools/client-brief-analyzer">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 text-center">AI Client Brief Analyzer</h1>
      <p className="text-muted-foreground text-center mb-8">Paste a client brief to extract key info and get clarifying questions.</p>
      <div className="space-y-4 mb-8">
        <Textarea placeholder="Paste client brief here..." value={brief} onChange={(e) => setBrief(e.target.value)} rows={6} maxLength={3000} />
        <Button onClick={() => brief.trim() && generate({ brief: brief.trim() })} disabled={isLoading || brief.trim().length < 30} className="w-full">{isLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Analyzing...</> : "Analyze Brief"}</Button>
      </div>
      {isLoading && <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-20 bg-muted/30 rounded-lg animate-pulse" />)}</div>}
      {result && !isLoading && (
        <div className="space-y-5">
          <div className="border border-primary/30 bg-primary/5 rounded-lg p-5"><span className="text-xs text-primary font-medium">Project Type</span><p className="text-foreground font-semibold mt-1">{result.projectType}</p><p className="text-sm text-muted-foreground mt-1">Scope: {result.estimatedScope}</p></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-border/50 rounded-lg p-4"><h3 className="font-semibold text-foreground mb-2 text-sm">Objectives</h3><ul className="space-y-1">{result.objectives?.map((o, i) => <li key={i} className="text-xs text-muted-foreground">✓ {o}</li>)}</ul></div>
            <div className="border border-border/50 rounded-lg p-4"><h3 className="font-semibold text-foreground mb-2 text-sm">Deliverables</h3><ul className="space-y-1">{result.deliverables?.map((d, i) => <li key={i} className="text-xs text-muted-foreground">📦 {d}</li>)}</ul></div>
          </div>
          <div className="border border-border/50 rounded-lg p-5"><h3 className="font-semibold text-foreground mb-2">Potential Challenges</h3><ul className="space-y-1">{result.potentialChallenges?.map((c, i) => <li key={i} className="text-sm text-muted-foreground">⚠️ {c}</li>)}</ul></div>
          <div className="border border-border/50 rounded-lg p-5"><h3 className="font-semibold text-foreground mb-2">Questions to Ask Client</h3><ul className="space-y-1">{result.suggestedQuestions?.map((q, i) => <li key={i} className="text-sm text-muted-foreground">❓ {q}</li>)}</ul></div>
          <Button variant="outline" size="sm" onClick={() => copyToClipboard(JSON.stringify(result, null, 2))}><Copy className="h-3 w-3 mr-1" /> Copy All</Button>
        </div>
      )}
    </AIToolLayout>
  );
};

export default AIClientBriefAnalyzer;
