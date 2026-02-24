import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useAIToolGenerator } from "@/hooks/useAIToolGenerator";
import { Loader2, Copy } from "lucide-react";

interface ProposalResult { subject: string; introduction: string; approach: string; timeline: string; pricing: string; whyMe: string; closing: string }

const AIProposalGenerator = () => {
  const [desc, setDesc] = useState("");
  const [budget, setBudget] = useState("");
  const { result, isLoading, generate, copyToClipboard } = useAIToolGenerator<ProposalResult>("proposal-generator");

  return (
    <AIToolLayout title="Proposal Generator" metaTitle="AI Freelance Proposal Generator" metaDescription="Generate winning freelance proposals with AI. Professional structure with approach, timeline, and pricing." canonical="/ai-tools/proposal-generator">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 text-center">AI Proposal Generator</h1>
      <p className="text-muted-foreground text-center mb-8">Generate professional freelance proposals instantly.</p>
      <div className="space-y-4 mb-8">
        <Textarea placeholder="Describe the project..." value={desc} onChange={(e) => setDesc(e.target.value)} rows={4} maxLength={1000} />
        <Input placeholder="Budget (optional)" value={budget} onChange={(e) => setBudget(e.target.value)} maxLength={50} />
        <Button onClick={() => desc.trim() && generate({ projectDescription: desc.trim(), budget: budget.trim() })} disabled={isLoading || !desc.trim()} className="w-full">{isLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generating...</> : "Generate Proposal"}</Button>
      </div>
      {isLoading && <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-20 bg-muted/30 rounded-lg animate-pulse" />)}</div>}
      {result && !isLoading && (
        <div className="space-y-4">
          <h2 className="font-display text-xl font-bold text-foreground">{result.subject}</h2>
          {([["Introduction", result.introduction], ["Approach", result.approach], ["Timeline", result.timeline], ["Pricing", result.pricing], ["Why Me", result.whyMe], ["Closing", result.closing]] as const).map(([t, c]) => (
            <div key={t} className="border border-border/50 rounded-lg p-5"><h3 className="font-semibold text-foreground mb-2 text-sm">{t}</h3><p className="text-sm text-muted-foreground whitespace-pre-wrap">{c}</p></div>
          ))}
          <Button variant="outline" size="sm" onClick={() => copyToClipboard(`Subject: ${result.subject}\n\n${Object.entries(result).filter(([k]) => k !== "subject").map(([k, v]) => `## ${k}\n${v}`).join("\n\n")}`)}><Copy className="h-3 w-3 mr-1" /> Copy All</Button>
        </div>
      )}
    </AIToolLayout>
  );
};

export default AIProposalGenerator;
