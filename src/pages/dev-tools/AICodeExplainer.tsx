import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { useAIToolGenerator } from "@/hooks/useAIToolGenerator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Copy, Code } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

interface Result { lines: { lineNumber: number; code: string; explanation: string }[]; summary: string; improvements: string[]; edgeCases: string[]; }

const AICodeExplainer = () => {
  const [code, setCode] = useState("");
  const { result, isLoading, generate, copyToClipboard } = useAIToolGenerator<Result>("code-explainer");
  const schema = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "AI Code Explainer", applicationCategory: "DeveloperApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };

  return (
    <AIToolLayout title="AI Code Explainer" metaTitle="AI Code Explainer — Understand Any Code" metaDescription="Paste any code and get line-by-line explanations in simple language using AI." canonical="/dev-tools/code-explainer">
      <SEOHead title="AI Code Explainer" description="AI-powered code explanation tool" canonical="/dev-tools/code-explainer" schema={schema} />
      <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2"><Code className="h-7 w-7 text-primary" /> AI Code Explainer</h1>
      <p className="text-muted-foreground mb-6">Paste code and get clear, line-by-line explanations.</p>
      <div className="space-y-4 mb-8">
        <Textarea placeholder="Paste your code here..." value={code} onChange={(e) => setCode(e.target.value.slice(0, 4000))} rows={8} className="font-mono text-sm" />
        <Button onClick={() => generate({ code })} disabled={isLoading || !code.trim()} className="w-full">
          {isLoading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Analyzing...</> : "Explain Code"}
        </Button>
      </div>
      {result && (
        <div className="space-y-4">
          <Card><CardContent className="pt-6"><h3 className="font-semibold text-foreground mb-2">Summary</h3><p className="text-sm text-muted-foreground">{result.summary}</p></CardContent></Card>
          <Card><CardContent className="pt-6"><h3 className="font-semibold text-foreground mb-3">Line-by-Line</h3>
            <div className="space-y-2">{result.lines?.map((l, i) => (
              <div key={i} className="bg-muted/30 p-3 rounded-lg"><code className="text-xs font-mono text-primary block mb-1">L{l.lineNumber}: {l.code}</code><p className="text-xs text-muted-foreground">{l.explanation}</p></div>
            ))}</div>
          </CardContent></Card>
          {result.improvements?.length > 0 && <Card><CardContent className="pt-6"><h3 className="font-semibold text-foreground mb-2">Improvements</h3>{result.improvements.map((s, i) => <p key={i} className="text-sm text-muted-foreground">💡 {s}</p>)}</CardContent></Card>}
          {result.edgeCases?.length > 0 && <Card><CardContent className="pt-6"><h3 className="font-semibold text-foreground mb-2">Edge Cases</h3>{result.edgeCases.map((s, i) => <p key={i} className="text-sm text-muted-foreground">⚠️ {s}</p>)}</CardContent></Card>}
          <Button variant="outline" onClick={() => copyToClipboard(result.summary)}><Copy className="h-3 w-3 mr-1" /> Copy Summary</Button>
        </div>
      )}
      <section className="mt-16 space-y-6">
        <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
        <p className="text-muted-foreground">Our AI reads your code and explains each line in plain English, identifies improvements and warns about edge cases.</p>
        <h2 className="text-xl font-bold text-foreground">FAQ</h2>
        <details className="border border-border rounded-lg p-4"><summary className="font-medium cursor-pointer">What languages are supported?</summary><p className="mt-2 text-sm text-muted-foreground">JavaScript, Python, TypeScript, Java, C++, Go, Rust, and more.</p></details>
        <details className="border border-border rounded-lg p-4"><summary className="font-medium cursor-pointer">Is my code stored?</summary><p className="mt-2 text-sm text-muted-foreground">No. Code is processed in real-time and not stored.</p></details>
      </section>
    </AIToolLayout>
  );
};
export default AICodeExplainer;
