import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Check, Star, ArrowRight, MessageCircle, ShieldCheck } from "lucide-react";

const WHATSAPP_BASE = "https://wa.me/923489057646?text=";

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const plans = [
  {
    name: "Starter",
    tagline: "Ideal for small businesses",
    popular: false,
    features: [
      "Basic Social Media Management",
      "Limited Ad Management",
      "Monthly Report",
      "Basic Support",
    ],
    cta: "Get Started",
    msg: "Hi! I'm interested in the Starter Plan. Please share details.",
  },
  {
    name: "Professional",
    tagline: "For growing businesses",
    popular: true,
    features: [
      "Full Social Media Management",
      "Ads + Lead Generation",
      "Website Maintenance",
      "AI Chatbot Setup (Basic)",
      "Monthly Strategy Call",
    ],
    cta: "Choose Professional",
    msg: "Hi! I'm interested in the Professional Plan. Please share details.",
  },
  {
    name: "Enterprise",
    tagline: "For serious growth & automation",
    popular: false,
    features: [
      "Complete Digital Growth Management",
      "Advanced Ad Campaign Architecture",
      "Custom AI Chatbot & Voice Agent",
      "Automation Integration",
      "Dedicated Support",
      "Custom Reporting Dashboard",
    ],
    cta: "Schedule Strategy Call",
    msg: "Hi! I'm interested in the Enterprise Plan. Let's schedule a strategy call.",
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Pricing – Flexible Plans for Every Stage of Growth"
        description="From digital marketing to AI systems — choose the plan that fits your business. Starter, Professional, and Enterprise tiers available."
        canonical="/pricing"
      />
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-secondary/10 rounded-full blur-[100px]" />
        </div>
        <div className="container px-4 relative z-10">
          <motion.div {...fadeIn} className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Pricing
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Flexible Plans for Every{" "}
              <span className="gradient-text">Stage of Growth</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              From digital marketing to AI systems — choose the plan that fits your business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Plan Cards ── */}
      <section className="pb-20 md:pb-28">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                {...fadeIn}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex"
              >
                <Card
                  className={`relative flex flex-col w-full bg-card/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    plan.popular
                      ? "border-primary/50 shadow-lg shadow-primary/10 ring-2 ring-primary/20"
                      : "border-border/50 hover:border-primary/30 hover:shadow-primary/5"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                      <div className="flex items-center gap-1.5 px-5 py-1.5 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground text-xs font-semibold shadow-lg shadow-primary/30">
                        <Star className="h-3.5 w-3.5" /> Most Popular
                      </div>
                    </div>
                  )}

                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="mb-6">
                      <h2 className="font-display text-2xl font-bold text-foreground mb-1">
                        {plan.name}
                      </h2>
                      <p className="text-sm text-muted-foreground">{plan.tagline}</p>
                    </div>

                    <div className="mb-8 pb-6 border-b border-border/30">
                      <span className="text-sm text-muted-foreground">
                        Custom pricing based on scope
                      </span>
                    </div>

                    <ul className="space-y-3.5 mb-8 flex-1">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm text-foreground leading-snug">{f}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      size="lg"
                      className={`w-full text-base font-semibold ${
                        plan.popular
                          ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg shadow-primary/20"
                          : ""
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                      asChild
                    >
                      <a
                        href={`${WHATSAPP_BASE}${encodeURIComponent(plan.msg)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        {plan.cta}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Custom Quote ── */}
      <section className="py-20 md:py-28">
        <div className="container px-4">
          <motion.div {...fadeIn} className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card/80 to-secondary/5 p-10 md:p-16 text-center overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <ShieldCheck className="w-12 h-12 text-primary mx-auto mb-6" />
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Need a Custom Digital Infrastructure?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                  We build tailored AI, marketing, and automation systems for complex operations.
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-10 py-6 text-lg font-semibold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                  asChild
                >
                  <a
                    href={`${WHATSAPP_BASE}${encodeURIComponent("Hi! I need a custom digital infrastructure proposal. Let's discuss.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Request Custom Proposal
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
