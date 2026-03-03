import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Megaphone, Video, Target, ArrowRight, Sparkles, TrendingUp, Lightbulb, Rocket,
  MessageSquare, Globe, PenTool, CheckCircle2, Layers, BarChart3, Shield,
  Users, Handshake, LineChart, LayoutGrid, Bot, Zap, Play, Eye,
} from "lucide-react";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay, ease: "easeOut" }} className={className}>
    {children}
  </motion.div>
);

const WHATSAPP_STRATEGY = "https://wa.me/923489057646?text=Hi%2C%20I%27d%20like%20to%20book%20a%20strategy%20session%20to%20discuss%20social%20media%20growth%20for%20my%20brand.";
const WHATSAPP_DECK = "https://wa.me/923489057646?text=Hi%2C%20I%27d%20like%20to%20download%20the%20capability%20deck%20for%20your%20digital%20growth%20services.";

const pillars = [
  {
    icon: LayoutGrid,
    title: "Content Systems",
    desc: "We architect structured content pipelines — from brand-aligned editorial calendars to platform-specific creative production — ensuring consistency, reach, and audience retention at scale.",
    bullets: ["Advanced Content Planning Framework", "Brand-Aligned Creative Production", "Platform-Specific Optimization", "Audience Behavior Analysis", "Structured Monthly Reporting"],
  },
  {
    icon: Target,
    title: "Performance Advertising",
    desc: "Data-driven ad campaign architecture built for measurable ROI — from conversion-optimized funnels to continuous testing and transparent reporting frameworks.",
    bullets: ["Advanced Ad Campaign Architecture", "Conversion-Optimized Funnel Design", "Data-Driven Audience Segmentation", "Continuous A/B Testing", "ROI-Based Optimization Strategy"],
  },
  {
    icon: Globe,
    title: "Digital Infrastructure",
    desc: "High-performance websites, communication systems, and automation integrations that form the operational backbone of your digital ecosystem.",
    bullets: ["High-Performance Business Websites", "Conversion-Focused Landing Pages", "Lead Response & Inbox Management", "Response Automation Integration", "SEO-Ready Architecture"],
  },
];

const frameworkSteps = [
  { step: "01", title: "Discovery", desc: "Deep-dive into brand, goals, and competitive landscape.", icon: Lightbulb },
  { step: "02", title: "Strategy Mapping", desc: "Build the content, ad, and infrastructure roadmap.", icon: LineChart },
  { step: "03", title: "Content & Asset Creation", desc: "Produce brand-aligned creative and campaign assets.", icon: PenTool },
  { step: "04", title: "Campaign Deployment", desc: "Launch across channels with precision targeting.", icon: Rocket },
  { step: "05", title: "Data Optimization", desc: "Monitor, test, and scale what performs.", icon: TrendingUp },
];

const highTicketPoints = [
  { icon: Handshake, text: "Long-Term Strategic Partnerships" },
  { icon: BarChart3, text: "Structured Monthly Reporting" },
  { icon: Users, text: "Dedicated Team Model" },
  { icon: TrendingUp, text: "Performance-Driven Campaigns" },
];

