import { lazy, Suspense, useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Megaphone, Brain, Globe, ShoppingBag, CheckCircle2, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import LiveVisitorsIndicator from "@/components/home/LiveVisitorsIndicator";
import PurchaseNotification from "@/components/home/PurchaseNotification";

const ChatBot = lazy(() => import("@/components/ChatBot").then(m => ({ default: m.ChatBot })));

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const divisions = [
  {
    icon: Megaphone,
    title: "Social Media Agency",
    desc: "Strategic social media management, content creation, and performance advertising for scalable brand growth.",
    link: "/social-media-agency",
  },
  {
    icon: Brain,
    title: "AI Solutions",
    desc: "Enterprise AI tools, automation infrastructure, and intelligent systems to accelerate business operations.",
    link: "/ai-based",
  },
  {
    icon: Globe,
    title: "Web & Automation Services",
    desc: "High-performance websites, landing pages, and digital automation built for conversion and scale.",
    link: "/services",
  },
  {
    icon: ShoppingBag,
    title: "Digital Tools Marketplace",
    desc: "Instant access to premium AI tools, VPNs, accounts, and digital services at competitive prices.",
    link: "/ai-tools-services",
  },
];

const reasons = [
  "Multi-Domain Digital Expertise",
  "AI & Automation Driven",
  "Performance-Focused Execution",
  "Scalable Systems",
];

const Index = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShowChatbot(true), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <SEOHead
        title="Malik Data Centre – Digital Growth & AI Solutions"
        description="We build digital growth systems, automation infrastructure, and AI-powered solutions for modern businesses."
        canonical="/"
      />
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/15 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/15 rounded-full blur-[80px]" />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                                linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="container px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div {...fadeIn} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-8">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-sm font-medium text-emerald-400">Online</span>
            </motion.div>

            <motion.h1 {...fadeIn} transition={{ duration: 0.5, delay: 0.1 }} className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
              Malik Data Centre –{" "}
              <span className="gradient-text">Digital Growth & AI Solutions</span>
            </motion.h1>

            <motion.p {...fadeIn} transition={{ duration: 0.5, delay: 0.15 }} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              We build digital growth systems, automation infrastructure, and AI-powered solutions for modern businesses.
            </motion.p>

            <motion.div {...fadeIn} transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 transition-all duration-200 hover:-translate-y-0.5" asChild>
                <Link to="/services">
                  Explore Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg font-semibold rounded-xl border-border hover:border-primary/50 transition-all duration-200 hover:-translate-y-0.5" asChild>
                <Link to="/ai-tools-services">Browse Tools</Link>
              </Button>
            </motion.div>

            <LiveVisitorsIndicator />

            <motion.div {...fadeIn} transition={{ duration: 0.5, delay: 0.3 }} className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
              {[
                { value: "50000+", label: "Happy Clients" },
                { value: "100%", label: "Client Satisfaction" },
                { value: "24/7", label: "Support Available" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="font-display text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        <PurchaseNotification />
      </section>

      {/* ── Core Divisions ── */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-background via-muted/10 to-background">
        <div className="container px-4">
          <motion.div {...fadeIn} transition={{ duration: 0.5 }} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Our Core Divisions</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Four specialized verticals working together to power your digital ecosystem.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {divisions.map((d, i) => (
              <motion.div key={d.title} {...fadeIn} transition={{ duration: 0.4, delay: i * 0.08 }}>
                <Card className="group h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                      <d.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{d.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">{d.desc}</p>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link to={d.link}>
                        Learn More <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-20 md:py-28">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeIn} transition={{ duration: 0.5 }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                We combine strategic thinking, technical execution, and creative production under one framework — functioning as your external digital operations division.
              </p>
            </motion.div>
            <motion.div {...fadeIn} transition={{ duration: 0.5, delay: 0.15 }} className="space-y-4">
              {reasons.map((r) => (
                <div key={r} className="flex items-center gap-3 p-4 rounded-xl bg-card/50 border border-border/50">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="font-medium text-foreground">{r}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-muted/10 to-background">
        <div className="container px-4">
          <motion.div {...fadeIn} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto text-center">
            <Zap className="w-10 h-10 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Let's Build Your Digital Infrastructure
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              "Digital growth is not random. It is engineered."
            </p>
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-10 py-6 text-lg font-semibold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl" asChild>
              <Link to="/contact">
                Contact Us <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />

      {showChatbot && (
        <Suspense fallback={null}>
          <ChatBot />
        </Suspense>
      )}
    </main>
  );
};

export default Index;
