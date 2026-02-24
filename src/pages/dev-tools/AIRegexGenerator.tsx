import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { useAIToolGenerator } from "@/hooks/useAIToolGenerator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Copy, FileSearch } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

interface Result { pattern: string; flags: string; explanation: string; testExamples: { input: string; matches: boolean }[]; }

const AIRegexGenerator = () => {
  const [description, setDescription] = useState("");
  const { result, isLoading, generate, copyToClipboard } = useAIToolGenerator<Result>("regex-generator");
  const schema = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "AI Regex Generator", applicationCategory: "DeveloperApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };

  return (
    <AIToolLayout title="AI Regex Generator" metaTitle="AI Regex Generator — Create Patterns Easily" metaDescription="Describe what you need to match and get a working regex with explanations." canonical="/dev-tools/regex-generator">
      <SEOHead title="AI Regex Generator" description="Generate regex patterns with AI" canonical="/dev-tools/regex-generator" schema={schema} />
      <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2"><FileSearch className="h-7 w-7 text-primary" /> AI Regex Generator</h1>
      <p className="text-muted-foreground mb-6">Describe your pattern in plain English and get a working regex.</p>
      <div className="space-y-4 mb-8">
        <Input placeholder="e.g. Match email addresses, validate phone numbers..." value={description} onChange={(e) => setDescription(e.target.value.slice(0, 500))} />
        <Button onClick={() => generate({ description })} disabled={isLoading || !description.trim()} className="w-full">{isLoading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Generating...</> : "Generate Regex"}</Button>
      </div>
      {result && (
        <div className="space-y-4">
          <Card className="border-primary/30 bg-primary/5"><CardContent className="pt-6"><h3 className="font-semibold text-foreground mb-2">Pattern</h3><code className="text-lg font-mono text-primary">/{result.pattern}/{result.flags}</code><Button variant="ghost" size="sm" className="ml-2" onClick={() => copyToClipboard(`/${result.pattern}/${result.flags}`)}><Copy className="h-3 w-3" /></Button></CardContent></Card>
          <Card><CardContent className="pt-6"><h3 className="font-semibold text-foreground mb-2">Explanation</h3><p className="text-sm text-muted-foreground">{result.explanation}</p></CardContent></Card>
          {result.testExamples?.length > 0 && <Card><CardContent className="pt-6"><h3 className="font-semibold text-foreground mb-2">Test Examples</h3>{result.testExamples.map((t, i) => <p key={i} className="text-sm text-muted-foreground">{t.matches ? "✅" : "❌"} <code className="font-mono text-xs">{t.input}</code></p>)}</CardContent></Card>}
        </div>
      )}
      <section className="mt-16 space-y-6"><h2 className="text-2xl font-bold text-foreground">AI Regex Generator</h2><p className="text-muted-foreground">No more struggling with regex syntax. Describe what you need and our AI creates, explains, and tests the pattern for you.</p></section>
    </AIToolLayout>
  );
};
export default AIRegexGenerator;
