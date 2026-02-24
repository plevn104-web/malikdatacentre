import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAIToolGenerator } from "@/hooks/useAIToolGenerator";
import { Loader2, Copy } from "lucide-react";

interface FlowResult { greeting: string; flows: { trigger: string; responses: string[]; followUp: string }[]; fallbackMessage: string; handoffMessage: string }

const AIChatbotBuilder = () => {
  const [purpose, setPurpose] = useState("");
  const [industry, setIndustry] = useState("");
  const { result, isLoading, generate, copyToClipboard } = useAIToolGenerator<FlowResult>("chatbot-flow");

  return (
    <AIToolLayout title="Chatbot Builder" metaTitle="AI Chatbot Flow Builder" metaDescription="Design chatbot conversation flows with AI. Get greeting, trigger-response flows, and fallback messages." canonical="/ai-tools/chatbot-builder">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 text-center">AI Chatbot Flow Builder</h1>
      <p className="text-muted-foreground text-center mb-8">Design chatbot conversation flows with triggers and responses.</p>
      <div className="space-y-4 mb-8">
        <Input placeholder="Chatbot purpose (e.g., Customer Support, Lead Generation)" value={purpose} onChange={(e) => setPurpose(e.target.value)} maxLength={200} />
        <Input placeholder="Industry (optional)" value={industry} onChange={(e) => setIndustry(e.target.value)} maxLength={100} />
        <Button onClick={() => purpose.trim() && generate({ purpose: purpose.trim(), industry: industry.trim() })} disabled={isLoading || !purpose.trim()} className="w-full">{isLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Building...</> : "Build Chatbot Flow"}</Button>
      </div>
      {isLoading && <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-24 bg-muted/30 rounded-lg animate-pulse" />)}</div>}
      {result && !isLoading && (
        <div className="space-y-5">
          <div className="border border-primary/30 bg-primary/5 rounded-lg p-5"><h3 className="font-semibold text-foreground mb-2">👋 Greeting</h3><p className="text-sm text-foreground">{result.greeting}</p></div>
          {result.flows?.map((f, i) => (
            <div key={i} className="border border-border/50 rounded-lg p-5">
              <h3 className="font-semibold text-foreground text-sm mb-2">Trigger: "{f.trigger}"</h3>
              <div className="space-y-1 mb-2">{f.responses?.map((r, j) => <p key={j} className="text-sm text-muted-foreground pl-3 border-l-2 border-primary/30">{r}</p>)}</div>
              <p className="text-xs text-primary">→ Follow up: {f.followUp}</p>
            </div>
          ))}
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-border/50 rounded-lg p-4"><h3 className="font-semibold text-foreground mb-1 text-sm">Fallback</h3><p className="text-xs text-muted-foreground">{result.fallbackMessage}</p></div>
            <div className="border border-border/50 rounded-lg p-4"><h3 className="font-semibold text-foreground mb-1 text-sm">Handoff</h3><p className="text-xs text-muted-foreground">{result.handoffMessage}</p></div>
          </div>
          <Button variant="outline" size="sm" onClick={() => copyToClipboard(JSON.stringify(result, null, 2))}><Copy className="h-3 w-3 mr-1" /> Copy Flow</Button>
        </div>
      )}
    </AIToolLayout>
  );
};

export default AIChatbotBuilder;
