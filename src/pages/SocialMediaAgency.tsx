import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SEOHead } from "@/components/SEOHead";
import {
  Megaphone, Palette, Video, Target, BarChart3,
  ArrowRight, Sparkles, TrendingUp, Lightbulb, Rocket,
  MessageSquare, Globe, PenTool, CheckCircle2,
  Layers, Shield, Building2, Store, Briefcase, MapPin,
} from "lucide-react";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay, ease: "easeOut" }} className={className}>
    {children}
  </motion.div>
);

const services = [
  {
    icon: Megaphone, title: "Strategic Social Media Management",
    bullets: ["Advanced Content Planning Framework", "Brand-Aligned Creative Production", "Platform-Specific Optimization", "Performance Analytics & Insights", "Structured Monthly Reporting", "Audience Behavior Analysis"],
    tagline: "We transform social media into a strategic growth channel.",
  },
  {
    icon: Video, title: "High-Impact Video & Creative Production",
    bullets: ["Short-Form Video Systems", "Campaign-Based Visual Content", "Professional Post-Production", "Platform-Optimized Creative Assets", "Engagement-Focused Editing"],
    tagline: "Designed to increase reach, retention, and brand authority.",
  },
  {
    icon: Target, title: "Performance Advertising & Lead Generation",
    bullets: ["Advanced Ad Campaign Architecture", "Conversion-Optimized Funnel Design", "Data-Driven Audience Segmentation", "Continuous A/B Testing", "ROI-Based Optimization Strategy", "Transparent Reporting Framework"],
    tagline: "Ad budgets are structured separately for transparency and scalability.",
  },
  {
    icon: MessageSquare, title: "Communication & Inquiry Management",
    bullets: ["Structured Lead Response System", "Inbox & DM Management", "Inquiry Qualification Framework", "Response Automation Integration", "Working-Hour Support Management"],
    tagline: "Ensuring zero lead leakage and improved conversion efficiency.",
  },
  {
    icon: Globe, title: "Web Infrastructure & Digital Foundation",
    bullets: ["High-Performance Business Websites", "Conversion-Focused Landing Pages", "Technical Optimization", "Speed & Mobile Performance", "SEO-Ready Architecture", "Ongoing Technical Maintenance"],
    tagline: "Your website becomes the backbone of your digital ecosystem.",
  },
  {
    icon: PenTool, title: "Creative & Brand Development",
    bullets: ["Strategic Brand Positioning", "Visual Identity Systems", "Marketing Collateral Design", "Campaign Asset Development", "Event & Promotional Media Coverage"],
    tagline: "",
  },
];

const frameworkSteps = [
  { step: "01", title: "Strategic Discovery & Planning", icon: Lightbulb },
  { step: "02", title: "Content & Asset Production", icon: Palette },
  { step: "03", title: "Campaign Deployment", icon: Rocket },
  { step: "04", title: "Data Monitoring & Optimization", icon: TrendingUp },
  { step: "05", title: "Performance Reporting & Scaling", icon: BarChart3 },
];

const whyUs = [
  "Multi-Domain Digital Expertise",
  "Structured System-Based Approach",
  "Performance & Data Orientation",
  "Scalable Growth Architecture",
  "Long-Term Strategic Partnership",
];

const industries = [
  { icon: Briefcase, label: "Service-Based Businesses" },
  { icon: Store, label: "E-commerce Brands" },
  { icon: Shield, label: "Professional Firms" },
  { icon: Building2, label: "Growing Enterprises" },
  { icon: MapPin, label: "Multi-Location Operations" },
];

