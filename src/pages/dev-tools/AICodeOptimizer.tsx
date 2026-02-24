import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { useAIToolGenerator } from "@/hooks/useAIToolGenerator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Copy, Zap } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

interface Result { suggestions: { issue: string; fix: string }[]; optimizedCode: string; bestPractices: string[]; }

const AICodeOptimizer = () => {
  const [code, setCode] = useState("");
  const { result, isLoading, generate, copyToClipboard } = useAIToolGenerator<Result>("code-optimizer");
  const schema = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "AI Code Optimizer", applicationCategory: "DeveloperApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };

  return (
    <AIToolLayout title="AI Code Optimizer" metaTitle="AI Code Optimizer — Improve Performance" metaDescription="Optimize your code for performance and readability with AI-powered suggestions." canonical="/dev-tools/code-optimizer">
      <SEOHead title="AI Code Optimizer" description="Optimize code with AI" canonical="/dev-tools/code-optimizer" schema={schema} />
      <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2"><Zap className="h-7 w-7 text-primary" /> AI Code Optimizer</h1>
      <p className="text-muted-foreground mb-6">Get performance improvements and cleaner code.</p>
      <div className="space-y-4 mb-8">
        <Textarea placeholder="Paste your code..." value={code} onChange={(e) => setCode(e.target.value.slice(0, 4000))} rows={8} className="font-mono text-sm" />
        <Button onClick={() => generate({ code })} disabled={isLoading || !code.trim()} className="w-full">{isLoading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Optimizing...</> : "Optimize Code"}</Button>
      </div>
      {result && (
        <div className="space-y-4">
          {result.suggestions?.length > 0 && <Card><CardContent className="pt-6"><h3 className="font-semibold text-foreground mb-3">Issues Found</h3>{result.suggestions.map((s, i) => <div key={i} className="mb-3 bg-muted/30 p-3 rounded-lg"><p className="text-sm font-medium text-foreground">⚠️ {s.issue}</p><p className="text-xs text-muted-foreground mt-1">Fix: {s.fix}</p></div>)}</CardContent></Card>}
          <Card><CardContent className="pt-6"><h3 className="font-semibold text-foreground mb-2">Optimized Code</h3><pre className="text-xs font-mono bg-muted/30 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">{result.optimizedCode}</pre><Button variant="ghost" size="sm" className="mt-2" onClick={() => copyToClipboard(result.optimizedCode)}><Copy className="h-3 w-3 mr-1" /> Copy</Button></CardContent></Card>
          {result.bestPractices?.length > 0 && <Card><CardContent className="pt-6"><h3 className="font-semibold text-foreground mb-2">Best Practices</h3>{result.bestPractices.map((b, i) => <p key={i} className="text-sm text-muted-foreground">✅ {b}</p>)}</CardContent></Card>}
        </div>
      )}
      <section className="mt-16 space-y-6"><h2 className="text-2xl font-bold text-foreground">AI Code Optimization</h2><p className="text-muted-foreground">Our AI identifies performance bottlenecks, suggests improvements, and generates clean, optimized code.</p></section>
    </AIToolLayout>
  );
};
export default AICodeOptimizer;
