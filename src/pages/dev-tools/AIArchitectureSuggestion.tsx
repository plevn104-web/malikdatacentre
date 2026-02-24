import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { useAIToolGenerator } from "@/hooks/useAIToolGenerator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Copy, Layers } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

interface Result { techStack: { frontend: string; backend: string; database: string; hosting: string }; architecture: string; databaseDesign: string; scalabilityNotes: string[]; additionalTools: string[]; }

const AIArchitectureSuggestion = () => {
  const [idea, setIdea] = useState("");
  const { result, isLoading, generate, copyToClipboard } = useAIToolGenerator<Result>("architecture-suggestion");
  const schema = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "AI Architecture Suggestion Tool", applicationCategory: "DeveloperApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };

  return (
    <AIToolLayout title="AI Architecture Tool" metaTitle="AI Architecture Suggestion Tool" metaDescription="Describe your app idea and get a recommended tech stack, architecture, and database design." canonical="/dev-tools/architecture-suggestion">
      <SEOHead title="AI Architecture Suggestion Tool" description="Get architecture suggestions with AI" canonical="/dev-tools/architecture-suggestion" schema={schema} />
      <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2"><Layers className="h-7 w-7 text-primary" /> AI Architecture Suggestion Tool</h1>
      <p className="text-muted-foreground mb-6">Describe your app idea and get a complete architecture plan.</p>
      <div className="space-y-4 mb-8">
        <Textarea placeholder="Describe your app idea, expected users, features..." value={idea} onChange={(e) => setIdea(e.target.value.slice(0, 2000))} rows={4} />
        <Button onClick={() => generate({ idea })} disabled={isLoading || !idea.trim()} className="w-full">{isLoading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Analyzing...</> : "Get Architecture Suggestion"}</Button>
      </div>
      {result && (
        <div className="space-y-4">
          <Card className="border-primary/30"><CardContent className="pt-6"><h3 className="font-semibold text-foreground mb-3">Recommended Tech Stack</h3><div className="grid grid-cols-2 gap-3">{Object.entries(result.techStack || {}).map(([k, v]) => <div key={k} className="bg-muted/30 p-3 rounded-lg"><p className="text-xs text-muted-foreground capitalize">{k}</p><p className="text-sm font-medium text-foreground">{v}</p></div>)}</div></CardContent></Card>
          <Card><CardContent className="pt-6"><h3 className="font-semibold text-foreground mb-2">Architecture</h3><p className="text-sm text-muted-foreground whitespace-pre-wrap">{result.architecture}</p></CardContent></Card>
          <Card><CardContent className="pt-6"><h3 className="font-semibold text-foreground mb-2">Database Design</h3><p className="text-sm text-muted-foreground whitespace-pre-wrap">{result.databaseDesign}</p></CardContent></Card>
          {result.scalabilityNotes?.length > 0 && <Card><CardContent className="pt-6"><h3 className="font-semibold text-foreground mb-2">Scalability Notes</h3>{result.scalabilityNotes.map((n, i) => <p key={i} className="text-sm text-muted-foreground">📈 {n}</p>)}</CardContent></Card>}
          <Button variant="outline" onClick={() => copyToClipboard(JSON.stringify(result, null, 2))}><Copy className="h-3 w-3 mr-1" /> Copy All</Button>
        </div>
      )}
      <section className="mt-16 space-y-6"><h2 className="text-2xl font-bold text-foreground">Smart Architecture Planning</h2><p className="text-muted-foreground">Get expert-level architecture recommendations tailored to your app idea, including tech stack, database design, and scalability planning.</p></section>
    </AIToolLayout>
  );
};
export default AIArchitectureSuggestion;
