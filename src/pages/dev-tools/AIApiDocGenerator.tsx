import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { useAIToolGenerator } from "@/hooks/useAIToolGenerator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Copy, FileText } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

interface Result { name: string; description: string; parameters: { name: string; type: string; required: boolean; description: string }[]; returnType: string; exampleUsage: string; notes: string[]; }

const AIApiDocGenerator = () => {
  const [code, setCode] = useState("");
  const { result, isLoading, generate, copyToClipboard } = useAIToolGenerator<Result>("api-doc-generator");
  const schema = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "AI API Documentation Generator", applicationCategory: "DeveloperApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };

  return (
    <AIToolLayout title="AI API Doc Generator" metaTitle="AI API Documentation Generator" metaDescription="Generate structured API documentation from your code using AI." canonical="/dev-tools/api-doc-generator">
      <SEOHead title="AI API Documentation Generator" description="Generate API docs with AI" canonical="/dev-tools/api-doc-generator" schema={schema} />
      <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2"><FileText className="h-7 w-7 text-primary" /> AI API Documentation Generator</h1>
      <p className="text-muted-foreground mb-6">Paste your function or class code to generate structured docs.</p>
      <div className="space-y-4 mb-8">
        <Textarea placeholder="Paste your function or class code..." value={code} onChange={(e) => setCode(e.target.value.slice(0, 4000))} rows={8} className="font-mono text-sm" />
        <Button onClick={() => generate({ code })} disabled={isLoading || !code.trim()} className="w-full">{isLoading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Generating...</> : "Generate Documentation"}</Button>
      </div>
      {result && (
        <div className="space-y-4">
          <Card><CardContent className="pt-6"><h3 className="text-lg font-bold text-foreground">{result.name}</h3><p className="text-sm text-muted-foreground mt-1">{result.description}</p></CardContent></Card>
          {result.parameters?.length > 0 && <Card><CardContent className="pt-6"><h3 className="font-semibold text-foreground mb-3">Parameters</h3><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-border"><th className="text-left p-2 text-foreground">Name</th><th className="text-left p-2 text-foreground">Type</th><th className="text-left p-2 text-foreground">Required</th><th className="text-left p-2 text-foreground">Description</th></tr></thead><tbody>{result.parameters.map((p, i) => <tr key={i} className="border-b border-border/50"><td className="p-2 font-mono text-xs text-primary">{p.name}</td><td className="p-2 text-muted-foreground">{p.type}</td><td className="p-2 text-muted-foreground">{p.required ? "Yes" : "No"}</td><td className="p-2 text-muted-foreground">{p.description}</td></tr>)}</tbody></table></div></CardContent></Card>}
          <Card><CardContent className="pt-6"><h3 className="font-semibold text-foreground mb-2">Returns: <code className="font-mono text-sm text-primary">{result.returnType}</code></h3></CardContent></Card>
          <Card><CardContent className="pt-6"><h3 className="font-semibold text-foreground mb-2">Example Usage</h3><pre className="text-xs font-mono bg-muted/30 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">{result.exampleUsage}</pre><Button variant="ghost" size="sm" className="mt-2" onClick={() => copyToClipboard(result.exampleUsage)}><Copy className="h-3 w-3 mr-1" /> Copy</Button></CardContent></Card>
        </div>
      )}
      <section className="mt-16 space-y-6"><h2 className="text-2xl font-bold text-foreground">Auto-Generate API Docs</h2><p className="text-muted-foreground">Save time writing documentation. Our AI analyzes your code and generates structured docs with parameter tables and usage examples.</p></section>
    </AIToolLayout>
  );
};
export default AIApiDocGenerator;
