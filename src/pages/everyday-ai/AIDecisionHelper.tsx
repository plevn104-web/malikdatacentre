import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { useAIToolGenerator } from "@/hooks/useAIToolGenerator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Copy, Scale } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

interface OptionAnalysis { pros: string[]; cons: string[]; riskLevel: string; }
interface Result { optionA: OptionAnalysis; optionB: OptionAnalysis; comparison: string; recommendation: string; }

const AIDecisionHelper = () => {
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [context, setContext] = useState("");
  const { result, isLoading, generate, copyToClipboard } = useAIToolGenerator<Result>("decision-helper");

  const schema = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "AI Decision Helper", applicationCategory: "UtilitiesApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };

  const OptionCard = ({ label, data }: { label: string; data: OptionAnalysis }) => (
    <Card><CardContent className="pt-4">
      <h3 className="font-semibold text-foreground mb-2">{label} <span className="text-xs text-muted-foreground ml-2">Risk: {data.riskLevel}</span></h3>
      <div className="grid grid-cols-2 gap-4">
        <div><p className="text-xs font-medium text-green-600 mb-1">Pros</p>{data.pros.map((p, i) => <p key={i} className="text-sm text-muted-foreground">✅ {p}</p>)}</div>
        <div><p className="text-xs font-medium text-red-600 mb-1">Cons</p>{data.cons.map((c, i) => <p key={i} className="text-sm text-muted-foreground">❌ {c}</p>)}</div>
      </div>
    </CardContent></Card>
  );

  return (
    <AIToolLayout title="AI Decision Helper" metaTitle="AI Decision Helper — Compare Options" metaDescription="Can't decide? Let AI compare your options with pros, cons, and risk analysis." canonical="/everyday-ai/decision-helper">
      <SEOHead title="AI Decision Helper" description="AI-powered decision comparison tool" canonical="/everyday-ai/decision-helper" schema={schema} />
      <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2"><Scale className="h-7 w-7 text-primary" /> AI Decision Helper</h1>
      <p className="text-muted-foreground mb-6">Compare two options and get AI-powered pros, cons, and a recommendation.</p>

      <div className="space-y-4 mb-8">
        <Input placeholder="Option A (e.g. Stay at current job)" value={optionA} onChange={(e) => setOptionA(e.target.value.slice(0, 500))} />
        <Input placeholder="Option B (e.g. Start a business)" value={optionB} onChange={(e) => setOptionB(e.target.value.slice(0, 500))} />
        <Textarea placeholder="Context (optional)" value={context} onChange={(e) => setContext(e.target.value.slice(0, 1000))} rows={2} />
        <Button onClick={() => generate({ optionA, optionB, context })} disabled={isLoading || !optionA.trim() || !optionB.trim()} className="w-full">
          {isLoading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Analyzing...</> : "Compare Options"}
        </Button>
      </div>

      {result && (
        <div className="space-y-4">
          <OptionCard label={`Option A: ${optionA}`} data={result.optionA} />
          <OptionCard label={`Option B: ${optionB}`} data={result.optionB} />
          <Card><CardContent className="pt-4">
            <h3 className="font-semibold text-foreground mb-2">Comparison</h3>
            <p className="text-sm text-muted-foreground">{result.comparison}</p>
          </CardContent></Card>
          <Card className="border-primary/30 bg-primary/5"><CardContent className="pt-4">
            <h3 className="font-semibold text-primary mb-2">Recommendation</h3>
            <p className="text-sm text-foreground">{result.recommendation}</p>
            <Button variant="ghost" size="sm" className="mt-2" onClick={() => copyToClipboard(result.recommendation)}><Copy className="h-3 w-3 mr-1" /> Copy</Button>
          </CardContent></Card>
        </div>
      )}

      <section className="mt-16 space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Make Better Decisions with AI</h2>
        <p className="text-muted-foreground">Our AI analyzes both options objectively, considering pros, cons, risks, and context to give you a clear recommendation.</p>
        <h2 className="text-xl font-bold text-foreground">FAQ</h2>
        <details className="border border-border rounded-lg p-4"><summary className="font-medium cursor-pointer">Should I always follow the AI recommendation?</summary><p className="mt-2 text-sm text-muted-foreground">The AI provides analysis to help you think clearly. The final decision is always yours.</p></details>
      </section>
    </AIToolLayout>
  );
};

export default AIDecisionHelper;