const SocialMediaAgency = () => (
  <>
    <SEOHead
      title="Social Media Growth Agency | Malik Data Centre"
      description="Engineered social media growth for serious brands. Structured content systems, performance advertising, and digital infrastructure that scales."
    />
    <Navbar />

    {/* ── Hero ── */}
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-to-br from-background via-[hsl(220,20%,6%)] to-background">
      <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-primary/[0.06] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-secondary/[0.05] blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)", backgroundSize: "56px 56px" }} />

      <div className="container mx-auto px-4 relative z-10 py-28">
        <FadeIn className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/20 bg-primary/[0.06] text-primary text-xs font-medium tracking-widest uppercase mb-10">
            <Layers className="h-4 w-4" /> Social Media Agency
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.06] mb-7 tracking-tight text-foreground">
            Engineered Social Media Growth{" "}
            <span className="bg-gradient-to-r from-primary via-[hsl(var(--neon-cyan))] to-secondary bg-clip-text text-transparent">for Serious Brands</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            We design structured content systems, performance advertising strategies, and digital growth frameworks that scale.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-10 py-6 text-lg font-semibold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 transition-all duration-200 hover:-translate-y-0.5"
            asChild
          >
            <a href={WHATSAPP_STRATEGY} target="_blank" rel="noopener noreferrer">
              Book Strategy Session <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </FadeIn>
      </div>
    </section>

    {/* ── Authority ── */}
    <section className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <FadeIn className="max-w-3xl mx-auto text-center">
          <div className="relative rounded-2xl border border-border bg-card p-10 md:p-14">
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <Shield className="w-10 h-10 text-primary mx-auto mb-6" />
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              We operate as an <span className="text-foreground font-semibold">external digital growth division</span> — combining strategy, creative production, and paid advertising under one performance-driven framework.
            </p>
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-lg bg-primary/[0.06] border border-primary/15">
              <Sparkles className="h-5 w-5 text-primary shrink-0" />
              <p className="text-sm md:text-base font-medium text-foreground italic">
                "Digital growth is not random. It is engineered."
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>

    {/* ── 3 Pillars ── */}
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Three Growth Pillars</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Enterprise-grade capabilities structured into three integrated verticals.</p>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {pillars.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.1}>
              <Card className="group h-full bg-card/60 backdrop-blur-sm border-border/50 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <p.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{p.desc}</p>
                  <ul className="space-y-2 mt-auto pt-5 border-t border-border/30">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* ── 5-Step Framework ── */}
    <section className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our 5-Step Growth Framework</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">A structured execution model that turns strategy into measurable outcomes.</p>
        </FadeIn>
        <div className="max-w-4xl mx-auto space-y-4">
          {frameworkSteps.map((s, i) => (
            <FadeIn key={s.step} delay={i * 0.08}>
              <div className="flex items-start gap-5 p-6 rounded-xl border border-border bg-card hover:border-primary/25 transition-colors group">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border-2 border-primary/30 bg-primary/5 text-primary shrink-0 group-hover:bg-primary/10 transition-colors">
                  <s.icon className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-primary tracking-widest uppercase">Step {s.step}</span>
                  <h3 className="text-lg font-semibold text-foreground mt-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* ── High-Ticket Positioning ── */}
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built for Businesses That Want Scalable Growth
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We work with brands that are serious about long-term digital infrastructure — not quick fixes. Our model is built on structured execution, accountability, and measurable impact.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="space-y-4">
              {highTicketPoints.map((p) => (
                <div key={p.text} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/25 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <p.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">{p.text}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>

    {/* ── Case Studies ── */}
    <section className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium tracking-widest uppercase mb-4">Results</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Proven Growth Case Studies</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Structured execution. Measurable outcomes. Real business impact.</p>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Case Study 1 */}
          <FadeIn delay={0}>
            <Card className="group h-full bg-card/60 backdrop-blur-sm border-border/50 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-primary to-primary/40" />
              <CardContent className="p-7">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">Social Media Growth System</h3>
                <p className="text-xs text-muted-foreground mb-5">Client Type: Service-Based Digital Brand</p>

                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">Objective</span>
                    <ul className="mt-1.5 space-y-1">
                      {["Improve brand visibility", "Increase engagement consistency", "Generate qualified inbound leads"].map(t => (
                        <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground"><CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">Strategy</span>
                    <ul className="mt-1.5 space-y-1">
                      {["Structured monthly content calendar", "Reels-driven engagement model", "Paid ad funnel integration", "Caption & hashtag optimization"].map(t => (
                        <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground"><CheckCircle2 className="h-3.5 w-3.5 text-primary/60 shrink-0 mt-0.5" />{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">Execution</span>
                    <ul className="mt-1.5 space-y-1">
                      {["16–20 posts monthly", "Short-form video strategy", "Performance-based advertising", "Weekly optimization tracking"].map(t => (
                        <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground"><CheckCircle2 className="h-3.5 w-3.5 text-primary/60 shrink-0 mt-0.5" />{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-3 border-t border-border/30">
                    <span className="text-xs font-bold uppercase tracking-wider text-foreground">Outcome</span>
                    <ul className="mt-1.5 space-y-1">
                      {["Stronger brand consistency", "Increased engagement structure", "Improved lead quality"].map(t => (
                        <li key={t} className="flex items-start gap-2 text-sm text-foreground/80 font-medium"><Zap className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Case Study 2 */}
          <FadeIn delay={0.1}>
            <Card className="group h-full bg-card/60 backdrop-blur-sm border-border/50 hover:border-secondary/40 hover:shadow-xl hover:shadow-secondary/5 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-secondary to-secondary/40" />
              <CardContent className="p-7">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-5 group-hover:bg-secondary/20 transition-colors">
                  <Bot className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">AI Chatbot & Automation Integration</h3>
                <p className="text-xs text-muted-foreground mb-5">Client Type: Growing Business</p>

                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-secondary">Objective</span>
                    <ul className="mt-1.5 space-y-1">
                      {["Reduce manual inquiry handling", "Improve response speed", "Capture leads automatically"].map(t => (
                        <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground"><CheckCircle2 className="h-3.5 w-3.5 text-secondary shrink-0 mt-0.5" />{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-secondary">Strategy</span>
                    <ul className="mt-1.5 space-y-1">
                      {["Custom AI chatbot system", "WhatsApp automation flow", "Lead qualification logic", "CRM routing integration"].map(t => (
                        <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground"><CheckCircle2 className="h-3.5 w-3.5 text-secondary/60 shrink-0 mt-0.5" />{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-secondary">Execution</span>
                    <ul className="mt-1.5 space-y-1">
                      {["24/7 automated responses", "Pre-qualified lead filtering", "Structured conversation framework"].map(t => (
                        <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground"><CheckCircle2 className="h-3.5 w-3.5 text-secondary/60 shrink-0 mt-0.5" />{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-3 border-t border-border/30">
                    <span className="text-xs font-bold uppercase tracking-wider text-foreground">Outcome</span>
                    <ul className="mt-1.5 space-y-1">
                      {["Faster response time", "Reduced manual workload", "Improved operational efficiency"].map(t => (
                        <li key={t} className="flex items-start gap-2 text-sm text-foreground/80 font-medium"><Zap className="h-3.5 w-3.5 text-secondary shrink-0 mt-0.5" />{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Case Study 3 */}
          <FadeIn delay={0.2}>
            <Card className="group h-full bg-card/60 backdrop-blur-sm border-border/50 hover:border-[hsl(0,100%,50%)]/40 hover:shadow-xl hover:shadow-[hsl(0,100%,50%)]/5 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-[hsl(0,100%,50%)] to-[hsl(0,100%,50%)]/40" />
              <CardContent className="p-7">
                <div className="w-12 h-12 rounded-xl bg-[hsl(0,100%,50%)]/10 flex items-center justify-center mb-5 group-hover:bg-[hsl(0,100%,50%)]/20 transition-colors">
                  <Play className="w-6 h-6 text-[hsl(0,100%,50%)]" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">YouTube Growth & Optimization</h3>
                <p className="text-xs text-muted-foreground mb-5">Client Type: Digital Content Brand</p>

                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[hsl(0,100%,50%)]">Objective</span>
                    <ul className="mt-1.5 space-y-1">
                      {["Accelerate channel growth", "Improve watch time", "Increase subscriber base"].map(t => (
                        <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground"><CheckCircle2 className="h-3.5 w-3.5 text-[hsl(0,100%,50%)] shrink-0 mt-0.5" />{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[hsl(0,100%,50%)]">Strategy</span>
                    <ul className="mt-1.5 space-y-1">
                      {["Channel audit & optimization", "Retention-focused content planning", "Thumbnail & metadata redesign", "Algorithm-aligned publishing"].map(t => (
                        <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground"><CheckCircle2 className="h-3.5 w-3.5 text-[hsl(0,100%,50%)]/60 shrink-0 mt-0.5" />{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[hsl(0,100%,50%)]">Execution</span>
                    <ul className="mt-1.5 space-y-1">
                      {["Structured content scheduling", "Watch-time optimization", "Growth service integration"].map(t => (
                        <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground"><CheckCircle2 className="h-3.5 w-3.5 text-[hsl(0,100%,50%)]/60 shrink-0 mt-0.5" />{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-3 border-t border-border/30">
                    <span className="text-xs font-bold uppercase tracking-wider text-foreground">Outcome</span>
                    <ul className="mt-1.5 space-y-1">
                      {["Improved discoverability", "Higher engagement structure", "Consistent performance tracking"].map(t => (
                        <li key={t} className="flex items-start gap-2 text-sm text-foreground/80 font-medium"><Zap className="h-3.5 w-3.5 text-[hsl(0,100%,50%)] shrink-0 mt-0.5" />{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>

    {/* ── Closing Pitch ── */}
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <FadeIn className="max-w-3xl mx-auto">
          <div className="relative rounded-2xl border border-border bg-card p-10 md:p-14">
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
              Ready to Hand Over Your Social Media to Experts?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
              <p>
                Managing social media is not about random posting. It requires <span className="text-foreground font-medium">structured strategy, creative production, paid advertising, and continuous performance optimization</span>.
              </p>
              <p>
                At Malik Data Centre, we provide complete end-to-end social media management — from content creation and ad campaigns to inquiry handling and performance reporting.
              </p>
              <p className="text-foreground font-medium italic">
                We operate as a structured digital growth partner, not just a service provider.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-8 py-6 text-base font-semibold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                asChild
              >
                <a href={WHATSAPP_STRATEGY} target="_blank" rel="noopener noreferrer">
                  Schedule Strategy Call <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <WhatsAppButton message="Hi! I'm interested in full social media management services from Malik Data Centre." size="lg">
                Start Full Management
              </WhatsAppButton>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>

    {/* ── Final CTA ── */}
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-background to-secondary/[0.04]" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
      <div className="container mx-auto px-4 relative z-10">
        <FadeIn className="max-w-3xl mx-auto text-center">
          <Sparkles className="h-10 w-10 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Scale with Structure?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-lg mx-auto">
            Partner with a team that engineers growth — not guesses it.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-10 py-6 text-lg font-semibold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
              asChild
            >
              <a href={WHATSAPP_STRATEGY} target="_blank" rel="noopener noreferrer">
                Schedule Executive Call <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="px-10 py-6 text-lg font-semibold rounded-xl border-border hover:border-primary/50 transition-all duration-200 hover:-translate-y-0.5" asChild>
              <a href={WHATSAPP_DECK} target="_blank" rel="noopener noreferrer">
                Download Capability Deck
              </a>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>

    <Footer />
  </>
);

export default SocialMediaAgency;
