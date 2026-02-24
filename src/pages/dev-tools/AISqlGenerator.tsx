import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { useAIToolGenerator } from "@/hooks/useAIToolGenerator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Copy, Database } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

interface Result { query: string; explanation: string; notes: string[]; }

const AISqlGenerator = () => {
  const [description, setDescription] = useState("");
  const { result, isLoading, generate, copyToClipboard } = useAIToolGenerator<Result>("sql-generator");
  const schema = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "AI SQL Query Generator", applicationCategory: "DeveloperApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };

  return (
    <AIToolLayout title="AI SQL Generator" metaTitle="AI SQL Query Generator" metaDescription="Describe what data you need and get a ready-to-use SQL query with explanations." canonical="/dev-tools/sql-generator">
      <SEOHead title="AI SQL Query Generator" description="Generate SQL queries with AI" canonical="/dev-tools/sql-generator" schema={schema} />
      <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2"><Database className="h-7 w-7 text-primary" /> AI SQL Query Generator</h1>
      <p className="text-muted-foreground mb-6">Describe what you need and get a SQL query.</p>
      <div className="space-y-4 mb-8">
        <Textarea placeholder="e.g. Get all users who signed up this month and made at least one purchase..." value={description} onChange={(e) => setDescription(e.target.value.slice(0, 1000))} rows={3} />
        <Button onClick={() => generate({ description })} disabled={isLoading || !description.trim()} className="w-full">{isLoading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Generating...</> : "Generate SQL"}</Button>
      </div>
      {result && (
        <div className="space-y-4">
          <Card className="border-primary/30"><CardContent className="pt-6"><pre className="text-sm font-mono bg-muted/30 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">{result.query}</pre><Button variant="ghost" size="sm" className="mt-2" onClick={() => copyToClipboard(result.query)}><Copy className="h-3 w-3 mr-1" /> Copy Query</Button></CardContent></Card>
          <Card><CardContent className="pt-6"><h3 className="font-semibold text-foreground mb-2">Explanation</h3><p className="text-sm text-muted-foreground">{result.explanation}</p></CardContent></Card>
          {result.notes?.length > 0 && <Card><CardContent className="pt-6"><h3 className="font-semibold text-foreground mb-2">Notes</h3>{result.notes.map((n, i) => <p key={i} className="text-sm text-muted-foreground">📝 {n}</p>)}</CardContent></Card>}
        </div>
      )}
      <section className="mt-16 space-y-6"><h2 className="text-2xl font-bold text-foreground">Natural Language to SQL</h2><p className="text-muted-foreground">Describe your data needs in plain English and get optimized SQL queries instantly.</p></section>
    </AIToolLayout>
  );
};
export default AISqlGenerator;
