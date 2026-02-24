import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAIToolGenerator } from "@/hooks/useAIToolGenerator";
import { Loader2, Copy } from "lucide-react";

interface LPResult { headline: string; subheadline: string; heroText: string; features: { title: string; description: string }[]; testimonialPrompts: string[]; ctaText: string; urgencyText: string }

const AILandingPageCopy = () => {
  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("");
  const { result, isLoading, generate, copyToClipboard } = useAIToolGenerator<LPResult>("landing-page-copy");

  return (
    <AIToolLayout title="Landing Page Copy" metaTitle="AI Landing Page Copy Generator" metaDescription="Generate high-converting landing page copy with AI. Headlines, features, CTAs, and more." canonical="/ai-tools/landing-page-copy">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 text-center">AI Landing Page Copy Generator</h1>
      <p className="text-muted-foreground text-center mb-8">Generate complete landing page copy with headlines, features, and CTAs.</p>
      <div className="space-y-4 mb-8">
        <Input placeholder="Product or service" value={product} onChange={(e) => setProduct(e.target.value)} maxLength={200} />
        <Input placeholder="Target audience (optional)" value={audience} onChange={(e) => setAudience(e.target.value)} maxLength={100} />
        <Button onClick={() => product.trim() && generate({ product: product.trim(), audience: audience.trim() })} disabled={isLoading || !product.trim()} className="w-full">{isLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generating...</> : "Generate Copy"}</Button>
      </div>
      {isLoading && <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-20 bg-muted/30 rounded-lg animate-pulse" />)}</div>}
      {result && !isLoading && (
        <div className="space-y-5">
          <div className="border border-primary/30 bg-primary/5 rounded-lg p-5 text-center"><h2 className="font-display text-2xl font-bold text-foreground">{result.headline}</h2><p className="text-muted-foreground mt-2">{result.subheadline}</p></div>
          <div className="border border-border/50 rounded-lg p-5"><h3 className="font-semibold text-foreground mb-2">Hero Text</h3><p className="text-sm text-muted-foreground">{result.heroText}</p></div>
          <div className="border border-border/50 rounded-lg p-5"><h3 className="font-semibold text-foreground mb-3">Features</h3><div className="grid gap-3">{result.features?.map((f, i) => <div key={i}><h4 className="font-medium text-foreground text-sm">{f.title}</h4><p className="text-xs text-muted-foreground">{f.description}</p></div>)}</div></div>
          <div className="border border-border/50 rounded-lg p-5"><h3 className="font-semibold text-foreground mb-2">CTA</h3><p className="text-lg font-bold text-primary">{result.ctaText}</p><p className="text-sm text-muted-foreground mt-1">{result.urgencyText}</p></div>
          <Button variant="outline" size="sm" onClick={() => copyToClipboard(JSON.stringify(result, null, 2))}><Copy className="h-3 w-3 mr-1" /> Copy All</Button>
        </div>
      )}
    </AIToolLayout>
  );
};

export default AILandingPageCopy;
