import { useState } from "react";
import { CreatorStudioLayout } from "@/components/creator-studio/CreatorStudioLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreatorStudioGenerator } from "@/hooks/useCreatorStudioGenerator";
import { Copy, Loader2 } from "lucide-react";

interface CompetitorResult {
  titleStructure: string;
  hookStyle: string;
  mainKeywords: string[];
  improvementSuggestions: string[];
}

const CreatorCompetitorBreakdown = () => {
  const [title, setTitle] = useState("");
  const { result, isLoading, generate, copyToClipboard } = useCreatorStudioGenerator<CompetitorResult>("competitor-breakdown");

  const handleGenerate = () => {
    if (!title.trim()) return;
    generate({ title: title.trim() });
  };

  return (
    <CreatorStudioLayout
      title="Competitor Breakdown Tool"
      metaTitle="YouTube Competitor Breakdown – Analyze Rival Video Titles"
      metaDescription="Analyze competitor YouTube video titles for structure, hook style, keywords, and improvement opportunities. Free AI-powered competitor analysis tool."
      canonical="/creator-studio/competitor-breakdown"
      breadcrumbs={[{ label: "Creator Studio", href: "/creator-studio" }, { label: "Competitor Breakdown" }]}
      faqItems={[
        { question: "How does the competitor breakdown work?", answer: "Enter a competitor's video title and our AI analyzes the title structure, identifies the hook style used, extracts main keywords, and suggests specific ways you can create a better competing video." },
        { question: "Can I analyze any YouTube title?", answer: "Yes, paste any YouTube video title. The tool works best with complete, real titles from published videos. It analyzes the patterns and strategies used so you can learn and improve." },
        { question: "How should I use competitor insights?", answer: "Use the analysis to understand what works in your niche, then create original content that improves upon these patterns. Don't copy — instead, find gaps and angles your competitors missed." },
      ]}
      seoContent={
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Competitive Analysis for YouTube Creators</h2>
          <p className="text-muted-foreground mb-4">Understanding your competition is essential for YouTube growth. The Competitor Breakdown Tool helps you reverse-engineer successful videos in your niche, revealing the strategies behind high-performing titles. This intelligence lets you create content that competes effectively while maintaining your unique voice.</p>
          <h3 className="font-display text-xl font-bold text-foreground mb-3">Title Structure Analysis</h3>
          <p className="text-muted-foreground mb-4">Every successful YouTube title follows a structure — whether it's a numbered list, a how-to formula, a comparison, or a curiosity gap. By understanding which structures perform well in your niche, you can adopt proven patterns while adding your own twist. The tool identifies these patterns so you can apply them intentionally rather than guessing.</p>
          <h3 className="font-display text-xl font-bold text-foreground mb-3">Hook Style Detection</h3>
          <p className="text-muted-foreground mb-4">The hook is what makes viewers click. Different niches respond to different hook types — shock value, promises, questions, urgency, or exclusivity. Understanding which hooks your competitors use successfully helps you craft titles that resonate with the same audience while standing out in the feed.</p>
          <h3 className="font-display text-xl font-bold text-foreground mb-3">Finding Your Competitive Edge</h3>
          <p className="text-muted-foreground mb-4">The most valuable insight from competitor analysis isn't what they do well — it's what they miss. Every video leaves gaps: unanswered questions, outdated information, missing perspectives, or underserved sub-topics. The improvement suggestions highlight these opportunities so you can create content that fills the void and attracts viewers looking for more complete answers.</p>
          <h3 className="font-display text-xl font-bold text-foreground mb-3">Building a Competitive Strategy</h3>
          <p className="text-muted-foreground mb-4">Regular competitor analysis should be part of your content planning workflow. Analyze the top 5-10 videos for each keyword you're targeting. Look for patterns in their titles, descriptions, and thumbnail styles. Then use our other Creator Studio tools — the Script Builder for content, the CTR Assistant for thumbnails, and the Content Planner for scheduling — to execute a strategy that outperforms the competition consistently.</p>
        </div>
      }
    >
      <section className="py-8">
        <div className="container px-4 max-w-2xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Competitor Breakdown Tool</h1>
          <p className="text-muted-foreground text-center mb-8">Paste a competitor's video title to analyze structure, hook style, and find improvement opportunities.</p>

          <div className="space-y-4">
            <Input placeholder="Paste competitor video title" value={title} onChange={(e) => setTitle(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleGenerate()} />
            <Button onClick={handleGenerate} disabled={isLoading || !title.trim()} className="w-full">
              {isLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Analyzing...</> : "Analyze Competitor"}
            </Button>
          </div>

          {isLoading && <div className="mt-8 space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-16 bg-muted/30 rounded-lg animate-pulse" />)}</div>}

          {result && !isLoading && (
            <div className="mt-8 space-y-6">
              <div className="border border-border/50 rounded-lg p-5">
                <h3 className="font-display text-sm font-semibold text-muted-foreground mb-2">Title Structure</h3>
                <p className="text-foreground text-sm leading-relaxed">{result.titleStructure}</p>
              </div>

              <div className="border border-border/50 rounded-lg p-5">
                <h3 className="font-display text-sm font-semibold text-muted-foreground mb-2">Hook Style</h3>
                <p className="text-foreground text-sm leading-relaxed">{result.hookStyle}</p>
              </div>

              {result.mainKeywords?.length > 0 && (
                <div>
                  <h3 className="font-display text-sm font-semibold text-muted-foreground mb-3">Main Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.mainKeywords.map((kw, i) => (
                      <button key={i} onClick={() => copyToClipboard(kw)} className="px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-sm text-foreground cursor-pointer hover:bg-primary/20 transition-colors">{kw}</button>
                    ))}
                  </div>
                </div>
              )}

              {result.improvementSuggestions?.length > 0 && (
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">Improvement Suggestions</h3>
                  <div className="space-y-2">
                    {result.improvementSuggestions.map((tip, i) => (
                      <div key={i} className="flex items-start gap-2 p-3 bg-muted/20 border border-border/30 rounded-lg">
                        <span className="text-primary mt-0.5 text-sm">→</span>
                        <p className="text-sm text-foreground">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <Button variant="outline" size="sm" onClick={() => copyToClipboard(JSON.stringify(result, null, 2))}>
                  <Copy className="h-4 w-4 mr-1" /> Copy Analysis
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </CreatorStudioLayout>
  );
};

export default CreatorCompetitorBreakdown;
