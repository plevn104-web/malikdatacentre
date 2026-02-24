import { useState } from "react";
import { CreatorStudioLayout } from "@/components/creator-studio/CreatorStudioLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreatorStudioGenerator } from "@/hooks/useCreatorStudioGenerator";
import { generateContentPlanLocally } from "@/lib/youtubeToolLogic";
import { Copy, Loader2, Zap, Sparkles } from "lucide-react";

interface PlannerResult {
  weeks: {
    weekNumber: number;
    theme: string;
    videos: { day: string; title: string; notes: string }[];
  }[];
}

const CreatorContentPlanner = () => {
  const [niche, setNiche] = useState("");
  const [frequency, setFrequency] = useState("3");
  const [goal, setGoal] = useState("");
  const [localResult, setLocalResult] = useState<PlannerResult | null>(null);
  const { result: aiResult, isLoading, generate, copyToClipboard } = useCreatorStudioGenerator<PlannerResult>("content-planner");

  const result = aiResult || localResult;

  const handleGenerateLocal = () => {
    if (!niche.trim()) return;
    setLocalResult(generateContentPlanLocally(niche.trim(), parseInt(frequency) || 3));
  };

  const handleGenerateAI = () => {
    if (!niche.trim()) return;
    generate({ niche: niche.trim(), frequency: `${frequency} times per week`, goal: goal.trim() });
  };

  const copyFullPlan = () => {
    if (!result?.weeks) return;
    const text = result.weeks.map((w) =>
      `WEEK ${w.weekNumber}: ${w.theme}\n${w.videos.map((v) => `  ${v.day}: ${v.title}\n    Notes: ${v.notes}`).join("\n")}`
    ).join("\n\n");
    copyToClipboard(text);
  };

  return (
    <CreatorStudioLayout
      title="30-Day Content Strategy Planner"
      metaTitle="30-Day YouTube Content Planner – AI Strategy Generator"
      metaDescription="Generate a personalized 30-day YouTube content strategy with weekly themes, video titles, and publishing plans. Free AI-powered content planning tool."
      canonical="/creator-studio/content-planner"
      breadcrumbs={[{ label: "Creator Studio", href: "/creator-studio" }, { label: "30-Day Planner" }]}
      faqItems={[
        { question: "How does the content planner work?", answer: "Enter your niche, upload frequency, and growth goal. The AI generates 4 weekly themes with video titles and content notes for each upload day, giving you a complete 30-day content roadmap." },
        { question: "Can I customize the generated plan?", answer: "Absolutely! The plan is a starting point. Rearrange videos, swap titles, or adjust themes to match your audience's preferences and your creative vision. The structure ensures consistency while the content is flexible." },
        { question: "How often should I upload to YouTube?", answer: "For most creators, 2-3 videos per week is the sweet spot between growth and sustainability. Quality always trumps quantity — it's better to upload 2 great videos than 5 mediocre ones." },
      ]}
      seoContent={
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Strategic Content Planning for YouTube</h2>
          <p className="text-muted-foreground mb-4">Consistent, strategic content is the backbone of YouTube growth. Random uploads without a plan lead to burnout and inconsistent results. The 30-Day Content Planner gives you a structured roadmap that balances audience interest, SEO opportunities, and sustainable production pace.</p>
          <h3 className="font-display text-xl font-bold text-foreground mb-3">Weekly Themes for Cohesion</h3>
          <p className="text-muted-foreground mb-4">Organizing your content around weekly themes creates a natural content flow that builds momentum. Viewers who discover one video in a themed week are more likely to watch related videos, increasing your session time and channel authority. Themes also make content creation easier because you're focused on one core topic per week.</p>
          <h3 className="font-display text-xl font-bold text-foreground mb-3">Balancing Content Types</h3>
          <p className="text-muted-foreground mb-4">Effective content strategies mix different video types: tutorials for search traffic, trending topics for browse, opinion pieces for engagement, and collaboration content for audience expansion. Our planner automatically diversifies your content mix to capture viewers from different discovery paths while maintaining your niche focus.</p>
          <h3 className="font-display text-xl font-bold text-foreground mb-3">From Plan to Execution</h3>
          <p className="text-muted-foreground mb-4">A plan is only valuable if executed. Batch your production by filming multiple videos in one session, use the Script Builder to prepare talking points quickly, and leverage the Content Repurposing Engine to create social media posts that promote each video. This systematic approach transforms content creation from a stressful scramble into a manageable routine that compounds growth over time.</p>
        </div>
      }
    >
      <section className="py-8">
        <div className="container px-4 max-w-2xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">30-Day Content Strategy Planner</h1>
          <p className="text-muted-foreground text-center mb-8">Get a personalized content plan with weekly themes and video titles.</p>

          <div className="space-y-4">
            <Input placeholder="Your niche (e.g., 'tech reviews', 'cooking')" value={niche} onChange={(e) => setNiche(e.target.value)} />
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Uploads per Week</label>
              <Input type="number" min="1" max="7" placeholder="3" value={frequency} onChange={(e) => setFrequency(e.target.value)} />
            </div>
            <Input placeholder="Growth goal (optional, e.g., 'reach 1000 subscribers')" value={goal} onChange={(e) => setGoal(e.target.value)} />
            <div className="flex gap-2">
              <Button onClick={handleGenerateLocal} disabled={!niche.trim()} className="flex-1">
                <Zap className="h-4 w-4 mr-2" /> Generate Instantly
              </Button>
              <Button onClick={handleGenerateAI} disabled={isLoading || !niche.trim()} variant="outline" className="flex-1">
                {isLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Planning...</> : <><Sparkles className="h-4 w-4 mr-2" /> AI Enhanced</>}
              </Button>
            </div>
          </div>

          {isLoading && <div className="mt-8 space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-32 bg-muted/30 rounded-lg animate-pulse" />)}</div>}

          {result?.weeks && !isLoading && (
            <div className="mt-8 space-y-8">
              <div className="flex justify-end">
                <Button variant="outline" size="sm" onClick={copyFullPlan}><Copy className="h-4 w-4 mr-1" /> Copy Full Plan</Button>
              </div>

              {result.weeks.map((week) => (
                <div key={week.weekNumber} className="border border-border/50 rounded-xl overflow-hidden">
                  <div className="bg-primary/10 px-5 py-3">
                    <h3 className="font-display text-lg font-bold text-foreground">Week {week.weekNumber}: {week.theme}</h3>
                  </div>
                  <div className="divide-y divide-border/30">
                    {week.videos.map((video, vi) => (
                      <div key={vi} className="px-5 py-4 group">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-xs text-muted-foreground mb-1">{video.day}</p>
                            <p className="text-sm font-medium text-foreground">{video.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{video.notes}</p>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => copyToClipboard(video.title)} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"><Copy className="h-4 w-4" /></Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </CreatorStudioLayout>
  );
};

export default CreatorContentPlanner;
