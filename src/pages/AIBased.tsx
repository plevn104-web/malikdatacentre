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

/* ─── Glass card utility ─── */
const glass = "rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.25)]";
const glassHover = "hover:border-primary/25 hover:bg-white/[0.05] hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
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
  { title: "Custom-Built AI Solutions", desc: "Tailored to your exact business workflows and goals.", icon: Settings },
  { title: "Business-Focused Implementation", desc: "Every system is designed to deliver measurable results.", icon: Target },
  { title: "Secure & Scalable Systems", desc: "Enterprise-grade security with room to grow.", icon: Shield },
  { title: "Ongoing Optimization & Support", desc: "Continuous improvement and dedicated assistance.", icon: Zap },
  { title: "Strategy + Technical Execution Combined", desc: "We plan, build, and optimize — end to end.", icon: Rocket },
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

/* ─── Section divider ─── */
const Divider = () => (
  <div className="container mx-auto px-4">
    <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
  </div>
);

const AIBased = () => {
  return (
    <div className="bg-[hsl(222,30%,6%)] text-white min-h-screen">
      <SEOHead
        title="AI Chatbots & Voice Agents | Malik Data Centre"
        description="Custom AI chatbots, voice calling agents, and intelligent assistants for businesses. Automate communication, generate leads, and scale operations with Malik Data Centre."
      />
      <Navbar />

      {/* ─── Hero ─── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Deep navy gradient bg */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(222,35%,8%)] via-[hsl(222,30%,6%)] to-[hsl(220,25%,5%)]" />

        {/* Subtle 3D floating shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[15%] left-[8%] w-64 h-64 rounded-full bg-gradient-to-br from-primary/8 to-transparent blur-3xl" />
          <div className="absolute top-[60%] right-[5%] w-80 h-80 rounded-full bg-gradient-to-tl from-blue-500/6 to-transparent blur-3xl" />
          <motion.div
            className="absolute top-[20%] right-[15%] w-24 h-24 rounded-2xl border border-white/[0.04] bg-white/[0.02] backdrop-blur-sm"
            animate={{ y: [0, -16, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }}
          />
          <motion.div
            className="absolute bottom-[25%] left-[12%] w-16 h-16 rounded-full border border-white/[0.05] bg-gradient-to-br from-primary/10 to-transparent backdrop-blur-sm"
            animate={{ y: [0, 12, 0], x: [0, 8, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div
            className="absolute top-[45%] left-[55%] w-12 h-12 rounded-lg border border-white/[0.03] bg-white/[0.015]"
            animate={{ y: [0, -10, 0], rotate: [12, -4, 12] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10 py-28">
          <FadeIn className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm px-5 py-2 text-sm text-primary/90 mb-10 tracking-wide">
              <Brain className="h-4 w-4" />
              AI-Powered Business Solutions
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.08] mb-7 tracking-tight">
              Intelligent AI Chatbots &{" "}
              <br className="hidden md:block" />
              Voice Agents That Work{" "}
              <span className="bg-gradient-to-r from-blue-400 to-primary bg-clip-text text-transparent">24/7</span>
            </h1>
            <p className="text-base md:text-lg text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed tracking-wide">
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

      <Divider />

      {/* ─── What We Build ─── */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <FadeIn className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-5 tracking-tight">Smart AI Systems for Modern Businesses</h2>
            <p className="text-white/45 leading-relaxed max-w-3xl mx-auto text-base">
              At Malik Data Centre, we design and deploy intelligent AI chatbots and AI voice calling agents that help businesses automate communication, reduce manual workload, and improve customer experience. Our systems are built for performance, scalability, and real-world business use.
            </p>
          </FadeIn>
          <FadeIn delay={0.2} className="text-center">
            <div className={`${glass} inline-block px-8 py-4 mt-4`}>
              <p className="text-sm font-medium text-primary/80 italic tracking-wide">
                "AI isn't the future — it's the present. Businesses that automate early scale faster."
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <Divider />

      {/* ─── AI Chatbots ─── */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm px-5 py-2 text-sm text-primary/90 mb-5 tracking-wide">
              <Bot className="h-4 w-4" /> Text-Based Automation
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">What Our AI Chatbots Can Do</h2>
          </FadeIn>

          {/* Platforms */}
          <FadeIn delay={0.1} className="mb-14">
            <p className="text-center text-white/40 mb-6 tracking-wide text-sm uppercase">Our AI chatbots integrate with</p>
            <div className="flex flex-wrap justify-center gap-3">
              {chatbotPlatforms.map((p) => (
                <div key={p.label} className={`${glass} ${glassHover} flex items-center gap-2.5 px-5 py-3 text-sm group cursor-default`}>
                  <p.icon className="h-4 w-4 text-primary/70 group-hover:text-primary transition-colors" />
                  <span className="text-white/70 group-hover:text-white/90 transition-colors">{p.label}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Capabilities */}
          <div className="grid md:grid-cols-2 gap-14 max-w-5xl mx-auto">
            <FadeIn delay={0.15}>
              <h3 className="text-xl font-semibold mb-5 tracking-tight">Capabilities</h3>
              <div className="space-y-3">
                {capabilities.map((c) => (
                  <div key={c} className="flex items-start gap-3 group">
                    <CheckCircle2 className="h-[18px] w-[18px] text-primary/60 mt-0.5 shrink-0 group-hover:text-primary transition-colors" />
                    <span className="text-white/55 group-hover:text-white/75 transition-colors text-[15px]">{c}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h3 className="text-xl font-semibold mb-5 tracking-tight">Business Benefits</h3>
              <div className="space-y-3">
                {chatbotBenefits.map((b) => (
                  <div key={b} className={`${glass} ${glassHover} flex items-start gap-3 p-4 group`}>
                    <ArrowRight className="h-[18px] w-[18px] text-primary/60 mt-0.5 shrink-0 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    <span className="text-white/55 group-hover:text-white/75 transition-colors text-[15px]">{b}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <Divider />

      {/* ─── Voice Agents ─── */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm px-5 py-2 text-sm text-primary/90 mb-5 tracking-wide">
              <Mic className="h-4 w-4" /> AI Voice Calling
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-5 tracking-tight">Smart AI That Can Make & Receive Calls</h2>
            <p className="text-white/45 max-w-2xl mx-auto text-base">
              These systems sound natural and human-like, ensuring professional communication at scale.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-14 max-w-5xl mx-auto">
            <FadeIn delay={0.1}>
              <h3 className="text-xl font-semibold mb-5 tracking-tight">What They Can Do</h3>
              <div className="space-y-3">
                {voiceCapabilities.map((c) => (
                  <div key={c} className="flex items-start gap-3 group">
                    <CheckCircle2 className="h-[18px] w-[18px] text-primary/60 mt-0.5 shrink-0 group-hover:text-primary transition-colors" />
                    <span className="text-white/55 group-hover:text-white/75 transition-colors text-[15px]">{c}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <h3 className="text-xl font-semibold mb-5 tracking-tight">Ideal Use Cases</h3>
              <div className="grid grid-cols-2 gap-3">
                {voiceUseCases.map((u) => (
                  <div key={u} className={`${glass} ${glassHover} p-4 text-sm text-white/55 text-center cursor-default`}>
                    {u}
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <Divider />

      {/* ─── Custom AI Assistants ─── */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <FadeIn className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm px-5 py-2 text-sm text-primary/90 mb-5 tracking-wide">
              <Sparkles className="h-4 w-4" /> Jarvis-Style Systems
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-5 tracking-tight">Personal AI Assistants for Businesses</h2>
            <p className="text-white/45 max-w-2xl mx-auto text-base">
              We build customized AI assistants tailored to your business needs. Every assistant is built according to your workflow and requirements.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {assistantCapabilities.map((c) => (
                <div key={c} className={`${glass} ${glassHover} flex items-start gap-3 p-5 group`}>
                  <CheckCircle2 className="h-[18px] w-[18px] text-primary/60 mt-0.5 shrink-0 group-hover:text-primary transition-colors" />
                  <span className="text-sm text-white/55 group-hover:text-white/75 transition-colors">{c}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <Divider />

      {/* ─── Automation & Integration ─── */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <FadeIn className="mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm px-5 py-2 text-sm text-primary/90 mb-5 tracking-wide">
              <Plug className="h-4 w-4" /> Integrations
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-5 tracking-tight">Automation & Integration</h2>
            <p className="text-white/45">We create complete automation flows — not just bots.</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3">
              {integrations.map((item) => (
                <span key={item} className={`${glass} ${glassHover} px-6 py-3 text-sm text-white/60 cursor-default`}>
                  {item}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <Divider />

      {/* ─── Why Choose ─── */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <FadeIn className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-5 tracking-tight">Why Choose Malik Data Centre</h2>
            <p className="text-white/45 max-w-2xl mx-auto text-base">
              We don't just install bots — we build intelligent systems that improve efficiency and drive measurable impact.
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyChoose.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <div className={`${glass} ${glassHover} p-6 group h-full`}>
                  <div className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-primary/8 text-primary/70 mb-4 group-hover:text-primary group-hover:bg-primary/12 group-hover:scale-110 transition-all duration-300">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold mb-2 tracking-tight text-white/90">{item.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ─── Process ─── */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <FadeIn className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Process</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {processSteps.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.08}>
                <div className={`${glass} ${glassHover} p-6 text-center group`}>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/8 text-primary/70 mb-4 group-hover:text-primary group-hover:bg-primary/12 group-hover:scale-110 transition-all duration-300">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <p className="text-[11px] text-primary/60 font-semibold mb-1.5 uppercase tracking-widest">Step {s.step}</p>
                  <h3 className="font-semibold text-sm text-white/80">{s.title}</h3>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ─── Who Is This For ─── */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-5 tracking-tight">Who Is This For?</h2>
            <p className="text-white/45">Our AI Chatbots & Voice Agents are perfect for:</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {audienceItems.map((a) => (
                <div key={a.label} className={`${glass} ${glassHover} flex flex-col items-center gap-3 p-6 group cursor-default`}>
                  <a.icon className="h-6 w-6 text-primary/60 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
                  <span className="text-sm font-medium text-center text-white/65 group-hover:text-white/85 transition-colors">{a.label}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <Divider />

      {/* ─── Final CTA ─── */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(222,30%,6%)] via-[hsl(222,35%,8%)] to-[hsl(222,30%,6%)]" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.04] blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-bold mb-5 tracking-tight">Ready to Automate Your Business?</h2>
            <p className="text-lg text-white/45 max-w-2xl mx-auto mb-12">
              Let's build an AI system that works 24/7 for you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <WhatsAppButton message="Hi, I'd like to schedule a consultation about AI chatbots/voice agents for my business." size="lg">
                Schedule Consultation
              </WhatsAppButton>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white/10 text-white/70 hover:bg-white/5 hover:text-white hover:border-white/20 transition-all">
                  Talk to Our Team <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
      <WhatsAppButton floating />
    </div>
  );
};

export default AIBased;
