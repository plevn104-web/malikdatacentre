import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, X } from "lucide-react";

const features = [
  { name: "AI-Powered YouTube Tools", free: "10 runs/month", pro: "Unlimited" },
  { name: "Creator Studio Access", free: true, pro: true },
  { name: "SEO Score Analyzer", free: true, pro: true },
  { name: "Keyword Explorer", free: true, pro: true },
  { name: "AI Script Builder", free: true, pro: true },
  { name: "30-Day Content Planner", free: true, pro: true },
  { name: "Priority Access to New Tools", free: false, pro: true },
  { name: "Faster Generation Speed", free: false, pro: true },
  { name: "Saved History (Coming Soon)", free: false, pro: true },
  { name: "Priority Support", free: false, pro: true },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Upgrade to Pro" description="Compare Free and Pro plans. Get unlimited tool runs, priority access, and faster generation with Pro." canonical="/pricing" />
      <Navbar />
      <section className="pt-24 pb-20">
        <div className="container px-4 max-w-3xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground text-center mb-4">Upgrade to Pro</h1>
          <p className="text-lg text-muted-foreground text-center mb-12">Unlock unlimited access to all YouTube optimization and Creator Studio tools.</p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Free Plan */}
            <div className="border border-border/50 rounded-xl p-6">
              <h2 className="font-display text-xl font-bold text-foreground mb-1">Free</h2>
              <p className="text-3xl font-bold text-foreground mb-1">$0<span className="text-sm font-normal text-muted-foreground">/month</span></p>
              <p className="text-sm text-muted-foreground mb-6">For creators getting started</p>
              <Button variant="outline" className="w-full mb-6" disabled>Current Plan</Button>
              <ul className="space-y-3">
                {features.map((f) => (
                  <li key={f.name} className="flex items-center gap-2 text-sm">
                    {f.free ? <Check className="h-4 w-4 text-primary flex-shrink-0" /> : <X className="h-4 w-4 text-muted-foreground/40 flex-shrink-0" />}
                    <span className={f.free ? "text-foreground" : "text-muted-foreground/60"}>
                      {f.name}{typeof f.free === "string" ? ` (${f.free})` : ""}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro Plan */}
            <div className="border-2 border-primary rounded-xl p-6 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">Recommended</div>
              <h2 className="font-display text-xl font-bold text-foreground mb-1">Pro</h2>
              <p className="text-3xl font-bold text-foreground mb-1">Coming Soon</p>
              <p className="text-sm text-muted-foreground mb-6">For serious YouTube creators</p>
              <Button className="w-full mb-6" disabled>Coming Soon</Button>
              <ul className="space-y-3">
                {features.map((f) => (
                  <li key={f.name} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-foreground">
                      {f.name}{typeof f.pro === "string" ? ` (${f.pro})` : ""}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
