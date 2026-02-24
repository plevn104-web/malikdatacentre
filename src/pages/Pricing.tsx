import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, X, Star, MessageCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const WHATSAPP_URL = "https://wa.me/923489057646?text=Hi! I'm interested in upgrading my Creator Studio plan. Please share details.";

const plans = [
  {
    key: "free",
    name: "Free",
    price: "0",
    period: "/month",
    description: "Get started with basic YouTube tools",
    popular: false,
    features: {
      toolRuns: "10 / month",
      advancedTools: false,
      adsRemoval: false,
      historyStorage: false,
      supportPriority: "Community",
    },
  },
  {
    key: "starter",
    name: "Starter",
    price: "1,000",
    period: "/month",
    description: "For creators ready to grow",
    popular: false,
    features: {
      toolRuns: "200 / month",
      advancedTools: false,
      adsRemoval: true,
      historyStorage: false,
      supportPriority: "Email",
    },
  },
  {
    key: "creator-pro",
    name: "Creator Pro",
    price: "2,000",
    period: "/month",
    description: "For serious YouTube creators",
    popular: true,
    features: {
      toolRuns: "600 / month",
      advancedTools: true,
      adsRemoval: true,
      historyStorage: "30 days",
      supportPriority: "Priority",
    },
  },
  {
    key: "elite",
    name: "Elite Creator",
    price: "3,000",
    period: "/month",
    description: "Unlimited power for top creators",
    popular: false,
    features: {
      toolRuns: "Unlimited",
      advancedTools: true,
      adsRemoval: true,
      historyStorage: "Unlimited",
      supportPriority: "Dedicated",
    },
  },
];

const featureRows = [
  { label: "Tool Runs", key: "toolRuns" as const },
  { label: "Advanced Tools", key: "advancedTools" as const },
  { label: "Ads Removal", key: "adsRemoval" as const },
  { label: "History Storage", key: "historyStorage" as const },
  { label: "Support Priority", key: "supportPriority" as const },
];

const renderCell = (value: string | boolean) => {
  if (typeof value === "string") return <span className="text-foreground text-sm font-medium">{value}</span>;
  return value ? <Check className="h-5 w-5 text-primary mx-auto" /> : <X className="h-5 w-5 text-muted-foreground/40 mx-auto" />;
};

export default function Pricing() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Pricing – Creator Studio Plans" description="Choose the perfect Creator Studio plan. From free to Elite Creator – upgrade your YouTube growth tools." canonical="/pricing" />
      <Navbar />
      <section className="pt-24 pb-20">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Pricing</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Simple, Transparent <span className="gradient-text">Pricing</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Choose the plan that fits your creator journey. All prices in PKR.</p>
          </div>

          {/* Plan Cards - Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {plans.map((plan) => (
              <div
                key={plan.key}
                className={`glass-card p-6 relative flex flex-col ${plan.popular ? "border-primary/50 shadow-lg shadow-primary/10 ring-2 ring-primary/20" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground text-xs font-semibold">
                      <Star className="h-3 w-3" /> Most Popular
                    </div>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h2 className="font-display text-lg font-bold text-foreground mb-1">{plan.name}</h2>
                  <p className="font-display text-3xl font-bold gradient-text">
                    Rs {plan.price}<span className="text-sm font-normal text-muted-foreground">{plan.period}</span>
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-6 flex-1">
                  {featureRows.map((row) => {
                    const val = plan.features[row.key];
                    return (
                      <li key={row.key} className="flex items-center gap-2 text-sm">
                        {typeof val === "boolean" ? (
                          val ? <Check className="h-4 w-4 text-primary flex-shrink-0" /> : <X className="h-4 w-4 text-muted-foreground/40 flex-shrink-0" />
                        ) : (
                          <Check className="h-4 w-4 text-primary flex-shrink-0" />
                        )}
                        <span className={typeof val === "boolean" && !val ? "text-muted-foreground/60" : "text-foreground"}>
                          {row.label}{typeof val === "string" ? `: ${val}` : ""}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                {plan.key === "free" ? (
                  <Button variant="outline" className="w-full" disabled>
                    {user ? "Current Plan" : "Free Forever"}
                  </Button>
                ) : (
                  <Button
                    className={`w-full ${plan.popular ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground" : ""}`}
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Get {plan.name}
                    </a>
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Comparison Table - Desktop */}
          <div className="hidden lg:block">
            <h2 className="font-display text-2xl font-bold text-foreground text-center mb-8">Detailed Comparison</h2>
            <div className="border border-border/50 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left p-4 text-muted-foreground font-medium">Feature</th>
                    {plans.map((p) => (
                      <th key={p.key} className={`p-4 text-center font-semibold text-foreground ${p.popular ? "bg-primary/5" : ""}`}>
                        {p.name}
                        {p.popular && <span className="block text-xs text-primary font-normal mt-1">⭐ Recommended</span>}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/30">
                    <td className="p-4 text-muted-foreground">Price</td>
                    {plans.map((p) => (
                      <td key={p.key} className={`p-4 text-center font-bold text-foreground ${p.popular ? "bg-primary/5" : ""}`}>
                        Rs {p.price}{p.period}
                      </td>
                    ))}
                  </tr>
                  {featureRows.map((row) => (
                    <tr key={row.key} className="border-b border-border/30">
                      <td className="p-4 text-muted-foreground">{row.label}</td>
                      {plans.map((p) => (
                        <td key={p.key} className={`p-4 text-center ${p.popular ? "bg-primary/5" : ""}`}>
                          {renderCell(p.features[row.key])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment Info */}
          <div className="mt-16 text-center">
            <div className="glass-card p-8 max-w-2xl mx-auto">
              <h3 className="font-display text-xl font-bold text-foreground mb-3">How to Subscribe</h3>
              <p className="text-muted-foreground mb-4">
                Contact us via WhatsApp to activate your plan. We accept EasyPaisa, JazzCash, and bank transfer. International payments via Stripe coming soon.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button asChild>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" /> Contact on WhatsApp
                  </a>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">Stripe, Paddle & local gateway integrations coming soon.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
