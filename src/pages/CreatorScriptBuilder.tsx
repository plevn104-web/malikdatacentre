import { useState } from "react";
import { CreatorStudioLayout } from "@/components/creator-studio/CreatorStudioLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreatorStudioGenerator } from "@/hooks/useCreatorStudioGenerator";
import { Copy, Loader2 } from "lucide-react";

interface ScriptResult {
  hook: string;
  introduction: string;
  sections: { title: string; content: string }[];
  cta: string;
}

const CreatorScriptBuilder = () => {
  const [topic, setTopic] = useState("");
  const [goal, setGoal] = useState("");
  const { result, isLoading, generate, copyToClipboard } = useCreatorStudioGenerator<ScriptResult>("script-builder");

  const handleGenerate = () => {
    if (!topic.trim()) return;
    generate({ topic: topic.trim(), goal: goal.trim() });
  };

  const copyFullScript = () => {
    if (!result) return;
    const full = [
      `[HOOK]\n${result.hook}`,
      `\n[INTRODUCTION]\n${result.introduction}`,
      ...(result.sections?.map((s) => `\n[${s.title.toUpperCase()}]\n${s.content}`) || []),
      `\n[CTA]\n${result.cta}`,
    ].join("\n");
    copyToClipboard(full);
  };

  return (
    <CreatorStudioLayout
      title="AI Script Builder"
      metaTitle="YouTube AI Script Builder – Generate Video Scripts"
      metaDescription="Generate structured YouTube video scripts with AI. Get hooks, talking points, and CTAs for any topic. Free AI-powered script writing tool for creators."
      canonical="/creator-studio/script-builder"
      breadcrumbs={[{ label: "Creator Studio", href: "/creator-studio" }, { label: "AI Script Builder" }]}
      faqItems={[
        { question: "How detailed are the generated scripts?", answer: "The AI generates a complete script structure including a hook for the first 15 seconds, an introduction, 3-5 main content sections with talking points, and a CTA ending. You can use it as-is or as a detailed outline to build upon." },
        { question: "Can I customize the script for my style?", answer: "Yes! The generated script is a starting point. Add your personality, examples, and stories to make it uniquely yours. The structure ensures you cover key points while the content provides a solid foundation to personalize." },
        { question: "What makes a good video hook?", answer: "A great hook captures attention in the first 5-10 seconds. It should create curiosity, state a bold claim, ask a provocative question, or promise specific value. The AI crafts hooks designed to stop the scroll and keep viewers watching." },
      ]}
      seoContent={
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">The Art of YouTube Scriptwriting</h2>
          <p className="text-muted-foreground mb-4">Great YouTube videos start with great scripts. Even creators who appear to speak naturally usually work from detailed outlines or scripts. The AI Script Builder helps you structure your content for maximum engagement, ensuring you deliver value while keeping viewers watching until the end.</p>
          <h3 className="font-display text-xl font-bold text-foreground mb-3">The Perfect Hook</h3>
          <p className="text-muted-foreground mb-4">You have 8-10 seconds to convince a viewer to keep watching. Your hook should immediately address why the viewer should care, preview the value they'll receive, or create a curiosity gap they need to resolve. Avoid generic intros — jump straight into the most compelling aspect of your topic.</p>
          <h3 className="font-display text-xl font-bold text-foreground mb-3">Content Structure</h3>
          <p className="text-muted-foreground mb-4">Well-structured videos have higher retention rates. Break your content into clear sections with transitions that build upon each other. Each section should deliver on a specific promise and lead naturally to the next. Use the generated section titles as chapter markers in your video for improved navigation and SEO.</p>
          <h3 className="font-display text-xl font-bold text-foreground mb-3">The Power of CTAs</h3>
          <p className="text-muted-foreground mb-4">Your call-to-action determines what viewers do after watching. Effective CTAs are specific ("Comment your biggest challenge below"), valuable ("Download the free template in the description"), and positioned naturally within the content flow. Place micro-CTAs throughout the video and a strong final CTA at the end for maximum conversion.</p>
          <h3 className="font-display text-xl font-bold text-foreground mb-3">From Script to Performance</h3>
          <p className="text-muted-foreground mb-4">A script is a tool, not a teleprompter. Use it to ensure you cover all key points while speaking naturally. Practice reading through the script several times, then deliver it in your own words with the script as reference. This approach combines the structure of scripted content with the authenticity of natural speech that YouTube audiences prefer.</p>
        </div>
      }
    >
      <section className="py-8">
        <div className="container px-4 max-w-2xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">AI Script Builder</h1>
          <p className="text-muted-foreground text-center mb-8">Generate structured video scripts with hooks, talking points, and CTAs.</p>

          <div className="space-y-4">
            <Input placeholder="Video topic (e.g., 'How to start a YouTube channel')" value={topic} onChange={(e) => setTopic(e.target.value)} />
            <Input placeholder="Video goal (optional, e.g., 'drive course signups')" value={goal} onChange={(e) => setGoal(e.target.value)} />
            <Button onClick={handleGenerate} disabled={isLoading || !topic.trim()} className="w-full">
              {isLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Building Script...</> : "Generate Script"}
            </Button>
          </div>

          {isLoading && <div className="mt-8 space-y-3">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-20 bg-muted/30 rounded-lg animate-pulse" />)}</div>}

          {result && !isLoading && (
            <div className="mt-8 space-y-6">
              <div className="flex justify-end">
                <Button variant="outline" size="sm" onClick={copyFullScript}><Copy className="h-4 w-4 mr-1" /> Copy Full Script</Button>
              </div>

              <div className="border border-primary/30 bg-primary/5 rounded-lg p-5">
                <h3 className="font-display text-sm font-semibold text-primary mb-2">🎬 HOOK</h3>
                <p className="text-foreground text-sm leading-relaxed">{result.hook}</p>
              </div>

              <div className="border border-border/50 rounded-lg p-5">
                <h3 className="font-display text-sm font-semibold text-muted-foreground mb-2">INTRODUCTION</h3>
                <p className="text-foreground text-sm leading-relaxed">{result.introduction}</p>
              </div>

              {result.sections?.map((section, i) => (
                <div key={i} className="border border-border/50 rounded-lg p-5">
                  <h3 className="font-display text-sm font-semibold text-foreground mb-2">{section.title}</h3>
                  <p className="text-foreground text-sm leading-relaxed whitespace-pre-wrap">{section.content}</p>
                </div>
              ))}

              <div className="border border-primary/30 bg-primary/5 rounded-lg p-5">
                <h3 className="font-display text-sm font-semibold text-primary mb-2">📢 CALL TO ACTION</h3>
                <p className="text-foreground text-sm leading-relaxed">{result.cta}</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </CreatorStudioLayout>
  );
};

export default CreatorScriptBuilder;
