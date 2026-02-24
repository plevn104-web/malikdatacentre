import { useState } from "react";
import { YouTubeToolLayout } from "@/components/youtube-tools/YouTubeToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";

const rpmPresets = [
  { label: "$1", value: 1 },
  { label: "$3", value: 3 },
  { label: "$5", value: 5 },
  { label: "$8", value: 8 },
  { label: "$12", value: 12 },
  { label: "$20", value: 20 },
];

const YouTubeRevenueEstimator = () => {
  const [views, setViews] = useState("");
  const [rpm, setRpm] = useState(5);
  const [customRpm, setCustomRpm] = useState("");
  const [result, setResult] = useState<{ monthly: number; yearly: number; daily: number } | null>(null);

  const handleCalculate = () => {
    const v = parseInt(views.replace(/,/g, ""), 10);
    if (!v || v <= 0) return;
    const effectiveRpm = customRpm ? parseFloat(customRpm) : rpm;
    if (!effectiveRpm || effectiveRpm <= 0) return;
    const monthly = (v / 1000) * effectiveRpm;
    setResult({
      monthly,
      yearly: monthly * 12,
      daily: monthly / 30,
    });
  };

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);

  return (
    <YouTubeToolLayout
      title="YouTube Revenue Estimator"
      metaTitle="Free YouTube Revenue Estimator – Earnings Calculator"
      metaDescription="Estimate your YouTube ad revenue based on monthly views and RPM. Free calculator to project daily, monthly, and yearly earnings."
      canonical="/youtube-tools/revenue-estimator"
      breadcrumbs={[{ label: "YouTube Tools", href: "/youtube-tools" }, { label: "Revenue Estimator" }]}
      faqItems={[
        { question: "How accurate is the YouTube revenue estimator?", answer: "This tool provides estimates based on RPM (Revenue Per Mille). Actual earnings vary based on niche, audience location, ad engagement, seasonality, and YouTube's ad auction system. Use it as a planning guideline, not a guarantee." },
        { question: "What is RPM on YouTube?", answer: "RPM (Revenue Per Mille) is the revenue earned per 1,000 views after YouTube's 45% cut. Average RPM ranges from $1-$5 for entertainment to $10-$30 for finance/tech niches. Your actual RPM depends on audience demographics, content type, and advertiser demand." },
        { question: "How can I increase my YouTube RPM?", answer: "Focus on high-CPM niches (finance, tech, business), create longer videos (8+ minutes) to enable mid-roll ads, target audiences in high-CPM countries (US, UK, Canada), and maintain high audience engagement and watch time." },
      ]}
      seoContent={<RevenueSEOContent />}
    >
      <section className="pb-16">
        <div className="container px-4 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">YouTube Revenue Estimator</h1>
            <p className="text-muted-foreground">Estimate your potential YouTube ad earnings based on views and RPM.</p>
          </div>

          <div className="border border-border/50 rounded-xl p-6 md:p-8">
            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Monthly Views *</label>
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="e.g., 100000"
                  value={views}
                  onChange={(e) => setViews(e.target.value.replace(/[^0-9,]/g, ""))}
                  maxLength={15}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">RPM (Revenue Per 1,000 Views)</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {rpmPresets.map((p) => (
                    <button
                      key={p.value}
                      onClick={() => { setRpm(p.value); setCustomRpm(""); }}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                        rpm === p.value && !customRpm
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-muted/30 text-muted-foreground border-border/50 hover:border-primary/30"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
                <Input
                  type="number"
                  placeholder="Or enter custom RPM..."
                  value={customRpm}
                  onChange={(e) => setCustomRpm(e.target.value)}
                  min={0}
                  step={0.5}
                />
              </div>
              <Button onClick={handleCalculate} disabled={!views} className="w-full bg-[#FF0000] hover:bg-[#FF0000]/90 text-white">
                <DollarSign className="h-4 w-4 mr-2" />
                Calculate Earnings
              </Button>
            </div>

            {result && (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Daily Estimate", value: result.daily },
                  { label: "Monthly Estimate", value: result.monthly },
                  { label: "Yearly Estimate", value: result.yearly },
                ].map((item) => (
                  <div key={item.label} className="border border-border/50 rounded-lg p-5 text-center">
                    <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                    <p className="font-display text-2xl font-bold text-primary">{formatCurrency(item.value)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 p-5 bg-muted/20 rounded-lg border border-border/30">
            <h3 className="font-semibold text-foreground mb-2">💡 Revenue Tip</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              YouTube takes a 45% cut of ad revenue. RPM already accounts for this. To maximize earnings, focus on audience retention (longer watch = more ad slots), target tier-1 countries, and create content in high-CPM niches like finance, tech, and education.
            </p>
          </div>
        </div>
      </section>
    </YouTubeToolLayout>
  );
};

const RevenueSEOContent = () => (
  <div className="container px-4 max-w-3xl mx-auto">
    <h2 className="font-display text-2xl font-bold text-foreground mb-4">Understanding YouTube Revenue and Monetization</h2>
    <p className="text-muted-foreground mb-4">YouTube monetization is the primary income source for millions of content creators worldwide. Understanding how YouTube calculates and distributes ad revenue is essential for planning your content strategy and setting realistic financial goals. Our YouTube Revenue Estimator helps you project potential earnings based on your monthly views and niche-specific RPM.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">How YouTube Ad Revenue Works</h3>
    <p className="text-muted-foreground mb-4">When a viewer watches an ad on your video, YouTube collects payment from the advertiser. YouTube keeps 45% and pays you 55% through the YouTube Partner Program (YPP). The amount advertisers pay varies dramatically based on your audience demographics, content category, time of year, and ad format. This is why creators in the same niche can earn vastly different amounts.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">RPM vs CPM: What's the Difference?</h3>
    <p className="text-muted-foreground mb-4">CPM (Cost Per Mille) is what advertisers pay per 1,000 ad impressions. RPM (Revenue Per Mille) is what you actually earn per 1,000 views after YouTube's cut and accounting for non-monetized views. RPM is always lower than CPM because not every view generates an ad impression. A typical channel might have a CPM of $8 but an RPM of only $3-4. Our calculator uses RPM for more realistic projections.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">Factors That Affect Your RPM</h3>
    <p className="text-muted-foreground mb-4">Your RPM is influenced by several key factors. Audience location is perhaps the most significant — viewers from the US, UK, Canada, and Australia generate significantly higher ad rates than viewers from developing countries. Content niche matters enormously: finance and business channels often see RPMs of $15-30, while gaming or entertainment channels might earn $2-5. Seasonality plays a role too, with Q4 (October-December) typically seeing 30-50% higher RPMs due to holiday advertising spend.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">Beyond Ad Revenue: Diversifying Income</h3>
    <p className="text-muted-foreground mb-4">Successful YouTubers rarely rely solely on ad revenue. Channel memberships, Super Chats, merchandise, affiliate marketing, sponsorships, and digital products often generate more income than ads. A channel with 100,000 monthly views might earn $300-500 from ads but $2,000-5,000 from a single sponsorship deal. Use our revenue estimator as a baseline, then factor in these additional income streams for a complete picture.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">Qualifying for YouTube Monetization</h3>
    <p className="text-muted-foreground mb-4">To join the YouTube Partner Program, you need 1,000 subscribers and either 4,000 watch hours in the past 12 months or 10 million Shorts views in 90 days. Meeting these thresholds is just the beginning — YouTube also reviews your channel for compliance with community guidelines, copyright policies, and advertiser-friendly content guidelines. Once approved, it typically takes 1-2 months to receive your first payment.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">Maximizing Your YouTube Revenue</h3>
    <p className="text-muted-foreground mb-4">Create longer videos (8+ minutes) to enable mid-roll ads, which significantly increase revenue per video. Optimize your content for tier-1 audiences by creating English-language content during peak US viewing hours. Improve audience retention — videos where viewers watch 50%+ generate more ad opportunities. Post consistently to build a loyal subscriber base that returns for every upload, and use our other YouTube tools to optimize titles, descriptions, and tags for maximum discoverability.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">Understanding Revenue Fluctuations</h3>
    <p className="text-muted-foreground mb-4">YouTube revenue is not consistent month-to-month. January typically sees the lowest RPMs as advertisers reset budgets after holiday spending. March-April sees recovery as Q1 budgets kick in. Summer months are moderate, and Q4 brings the highest earnings of the year. New creators are often surprised by these fluctuations, so use our estimator with different RPM values to understand your earnings range throughout the year.</p>
  </div>
);

export default YouTubeRevenueEstimator;