const SocialMediaAgency = () => (
  <>
    <SEOHead
      title="Enterprise Digital Growth & Media Management | Malik Data Centre"
      description="Structured social media systems, performance advertising, high-impact creative content, and digital infrastructure — engineered for scalable business growth."
    />
    <Navbar />

    {/* ── Hero ── */}
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-background via-[hsl(220,20%,6%)] to-background">
      <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-primary/[0.06] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-secondary/[0.05] blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="container mx-auto px-4 relative z-10 py-28">
        <FadeIn className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/[0.06] text-primary text-xs font-medium tracking-widest uppercase mb-10">
            <Layers className="h-4 w-4" /> Enterprise Digital Solutions
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.06] mb-7 tracking-tight text-foreground">
            Enterprise-Grade Digital<br className="hidden md:block" /> Growth &{" "}
            <span className="bg-gradient-to-r from-primary via-[hsl(var(--neon-cyan))] to-secondary bg-clip-text text-transparent">Media Management</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Structured social media systems, performance advertising, high-impact creative content, and digital infrastructure — engineered for scalable business growth.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <WhatsAppButton message="Hi, I'd like to schedule a strategy call to discuss enterprise digital growth services." size="lg">
              Schedule Strategy Call
            </WhatsAppButton>
            <WhatsAppButton message="Hi, I'd like to request a capability deck outlining your digital services." size="lg">
              Request Capability Deck
            </WhatsAppButton>
          </div>
        </FadeIn>
      </div>
    </section>

    {/* ── Strategic Positioning ── */}
    <section className="py-24 bg-card/50 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">A Structured Approach to Digital Expansion</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="relative rounded-2xl border border-border bg-card p-8 md:p-12">
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-6">
                At Malik Data Centre, we operate beyond traditional social media management. We design and implement structured digital growth systems that integrate content, advertising, communication, and web infrastructure into one scalable framework.
              </p>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-8">
                Our focus is long-term performance, measurable outcomes, and operational efficiency.
              </p>
              <div className="flex items-center gap-3 px-5 py-3 rounded-lg bg-primary/[0.06] border border-primary/15 w-fit mx-auto">
                <Sparkles className="h-5 w-5 text-primary shrink-0" />
                <p className="text-sm md:text-base font-medium text-foreground italic">
                  "Digital growth is not random. It is engineered."
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>

    {/* ── Core Enterprise Services ── */}
    <section className="py-24 bg-background relative">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Core Enterprise Services</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">End-to-end digital capabilities designed for scalable business growth.</p>
        </FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.06}>
              <div className="group relative rounded-xl border border-border bg-card p-7 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_8px_30px_hsl(var(--primary)/0.08)] hover:-translate-y-1 h-full flex flex-col">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-5 group-hover:bg-primary/20 transition-colors">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">{s.title}</h3>
                <ul className="space-y-1.5 mb-4 flex-1">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                {s.tagline && (
                  <p className="text-xs text-primary/80 font-medium border-t border-border pt-3 mt-auto">{s.tagline}</p>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* ── Digital Framework ── */}
    <section className="py-24 bg-card/50 relative">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Digital Framework</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">A 5-step structured execution model for predictable, scalable growth.</p>
        </FadeIn>
        <div className="grid md:grid-cols-5 gap-6 mt-16 relative">
          <div className="hidden md:block absolute top-16 left-[10%] right-[10%] h-px bg-gradient-to-r from-primary/30 via-primary/50 to-primary/30" />
          {frameworkSteps.map((p, i) => (
            <FadeIn key={p.step} delay={i * 0.1}>
              <div className="text-center relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary/30 bg-card text-primary mx-auto mb-5 relative z-10">
                  <p.icon className="h-7 w-7" />
                </div>
                <span className="text-xs font-bold text-primary tracking-widest uppercase">Step {p.step}</span>
                <h3 className="text-sm font-semibold text-foreground mt-2 leading-snug">{p.title}</h3>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.5} className="text-center mt-10">
          <p className="text-muted-foreground text-sm">This ensures predictable, scalable growth.</p>
        </FadeIn>
      </div>
    </section>

    {/* ── Why Enterprise Clients Work With Us ── */}
    <section className="py-24 bg-background relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Enterprise Clients Work With Us</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {whyUs.map((item) => (
                <div key={item} className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/20 transition-colors">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-foreground font-medium text-sm">{item}</span>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.2} className="text-center">
            <p className="text-muted-foreground text-base md:text-lg">
              We function as an external digital operations division for our clients.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>

    {/* ── Industries We Support ── */}
    <section className="py-24 bg-card/50 relative">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Industries We Support</h2>
        </FadeIn>
        <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
          {industries.map((ind, i) => (
            <FadeIn key={ind.label} delay={i * 0.08}>
              <div className="flex items-center gap-3 px-6 py-4 rounded-xl border border-border bg-card hover:border-primary/25 transition-colors">
                <ind.icon className="h-5 w-5 text-primary shrink-0" />
                <span className="text-foreground font-medium text-sm">{ind.label}</span>
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
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">Ready to Build a Structured Digital Growth System?</h2>
          <p className="text-muted-foreground mb-10 max-w-lg mx-auto">
            Partner with a team that combines creativity, strategy, and technical execution under one framework.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <WhatsAppButton message="Hi, I'd like to book an executive consultation for digital growth services." size="lg">
              Book Executive Consultation
            </WhatsAppButton>
            <WhatsAppButton message="Hi, I'd like to discuss a growth plan for my business." size="lg">
              Discuss Your Growth Plan
            </WhatsAppButton>
          </div>
        </FadeIn>
      </div>
    </section>

    <Footer />
  </>
);

export default SocialMediaAgency;
