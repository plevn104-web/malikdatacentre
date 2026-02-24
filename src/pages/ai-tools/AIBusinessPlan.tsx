import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAIToolGenerator } from "@/hooks/useAIToolGenerator";
import { Loader2, Copy } from "lucide-react";

interface BPResult { executiveSummary: string; marketAnalysis: string; marketingStrategy: string; operationsPlan: string; financialOverview: string }

const AIBusinessPlan = () => {
  const [idea, setIdea] = useState("");
  const [market, setMarket] = useState("");
  const [revenue, setRevenue] = useState("");
  const { result, isLoading, generate, copyToClipboard } = useAIToolGenerator<BPResult>("business-plan");

  return (
    <AIToolLayout title="Business Plan Generator" metaTitle="AI Business Plan Generator" metaDescription="Generate structured business plans with AI including executive summary, market analysis, and financial overview." canonical="/ai-tools/business-plan">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 text-center">AI Business Plan Generator</h1>
      <p className="text-muted-foreground text-center mb-8">Generate a structured business plan with market analysis and financial overview.</p>
      <div className="space-y-4 mb-8">
        <Input placeholder="Business idea" value={idea} onChange={(e) => setIdea(e.target.value)} maxLength={200} />
        <Input placeholder="Target market" value={market} onChange={(e) => setMarket(e.target.value)} maxLength={100} />
        <Input placeholder="Revenue model (e.g., Subscription, Marketplace)" value={revenue} onChange={(e) => setRevenue(e.target.value)} maxLength={100} />
        <Button onClick={() => idea.trim() && generate({ businessIdea: idea.trim(), targetMarket: market.trim() || "general", revenueModel: revenue.trim() || "subscription" })} disabled={isLoading || !idea.trim()} className="w-full">
          {isLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generating...</> : "Generate Business Plan"}
        </Button>
      </div>
      {isLoading && <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-28 bg-muted/30 rounded-lg animate-pulse" />)}</div>}
      {result && !isLoading && (
        <div className="space-y-5">
          {([["Executive Summary", result.executiveSummary], ["Market Analysis", result.marketAnalysis], ["Marketing Strategy", result.marketingStrategy], ["Operations Plan", result.operationsPlan], ["Financial Overview", result.financialOverview]] as const).map(([title, content]) => (
            <div key={title} className="border border-border/50 rounded-lg p-5">
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{content}</p>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => copyToClipboard(Object.entries(result).map(([k, v]) => `## ${k}\n${v}`).join("\n\n"))}><Copy className="h-3 w-3 mr-1" /> Copy All</Button>
        </div>
      )}
    </AIToolLayout>
  );
};

export default AIBusinessPlan;
