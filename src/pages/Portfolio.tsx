import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Bot, Zap, TrendingUp, Target, Video, Megaphone, Shield,
  Lock, Handshake, BarChart3, Layers, BrainCircuit, Mic,
  Workflow, ArrowRight, CheckCircle2, Eye, Rocket, Users
} from "lucide-react";
import { Button } from "@/components/ui/button";

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const activeProjects = [
  { icon: BrainCircuit, text: "Ongoing AI system development — intelligent automation platform" },
  { icon: TrendingUp, text: "Performance-driven social media growth campaigns" },
  { icon: Video, text: "YouTube growth optimization projects" },
  { icon: Megaphone, text: "Creative branding & content production engagements" },
  { icon: Workflow, text: "Automation system implementations for business workflows" },
];

const caseStudies = [
  {
    icon: BarChart3,
    title: "Campaign-Based Growth Strategy",
    color: "from-primary/20 to-primary/5",
    phases: [
      { label: "Objective", text: "Establish structured social media presence and sustained audience growth across platforms." },
      { label: "Strategy", text: "Platform management, content system design, performance advertising, and engagement improvement frameworks." },
      { label: "Execution", text: "Multi-platform rollout with data-driven content calendars, A/B-tested creatives, and community engagement protocols." },
      { label: "Outcome", text: "Significant growth in engagement rates, follower acquisition, and brand visibility within the target market." },
    ],
  },
  {
    icon: Video,
    title: "Video & Creative Content Production",
    color: "from-[hsl(0_100%_50%)]/20 to-[hsl(0_100%_50%)]/5",
    phases: [
      { label: "Objective", text: "Develop high-impact video content pipeline for brand storytelling and audience retention." },
      { label: "Strategy", text: "Short-form content strategy, promotional campaigns, and brand visual direction." },
      { label: "Execution", text: "End-to-end production from scripting to post-production with platform-optimized formats." },
      { label: "Outcome", text: "Measurable improvement in watch time, audience retention, and content-driven lead generation." },
    ],
  },
  {
    icon: Target,
    title: "Paid Ads & Lead Generation",
    color: "from-secondary/20 to-secondary/5",
    phases: [
      { label: "Objective", text: "Design and deploy high-conversion advertising funnels with measurable ROI." },
      { label: "Strategy", text: "Structured ad funnels, audience segmentation, conversion tracking, and retargeting frameworks." },
      { label: "Execution", text: "Multi-channel campaign deployment with granular audience targeting and iterative creative optimization." },
      { label: "Outcome", text: "Consistent cost-per-lead reduction and improved conversion rates across campaign cycles." },
    ],
  },
  {
    icon: Layers,
    title: "Full-Service Social Operations",
    color: "from-accent/30 to-accent/5",
    phases: [
      { label: "Objective", text: "Provide complete end-to-end social media operations management for scaling brands." },
      { label: "Strategy", text: "From strategy and creative production to paid advertising and performance tracking." },
      { label: "Execution", text: "Dedicated team model with structured reporting, content pipelines, and real-time campaign management." },
      { label: "Outcome", text: "Clients experienced sustained growth with reduced operational overhead and clear performance metrics." },
    ],
  },
];

const aiProjects = [
  { icon: Bot, title: "Custom AI Chatbot Development", desc: "Intelligent conversational agents designed for customer engagement, support, and lead qualification." },
  { icon: Mic, title: "Voice Agent Integrations", desc: "AI-powered voice systems for automated customer interactions and business communications." },
  { icon: Workflow, title: "Business Workflow Automation", desc: "End-to-end process automation reducing manual overhead and improving operational efficiency." },
  { icon: BrainCircuit, title: "Internal AI Assistant Systems", desc: "Custom-built AI assistants tailored to internal business operations and decision support." },
];

const trustPoints = [
  { icon: Layers, text: "Multi-domain digital expertise" },
  { icon: Rocket, text: "Structured execution model" },
  { icon: Lock, text: "Confidential project handling" },
  { icon: Handshake, text: "Long-term digital partnership approach" },
];

export default function Portfolio() {
  return (
    <main className="min-h-screen bg-background">
      <SEOHead
        title="Portfolio — Our Work & Active Projects"
        description="Explore Malik Data Centre's digital growth campaigns, AI systems, and creative projects executed across multiple industries."
        canonical="/portfolio"
      />
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="container px-4 relative z-10">
          <motion.div initial="hidden" animate="show" variants={fade} className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">Portfolio</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Our Work & Active <span className="gradient-text">Digital Projects</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              A selection of digital growth campaigns, AI systems, and creative projects executed across multiple industries.
            </p>
            <WhatsAppButton message="Hi! I'd like to request a case study from Malik Data Centre." size="lg">
              Request Case Study
            </WhatsAppButton>
          </motion.div>
        </div>
      </section>

      {/* ── Active Engagements ── */}
      <section className="py-20 bg-muted/20">
        <div className="container px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade} className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Current & Ongoing Projects</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Active engagements across AI development, digital marketing, and content systems.</p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto mb-10">
            {activeProjects.map((p, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade}>
                <Card className="glass-card border-border/50 h-full">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <p.icon className="h-5 w-5" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade} className="text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card border border-border/50 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 text-primary" />
              Select projects are under active development and covered by confidentiality agreements.
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Case Studies ── */}
      <section className="py-20">
        <div className="container px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade} className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">Case Studies</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Social Media & Campaign Portfolio</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer complete end-to-end social media operations management — from strategy and creative production to paid advertising and performance tracking.
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2">
            {caseStudies.map((cs, i) => (
              <motion.div key={cs.title} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade}>
                <Card className="glass-card border-border/50 h-full overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${cs.color}`} />
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <cs.icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-display text-xl font-bold text-foreground">{cs.title}</h3>
                    </div>
                    <div className="space-y-4">
                      {cs.phases.map((p) => (
                        <div key={p.label} className="flex gap-3">
                          <span className="shrink-0 mt-0.5 text-xs font-bold uppercase tracking-wider text-primary w-20">{p.label}</span>
                          <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI & Automation ── */}
      <section className="py-20 bg-muted/20">
        <div className="container px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade} className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-4">AI Division</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">AI Systems & Automation Projects</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Custom-built AI solutions tailored to client requirements.</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto mb-10">
            {aiProjects.map((p, i) => (
              <motion.div key={p.title} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade}>
                <Card className="glass-card border-border/50 h-full group hover:border-primary/30 transition-colors">
                  <CardContent className="p-7">
                    <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-5 group-hover:scale-110 transition-transform">
                      <p.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-2">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade} className="text-center">
            <p className="text-sm text-muted-foreground italic">
              Due to confidentiality agreements, some project details are shared privately upon request.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Trust Section ── */}
      <section className="py-20">
        <div className="container px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade} className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Clients Trust <span className="gradient-text">Malik Data Centre</span>
            </h2>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
            {trustPoints.map((t, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade} className="text-center">
                <div className="mx-auto h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <t.icon className="h-6 w-6" />
                </div>
                <p className="font-display font-semibold text-foreground text-sm">{t.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="container px-4 relative z-10 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade}>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Become Our Next <span className="gradient-text">Growth Partner?</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Let's discuss how we can architect a structured digital growth strategy for your business.
            </p>
            <WhatsAppButton message="Hi! I'd like to schedule a strategy call with Malik Data Centre." size="lg">
              Schedule Strategy Call
            </WhatsAppButton>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
