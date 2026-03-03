import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import {
  Bot,
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

/* ─── Styles ─── */
const glass = "rounded-xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.3)]";
const glassHover = "hover:border-[hsl(210,80%,55%)]/20 hover:bg-white/[0.04] hover:shadow-[0_8px_40px_rgba(0,0,0,0.35)] hover:-translate-y-0.5 transition-all duration-300";

/* ─── Circuit corner accent ─── */
const CircuitCorner = ({ position = "tl" }: { position?: "tl" | "tr" | "bl" | "br" }) => {
  const pos = {
    tl: "top-0 left-0",
    tr: "top-0 right-0 rotate-90",
    bl: "bottom-0 left-0 -rotate-90",
    br: "bottom-0 right-0 rotate-180",
  };
  return (
    <div className={`absolute ${pos[position]} w-8 h-8 pointer-events-none opacity-[0.08]`}>
      <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
        <path d="M0 0h12v2H2v10H0V0z" fill="hsl(210,80%,60%)" />
        <circle cx="12" cy="2" r="1.5" fill="hsl(210,80%,60%)" />
      </svg>
    </div>
  );
};

/* ─── Soundwave animation ─── */
const Soundwave = () => (
  <div className="flex items-center gap-[3px] h-8 justify-center">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="w-[2px] rounded-full bg-gradient-to-t from-[hsl(210,80%,55%)]/30 to-[hsl(210,80%,55%)]/60"
        animate={{ height: [4, 12 + Math.random() * 18, 6, 16 + Math.random() * 14, 4] }}
        transition={{ duration: 1.8 + Math.random() * 0.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.08 }}
      />
    ))}
  </div>
);

