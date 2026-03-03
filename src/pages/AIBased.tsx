import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import {
  Bot,
  Phone,
  Globe,
  MessageSquare,
  Zap,
  Shield,
  Settings,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Brain,
  Mic,
  Plug,
  Target,
  ClipboardList,
  Rocket,
  Headphones,
  ShoppingCart,
  GraduationCap,
  Building2,
  Briefcase,
} from "lucide-react";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const capabilities = [
  "24/7 Customer Support",
  "Instant Response to Queries",
  "Lead Capture & Qualification",
  "Appointment Booking",
  "Product/Service Information",
  "FAQ Automation",
  "Order Tracking",
  "Smart Conversation Handling",
  "Multi-language Support",
  "CRM Integration",
];

const chatbotBenefits = [
  "Reduce staff workload",
  "Faster response time",
  "Higher customer satisfaction",
  "Increased lead conversion",
  "Lower operational cost",
  "24/7 availability",
];

const voiceCapabilities = [
  "Make outbound calls automatically",
  "Handle inbound calls",
  "Follow conversation scripts intelligently",
  "Answer FAQs naturally",
  "Book appointments",
  "Send follow-up messages",
  "Qualify leads before human handover",
  "Conduct surveys",
  "Send reminders",
];

const voiceUseCases = [
  "Sales follow-ups",
  "Appointment confirmations",
  "Lead qualification",
  "Customer support",
  "Payment reminders",
  "Feedback collection",
  "Campaign outreach",
];

const assistantCapabilities = [
  "Access internal documents",
  "Answer company-specific queries",
  "Assist teams internally",
  "Automate repetitive workflows",
  "Generate reports",
  "Manage customer communication",
  "Connect with APIs & software tools",
];

const integrations = [
  "CRM platforms",
  "Google Sheets",
  "Email systems",
  "WhatsApp Business",
  "Websites",
  "Payment systems",
  "Appointment systems",
];

const whyChoose = [
  { title: "Custom-Built AI Solutions", desc: "Tailored to your exact business workflows and goals." },
  { title: "Business-Focused Implementation", desc: "Every system is designed to deliver measurable results." },
  { title: "Secure & Scalable Systems", desc: "Enterprise-grade security with room to grow." },
  { title: "Ongoing Optimization & Support", desc: "Continuous improvement and dedicated assistance." },
  { title: "Strategy + Technical Execution Combined", desc: "We plan, build, and optimize — end to end." },
];

const processSteps = [
  { step: 1, title: "Requirement Analysis", icon: ClipboardList },
  { step: 2, title: "AI Strategy Design", icon: Target },
  { step: 3, title: "Bot/Agent Development", icon: Settings },
  { step: 4, title: "Testing & Optimization", icon: Zap },
  { step: 5, title: "Deployment & Support", icon: Rocket },
];

const audienceItems = [
  { label: "Growing Businesses", icon: Briefcase },
  { label: "Service Providers", icon: Headphones },
  { label: "E-commerce Brands", icon: ShoppingCart },
  { label: "Educational Institutions", icon: GraduationCap },
  { label: "Agencies", icon: Building2 },
  { label: "Enterprises", icon: Users },
];

const chatbotPlatforms = [
  { label: "Websites", icon: Globe },
  { label: "WhatsApp", icon: MessageSquare },
  { label: "Facebook & Instagram", icon: Users },
  { label: "CRM Systems", icon: Plug },
  { label: "Internal Business Tools", icon: Settings },
];

