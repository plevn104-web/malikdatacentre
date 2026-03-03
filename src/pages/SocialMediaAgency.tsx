import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SEOHead } from "@/components/SEOHead";
import {
  Megaphone, Palette, Video, Target, BarChart3, Users,
  ArrowRight, Sparkles, TrendingUp, Lightbulb, Rocket,
  MessageSquare, Globe, PenTool, CheckCircle2, ChevronRight,
  Layers, Eye, FileText, Camera,
} from "lucide-react";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay, ease: "easeOut" }} className={className}>
    {children}
  </motion.div>
);

const services = [
  {
    icon: Megaphone, title: "Social Media Management",
    desc: "We handle complete social media operations including:",
    bullets: ["Monthly Content Planning & Strategy", "Post Design & Creative Content Creation", "Caption Writing with Optimized Hashtags", "Facebook & Instagram Page Management", "Content Calendar Planning", "Monthly Performance Reporting"],
    tagline: "Our focus is consistency, branding, and audience engagement.",
  },
  {
    icon: Video, title: "Video Production & Reels Creation",
    desc: "Professional short-form and promotional content including:",
    bullets: ["Short Reels Creation", "Promotional & Highlight Videos", "Campaign-Based Video Content", "Activity & Achievement Showcases", "Professional Editing with Transitions & Music"],
    tagline: "Video content designed to increase reach and engagement.",
  },
  {
    icon: Target, title: "Paid Advertising Management",
    desc: "Performance-driven ad campaigns designed for growth:",
    bullets: ["Facebook & Instagram Ads Setup", "Lead Generation Campaigns", "Audience Targeting & Optimization", "A/B Testing for Maximum Results", "Monthly Ads Performance Reports"],
    tagline: "Ad budget is managed separately from service fees.",
  },
  {
    icon: MessageSquare, title: "Chat & Inquiry Support",
    desc: "We manage digital communication professionally:",
    bullets: ["Facebook & Instagram Inbox Handling", "Customer Inquiry Responses", "Basic Information Sharing", "Forwarding Qualified Leads to Management", "Response During Official Working Hours"],
    tagline: "This ensures no opportunity is missed.",
  },
  {
    icon: Globe, title: "Website Development & Management",
    desc: "Modern, fast, and conversion-focused websites:",
    bullets: ["Professional Business Website Development", "Landing Page Creation", "Contact & Inquiry Forms Integration", "Regular Updates & Maintenance", "Speed & Mobile Optimization", "Basic SEO Setup"],
    tagline: "Your website becomes your digital foundation.",
  },
  {
    icon: PenTool, title: "Additional Creative Services",
    desc: "Expand your brand with premium creative solutions:",
    bullets: ["Event Coverage & Highlight Creation", "Branding Strategy Development", "Logo & Creative Designing", "Brochure / Marketing Material Designing", "Photography Coordination"],
    tagline: "",
  },
];

const processSteps = [
  { step: "01", title: "Strategy", desc: "Deep analysis of your brand, market, and goals to craft a winning roadmap.", icon: Lightbulb },
  { step: "02", title: "Content Creation", desc: "Produce compelling visuals, videos, and copy that resonate with your audience.", icon: Palette },
  { step: "03", title: "Campaign Launch", desc: "Execute campaigns across platforms with precision targeting and scheduling.", icon: Rocket },
  { step: "04", title: "Optimization", desc: "Analyze performance data and continuously refine for better results.", icon: TrendingUp },
  { step: "05", title: "Reporting", desc: "Transparent monthly reports with clear KPIs so you always know your ROI.", icon: BarChart3 },
];

const whyUs = [
  "Complete Digital Media Handling",
  "Dedicated Team Structure",
  "Performance-Focused Advertising",
  "Structured Monthly Management",
  "Long-Term Growth Approach",
];

