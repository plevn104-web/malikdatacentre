import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAIToolGenerator } from "@/hooks/useAIToolGenerator";
import { Loader2, Copy } from "lucide-react";

interface FunnelResult { stages: { name: string; goal: string; content: string; channels: string[]; metrics: string[] }[] }

const AISalesFunnel = () => {
  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("");
  const { result, isLoading, generate, copyToClipboard } = useAIToolGenerator<FunnelResult>("sales-funnel");

  return (
    <AIToolLayout title="Sales Funnel Planner" metaTitle="AI Sales Funnel Planner" metaDescription="Plan your entire sales funnel with AI. Get stages, content ideas, channels, and KPIs." canonical="/ai-tools/sales-funnel">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 text-center">AI Sales Funnel Planner</h1>
      <p className="text-muted-foreground text-center mb-8">Generate a complete sales funnel with content and metrics for each stage.</p>
      <div className="space-y-4 mb-8">
        <Input placeholder="Product or service" value={product} onChange={(e) => setProduct(e.target.value)} maxLength={200} />
        <Input placeholder="Target audience" value={audience} onChange={(e) => setAudience(e.target.value)} maxLength={100} />
        <Button onClick={() => product.trim() && generate({ product: product.trim(), audience: audience.trim() })} disabled={isLoading || !product.trim()} className="w-full">{isLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Planning...</> : "Plan Funnel"}</Button>
      </div>
      {isLoading && <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-28 bg-muted/30 rounded-lg animate-pulse" />)}</div>}
      {result && !isLoading && (
        <div className="space-y-4">
          {result.stages?.map((s, i) => (
            <div key={i} className="border border-border/50 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-2"><span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">Stage {i + 1}</span><h3 className="font-semibold text-foreground">{s.name}</h3></div>
              <p className="text-sm text-muted-foreground mb-2"><strong>Goal:</strong> {s.goal}</p>
              <p className="text-sm text-muted-foreground mb-2">{s.content}</p>
              <div className="flex flex-wrap gap-1 mb-1">{s.channels?.map((c, j) => <span key={j} className="text-xs px-2 py-0.5 bg-muted rounded">{c}</span>)}</div>
              <div className="flex flex-wrap gap-1">{s.metrics?.map((m, j) => <span key={j} className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded">{m}</span>)}</div>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => copyToClipboard(result.stages?.map(s => `## ${s.name}\nGoal: ${s.goal}\n${s.content}\nChannels: ${s.channels?.join(", ")}\nMetrics: ${s.metrics?.join(", ")}`).join("\n\n") || "")}><Copy className="h-3 w-3 mr-1" /> Copy All</Button>
        </div>
      )}
    </AIToolLayout>
  );
};

export default AISalesFunnel;
