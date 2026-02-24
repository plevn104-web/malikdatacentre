import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { useAIToolGenerator } from "@/hooks/useAIToolGenerator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Copy, Bug } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

interface Result { errorExplanation: string; rootCause: string; fixSuggestions: string[]; correctedCode: string; }

const AICodeDebugger = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const { result, isLoading, generate, copyToClipboard } = useAIToolGenerator<Result>("code-debugger");
  const schema = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "AI Code Debugger", applicationCategory: "DeveloperApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };

  return (
    <AIToolLayout title="AI Code Debugger" metaTitle="AI Code Debugger — Fix Errors Instantly" metaDescription="Paste your code and error message to get instant AI-powered debugging help." canonical="/dev-tools/code-debugger">
      <SEOHead title="AI Code Debugger" description="Fix code errors with AI" canonical="/dev-tools/code-debugger" schema={schema} />
      <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2"><Bug className="h-7 w-7 text-primary" /> AI Code Debugger</h1>
      <p className="text-muted-foreground mb-6">Paste your code and error to get a fix.</p>
      <div className="space-y-4 mb-8">
        <Textarea placeholder="Paste your code..." value={code} onChange={(e) => setCode(e.target.value.slice(0, 4000))} rows={6} className="font-mono text-sm" />
        <Input placeholder="Error message (optional)" value={error} onChange={(e) => setError(e.target.value.slice(0, 500))} />
        <Button onClick={() => generate({ code, error })} disabled={isLoading || !code.trim()} className="w-full">
          {isLoading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Debugging...</> : "Debug Code"}
        </Button>
      </div>
      {result && (
        <div className="space-y-4">
          <Card><CardContent className="pt-6"><h3 className="font-semibold text-foreground mb-2">Error Explanation</h3><p className="text-sm text-muted-foreground">{result.errorExplanation}</p></CardContent></Card>
          <Card><CardContent className="pt-6"><h3 className="font-semibold text-foreground mb-2">Root Cause</h3><p className="text-sm text-muted-foreground">{result.rootCause}</p></CardContent></Card>
          <Card><CardContent className="pt-6"><h3 className="font-semibold text-foreground mb-2">Fix Suggestions</h3>{result.fixSuggestions?.map((s, i) => <p key={i} className="text-sm text-muted-foreground">✅ {s}</p>)}</CardContent></Card>
          <Card><CardContent className="pt-6"><h3 className="font-semibold text-foreground mb-2">Corrected Code</h3><pre className="text-xs font-mono bg-muted/30 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">{result.correctedCode}</pre><Button variant="ghost" size="sm" className="mt-2" onClick={() => copyToClipboard(result.correctedCode)}><Copy className="h-3 w-3 mr-1" /> Copy</Button></CardContent></Card>
        </div>
      )}
      <section className="mt-16 space-y-6">
        <h2 className="text-2xl font-bold text-foreground">AI-Powered Debugging</h2>
        <p className="text-muted-foreground">Get instant error explanations, root cause analysis, and corrected code from our AI debugger.</p>
        <h2 className="text-xl font-bold text-foreground">FAQ</h2>
        <details className="border border-border rounded-lg p-4"><summary className="font-medium cursor-pointer">Do I need to provide the error message?</summary><p className="mt-2 text-sm text-muted-foreground">It helps but isn't required. The AI can analyze code for potential issues even without an error.</p></details>
      </section>
    </AIToolLayout>
  );
};
export default AICodeDebugger;
