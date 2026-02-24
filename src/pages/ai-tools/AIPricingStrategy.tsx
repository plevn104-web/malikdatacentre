import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAIToolGenerator } from "@/hooks/useAIToolGenerator";
import { Loader2, Copy } from "lucide-react";

interface PricingResult {
  pricingModels: { model: string; description: string; pros: string; cons: string }[];
  competitiveAnalysis: string;
  psychologicalPricing: string[];
  tieredPricing: { basic: { price: string; features: string[] }; pro: { price: string; features: string[] }; enterprise: { price: string; features: string[] } };
}

const AIPricingStrategy = () => {
  const [productType, setProductType] = useState("");
  const [marketLevel, setMarketLevel] = useState("");
  const [targetCustomer, setTargetCustomer] = useState("");
  const { result, isLoading, generate, copyToClipboard } = useAIToolGenerator<PricingResult>("pricing-strategy");

  const handleGenerate = () => {
    if (!productType.trim()) return;
    generate({ productType: productType.trim(), marketLevel: marketLevel.trim() || "mid-range", targetCustomer: targetCustomer.trim() || "general consumers" });
  };

  return (
    <AIToolLayout title="Pricing Strategy" metaTitle="AI Pricing Strategy Generator" metaDescription="Generate smart pricing strategies with AI. Get competitive analysis, psychological pricing tips, and tiered pricing models." canonical="/ai-tools/pricing-strategy">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 text-center">AI Pricing Strategy Generator</h1>
      <p className="text-muted-foreground text-center mb-8">Get AI-powered pricing models, competitive analysis, and tiered pricing suggestions.</p>

      <div className="space-y-4 mb-8">
        <Input placeholder="Product type (e.g., SaaS, Physical Product)" value={productType} onChange={(e) => setProductType(e.target.value)} maxLength={100} />
        <Input placeholder="Market level (e.g., Premium, Budget)" value={marketLevel} onChange={(e) => setMarketLevel(e.target.value)} maxLength={100} />
        <Input placeholder="Target customer (e.g., SMBs, Enterprise)" value={targetCustomer} onChange={(e) => setTargetCustomer(e.target.value)} maxLength={100} />
        <Button onClick={handleGenerate} disabled={isLoading || !productType.trim()} className="w-full">
          {isLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generating...</> : "Generate Strategy"}
        </Button>
      </div>

      {isLoading && <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-24 bg-muted/30 rounded-lg animate-pulse" />)}</div>}

      {result && !isLoading && (
        <div className="space-y-6">
          <div className="border border-border/50 rounded-lg p-5">
            <h3 className="font-display text-lg font-semibold text-foreground mb-3">Pricing Models</h3>
            {result.pricingModels?.map((m, i) => (
              <div key={i} className="mb-4 last:mb-0">
                <h4 className="font-medium text-foreground">{m.model}</h4>
                <p className="text-sm text-muted-foreground">{m.description}</p>
                <div className="flex gap-4 text-xs mt-1"><span className="text-green-500">✓ {m.pros}</span><span className="text-red-400">✗ {m.cons}</span></div>
              </div>
            ))}
          </div>

          <div className="border border-border/50 rounded-lg p-5">
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">Competitive Analysis</h3>
            <p className="text-sm text-muted-foreground">{result.competitiveAnalysis}</p>
          </div>

          <div className="border border-border/50 rounded-lg p-5">
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">Psychological Pricing Tips</h3>
            <ul className="space-y-1">{result.psychologicalPricing?.map((t, i) => <li key={i} className="text-sm text-muted-foreground">• {t}</li>)}</ul>
          </div>

          {result.tieredPricing && (
            <div className="grid grid-cols-3 gap-3">
              {(["basic", "pro", "enterprise"] as const).map((tier) => (
                <div key={tier} className={`border rounded-lg p-4 ${tier === "pro" ? "border-primary/30 bg-primary/5" : "border-border/50"}`}>
                  <h4 className="font-semibold text-foreground capitalize mb-1">{tier}</h4>
                  <p className="text-primary font-bold text-lg mb-2">{result.tieredPricing[tier]?.price}</p>
                  <ul className="space-y-1">{result.tieredPricing[tier]?.features?.map((f, i) => <li key={i} className="text-xs text-muted-foreground">• {f}</li>)}</ul>
                </div>
              ))}
            </div>
          )}

          <Button variant="outline" size="sm" onClick={() => copyToClipboard(JSON.stringify(result, null, 2))}><Copy className="h-3 w-3 mr-1" /> Copy All</Button>
        </div>
      )}
    </AIToolLayout>
  );
};

export default AIPricingStrategy;
