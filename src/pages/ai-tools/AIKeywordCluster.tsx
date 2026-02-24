import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAIToolGenerator } from "@/hooks/useAIToolGenerator";
import { Loader2, Copy } from "lucide-react";

interface ClusterResult { clusters: { clusterName: string; keywords: string[]; searchIntent: string }[] }

const AIKeywordCluster = () => {
  const [keyword, setKeyword] = useState("");
  const { result, isLoading, generate, copyToClipboard } = useAIToolGenerator<ClusterResult>("keyword-cluster");

  return (
    <AIToolLayout title="Keyword Cluster Generator" metaTitle="AI Keyword Cluster Generator" metaDescription="Generate organized keyword clusters with search intent analysis. Boost your SEO content strategy." canonical="/ai-tools/keyword-cluster">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 text-center">AI Keyword Cluster Generator</h1>
      <p className="text-muted-foreground text-center mb-8">Generate 5 keyword clusters with search intent analysis.</p>
      <div className="space-y-4 mb-8">
        <Input placeholder="Seed keyword (e.g., digital marketing)" value={keyword} onChange={(e) => setKeyword(e.target.value)} maxLength={100} />
        <Button onClick={() => keyword.trim() && generate({ keyword: keyword.trim() })} disabled={isLoading || !keyword.trim()} className="w-full">{isLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Clustering...</> : "Generate Clusters"}</Button>
      </div>
      {isLoading && <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-24 bg-muted/30 rounded-lg animate-pulse" />)}</div>}
      {result && !isLoading && (
        <div className="space-y-4">
          {result.clusters?.map((c, i) => (
            <div key={i} className="border border-border/50 rounded-lg p-5">
              <div className="flex items-center justify-between mb-2"><h3 className="font-semibold text-foreground">{c.clusterName}</h3><span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">{c.searchIntent}</span></div>
              <div className="flex flex-wrap gap-2">{c.keywords?.map((k, j) => <span key={j} className="px-2 py-1 bg-muted/50 rounded text-xs text-foreground">{k}</span>)}</div>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => copyToClipboard(result.clusters?.map(c => `${c.clusterName} (${c.searchIntent}):\n${c.keywords?.join(", ")}`).join("\n\n") || "")}><Copy className="h-3 w-3 mr-1" /> Copy All</Button>
        </div>
      )}
    </AIToolLayout>
  );
};

export default AIKeywordCluster;
