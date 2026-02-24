import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAIToolGenerator } from "@/hooks/useAIToolGenerator";
import { Loader2, Copy } from "lucide-react";

interface MarketResult { overview: string; trends: string[]; growthPotential: string; targetDemographics: string[]; keyChallenges: string[]; monetizationInsights: string[] }

const AIMarketResearch = () => {
  const [topic, setTopic] = useState("");
  const [region, setRegion] = useState("");
  const { result, isLoading, generate, copyToClipboard } = useAIToolGenerator<MarketResult>("market-research");

  return (
    <AIToolLayout title="Market Research" metaTitle="AI Market Research Tool" metaDescription="Get AI-powered market research summaries with trends, demographics, and monetization insights." canonical="/ai-tools/market-research">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 text-center">AI Market Research Summary</h1>
      <p className="text-muted-foreground text-center mb-8">Get instant market analysis with trends, demographics, and growth potential.</p>
      <div className="space-y-4 mb-8">
        <Input placeholder="Topic (e.g., AI SaaS, Sustainable Fashion)" value={topic} onChange={(e) => setTopic(e.target.value)} maxLength={100} />
        <Input placeholder="Region (optional, e.g., South Asia, North America)" value={region} onChange={(e) => setRegion(e.target.value)} maxLength={100} />
        <Button onClick={() => topic.trim() && generate({ topic: topic.trim(), region: region.trim() })} disabled={isLoading || !topic.trim()} className="w-full">
          {isLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Analyzing...</> : "Generate Research"}
        </Button>
      </div>
      {isLoading && <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-20 bg-muted/30 rounded-lg animate-pulse" />)}</div>}
      {result && !isLoading && (
        <div className="space-y-5">
          <div className="border border-border/50 rounded-lg p-5"><h3 className="font-semibold text-foreground mb-2">Overview</h3><p className="text-sm text-muted-foreground">{result.overview}</p></div>
          <div className="border border-border/50 rounded-lg p-5"><h3 className="font-semibold text-foreground mb-2">Market Trends</h3><ul className="space-y-1">{result.trends?.map((t, i) => <li key={i} className="text-sm text-muted-foreground">📈 {t}</li>)}</ul></div>
          <div className="border border-primary/30 bg-primary/5 rounded-lg p-5"><h3 className="font-semibold text-foreground mb-2">Growth Potential</h3><p className="text-sm text-foreground">{result.growthPotential}</p></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-border/50 rounded-lg p-4"><h3 className="font-semibold text-foreground mb-2 text-sm">Demographics</h3><ul className="space-y-1">{result.targetDemographics?.map((d, i) => <li key={i} className="text-xs text-muted-foreground">• {d}</li>)}</ul></div>
            <div className="border border-border/50 rounded-lg p-4"><h3 className="font-semibold text-foreground mb-2 text-sm">Challenges</h3><ul className="space-y-1">{result.keyChallenges?.map((c, i) => <li key={i} className="text-xs text-muted-foreground">• {c}</li>)}</ul></div>
          </div>
          <div className="border border-border/50 rounded-lg p-5"><h3 className="font-semibold text-foreground mb-2">Monetization Insights</h3><ul className="space-y-1">{result.monetizationInsights?.map((m, i) => <li key={i} className="text-sm text-muted-foreground">💡 {m}</li>)}</ul></div>
          <Button variant="outline" size="sm" onClick={() => copyToClipboard(JSON.stringify(result, null, 2))}><Copy className="h-3 w-3 mr-1" /> Copy All</Button>
        </div>
      )}
    </AIToolLayout>
  );
};

export default AIMarketResearch;
