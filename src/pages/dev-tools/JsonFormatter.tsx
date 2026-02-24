import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Braces } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { toast } from "@/hooks/use-toast";

const JsonFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const format = () => {
    try { setOutput(JSON.stringify(JSON.parse(input), null, 2)); setError(""); }
    catch (e: any) { setError(e.message); setOutput(""); }
  };
  const minify = () => {
    try { setOutput(JSON.stringify(JSON.parse(input))); setError(""); }
    catch (e: any) { setError(e.message); setOutput(""); }
  };
  const copy = () => { navigator.clipboard.writeText(output); toast({ title: "Copied!" }); };

  const schema = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "JSON Formatter & Validator", applicationCategory: "DeveloperApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };

  return (
    <AIToolLayout title="JSON Formatter" metaTitle="JSON Formatter & Validator" metaDescription="Format, validate, and minify JSON data instantly. Free online JSON tool." canonical="/dev-tools/json-formatter">
      <SEOHead title="JSON Formatter & Validator" description="Format and validate JSON online" canonical="/dev-tools/json-formatter" schema={schema} />
      <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2"><Braces className="h-7 w-7 text-primary" /> JSON Formatter & Validator</h1>
      <p className="text-muted-foreground mb-6">Paste JSON to format, validate, or minify.</p>
      <div className="space-y-4 mb-8">
        <Textarea placeholder="Paste JSON here..." value={input} onChange={(e) => setInput(e.target.value)} rows={6} className="font-mono text-sm" />
        <div className="flex gap-2">
          <Button onClick={format} disabled={!input.trim()} className="flex-1">Format</Button>
          <Button onClick={minify} disabled={!input.trim()} variant="outline" className="flex-1">Minify</Button>
        </div>
      </div>
      {error && <Card className="border-destructive/50 bg-destructive/5 mb-4"><CardContent className="pt-4"><p className="text-sm text-destructive font-mono">❌ {error}</p></CardContent></Card>}
      {output && <Card><CardContent className="pt-6"><pre className="text-sm font-mono bg-muted/30 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap max-h-96">{output}</pre><Button variant="ghost" size="sm" className="mt-2" onClick={copy}><Copy className="h-3 w-3 mr-1" /> Copy</Button></CardContent></Card>}
      <section className="mt-16 space-y-6"><h2 className="text-2xl font-bold text-foreground">Free JSON Formatter</h2><p className="text-muted-foreground">Instantly format, validate, and minify JSON data. Runs entirely in your browser — no data sent to any server.</p></section>
    </AIToolLayout>
  );
};
export default JsonFormatter;
