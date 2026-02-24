import { useState } from "react";
import { YouTubeToolLayout } from "@/components/youtube-tools/YouTubeToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

const YouTubeWatchTimeCalculator = () => {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [retention, setRetention] = useState("50");
  const [dailyViews, setDailyViews] = useState("");
  const [result, setResult] = useState<{
    avgWatchMinutes: number;
    dailyWatchHours: number;
    monthlyWatchHours: number;
    daysTo4000: number;
  } | null>(null);

  const handleCalculate = () => {
    const totalSeconds = (parseInt(hours || "0") * 3600) + (parseInt(minutes || "0") * 60) + parseInt(seconds || "0");
    if (totalSeconds <= 0) return;
    const ret = parseFloat(retention) / 100;
    const views = parseInt(dailyViews || "0");
    if (views <= 0 || ret <= 0) return;

    const avgWatchSeconds = totalSeconds * ret;
    const avgWatchMinutes = avgWatchSeconds / 60;
    const dailyWatchHours = (avgWatchSeconds * views) / 3600;
    const monthlyWatchHours = dailyWatchHours * 30;
    const daysTo4000 = dailyWatchHours > 0 ? Math.ceil(4000 / dailyWatchHours) : Infinity;

    setResult({ avgWatchMinutes, dailyWatchHours, monthlyWatchHours, daysTo4000 });
  };

  return (
    <YouTubeToolLayout
      title="Watch Time Calculator"
      metaTitle="Free YouTube Watch Time Calculator"
      metaDescription="Calculate YouTube watch hours based on video length, retention rate, and daily views. Plan your path to 4,000 watch hours for monetization."
      canonical="/youtube-tools/watch-time-calculator"
      breadcrumbs={[{ label: "YouTube Tools", href: "/youtube-tools" }, { label: "Watch Time Calculator" }]}
      faqItems={[
        { question: "How many watch hours do I need for YouTube monetization?", answer: "You need 4,000 public watch hours in the past 12 months to qualify for the YouTube Partner Program (YPP). This is calculated across all your videos combined. Shorts views don't count toward this threshold, but there's an alternative path with 10 million Shorts views in 90 days." },
        { question: "Does average view duration affect watch time?", answer: "Yes, significantly. A 10-minute video with 50% retention generates 5 minutes of watch time per view, while the same video with 70% retention generates 7 minutes. Improving retention by even 10-20% can dramatically accelerate your path to 4,000 hours." },
        { question: "How can I improve my audience retention?", answer: "Hook viewers in the first 10 seconds with a compelling preview. Use pattern interrupts (B-roll, graphics, cuts) every 30-60 seconds. Deliver on your title and thumbnail promise quickly. Add chapters for navigation. End with a strong CTA before viewers leave. Analyze your retention graph in YouTube Studio to identify drop-off points." },
      ]}
      seoContent={<WatchTimeSEOContent />}
    >
      <section className="pb-16">
        <div className="container px-4 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">YouTube Watch Time Calculator</h1>
            <p className="text-muted-foreground">Calculate watch hours and plan your path to 4,000 hours for monetization.</p>
          </div>

          <div className="border border-border/50 rounded-xl p-6 md:p-8">
            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Video Length *</label>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Input type="number" placeholder="Hours" value={hours} onChange={(e) => setHours(e.target.value)} min={0} max={24} />
                    <span className="text-xs text-muted-foreground mt-1 block text-center">Hours</span>
                  </div>
                  <div>
                    <Input type="number" placeholder="Minutes" value={minutes} onChange={(e) => setMinutes(e.target.value)} min={0} max={59} />
                    <span className="text-xs text-muted-foreground mt-1 block text-center">Minutes</span>
                  </div>
                  <div>
                    <Input type="number" placeholder="Seconds" value={seconds} onChange={(e) => setSeconds(e.target.value)} min={0} max={59} />
                    <span className="text-xs text-muted-foreground mt-1 block text-center">Seconds</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  Average Retention: {retention}%
                </label>
                <input
                  type="range"
                  min={5}
                  max={100}
                  value={retention}
                  onChange={(e) => setRetention(e.target.value)}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-muted accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>5%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Average Daily Views *</label>
                <Input type="number" placeholder="e.g., 500" value={dailyViews} onChange={(e) => setDailyViews(e.target.value)} min={0} />
              </div>
              <Button onClick={handleCalculate} disabled={!dailyViews || (!hours && !minutes && !seconds)} className="w-full bg-[#FF0000] hover:bg-[#FF0000]/90 text-white">
                <Clock className="h-4 w-4 mr-2" />
                Calculate Watch Time
              </Button>
            </div>

            {result && (
              <div className="mt-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border border-border/50 rounded-lg p-5 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Avg Watch per View</p>
                    <p className="font-display text-2xl font-bold text-foreground">{result.avgWatchMinutes.toFixed(1)} min</p>
                  </div>
                  <div className="border border-border/50 rounded-lg p-5 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Daily Watch Hours</p>
                    <p className="font-display text-2xl font-bold text-foreground">{result.dailyWatchHours.toFixed(1)} hrs</p>
                  </div>
                  <div className="border border-border/50 rounded-lg p-5 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Monthly Watch Hours</p>
                    <p className="font-display text-2xl font-bold text-primary">{result.monthlyWatchHours.toFixed(0)} hrs</p>
                  </div>
                  <div className="border border-border/50 rounded-lg p-5 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Days to 4,000 Hours</p>
                    <p className="font-display text-2xl font-bold text-primary">
                      {result.daysTo4000 === Infinity ? "∞" : `${result.daysTo4000} days`}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </YouTubeToolLayout>
  );
};

const WatchTimeSEOContent = () => (
  <div className="container px-4 max-w-3xl mx-auto">
    <h2 className="font-display text-2xl font-bold text-foreground mb-4">YouTube Watch Time: The Complete Guide</h2>
    <p className="text-muted-foreground mb-4">Watch time is the single most important metric in YouTube's algorithm. It measures the total amount of time viewers spend watching your videos and directly influences how YouTube recommends your content. Understanding and optimizing watch time is crucial for channel growth and monetization eligibility.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">Why Watch Time Matters More Than Views</h3>
    <p className="text-muted-foreground mb-4">YouTube shifted from a view-count algorithm to a watch-time algorithm in 2012. This means a video with 1,000 views and 80% retention is more valuable to YouTube than a video with 10,000 views and 10% retention. Watch time signals that your content is engaging and worth recommending. Higher watch time leads to better placement in search results, suggested videos, and the homepage.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">The 4,000-Hour Monetization Threshold</h3>
    <p className="text-muted-foreground mb-4">To join the YouTube Partner Program, you need 4,000 public watch hours in the past 12 months. This is a rolling window — hours from 13 months ago drop off while new hours are added. Our calculator helps you understand how your current video length, retention rate, and daily views contribute to this goal. Many creators find that consistent uploads of 10-15 minute videos with decent retention is the fastest path to 4,000 hours.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">Understanding Audience Retention</h3>
    <p className="text-muted-foreground mb-4">Audience retention measures the percentage of your video that viewers watch on average. A 10-minute video with 50% retention means viewers watch about 5 minutes on average. YouTube considers 40-60% retention good for most content types. Tutorials and educational content often see higher retention (50-70%) because viewers are motivated to learn. Entertainment content typically has lower retention but higher view counts.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">Strategies to Increase Watch Time</h3>
    <p className="text-muted-foreground mb-4">Create longer videos when the content supports it — videos over 8 minutes can include mid-roll ads and generate more watch time per view. Use end screens and cards to direct viewers to your next video, creating session watch time. Build playlists that auto-play related content. Hook viewers in the first 10 seconds by previewing the best part of your video. Use pattern interrupts every 30-60 seconds to maintain attention.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">Common Watch Time Killers</h3>
    <p className="text-muted-foreground mb-4">Long, unfocused intros are the number one watch time killer — get to the promised content within the first 30 seconds. Clickbait titles that don't match content cause immediate drop-offs. Poor audio quality drives viewers away faster than poor video quality. Unnecessary filler and rambling decrease retention rates. Lack of visual variety (talking head with no cuts) causes attention fatigue after 2-3 minutes.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">Analyzing Your Watch Time Data</h3>
    <p className="text-muted-foreground mb-4">YouTube Studio provides detailed watch time analytics. Check your audience retention graph for each video to identify exact drop-off points. Compare retention across videos to understand what content keeps viewers engaged. Look at traffic sources — suggested video views typically have higher retention than search or external traffic. Use our calculator alongside your analytics to project growth and set realistic monetization timelines.</p>
  </div>
);

export default YouTubeWatchTimeCalculator;
