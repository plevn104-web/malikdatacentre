import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import {
  Megaphone,
  Video,
  Target,
  Filter,
  MessageSquare,
  Globe,
  Lightbulb,
  Palette,
  Rocket,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Users,
  Award,
} from "lucide-react";

/* ─── Animated Counter ─── */
const AnimatedCounter = ({ end, suffix = "" }: { end: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref as any, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end]);

  return <span ref={ref}>{count}{suffix}</span>;
};

/* ─── Fade-in wrapper ─── */
const FadeIn = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ─── Data ─── */
const services = [
  {
    icon: Megaphone,
    title: "Social Media Management",
    desc: "Strategy, content planning, post design, captions, scheduling & reporting.",
  },
  {
    icon: Video,
    title: "Video & Reels Production",
    desc: "High-quality short-form videos, promotional edits, brand storytelling.",
  },
  {
    icon: Target,
    title: "Paid Advertising",
    desc: "Facebook, Instagram & digital ad campaigns focused on lead generation and conversions.",
  },
  {
    icon: Filter,
    title: "Lead Generation Systems",
    desc: "Funnels, landing pages, tracking & optimization.",
  },
  {
    icon: MessageSquare,
    title: "Chat & Inquiry Management",
    desc: "Professional response handling and lead coordination.",
  },
  {
    icon: Globe,
    title: "Website Development",
    desc: "Modern, fast, mobile-optimized business websites.",
  },
];

const steps = [
  { icon: Lightbulb, title: "Strategy & Planning", step: 1 },
  { icon: Palette, title: "Creative Execution", step: 2 },
  { icon: Rocket, title: "Campaign Launch", step: 3 },
  { icon: BarChart3, title: "Optimization & Reporting", step: 4 },
];

const projects = [
  { name: "Brand Growth Campaign", goal: "Increase brand awareness by 200%", delivered: "30+ social creatives, paid ads, influencer outreach", outcome: "3× follower growth in 60 days" },
  { name: "Social Media Creative Pack", goal: "Revamp visual identity across platforms", delivered: "60 branded posts, story templates, highlight covers", outcome: "82% engagement increase" },
  { name: "Lead Generation Campaign", goal: "Drive qualified leads for B2B SaaS", delivered: "Landing pages, ad funnels, retargeting sequences", outcome: "450+ leads in 30 days" },
  { name: "Performance Ads Strategy", goal: "Maximize ROAS for e-commerce brand", delivered: "A/B ad creatives, audience segmentation, conversion tracking", outcome: "4.8× return on ad spend" },
  { name: "Business Website Project", goal: "Launch conversion-optimized company website", delivered: "Custom design, mobile-first build, SEO setup", outcome: "65% increase in web inquiries" },
  { name: "Creative Video Campaign", goal: "Produce viral-style brand content", delivered: "12 short-form videos, 4 brand films", outcome: "500K+ organic views" },
];

