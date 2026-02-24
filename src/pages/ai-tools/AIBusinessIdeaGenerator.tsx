import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAIToolGenerator } from "@/hooks/useAIToolGenerator";
import { Loader2, Copy } from "lucide-react";

interface Idea {
  name: string;
  description: string;
  revenueModel: string;
  targetAudience: string;
  riskLevel: string;
  estimatedStartupCost: string;
}

const AIBusinessIdeaGenerator = () => {
  const [industry, setIndustry] = useState("");
  const [budget, setBudget] = useState("Low");
  const [targetMarket, setTargetMarket] = useState("");
  const { result, isLoading, generate, copyToClipboard } = useAIToolGenerator<Idea[]>("business-idea-generator");

  const handleGenerate = () => {
    if (!industry.trim() || !targetMarket.trim()) return;
    generate({ industry: industry.trim(), budget, targetMarket: targetMarket.trim() });
  };

  return (
    <AIToolLayout title="Business Idea Generator" metaTitle="AI Business Idea Generator" metaDescription="Generate detailed startup ideas with AI. Get revenue models, risk levels, and startup costs." canonical="/ai-tools/business-idea-generator">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 text-center">AI Business Idea Generator</h1>
      <p className="text-muted-foreground text-center mb-8">Generate 5 detailed startup ideas with revenue models and risk analysis.</p>

      <div className="space-y-4 mb-8">
        <Input placeholder="Industry (e.g., Health Tech, E-commerce)" value={industry} onChange={(e) => setIndustry(e.target.value)} maxLength={100} />
        <Select value={budget} onValueChange={setBudget}>
          <SelectTrigger><SelectValue placeholder="Budget Level" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="Low">Low ($1K-$10K)</SelectItem>
            <SelectItem value="Medium">Medium ($10K-$50K)</SelectItem>
            <SelectItem value="High">High ($50K+)</SelectItem>
          </SelectContent>
        </Select>
        <Input placeholder="Target Market (e.g., Gen Z, Small Businesses)" value={targetMarket} onChange={(e) => setTargetMarket(e.target.value)} maxLength={100} />
        <Button onClick={handleGenerate} disabled={isLoading || !industry.trim() || !targetMarket.trim()} className="w-full">
          {isLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generating...</> : "Generate Ideas"}
        </Button>
      </div>

      {isLoading && <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-32 bg-muted/30 rounded-lg animate-pulse" />)}</div>}

      {result && !isLoading && (
        <div className="space-y-6">
          {result.map((idea, i) => (
            <div key={i} className="border border-border/50 rounded-lg p-5">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-display text-lg font-bold text-foreground">{idea.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${idea.riskLevel === "Low" ? "bg-green-500/10 text-green-500" : idea.riskLevel === "Medium" ? "bg-yellow-500/10 text-yellow-500" : "bg-red-500/10 text-red-500"}`}>{idea.riskLevel} Risk</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{idea.description}</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Revenue:</span> <span className="text-foreground">{idea.revenueModel}</span></div>
                <div><span className="text-muted-foreground">Audience:</span> <span className="text-foreground">{idea.targetAudience}</span></div>
                <div className="col-span-2"><span className="text-muted-foreground">Est. Cost:</span> <span className="text-foreground">{idea.estimatedStartupCost}</span></div>
              </div>
              <Button variant="ghost" size="sm" className="mt-3" onClick={() => copyToClipboard(`${idea.name}\n${idea.description}\nRevenue: ${idea.revenueModel}\nAudience: ${idea.targetAudience}\nRisk: ${idea.riskLevel}\nCost: ${idea.estimatedStartupCost}`)}>
                <Copy className="h-3 w-3 mr-1" /> Copy
              </Button>
            </div>
          ))}
        </div>
      )}
    </AIToolLayout>
  );
};

export default AIBusinessIdeaGenerator;