const AIBased = () => {
  return (
    <>
      <SEOHead
        title="AI Chatbots & Voice Agents | Malik Data Centre"
        description="Custom AI chatbots, voice calling agents, and intelligent assistants for businesses. Automate communication, generate leads, and scale operations with Malik Data Centre."
      />
      <Navbar />

      {/* ─── Hero ─── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        </div>

        <div className="container mx-auto px-4 relative z-10 py-24">
          <FadeIn className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm text-primary mb-8">
              <Brain className="h-4 w-4" />
              AI-Powered Business Solutions
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Intelligent AI Chatbots & Voice Agents That Work{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">24/7</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
              Automate conversations, handle customer queries, generate leads, and make smart voice calls — powered by advanced AI technology.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <WhatsAppButton message="Hi, I'm interested in AI consultation for my business." size="lg">
                Get AI Consultation
              </WhatsAppButton>
              <WhatsAppButton message="Hi, I'd like to request a demo of your AI chatbot/voice agent." size="lg">
                Request Demo
              </WhatsAppButton>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── What We Build ─── */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <FadeIn className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Smart AI Systems for Modern Businesses</h2>
            <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              At Malik Data Centre, we design and deploy intelligent AI chatbots and AI voice calling agents that help businesses automate communication, reduce manual workload, and improve customer experience. Our systems are built for performance, scalability, and real-world business use.
            </p>
          </FadeIn>
          <FadeIn delay={0.2} className="text-center">
            <p className="text-sm font-medium text-primary italic">
              "AI isn't the future — it's the present. Businesses that automate early scale faster."
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── AI Chatbots ─── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm text-primary mb-4">
              <Bot className="h-4 w-4" /> Text-Based Automation
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">What Our AI Chatbots Can Do</h2>
          </FadeIn>

          {/* Platforms */}
          <FadeIn delay={0.1} className="mb-12">
            <p className="text-center text-muted-foreground mb-6">Our AI chatbots integrate with:</p>
            <div className="flex flex-wrap justify-center gap-4">
              {chatbotPlatforms.map((p) => (
                <div key={p.label} className="flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm">
                  <p.icon className="h-4 w-4 text-primary" />
                  {p.label}
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Capabilities */}
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <FadeIn delay={0.15}>
              <h3 className="text-xl font-semibold mb-4">Capabilities</h3>
              <div className="space-y-3">
                {capabilities.map((c) => (
                  <div key={c} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{c}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h3 className="text-xl font-semibold mb-4">Business Benefits</h3>
              <div className="space-y-3">
                {chatbotBenefits.map((b) => (
                  <div key={b} className="flex items-start gap-3 rounded-lg border border-border bg-card p-3">
                    <ArrowRight className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{b}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── Voice Agents ─── */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm text-primary mb-4">
              <Mic className="h-4 w-4" /> AI Voice Calling
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Smart AI That Can Make & Receive Calls</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These systems sound natural and human-like, ensuring professional communication at scale.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <FadeIn delay={0.1}>
              <h3 className="text-xl font-semibold mb-4">What They Can Do</h3>
              <div className="space-y-3">
                {voiceCapabilities.map((c) => (
                  <div key={c} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{c}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <h3 className="text-xl font-semibold mb-4">Ideal Use Cases</h3>
              <div className="grid grid-cols-2 gap-3">
                {voiceUseCases.map((u) => (
                  <div key={u} className="rounded-lg border border-border bg-card p-3 text-sm text-muted-foreground text-center">
                    {u}
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── Custom AI Assistants ─── */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <FadeIn className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm text-primary mb-4">
              <Sparkles className="h-4 w-4" /> Jarvis-Style Systems
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Personal AI Assistants for Businesses</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We build customized AI assistants tailored to your business needs. Every assistant is built according to your workflow and requirements.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {assistantCapabilities.map((c, i) => (
                <div key={c} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 hover:border-primary/30 transition-colors">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground">{c}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Automation & Integration ─── */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <FadeIn className="mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm text-primary mb-4">
              <Plug className="h-4 w-4" /> Integrations
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Automation & Integration</h2>
            <p className="text-muted-foreground">We create complete automation flows — not just bots.</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3">
              {integrations.map((item) => (
                <span key={item} className="rounded-full border border-border bg-card px-5 py-2.5 text-sm hover:border-primary/40 transition-colors">
                  {item}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Why Choose ─── */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Malik Data Centre</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We don't just install bots — we build intelligent systems that improve efficiency and drive measurable impact.
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyChoose.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <div className="rounded-xl border border-border bg-card p-5 hover:border-primary/30 transition-all group h-full">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary mb-3 group-hover:scale-110 transition-transform">
                    <Shield className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Process ─── */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Our Process</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {processSteps.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.08}>
                <div className="rounded-xl border border-border bg-card p-5 text-center hover:border-primary/30 transition-all">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <p className="text-xs text-primary font-medium mb-1">Step {s.step}</p>
                  <h3 className="font-semibold text-sm">{s.title}</h3>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Who Is This For ─── */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <FadeIn className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Who Is This For?</h2>
            <p className="text-muted-foreground">Our AI Chatbots & Voice Agents are perfect for:</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {audienceItems.map((a) => (
                <div key={a.label} className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-5 hover:border-primary/30 transition-all">
                  <a.icon className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium text-center">{a.label}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Ready to Automate Your Business?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              Let's build an AI system that works 24/7 for you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <WhatsAppButton message="Hi, I'd like to schedule a consultation about AI chatbots/voice agents for my business." size="lg">
                Schedule Consultation
              </WhatsAppButton>
              <Link to="/contact">
                <Button size="lg" variant="outline">
                  Talk to Our Team <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
      <WhatsAppButton floating />
    </>
  );
};

export default AIBased;