/* ─── Page ─── */
const DigitalGrowthAgency = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <>
      <SEOHead
        title="Digital Growth Agency | Malik Data Centre"
        description="We build powerful digital brands. Social media management, paid advertising, creative content & website solutions — all under one team."
      />
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />

        {/* ───────── HERO ───────── */}
        <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
          {/* Gradient orbs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]" />
            <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-secondary/10 blur-[140px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-accent/5 blur-[100px]" />
          </div>

          <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
            <FadeIn>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
                <Sparkles className="h-4 w-4" /> Digital Growth Agency
              </span>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6">
                We Build{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Powerful Digital
                </span>{" "}
                Brands.
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                Social Media Management, Paid Advertising, Creative Content & Website Solutions — All Under One Team.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <WhatsAppButton
                  message="Hi, I'd like a free consultation about your digital growth services."
                  size="lg"
                  className="min-w-[220px]"
                >
                  Get Free Consultation
                </WhatsAppButton>
                <Button variant="outline" size="lg" className="min-w-[220px]" asChild>
                  <a href="#portfolio">
                    View Our Work <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ───────── SERVICES ───────── */}
        <section className="py-20 md:py-28 bg-muted/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <FadeIn>
              <div className="text-center mb-14">
                <span className="text-primary text-sm font-semibold uppercase tracking-widest">What We Do</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-3">End-to-End Digital Services</h2>
                <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                  Everything your brand needs to grow, engage, and convert — handled by our expert team.
                </p>
              </div>
            </FadeIn>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s, i) => (
                <FadeIn key={s.title} delay={i * 0.08}>
                  <div className="group relative rounded-xl border border-border bg-card p-6 hover:border-primary/40 transition-all duration-300 hover:shadow-[var(--shadow-hover)] h-full">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
                      <s.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── OUR APPROACH ───────── */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 max-w-5xl">
            <FadeIn>
              <div className="text-center mb-14">
                <span className="text-primary text-sm font-semibold uppercase tracking-widest">Our Approach</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-3">How We Deliver Results</h2>
              </div>
            </FadeIn>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((s, i) => (
                <FadeIn key={s.step} delay={i * 0.1}>
                  <div className="relative text-center p-6 rounded-xl border border-border bg-card hover:border-primary/30 transition-all">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 text-primary font-bold text-lg mb-4">
                      {s.step}
                    </div>
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary mx-auto mb-3">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold">{s.title}</h3>
                    {i < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/3 -right-3 text-muted-foreground/30">
                        <ArrowRight className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── PORTFOLIO ───────── */}
        <section id="portfolio" className="py-20 md:py-28 bg-muted/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <FadeIn>
              <div className="text-center mb-14">
                <span className="text-primary text-sm font-semibold uppercase tracking-widest">Portfolio</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-3">Selected Work</h2>
              </div>
            </FadeIn>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((p, i) => (
                <FadeIn key={p.name} delay={i * 0.07}>
                  <button
                    onClick={() => setSelectedProject(selectedProject === i ? null : i)}
                    className="text-left w-full rounded-xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-[var(--shadow-hover)] transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <TrendingUp className="h-5 w-5" />
                      </div>
                      <h3 className="font-semibold">{p.name}</h3>
                    </div>

                    {selectedProject === i ? (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2 text-sm"
                      >
                        <p><span className="text-primary font-medium">Goal:</span> <span className="text-muted-foreground">{p.goal}</span></p>
                        <p><span className="text-primary font-medium">Delivered:</span> <span className="text-muted-foreground">{p.delivered}</span></p>
                        <p><span className="text-primary font-medium">Outcome:</span> <span className="text-muted-foreground">{p.outcome}</span></p>
                      </motion.div>
                    ) : (
                      <p className="text-sm text-muted-foreground">Click to view details →</p>
                    )}
                  </button>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── WHY CHOOSE US ───────── */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 max-w-5xl">
            <FadeIn>
              <div className="text-center mb-14">
                <span className="text-primary text-sm font-semibold uppercase tracking-widest">Why Us</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-3">Why Choose Malik Data Centre</h2>
              </div>
            </FadeIn>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: Target, title: "Strategy-Driven Execution", desc: "Every campaign begins with deep research and a clear roadmap aligned to your business objectives." },
                { icon: Sparkles, title: "AI-Powered Innovation", desc: "We leverage cutting-edge AI tools to optimize content, targeting, and performance at scale." },
                { icon: Globe, title: "End-to-End Digital Solutions", desc: "From brand identity to paid ads to web development — everything handled under one roof." },
                { icon: Users, title: "Long-Term Partnership Approach", desc: "We don't do one-off projects. We build lasting relationships focused on sustained growth." },
              ].map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.1}>
                  <div className="rounded-xl border border-border bg-card p-6 hover:border-primary/30 transition-all group">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── FINAL CTA ───────── */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/8 blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] rounded-full bg-secondary/8 blur-[100px]" />
          </div>

          <div className="container relative z-10 mx-auto px-4 max-w-3xl text-center">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Ready to{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Elevate
                </span>{" "}
                Your Digital Presence?
              </h2>
              <p className="text-muted-foreground mb-10 text-lg max-w-xl mx-auto">
                Let's talk about your goals and build a strategy that delivers real results.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <WhatsAppButton
                  message="Hi, I'd like to book a free consultation for my business."
                  size="lg"
                  className="min-w-[240px]"
                >
                  Book a Free Consultation
                </WhatsAppButton>
                <Button variant="outline" size="lg" className="min-w-[180px]" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default DigitalGrowthAgency;
