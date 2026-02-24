import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAIToolGenerator } from "@/hooks/useAIToolGenerator";
import { Loader2, Copy } from "lucide-react";

interface DescResult { description: string; tone: string; wordCount: number }

const AIProductDescription = () => {
  const [product, setProduct] = useState("");
  const [features, setFeatures] = useState("");
  const { result, isLoading, generate, copyToClipboard } = useAIToolGenerator<DescResult[]>("product-description");

  return (
    <AIToolLayout title="Product Description" metaTitle="AI Product Description Generator" metaDescription="Generate compelling product descriptions in multiple tones with AI." canonical="/ai-tools/product-description">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 text-center">AI Product Description Generator</h1>
      <p className="text-muted-foreground text-center mb-8">Generate 3 product descriptions in different tones.</p>
      <div className="space-y-4 mb-8">
        <Input placeholder="Product name" value={product} onChange={(e) => setProduct(e.target.value)} maxLength={200} />
        <Input placeholder="Key features (comma separated)" value={features} onChange={(e) => setFeatures(e.target.value)} maxLength={300} />
        <Button onClick={() => product.trim() && generate({ product: product.trim(), features: features.trim() })} disabled={isLoading || !product.trim()} className="w-full">{isLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generating...</> : "Generate Descriptions"}</Button>
      </div>
      {isLoading && <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-28 bg-muted/30 rounded-lg animate-pulse" />)}</div>}
      {result && !isLoading && (
        <div className="space-y-4">
          {result.map((d, i) => (
            <div key={i} className="border border-border/50 rounded-lg p-5">
              <div className="flex items-center justify-between mb-2"><span className="text-xs text-primary font-medium">{d.tone}</span><span className="text-xs text-muted-foreground">{d.wordCount} words</span></div>
              <p className="text-sm text-foreground">{d.description}</p>
              <Button variant="ghost" size="sm" className="mt-2" onClick={() => copyToClipboard(d.description)}><Copy className="h-3 w-3 mr-1" /> Copy</Button>
            </div>
          ))}
        </div>
      )}
    </AIToolLayout>
  );
};

export default AIProductDescription;