/* ─── Chat bubble animation ─── */
const ChatBubblePreview = () => {
  const msgs = [
    { text: "How can I help you today?", bot: true },
    { text: "I'd like to know about your services", bot: false },
    { text: "Sure! Let me pull up the details…", bot: true },
  ];
  return (
    <div className="space-y-3 max-w-xs mx-auto">
      {msgs.map((m, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.8 + i * 0.7, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className={`flex ${m.bot ? "justify-start" : "justify-end"}`}
        >
          <div className={`px-4 py-2.5 rounded-2xl text-xs max-w-[200px] ${m.bot ? "bg-white/[0.06] border border-white/[0.08] text-white/60 rounded-bl-md" : "bg-[hsl(210,80%,55%)]/15 border border-[hsl(210,80%,55%)]/20 text-[hsl(210,80%,70%)] rounded-br-md"}`}>
            {m.text}
          </div>
        </motion.div>
      ))}
      {/* Typing dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.9 }}
        className="flex justify-start"
      >
        <div className="bg-white/[0.06] border border-white/[0.08] rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5">
          {[0, 1, 2].map((d) => (
            <motion.div
              key={d}
              className="w-1.5 h-1.5 rounded-full bg-white/30"
              animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: d * 0.15 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

/* ─── Digital grid background (CSS-only, lightweight) ─── */
const GridBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div
      className="absolute inset-0 opacity-[0.025]"
      style={{
        backgroundImage: `
          linear-gradient(hsl(210,60%,50%) 1px, transparent 1px),
          linear-gradient(90deg, hsl(210,60%,50%) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }}
    />
    {/* Slow moving scan line */}
    <motion.div
      className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(210,80%,55%)]/10 to-transparent"
      animate={{ top: ["0%", "100%"] }}
      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

/* ─── Glowing divider ─── */
const Divider = () => (
  <div className="container mx-auto px-4">
    <div className="h-px relative">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
      <motion.div
        className="absolute top-0 h-px w-32 bg-gradient-to-r from-transparent via-[hsl(210,80%,55%)]/20 to-transparent"
        animate={{ left: ["0%", "100%", "0%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  </div>
);

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const capabilities = [
  "24/7 Customer Support", "Instant Response to Queries", "Lead Capture & Qualification",
  "Appointment Booking", "Product/Service Information", "FAQ Automation",
  "Order Tracking", "Smart Conversation Handling", "Multi-language Support", "CRM Integration",
];
const chatbotBenefits = [
  "Reduce staff workload", "Faster response time", "Higher customer satisfaction",
  "Increased lead conversion", "Lower operational cost", "24/7 availability",
];
const voiceCapabilities = [
  "Make outbound calls automatically", "Handle inbound calls", "Follow conversation scripts intelligently",
  "Answer FAQs naturally", "Book appointments", "Send follow-up messages",
  "Qualify leads before human handover", "Conduct surveys", "Send reminders",
];
const voiceUseCases = [
  "Sales follow-ups", "Appointment confirmations", "Lead qualification",
  "Customer support", "Payment reminders", "Feedback collection", "Campaign outreach",
];
const assistantCapabilities = [
  "Access internal documents", "Answer company-specific queries", "Assist teams internally",
  "Automate repetitive workflows", "Generate reports", "Manage customer communication",
  "Connect with APIs & software tools",
];
const integrations = [
  "CRM platforms", "Google Sheets", "Email systems",
  "WhatsApp Business", "Websites", "Payment systems", "Appointment systems",
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

const AIBased = () => {
  return (
    <div className="bg-[hsl(222,32%,5%)] text-white min-h-screen relative">
      <GridBackground />
      <SEOHead
        title="AI Chatbots & Voice Agents | Malik Data Centre"
        description="Custom AI chatbots, voice calling agents, and intelligent assistants for businesses. Automate communication, generate leads, and scale operations with Malik Data Centre."
      />
      <Navbar />

      {/* ═══════ Hero ═══════ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,38%,8%)] via-[hsl(222,32%,5%)] to-[hsl(224,28%,4%)]" />

        {/* Neural network sphere + circuit lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Soft ambient glows */}
          <div className="absolute top-[10%] left-[5%] w-80 h-80 rounded-full bg-[hsl(210,80%,50%)]/[0.04] blur-[100px]" />
          <div className="absolute bottom-[15%] right-[8%] w-96 h-96 rounded-full bg-[hsl(210,60%,40%)]/[0.03] blur-[120px]" />

          {/* Neural sphere */}
          <motion.div
            className="absolute top-[18%] right-[12%] w-48 h-48 md:w-64 md:h-64"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 200 200" className="w-full h-full opacity-[0.06]">
              <circle cx="100" cy="100" r="80" stroke="hsl(210,80%,60%)" strokeWidth="0.5" fill="none" />
              <circle cx="100" cy="100" r="60" stroke="hsl(210,80%,60%)" strokeWidth="0.3" fill="none" />
              <circle cx="100" cy="100" r="40" stroke="hsl(210,80%,60%)" strokeWidth="0.3" fill="none" />
              {/* Node points */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                return (
                  <circle key={deg} cx={100 + 80 * Math.cos(rad)} cy={100 + 80 * Math.sin(rad)} r="2" fill="hsl(210,80%,60%)" opacity="0.4" />
                );
              })}
              {/* Connection lines */}
              <line x1="20" y1="100" x2="180" y2="100" stroke="hsl(210,80%,60%)" strokeWidth="0.2" opacity="0.3" />
              <line x1="100" y1="20" x2="100" y2="180" stroke="hsl(210,80%,60%)" strokeWidth="0.2" opacity="0.3" />
              <line x1="43" y1="43" x2="157" y2="157" stroke="hsl(210,80%,60%)" strokeWidth="0.2" opacity="0.2" />
              <line x1="157" y1="43" x2="43" y2="157" stroke="hsl(210,80%,60%)" strokeWidth="0.2" opacity="0.2" />
            </svg>
          </motion.div>

          {/* Floating glass shapes */}
          <motion.div
            className="absolute bottom-[28%] left-[10%] w-20 h-20 rounded-2xl border border-white/[0.04] bg-white/[0.015] backdrop-blur-sm"
            animate={{ y: [0, -14, 0], rotate: [0, 6, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }}
          />
          <motion.div
            className="absolute top-[50%] left-[48%] w-10 h-10 rounded-lg border border-white/[0.03] bg-white/[0.01]"
            animate={{ y: [0, -8, 0], rotate: [10, -6, 10] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10 py-28">
          <FadeIn className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(210,80%,55%)]/15 bg-[hsl(210,80%,55%)]/5 backdrop-blur-sm px-5 py-2 text-sm text-[hsl(210,80%,70%)] mb-10 tracking-widest uppercase">
              <Brain className="h-4 w-4" />
              AI-Powered Business Solutions
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.06] mb-7 tracking-tight">
              Intelligent AI Chatbots &{" "}
              <br className="hidden md:block" />
              Voice Agents That Work{" "}
              <span className="bg-gradient-to-r from-[hsl(210,90%,65%)] to-[hsl(210,70%,50%)] bg-clip-text text-transparent">24/7</span>
            </h1>
            <p className="text-base md:text-lg text-white/40 max-w-2xl mx-auto mb-12 leading-relaxed tracking-wide">
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

      {/* ═══════ What We Build ═══════ */}
      <section className="py-28 relative">
        <CircuitCorner position="tl" />
        <CircuitCorner position="br" />
        <div className="container mx-auto px-4 max-w-4xl">
          <FadeIn className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-5 tracking-tight">Smart AI Systems for Modern Businesses</h2>
            <p className="text-white/40 leading-relaxed max-w-3xl mx-auto text-[15px]">
              At Malik Data Centre, we design and deploy intelligent AI chatbots and AI voice calling agents that help businesses automate communication, reduce manual workload, and improve customer experience. Our systems are built for performance, scalability, and real-world business use.
            </p>
          </FadeIn>
          <FadeIn delay={0.2} className="text-center">
            <div className={`${glass} inline-block px-8 py-4 mt-4 relative`}>
              <CircuitCorner position="tl" />
              <CircuitCorner position="br" />
              <p className="text-sm font-medium text-[hsl(210,80%,65%)]/70 italic tracking-wide">
                "AI isn't the future — it's the present. Businesses that automate early scale faster."
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <Divider />

      {/* ═══════ AI Chatbots ═══════ */}
      <section className="py-28 relative">
        <CircuitCorner position="tr" />
        <CircuitCorner position="bl" />
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(210,80%,55%)]/15 bg-[hsl(210,80%,55%)]/5 backdrop-blur-sm px-5 py-2 text-sm text-[hsl(210,80%,70%)] mb-5 tracking-widest uppercase">
              <Bot className="h-4 w-4" /> Text-Based Automation
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">What Our AI Chatbots Can Do</h2>
          </FadeIn>

          {/* Chat bubble preview */}
          <FadeIn delay={0.1} className="mb-14">
            <div className={`${glass} max-w-sm mx-auto p-6 relative`}>
              <CircuitCorner position="tl" />
              <CircuitCorner position="br" />
              <ChatBubblePreview />
            </div>
          </FadeIn>

          {/* Platforms */}
          <FadeIn delay={0.15} className="mb-14">
            <p className="text-center text-white/30 mb-6 tracking-widest text-xs uppercase">Our AI chatbots integrate with</p>
            <div className="flex flex-wrap justify-center gap-3">
              {chatbotPlatforms.map((p) => (
                <div key={p.label} className={`${glass} ${glassHover} flex items-center gap-2.5 px-5 py-3 text-sm group cursor-default`}>
                  <p.icon className="h-4 w-4 text-[hsl(210,80%,60%)]/50 group-hover:text-[hsl(210,80%,60%)] transition-colors duration-300" />
                  <span className="text-white/60 group-hover:text-white/85 transition-colors duration-300">{p.label}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Capabilities & Benefits */}
          <div className="grid md:grid-cols-2 gap-14 max-w-5xl mx-auto">
            <FadeIn delay={0.2}>
              <h3 className="text-xl font-semibold mb-5 tracking-tight text-white/90">Capabilities</h3>
              <div className="space-y-2.5">
                {capabilities.map((c) => (
                  <div key={c} className="flex items-start gap-3 group py-1">
                    <CheckCircle2 className="h-[17px] w-[17px] text-[hsl(210,80%,55%)]/40 mt-0.5 shrink-0 group-hover:text-[hsl(210,80%,55%)] transition-colors duration-300" />
                    <span className="text-white/50 group-hover:text-white/70 transition-colors duration-300 text-[15px]">{c}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.25}>
              <h3 className="text-xl font-semibold mb-5 tracking-tight text-white/90">Business Benefits</h3>
              <div className="space-y-3">
                {chatbotBenefits.map((b) => (
                  <div key={b} className={`${glass} ${glassHover} flex items-start gap-3 p-4 group`}>
                    <ArrowRight className="h-[17px] w-[17px] text-[hsl(210,80%,55%)]/40 mt-0.5 shrink-0 group-hover:text-[hsl(210,80%,55%)] group-hover:translate-x-0.5 transition-all duration-300" />
                    <span className="text-white/50 group-hover:text-white/70 transition-colors duration-300 text-[15px]">{b}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <Divider />

      {/* ═══════ Voice Agents ═══════ */}
      <section className="py-28 relative">
        <CircuitCorner position="tl" />
        <CircuitCorner position="br" />
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(210,80%,55%)]/15 bg-[hsl(210,80%,55%)]/5 backdrop-blur-sm px-5 py-2 text-sm text-[hsl(210,80%,70%)] mb-5 tracking-widest uppercase">
              <Mic className="h-4 w-4" /> AI Voice Calling
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-5 tracking-tight">Smart AI That Can Make & Receive Calls</h2>
            <p className="text-white/40 max-w-2xl mx-auto text-[15px]">
              These systems sound natural and human-like, ensuring professional communication at scale.
            </p>
          </FadeIn>

          {/* Soundwave + pulsing mic */}
          <FadeIn delay={0.1} className="mb-14">
            <div className={`${glass} max-w-md mx-auto p-6 relative`}>
              <CircuitCorner position="tl" />
              <CircuitCorner position="br" />
              <div className="flex flex-col items-center gap-4">
                <motion.div
                  className="w-14 h-14 rounded-full border border-[hsl(210,80%,55%)]/20 bg-[hsl(210,80%,55%)]/5 flex items-center justify-center"
                  animate={{ boxShadow: ["0 0 0 0 hsla(210,80%,55%,0)", "0 0 0 12px hsla(210,80%,55%,0.06)", "0 0 0 0 hsla(210,80%,55%,0)"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Mic className="h-6 w-6 text-[hsl(210,80%,60%)]/60" />
                </motion.div>
                <Soundwave />
                <p className="text-xs text-white/25 tracking-widest uppercase">AI Voice Agent Active</p>
              </div>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-14 max-w-5xl mx-auto">
            <FadeIn delay={0.15}>
              <h3 className="text-xl font-semibold mb-5 tracking-tight text-white/90">What They Can Do</h3>
              <div className="space-y-2.5">
                {voiceCapabilities.map((c) => (
                  <div key={c} className="flex items-start gap-3 group py-1">
                    <CheckCircle2 className="h-[17px] w-[17px] text-[hsl(210,80%,55%)]/40 mt-0.5 shrink-0 group-hover:text-[hsl(210,80%,55%)] transition-colors duration-300" />
                    <span className="text-white/50 group-hover:text-white/70 transition-colors duration-300 text-[15px]">{c}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h3 className="text-xl font-semibold mb-5 tracking-tight text-white/90">Ideal Use Cases</h3>
              <div className="grid grid-cols-2 gap-3">
                {voiceUseCases.map((u) => (
                  <div key={u} className={`${glass} ${glassHover} p-4 text-sm text-white/50 text-center cursor-default`}>
                    {u}
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <Divider />

      {/* ═══════ Custom AI Assistants ═══════ */}
      <section className="py-28 relative">
        <CircuitCorner position="tr" />
        <CircuitCorner position="bl" />
        <div className="container mx-auto px-4 max-w-5xl">
          <FadeIn className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(210,80%,55%)]/15 bg-[hsl(210,80%,55%)]/5 backdrop-blur-sm px-5 py-2 text-sm text-[hsl(210,80%,70%)] mb-5 tracking-widest uppercase">
              <Sparkles className="h-4 w-4" /> Jarvis-Style Systems
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-5 tracking-tight">Personal AI Assistants for Businesses</h2>
            <p className="text-white/40 max-w-2xl mx-auto text-[15px]">
              We build customized AI assistants tailored to your business needs. Every assistant is built according to your workflow and requirements.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {assistantCapabilities.map((c) => (
                <div key={c} className={`${glass} ${glassHover} flex items-start gap-3 p-5 group`}>
                  <CheckCircle2 className="h-[17px] w-[17px] text-[hsl(210,80%,55%)]/40 mt-0.5 shrink-0 group-hover:text-[hsl(210,80%,55%)] transition-colors duration-300" />
                  <span className="text-sm text-white/50 group-hover:text-white/70 transition-colors duration-300">{c}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <Divider />

      {/* ═══════ Automation & Integration ═══════ */}
      <section className="py-28 relative">
        <CircuitCorner position="tl" />
        <CircuitCorner position="br" />
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <FadeIn className="mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(210,80%,55%)]/15 bg-[hsl(210,80%,55%)]/5 backdrop-blur-sm px-5 py-2 text-sm text-[hsl(210,80%,70%)] mb-5 tracking-widest uppercase">
              <Plug className="h-4 w-4" /> Integrations
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-5 tracking-tight">Automation & Integration</h2>
            <p className="text-white/40 text-[15px]">We create complete automation flows — not just bots.</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3">
              {integrations.map((item) => (
                <span key={item} className={`${glass} ${glassHover} px-6 py-3 text-sm text-white/50 cursor-default`}>
                  {item}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <Divider />

      {/* ═══════ Why Choose ═══════ */}
      <section className="py-28 relative">
        <CircuitCorner position="tr" />
        <CircuitCorner position="bl" />
        <div className="container mx-auto px-4 max-w-5xl">
          <FadeIn className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-5 tracking-tight">Why Choose Malik Data Centre</h2>
            <p className="text-white/40 max-w-2xl mx-auto text-[15px]">
              We don't just install bots — we build intelligent systems that improve efficiency and drive measurable impact.
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyChoose.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <div className={`${glass} ${glassHover} p-6 group h-full relative`}>
                  <CircuitCorner position="tl" />
                  <div className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-[hsl(210,80%,55%)]/[0.06] text-[hsl(210,80%,60%)]/50 mb-4 group-hover:text-[hsl(210,80%,60%)] group-hover:bg-[hsl(210,80%,55%)]/10 group-hover:scale-110 transition-all duration-300">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold mb-2 tracking-tight text-white/85">{item.title}</h3>
                  <p className="text-sm text-white/35 leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ═══════ Process ═══════ */}
      <section className="py-28 relative">
        <CircuitCorner position="tl" />
        <CircuitCorner position="br" />
        <div className="container mx-auto px-4 max-w-5xl">
          <FadeIn className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Process</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {processSteps.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.08}>
                <div className={`${glass} ${glassHover} p-6 text-center group relative`}>
                  <CircuitCorner position="tl" />
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[hsl(210,80%,55%)]/[0.06] text-[hsl(210,80%,60%)]/50 mb-4 group-hover:text-[hsl(210,80%,60%)] group-hover:bg-[hsl(210,80%,55%)]/10 group-hover:scale-110 transition-all duration-300">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <p className="text-[10px] text-[hsl(210,80%,60%)]/40 font-semibold mb-1.5 uppercase tracking-[0.2em]">Step {s.step}</p>
                  <h3 className="font-semibold text-sm text-white/75">{s.title}</h3>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ═══════ Who Is This For ═══════ */}
      <section className="py-28 relative">
        <CircuitCorner position="tr" />
        <CircuitCorner position="bl" />
        <div className="container mx-auto px-4 max-w-4xl">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-5 tracking-tight">Who Is This For?</h2>
            <p className="text-white/40 text-[15px]">Our AI Chatbots & Voice Agents are perfect for:</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {audienceItems.map((a) => (
                <div key={a.label} className={`${glass} ${glassHover} flex flex-col items-center gap-3 p-6 group cursor-default`}>
                  <a.icon className="h-6 w-6 text-[hsl(210,80%,60%)]/40 group-hover:text-[hsl(210,80%,60%)] group-hover:scale-110 transition-all duration-300" />
                  <span className="text-sm font-medium text-center text-white/55 group-hover:text-white/80 transition-colors duration-300">{a.label}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <Divider />

      {/* ═══════ Final CTA ═══════ */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(222,32%,5%)] via-[hsl(220,38%,7%)] to-[hsl(222,32%,5%)]" />
        {/* Pulse glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[hsl(210,80%,50%)]/[0.03]"
            animate={{ scale: [1, 1.15, 1], opacity: [0.03, 0.06, 0.03] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <CircuitCorner position="tl" />
        <CircuitCorner position="tr" />
        <CircuitCorner position="bl" />
        <CircuitCorner position="br" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-bold mb-5 tracking-tight">Ready to Automate Your Business?</h2>
            <p className="text-lg text-white/40 max-w-2xl mx-auto mb-12">
              Let's build an AI system that works 24/7 for you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <WhatsAppButton message="Hi, I'd like to schedule a consultation about AI chatbots/voice agents for my business." size="lg">
                Schedule Consultation
              </WhatsAppButton>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white/[0.08] text-white/60 hover:bg-white/[0.04] hover:text-white/90 hover:border-[hsl(210,80%,55%)]/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.08)] transition-all duration-300">
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
