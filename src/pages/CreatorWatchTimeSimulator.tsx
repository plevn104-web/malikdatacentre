import { useState } from "react";
import { CreatorStudioLayout } from "@/components/creator-studio/CreatorStudioLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CreatorWatchTimeSimulator = () => {
  const [videoLength, setVideoLength] = useState("");
  const [retention, setRetention] = useState("50");
  const [frequency, setFrequency] = useState("3");
  const [viewsPerVideo, setViewsPerVideo] = useState("500");
  const [result, setResult] = useState<{ monthlyHours: number; yearlyHours: number; monthsTo4000: number; weeklyHours: number } | null>(null);

  const handleCalculate = () => {
    const len = parseFloat(videoLength);
    const ret = parseFloat(retention) / 100;
    const freq = parseInt(frequency);
    const vpv = parseInt(viewsPerVideo);
    if (isNaN(len) || isNaN(ret) || isNaN(freq) || isNaN(vpv) || len <= 0) return;

    const avgWatchMinutes = len * ret;
    const videosPerMonth = freq * 4.33;
    const monthlyWatchMinutes = avgWatchMinutes * vpv * videosPerMonth;
    const monthlyHours = monthlyWatchMinutes / 60;
    const weeklyHours = monthlyHours / 4.33;
    const yearlyHours = monthlyHours * 12;
    const monthsTo4000 = monthlyHours > 0 ? Math.ceil(4000 / monthlyHours) : Infinity;

    setResult({ monthlyHours, yearlyHours, monthsTo4000, weeklyHours });
  };

  return (
    <CreatorStudioLayout
      title="Watch Time Growth Simulator"
      metaTitle="YouTube Watch Time Simulator – Project Your Watch Hours"
      metaDescription="Simulate your YouTube watch time growth based on video length, retention, and upload frequency. Plan your path to 4,000 watch hours for monetization."
      canonical="/creator-studio/watch-time-simulator"
      breadcrumbs={[{ label: "Creator Studio", href: "/creator-studio" }, { label: "Watch Time Simulator" }]}
      faqItems={[
        { question: "What is the 4,000 watch hours requirement?", answer: "YouTube requires 4,000 public watch hours in the past 12 months (plus 1,000 subscribers) to join the YouTube Partner Program and start earning ad revenue. This simulator helps you project when you'll hit that milestone." },
        { question: "How can I improve my audience retention?", answer: "Hook viewers in the first 10 seconds, use pattern interrupts every 30-60 seconds, create structured content with clear value delivery, use visual variety, and deliver on your title's promise. Aim for 50%+ average retention." },
        { question: "Does upload frequency affect watch time?", answer: "Yes, more uploads mean more opportunities for watch time. However, quality matters more than quantity. A consistent schedule of 2-3 quality videos per week typically outperforms daily low-effort content." },
      ]}
      seoContent={
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Maximizing YouTube Watch Time</h2>
          <p className="text-muted-foreground mb-4">Watch time is YouTube's most important metric. It directly influences search rankings, suggested video placement, and monetization eligibility. The Watch Time Growth Simulator helps you understand the relationship between video length, retention, upload frequency, and total watch hours so you can make strategic decisions about your content.</p>
          <h3 className="font-display text-xl font-bold text-foreground mb-3">The Watch Time Formula</h3>
          <p className="text-muted-foreground mb-4">Total watch time = Average view duration × Total views. Average view duration depends on video length and retention percentage. A 10-minute video with 50% retention generates 5 minutes of watch time per view. If that video gets 1,000 views, that's 83.3 hours of watch time. Understanding this formula helps you optimize both sides of the equation.</p>
          <h3 className="font-display text-xl font-bold text-foreground mb-3">Optimal Video Length</h3>
          <p className="text-muted-foreground mb-4">Longer videos have more potential watch time per view but typically lower retention rates. The sweet spot for most niches is 8-15 minutes — long enough for substantial watch time and mid-roll ads, but short enough to maintain good retention. Tutorial and educational content can go longer (15-30 minutes) while entertainment content often performs best at 8-12 minutes.</p>
          <h3 className="font-display text-xl font-bold text-foreground mb-3">Retention Optimization</h3>
          <p className="text-muted-foreground mb-4">Improving retention by even 10% can dramatically increase your total watch time. Key strategies include: delivering value immediately (avoid long intros), using chapter markers for navigation, maintaining visual variety, building anticipation throughout the video, and ending before viewer interest drops. Analyze your YouTube Studio retention graphs to identify where viewers leave.</p>
          <h3 className="font-display text-xl font-bold text-foreground mb-3">Upload Strategy</h3>
          <p className="text-muted-foreground mb-4">Consistency is more important than frequency. Choose an upload schedule you can maintain long-term. Two well-produced videos per week typically generates more watch time than daily rushed content. Use our 30-Day Content Planner to build a sustainable publishing schedule that maximizes your watch time growth while maintaining content quality.</p>
        </div>
      }
    >
      <section className="py-8">
        <div className="container px-4 max-w-2xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Watch Time Growth Simulator</h1>
          <p className="text-muted-foreground text-center mb-8">Project your monthly watch hours and monetization timeline.</p>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Video Length (minutes)</label>
              <Input type="number" placeholder="e.g., 10" value={videoLength} onChange={(e) => setVideoLength(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Average Retention (%)</label>
              <Input type="number" placeholder="e.g., 50" value={retention} onChange={(e) => setRetention(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Upload Frequency (per week)</label>
              <Input type="number" placeholder="e.g., 3" value={frequency} onChange={(e) => setFrequency(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Average Views per Video</label>
              <Input type="number" placeholder="e.g., 500" value={viewsPerVideo} onChange={(e) => setViewsPerVideo(e.target.value)} />
            </div>
            <Button onClick={handleCalculate} disabled={!videoLength} className="w-full">Simulate Growth</Button>
          </div>

          {result && (
            <div className="mt-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-6 border border-border/50 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Weekly Watch Hours</p>
                  <p className="font-display text-2xl font-bold text-foreground">{result.weeklyHours.toFixed(1)}h</p>
                </div>
                <div className="text-center p-6 border border-border/50 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Monthly Watch Hours</p>
                  <p className="font-display text-2xl font-bold text-primary">{result.monthlyHours.toFixed(1)}h</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-6 border border-border/50 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Yearly Projection</p>
                  <p className="font-display text-2xl font-bold text-foreground">{result.yearlyHours.toFixed(0)}h</p>
                </div>
                <div className="text-center p-6 border border-border/50 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Months to 4,000h</p>
                  <p className="font-display text-2xl font-bold text-primary">
                    {result.monthsTo4000 === Infinity ? "N/A" : result.monthsTo4000}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-muted/20 border border-border/30 rounded-lg">
                <p className="text-sm text-foreground">
                  {result.yearlyHours >= 4000
                    ? "✓ At this rate, you'll exceed the 4,000 watch hours requirement within 12 months!"
                    : `At your current pace, you need ${result.monthsTo4000} months to reach 4,000 watch hours. Consider increasing video length, improving retention, or uploading more frequently.`}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </CreatorStudioLayout>
  );
};

export default CreatorWatchTimeSimulator;
