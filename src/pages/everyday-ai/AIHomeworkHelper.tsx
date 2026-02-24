import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { useAIToolGenerator } from "@/hooks/useAIToolGenerator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Copy, BookOpen } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

interface Result {
  stepByStep: { step: number; explanation: string }[];
  summary: string;
  concept: string;
}

const AIHomeworkHelper = () => {
  const [question, setQuestion] = useState("");
  const [subject, setSubject] = useState("");
  const { result, isLoading, generate, copyToClipboard } = useAIToolGenerator<Result>("homework-helper");

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AI Homework Helper",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <AIToolLayout title="AI Homework Helper" metaTitle="AI Homework Helper — Step-by-Step Solutions" metaDescription="Get step-by-step homework solutions with AI. Understand concepts clearly in simple language." canonical="/everyday-ai/homework-helper">
      <SEOHead title="AI Homework Helper" description="Get step-by-step homework help" canonical="/everyday-ai/homework-helper" schema={schema} />
      <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2"><BookOpen className="h-7 w-7 text-primary" /> AI Homework Helper</h1>
      <p className="text-muted-foreground mb-6">Paste your question and get a clear, step-by-step explanation.</p>

      <div className="space-y-4 mb-8">
        <Textarea placeholder="Enter your question or problem..." value={question} onChange={(e) => setQuestion(e.target.value.slice(0, 3000))} rows={4} />
        <Input placeholder="Subject (optional, e.g. Math, Science)" value={subject} onChange={(e) => setSubject(e.target.value.slice(0, 100))} />
        <Button onClick={() => generate({ question, subject })} disabled={isLoading || !question.trim()} className="w-full">
          {isLoading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Solving...</> : "Get Solution"}
        </Button>
      </div>

      {result && (
        <div className="space-y-4">
          <Card><CardContent className="pt-6">
            <h3 className="font-semibold text-foreground mb-2">Summary</h3>
            <p className="text-muted-foreground">{result.summary}</p>
            <Button variant="ghost" size="sm" className="mt-2" onClick={() => copyToClipboard(result.summary)}><Copy className="h-3 w-3 mr-1" /> Copy</Button>
          </CardContent></Card>
          <Card><CardContent className="pt-6">
            <h3 className="font-semibold text-foreground mb-3">Step-by-Step Solution</h3>
            <div className="space-y-3">
              {result.stepByStep.map((s) => (
                <div key={s.step} className="flex gap-3">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">{s.step}</span>
                  <p className="text-sm text-muted-foreground">{s.explanation}</p>
                </div>
              ))}
            </div>
          </CardContent></Card>
          <Card><CardContent className="pt-6">
            <h3 className="font-semibold text-foreground mb-2">Underlying Concept</h3>
            <p className="text-sm text-muted-foreground">{result.concept}</p>
          </CardContent></Card>
        </div>
      )}

      <section className="mt-16 space-y-6">
        <h2 className="text-2xl font-bold text-foreground">How AI Homework Helper Works</h2>
        <p className="text-muted-foreground">Our AI-powered homework helper breaks down any question into clear, understandable steps. Whether it's math, science, history, or language — get instant, student-friendly explanations.</p>
        <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions</h2>
        <details className="border border-border rounded-lg p-4"><summary className="font-medium cursor-pointer">Is this free?</summary><p className="mt-2 text-sm text-muted-foreground">Yes, free users get 10 AI runs per month. Upgrade for more.</p></details>
        <details className="border border-border rounded-lg p-4"><summary className="font-medium cursor-pointer">What subjects are supported?</summary><p className="mt-2 text-sm text-muted-foreground">All subjects — Math, Science, English, History, Computer Science, and more.</p></details>
        <details className="border border-border rounded-lg p-4"><summary className="font-medium cursor-pointer">Is the AI accurate?</summary><p className="mt-2 text-sm text-muted-foreground">The AI provides detailed explanations but always verify important answers with your textbook or teacher.</p></details>
      </section>
    </AIToolLayout>
  );
};

export default AIHomeworkHelper;