const SocialMediaAgency = () => (
  <>
    <SEOHead
      title="Social Media Agency | Malik Data Centre"
      description="Strategic social media & digital growth solutions — content creation, paid advertising, website management, and online support managed by a dedicated expert team."
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
            <Megaphone className="h-4 w-4" /> Social Media Agency
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.06] mb-7 tracking-tight text-foreground">
            Strategic Social Media &<br className="hidden md:block" /> Digital{" "}
            <span className="bg-gradient-to-r from-primary via-[hsl(var(--neon-cyan))] to-secondary bg-clip-text text-transparent">Growth Solutions</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Complete content creation, advertising, website management, and online support — managed by a dedicated expert team.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <WhatsAppButton message="Hi, I'm interested in a free consultation for social media & digital growth services." size="lg">
              Get Free Consultation
            </WhatsAppButton>
            <WhatsAppButton message="Hi, I'd like to see your portfolio and previous work." size="lg">
              View Our Work
            </WhatsAppButton>
          </div>
        </FadeIn>
      </div>
    </section>

    {/* ── About Our Agency ── */}
    <section className="py-24 bg-card/50 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">About Our Agency</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="relative rounded-2xl border border-border bg-card p-8 md:p-12">
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-6">
                At Malik Data Centre, we provide complete digital media management designed to strengthen brand presence, increase engagement, and generate measurable growth.
              </p>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-8">
                We don't just post content — we build structured digital systems that combine creativity, strategy, and performance optimization.
              </p>
              <div className="flex items-center gap-3 px-5 py-3 rounded-lg bg-primary/[0.06] border border-primary/15 w-fit mx-auto">
                <Sparkles className="h-5 w-5 text-primary shrink-0" />
                <p className="text-sm md:text-base font-medium text-foreground italic">
                  "We don't just manage social media, we engineer digital growth systems."
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>

    {/* ── Core Services ── */}
    <section className="py-24 bg-background relative">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Core Services</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Everything you need to dominate digital and grow your brand online.</p>
        </FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.06}>
              <div className="group relative rounded-xl border border-border bg-card p-7 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_8px_30px_hsl(var(--primary)/0.08)] hover:-translate-y-1 h-full flex flex-col">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-5 group-hover:bg-primary/20 transition-colors">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{s.desc}</p>
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

    {/* ── Process ── */}
    <section className="py-24 bg-card/50 relative">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Process</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">We combine structured planning with performance tracking to ensure long-term growth.</p>
        </FadeIn>
        <div className="grid md:grid-cols-5 gap-6 relative">
          <div className="hidden md:block absolute top-16 left-[10%] right-[10%] h-px bg-gradient-to-r from-primary/30 via-primary/50 to-primary/30" />
          {processSteps.map((p, i) => (
            <FadeIn key={p.step} delay={i * 0.1}>
              <div className="text-center relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary/30 bg-card text-primary mx-auto mb-5 relative z-10">
                  <p.icon className="h-7 w-7" />
                </div>
                <span className="text-xs font-bold text-primary tracking-widest uppercase">Step {p.step}</span>
                <h3 className="text-base font-semibold text-foreground mt-2 mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* ── Why Work With Us ── */}
    <section className="py-24 bg-background relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Work With Us</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {whyUs.map((item, i) => (
                <div key={item} className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/20 transition-colors">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-foreground font-medium text-sm">{item}</span>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.2} className="text-center">
            <p className="text-muted-foreground text-base md:text-lg">
              We act as your digital growth partner — not just a service provider.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>

    {/* ── Final CTA ── */}
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] via-background to-secondary/[0.06]" />
      <div className="container mx-auto px-4 relative z-10">
        <FadeIn className="max-w-3xl mx-auto text-center">
          <Sparkles className="h-10 w-10 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">Ready to Strengthen Your Digital Presence?</h2>
          <p className="text-muted-foreground mb-10 max-w-lg mx-auto">
            Let's build a structured digital strategy that delivers measurable results.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <WhatsAppButton message="Hi, I'd like to schedule a consultation for digital growth services." size="lg">
              Schedule Consultation
            </WhatsAppButton>
            <WhatsAppButton message="Hi, I'd like to talk to your team about social media management." size="lg">
              Talk to Our Team
            </WhatsAppButton>
          </div>
        </FadeIn>
      </div>
    </section>

    <Footer />
  </>
);

export default SocialMediaAgency;
