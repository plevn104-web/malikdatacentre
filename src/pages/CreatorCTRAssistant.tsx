import { useState } from "react";
import { CreatorStudioLayout } from "@/components/creator-studio/CreatorStudioLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreatorStudioGenerator } from "@/hooks/useCreatorStudioGenerator";
import { Copy, Loader2 } from "lucide-react";

interface CTRResult {
  ctrTips: string[];
  emotionalWords: string[];
  curiosityTips: string[];
  improvedTitles: string[];
  improvedThumbnailTexts: string[];
}

const CreatorCTRAssistant = () => {
  const [title, setTitle] = useState("");
  const [thumbnailText, setThumbnailText] = useState("");
  const { result, isLoading, generate, copyToClipboard } = useCreatorStudioGenerator<CTRResult>("ctr-assistant");

  const handleGenerate = () => {
    if (!title.trim()) return;
    generate({ title: title.trim(), thumbnailText: thumbnailText.trim() });
  };

  return (
    <CreatorStudioLayout
      title="CTR Optimization Assistant"
      metaTitle="YouTube CTR Optimization Assistant – Improve Click-Through Rate"
      metaDescription="Get AI-powered suggestions to improve your YouTube click-through rate. Optimize titles and thumbnail text for maximum clicks. Free CTR improvement tool."
      canonical="/creator-studio/ctr-assistant"
      breadcrumbs={[{ label: "Creator Studio", href: "/creator-studio" }, { label: "CTR Assistant" }]}
      faqItems={[
        { question: "What is a good CTR on YouTube?", answer: "Average YouTube CTR is 2-10%. New channels often see 2-4%, while established channels typically achieve 5-10%. Videos that appear in search tend to have higher CTR than those in suggested or browse features." },
        { question: "How does thumbnail text affect CTR?", answer: "Thumbnail text should be 3-5 words maximum, using large bold fonts. It should complement (not repeat) your title, creating a 1-2 punch that makes viewers curious enough to click. Emotional and unexpected words perform best." },
        { question: "Can I test different thumbnails?", answer: "Yes! YouTube now offers A/B thumbnail testing for eligible channels. Create 2-3 thumbnail variations and let YouTube determine which gets the highest CTR. Use the improved suggestions from this tool as starting points." },
      ]}
      seoContent={
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">The Science of YouTube Click-Through Rate</h2>
          <p className="text-muted-foreground mb-4">Click-through rate is the percentage of people who see your video thumbnail and title in their feed and choose to click on it. Improving CTR is one of the fastest ways to grow on YouTube because it directly increases views from the same number of impressions. The CTR Assistant analyzes your title and thumbnail text to find specific improvements.</p>
          <h3 className="font-display text-xl font-bold text-foreground mb-3">The Title-Thumbnail Partnership</h3>
          <p className="text-muted-foreground mb-4">Your title and thumbnail work as a team — they should complement each other, not repeat the same information. The thumbnail captures attention with visual impact and short text, while the title provides context and keywords. Together, they create a curiosity gap that compels viewers to click. The best performers tell a mini-story between thumbnail and title.</p>
          <h3 className="font-display text-xl font-bold text-foreground mb-3">Emotional Triggers That Drive Clicks</h3>
          <p className="text-muted-foreground mb-4">Certain words trigger emotional responses that increase CTR. Words like "shocking," "secret," "mistake," "truth," and "finally" create urgency and curiosity. Numbers provide specificity ("7 Mistakes" beats "Common Mistakes"). Questions create open loops that viewers want to close. The key is authenticity — emotional hooks must be supported by genuine content delivery.</p>
          <h3 className="font-display text-xl font-bold text-foreground mb-3">Curiosity Gap Mastery</h3>
          <p className="text-muted-foreground mb-4">The curiosity gap is the space between what viewers know and what they want to know. Effective titles hint at valuable information without revealing it entirely. "I Tested X for 30 Days" works because viewers want to know the outcome. "The Real Reason X Happens" suggests insider knowledge. Create enough curiosity to drive clicks while avoiding misleading clickbait that damages retention.</p>
          <h3 className="font-display text-xl font-bold text-foreground mb-3">Continuous CTR Improvement</h3>
          <p className="text-muted-foreground mb-4">Monitor your CTR in YouTube Studio analytics. If a video's CTR drops below your channel average, consider updating the title or thumbnail. YouTube allows unlimited updates to these elements. Test different approaches systematically — change one element at a time so you know what works. Combine CTR optimization with our SEO Analyzer for a complete optimization workflow.</p>
        </div>
      }
    >
      <section className="py-8">
        <div className="container px-4 max-w-2xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">CTR Optimization Assistant</h1>
          <p className="text-muted-foreground text-center mb-8">Get AI-powered suggestions to improve your click-through rate.</p>

          <div className="space-y-4">
            <Input placeholder="Your video title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input placeholder="Thumbnail text (optional)" value={thumbnailText} onChange={(e) => setThumbnailText(e.target.value)} />
            <Button onClick={handleGenerate} disabled={isLoading || !title.trim()} className="w-full">
              {isLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Analyzing...</> : "Optimize CTR"}
            </Button>
          </div>

          {isLoading && <div className="mt-8 space-y-3">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-12 bg-muted/30 rounded-lg animate-pulse" />)}</div>}

          {result && !isLoading && (
            <div className="mt-8 space-y-8">
              {result.ctrTips?.length > 0 && (
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">CTR Improvement Tips</h3>
                  <div className="space-y-2">
                    {result.ctrTips.map((tip, i) => (
                      <div key={i} className="flex items-start gap-2 p-3 bg-muted/20 border border-border/30 rounded-lg">
                        <span className="text-primary mt-0.5">→</span>
                        <p className="text-sm text-foreground">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {result.emotionalWords?.length > 0 && (
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">Suggested Emotional Words</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.emotionalWords.map((word, i) => (
                      <button key={i} onClick={() => copyToClipboard(word)} className="px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-sm text-foreground cursor-pointer hover:bg-primary/20 transition-colors">{word}</button>
                    ))}
                  </div>
                </div>
              )}

              {result.curiosityTips?.length > 0 && (
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">Curiosity Enhancement</h3>
                  <div className="space-y-2">
                    {result.curiosityTips.map((tip, i) => (
                      <p key={i} className="text-sm text-muted-foreground flex items-start gap-2"><span className="text-primary">•</span> {tip}</p>
                    ))}
                  </div>
                </div>
              )}

              {result.improvedTitles?.length > 0 && (
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">Improved Title Suggestions</h3>
                  <div className="space-y-2">
                    {result.improvedTitles.map((t, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-muted/20 border border-border/30 rounded-lg group">
                        <span className="text-sm text-foreground flex-1 mr-2">{t}</span>
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(t)} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"><Copy className="h-4 w-4" /></Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {result.improvedThumbnailTexts?.length > 0 && (
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">Improved Thumbnail Text</h3>
                  <div className="space-y-2">
                    {result.improvedThumbnailTexts.map((t, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-muted/20 border border-border/30 rounded-lg group">
                        <span className="text-sm text-foreground font-semibold flex-1 mr-2">{t}</span>
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(t)} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"><Copy className="h-4 w-4" /></Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </CreatorStudioLayout>
  );
};

export default CreatorCTRAssistant;
