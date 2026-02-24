import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { useAIToolGenerator } from "@/hooks/useAIToolGenerator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, BarChart3 } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { Progress } from "@/components/ui/progress";

interface Result { overallComplexity: string; score: number; metrics: { metric: string; value: string; assessment: string }[]; refactorSuggestions: string[]; summary: string; }

const AICodeComplexity = () => {
  const [code, setCode] = useState("");
  const { result, isLoading, generate } = useAIToolGenerator<Result>("code-complexity");
  const schema = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Code Complexity Analyzer", applicationCategory: "DeveloperApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };

  return (
    <AIToolLayout title="Code Complexity Analyzer" metaTitle="Code Complexity Analyzer" metaDescription="Analyze code complexity and get refactoring suggestions using AI." canonical="/dev-tools/code-complexity">
      <SEOHead title="Code Complexity Analyzer" description="Analyze code complexity with AI" canonical="/dev-tools/code-complexity" schema={schema} />
      <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2"><BarChart3 className="h-7 w-7 text-primary" /> Code Complexity Analyzer</h1>
      <p className="text-muted-foreground mb-6">Analyze code complexity and get refactoring advice.</p>
      <div className="space-y-4 mb-8">
        <Textarea placeholder="Paste your code..." value={code} onChange={(e) => setCode(e.target.value.slice(0, 4000))} rows={8} className="font-mono text-sm" />
        <Button onClick={() => generate({ code })} disabled={isLoading || !code.trim()} className="w-full">{isLoading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Analyzing...</> : "Analyze Complexity"}</Button>
      </div>
      {result && (
        <div className="space-y-4">
          <Card className="border-primary/30 bg-primary/5"><CardContent className="pt-6"><div className="flex items-center justify-between mb-2"><h3 className="font-semibold text-foreground">Complexity: {result.overallComplexity}</h3><span className="text-2xl font-bold text-primary">{result.score}/10</span></div><Progress value={result.score * 10} className="h-3" /><p className="text-sm text-muted-foreground mt-2">{result.summary}</p></CardContent></Card>
          {result.metrics?.length > 0 && <Card><CardContent className="pt-6"><h3 className="font-semibold text-foreground mb-3">Metrics</h3>{result.metrics.map((m, i) => <div key={i} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0"><span className="text-sm text-foreground">{m.metric}</span><span className="text-sm text-muted-foreground">{m.value}</span><span className="text-xs text-primary">{m.assessment}</span></div>)}</CardContent></Card>}
          {result.refactorSuggestions?.length > 0 && <Card><CardContent className="pt-6"><h3 className="font-semibold text-foreground mb-2">Refactoring Suggestions</h3>{result.refactorSuggestions.map((s, i) => <p key={i} className="text-sm text-muted-foreground">🔧 {s}</p>)}</CardContent></Card>}
        </div>
      )}
      <section className="mt-16 space-y-6"><h2 className="text-2xl font-bold text-foreground">Understand Code Complexity</h2><p className="text-muted-foreground">Get a clear complexity score, detailed metrics, and actionable refactoring suggestions.</p></section>
    </AIToolLayout>
  );
};
export default AICodeComplexity;
