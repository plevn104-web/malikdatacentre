import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { useAIToolGenerator } from "@/hooks/useAIToolGenerator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Copy, ArrowRightLeft } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

interface Result { convertedCode: string; notes: string[]; }
const LANGS = ["JavaScript", "TypeScript", "Python", "Java", "C#", "Go", "Rust", "PHP", "Ruby", "Swift", "Kotlin"];

const AICodeConverter = () => {
  const [code, setCode] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("Python");
  const { result, isLoading, generate, copyToClipboard } = useAIToolGenerator<Result>("code-converter");
  const schema = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "AI Code Converter", applicationCategory: "DeveloperApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };

  return (
    <AIToolLayout title="AI Code Converter" metaTitle="AI Code Converter — Translate Between Languages" metaDescription="Convert code between programming languages instantly using AI." canonical="/dev-tools/code-converter">
      <SEOHead title="AI Code Converter" description="Convert code between languages with AI" canonical="/dev-tools/code-converter" schema={schema} />
      <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2"><ArrowRightLeft className="h-7 w-7 text-primary" /> AI Code Converter</h1>
      <p className="text-muted-foreground mb-6">Convert code to any programming language.</p>
      <div className="space-y-4 mb-8">
        <Textarea placeholder="Paste your code..." value={code} onChange={(e) => setCode(e.target.value.slice(0, 4000))} rows={6} className="font-mono text-sm" />
        <Select value={targetLanguage} onValueChange={setTargetLanguage}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{LANGS.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent></Select>
        <Button onClick={() => generate({ code, targetLanguage })} disabled={isLoading || !code.trim()} className="w-full">{isLoading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Converting...</> : `Convert to ${targetLanguage}`}</Button>
      </div>
      {result && (
        <div className="space-y-4">
          <Card><CardContent className="pt-6"><h3 className="font-semibold text-foreground mb-2">Converted Code ({targetLanguage})</h3><pre className="text-xs font-mono bg-muted/30 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">{result.convertedCode}</pre><Button variant="ghost" size="sm" className="mt-2" onClick={() => copyToClipboard(result.convertedCode)}><Copy className="h-3 w-3 mr-1" /> Copy</Button></CardContent></Card>
          {result.notes?.length > 0 && <Card><CardContent className="pt-6"><h3 className="font-semibold text-foreground mb-2">Conversion Notes</h3>{result.notes.map((n, i) => <p key={i} className="text-sm text-muted-foreground">📝 {n}</p>)}</CardContent></Card>}
        </div>
      )}
      <section className="mt-16 space-y-6"><h2 className="text-2xl font-bold text-foreground">AI Code Conversion</h2><p className="text-muted-foreground">Translate code between 11+ programming languages with notes about key differences.</p></section>
    </AIToolLayout>
  );
};
export default AICodeConverter;
