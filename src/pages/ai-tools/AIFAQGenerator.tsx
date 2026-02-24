import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAIToolGenerator } from "@/hooks/useAIToolGenerator";
import { Loader2, Copy } from "lucide-react";

interface FAQItem { question: string; answer: string }

const AIFAQGenerator = () => {
  const [topic, setTopic] = useState("");
  const { result, isLoading, generate, copyToClipboard } = useAIToolGenerator<FAQItem[]>("faq-generator");

  return (
    <AIToolLayout title="FAQ Generator" metaTitle="AI FAQ Generator" metaDescription="Generate comprehensive FAQ sections with AI for any topic. SEO-optimized Q&As." canonical="/ai-tools/faq-generator">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2 text-center">AI FAQ Generator</h1>
      <p className="text-muted-foreground text-center mb-8">Generate 10 comprehensive FAQ questions and answers.</p>
      <div className="space-y-4 mb-8">
        <Input placeholder="Topic or product" value={topic} onChange={(e) => setTopic(e.target.value)} maxLength={200} />
        <Button onClick={() => topic.trim() && generate({ topic: topic.trim() })} disabled={isLoading || !topic.trim()} className="w-full">{isLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generating...</> : "Generate FAQs"}</Button>
      </div>
      {isLoading && <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-20 bg-muted/30 rounded-lg animate-pulse" />)}</div>}
      {result && !isLoading && (
        <div className="space-y-3">
          {result.map((f, i) => (
            <div key={i} className="border border-border/50 rounded-lg p-4">
              <h3 className="font-medium text-foreground text-sm mb-1">Q: {f.question}</h3>
              <p className="text-sm text-muted-foreground">A: {f.answer}</p>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => copyToClipboard(result.map(f => `Q: ${f.question}\nA: ${f.answer}`).join("\n\n"))}><Copy className="h-3 w-3 mr-1" /> Copy All</Button>
        </div>
      )}
    </AIToolLayout>
  );
};

export default AIFAQGenerator;
