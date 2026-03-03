import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SEOHead } from "@/components/SEOHead";
import {
  Megaphone, Palette, Video, Target, BarChart3, Users,
  CheckCircle2, ArrowRight, Sparkles, TrendingUp, Lightbulb, Rocket,
} from "lucide-react";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay, ease: "easeOut" }} className={className}>
    {children}
  </motion.div>
);

const services = [
  { icon: Megaphone, title: "Social Media Management", desc: "End-to-end management of your social media presence across all platforms with strategic planning and execution." },
  { icon: Palette, title: "Content Creation & Design", desc: "Eye-catching graphics, branded templates, carousel posts, and professional visual content tailored to your brand." },
  { icon: Video, title: "Reels & Video Production", desc: "Short-form video content, trending reels, and engaging video stories optimized for maximum reach and engagement." },
  { icon: Target, title: "Paid Ads Management", desc: "ROI-focused advertising campaigns on Facebook, Instagram, TikTok, and LinkedIn with continuous optimization." },
  { icon: Users, title: "Lead Generation Campaigns", desc: "Strategic campaigns designed to capture qualified leads and convert followers into paying customers." },
  { icon: BarChart3, title: "Performance Reporting", desc: "Detailed monthly analytics, growth tracking, and actionable insights to measure and improve your results." },
];

const whyChoose = [
  { icon: TrendingUp, title: "Data-Driven Strategy", desc: "Every decision backed by analytics and market research for maximum impact." },
  { icon: Sparkles, title: "Creative Excellence", desc: "Stand-out designs and content that capture attention and build brand recognition." },
  { icon: Lightbulb, title: "Consistent Brand Growth", desc: "Steady, sustainable growth through proven methodologies and best practices." },
  { icon: BarChart3, title: "Monthly Performance Tracking", desc: "Transparent reporting with clear KPIs so you always know your ROI." },
];

const process = [
  { step: "01", title: "Strategy", desc: "Deep dive into your brand, audience, and goals to craft a winning roadmap.", icon: Lightbulb },
  { step: "02", title: "Create", desc: "Produce compelling content, visuals, and copy that resonates with your audience.", icon: Palette },
  { step: "03", title: "Launch", desc: "Execute campaigns across platforms with precision targeting and scheduling.", icon: Rocket },
  { step: "04", title: "Optimize", desc: "Analyze performance data and continuously refine for better results.", icon: TrendingUp },
];

const SocialMediaAgency = () => (
  <>
    <SEOHead
      title="Social Media Agency | Malik Data Centre"
      description="Strategic social media management — content creation, paid advertising, brand strategy, and performance-driven campaigns managed by experts."
    />
    <Navbar />

    {/* ── Hero ── */}
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-background via-[hsl(220,20%,6%)] to-background">
      {/* Ambient glows */}
      <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-primary/[0.06] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-secondary/[0.05] blur-[120px] pointer-events-none" />
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="container mx-auto px-4 relative z-10 py-28">
        <FadeIn className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/[0.06] text-primary text-xs font-medium tracking-widest uppercase mb-10">
            <Megaphone className="h-4 w-4" /> Social Media Agency
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.06] mb-7 tracking-tight text-foreground">
            Strategic Social Media<br className="hidden md:block" /> Management That Drives{" "}
            <span className="bg-gradient-to-r from-primary via-[hsl(var(--neon-cyan))] to-secondary bg-clip-text text-transparent">Growth</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Content creation, paid advertising, brand strategy, and performance-driven campaigns — all managed by experts.
          </p>
          <WhatsAppButton message="Hi, I'm interested in social media management services." size="lg">
            Get Free Consultation
          </WhatsAppButton>
        </FadeIn>
      </div>
    </section>

    {/* ── Services ── */}
    <section className="py-24 bg-background relative">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Services</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Everything you need to dominate social media and grow your brand online.</p>
        </FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.08}>
              <div className="group relative rounded-xl border border-border bg-card p-7 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_8px_30px_hsl(var(--primary)/0.08)] hover:-translate-y-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-5 group-hover:bg-primary/20 transition-colors">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* ── Why Choose Us ── */}
    <section className="py-24 bg-card/50 relative">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose Us</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">We combine creativity with data to deliver results that matter.</p>
        </FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChoose.map((w, i) => (
            <FadeIn key={w.title} delay={i * 0.08}>
              <div className="text-center p-6 rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/20 hover:-translate-y-1">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto mb-5">
                  <w.icon className="h-7 w-7" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{w.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* ── Process ── */}
    <section className="py-24 bg-background relative">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Process</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">A proven 4-step framework to grow your brand.</p>
        </FadeIn>
        <div className="grid md:grid-cols-4 gap-6 relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-primary/30 via-primary/50 to-primary/30" />
          {process.map((p, i) => (
            <FadeIn key={p.step} delay={i * 0.12}>
              <div className="text-center relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary/30 bg-card text-primary mx-auto mb-5 relative z-10">
                  <p.icon className="h-7 w-7" />
                </div>
                <span className="text-xs font-bold text-primary tracking-widest uppercase">Step {p.step}</span>
                <h3 className="text-lg font-semibold text-foreground mt-2 mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* ── Final CTA ── */}
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] via-background to-secondary/[0.06]" />
      <div className="container mx-auto px-4 relative z-10">
        <FadeIn className="max-w-3xl mx-auto text-center">
          <Sparkles className="h-10 w-10 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">Let's Grow Your Brand Online</h2>
          <p className="text-muted-foreground mb-10 max-w-lg mx-auto">
            Ready to transform your social media presence? Let's create a strategy that delivers real results.
          </p>
          <WhatsAppButton message="Hi, I want to grow my brand with your social media agency services." size="lg">
            Get Started Today
          </WhatsAppButton>
        </FadeIn>
      </div>
    </section>

    <Footer />
  </>
);

export default SocialMediaAgency;
