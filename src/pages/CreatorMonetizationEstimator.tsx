import { useState } from "react";
import { CreatorStudioLayout } from "@/components/creator-studio/CreatorStudioLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CreatorMonetizationEstimator = () => {
  const [views, setViews] = useState("");
  const [cpm, setCpm] = useState("4");
  const [result, setResult] = useState<{ monthly: number; yearly: number; scenarios: { label: string; monthly: number; yearly: number }[] } | null>(null);

  const handleCalculate = () => {
    const v = parseInt(views);
    const c = parseFloat(cpm);
    if (isNaN(v) || isNaN(c) || v <= 0 || c <= 0) return;

    const monthly = (v / 1000) * c;
    const yearly = monthly * 12;
    const scenarios = [
      { label: "Conservative (50% growth)", monthly: monthly * 1.5, yearly: monthly * 1.5 * 12 },
      { label: "Moderate (100% growth)", monthly: monthly * 2, yearly: monthly * 2 * 12 },
      { label: "Aggressive (200% growth)", monthly: monthly * 3, yearly: monthly * 3 * 12 },
    ];

    setResult({ monthly, yearly, scenarios });
  };

  return (
    <CreatorStudioLayout
      title="Monetization Estimator Pro"
      metaTitle="YouTube Monetization Estimator Pro – Revenue Calculator"
      metaDescription="Estimate your YouTube ad revenue with CPM analysis and growth scenarios. Calculate monthly and yearly earnings based on your views. Free monetization calculator."
      canonical="/creator-studio/monetization-estimator"
      breadcrumbs={[{ label: "Creator Studio", href: "/creator-studio" }, { label: "Monetization Estimator" }]}
      faqItems={[
        { question: "What is CPM and how does it affect earnings?", answer: "CPM (Cost Per Mille) is the amount advertisers pay per 1,000 ad impressions. Higher CPM niches like finance ($12-20) and tech ($8-15) earn more than entertainment ($2-5). Your actual RPM (Revenue Per Mille) is typically 45-55% of CPM after YouTube's cut." },
        { question: "How accurate is this estimator?", answer: "This provides estimates based on industry averages. Actual earnings vary based on audience location, niche, seasonality, ad formats, and viewer demographics. Use it for planning, not precise forecasting." },
        { question: "How can I increase my CPM?", answer: "Target high-value niches, create longer videos (8+ minutes for mid-roll ads), focus on US/UK/CA audiences, improve audience retention, and produce content that attracts premium advertisers." },
      ]}
      seoContent={
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Understanding YouTube Monetization</h2>
          <p className="text-muted-foreground mb-4">YouTube monetization through the Partner Program is a primary income source for millions of creators worldwide. Understanding how ad revenue works helps you make strategic decisions about content, audience targeting, and growth. The Monetization Estimator Pro gives you realistic projections based on your current metrics and growth potential.</p>
          <h3 className="font-display text-xl font-bold text-foreground mb-3">How YouTube Ad Revenue Works</h3>
          <p className="text-muted-foreground mb-4">YouTube pays creators through AdSense based on ad impressions and clicks. Your earnings depend on CPM (what advertisers pay), your RPM (what you receive after YouTube's 45% cut), and total monetized views. Not all views generate ad revenue — factors like ad blockers, viewer location, and video length affect monetization rate.</p>
          <h3 className="font-display text-xl font-bold text-foreground mb-3">CPM by Niche</h3>
          <p className="text-muted-foreground mb-4">Finance and insurance niches see CPMs of $12-30+. Technology averages $8-15. Business and marketing range $6-12. Health and fitness typically earn $4-8. Entertainment and gaming usually fall in the $2-5 range. Understanding your niche's CPM helps you set realistic revenue goals and consider whether pivoting topics could increase earnings.</p>
          <h3 className="font-display text-xl font-bold text-foreground mb-3">Revenue Growth Strategies</h3>
          <p className="text-muted-foreground mb-4">Growing your YouTube revenue isn't just about getting more views. Optimize your CPM by creating longer content for mid-roll ad placement, target higher-value demographics, improve audience retention to boost monetized playbacks, and diversify income through sponsorships, memberships, and merchandise. Most successful creators earn more from brand deals than AdSense alone.</p>
          <h3 className="font-display text-xl font-bold text-foreground mb-3">Planning for Sustainable Growth</h3>
          <p className="text-muted-foreground mb-4">Use the growth scenarios to plan your content strategy. If you're currently at 10,000 monthly views, a realistic 6-month goal might be 50,000 views with consistent weekly uploads. Pair this estimator with our Watch Time Growth Simulator and 30-Day Content Planner to build a comprehensive growth roadmap that balances revenue goals with sustainable content creation habits.</p>
        </div>
      }
    >
      <section className="py-8">
        <div className="container px-4 max-w-2xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Monetization Estimator Pro</h1>
          <p className="text-muted-foreground text-center mb-8">Estimate your YouTube earnings with CPM analysis and revenue growth scenarios.</p>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Monthly Views</label>
              <Input type="number" placeholder="e.g., 100000" value={views} onChange={(e) => setViews(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">CPM Estimate ($)</label>
              <Input type="number" step="0.5" placeholder="e.g., 4" value={cpm} onChange={(e) => setCpm(e.target.value)} />
              <p className="text-xs text-muted-foreground mt-1">Average CPM: Entertainment $2-5, Tech $8-15, Finance $12-20</p>
            </div>
            <Button onClick={handleCalculate} disabled={!views} className="w-full">Calculate Revenue</Button>
          </div>

          {result && (
            <div className="mt-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-6 border border-border/50 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Monthly Estimate</p>
                  <p className="font-display text-3xl font-bold text-primary">${result.monthly.toFixed(2)}</p>
                </div>
                <div className="text-center p-6 border border-border/50 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Yearly Estimate</p>
                  <p className="font-display text-3xl font-bold text-foreground">${result.yearly.toFixed(2)}</p>
                </div>
              </div>

              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">Revenue Growth Scenarios</h3>
                <div className="space-y-3">
                  {result.scenarios.map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-muted/20 border border-border/30 rounded-lg">
                      <span className="text-sm text-foreground">{s.label}</span>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-primary">${s.monthly.toFixed(2)}/mo</p>
                        <p className="text-xs text-muted-foreground">${s.yearly.toFixed(2)}/yr</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center">Note: Estimates based on gross CPM. Actual RPM after YouTube's cut is typically 45-55% lower.</p>
            </div>
          )}
        </div>
      </section>
    </CreatorStudioLayout>
  );
};

export default CreatorMonetizationEstimator;
