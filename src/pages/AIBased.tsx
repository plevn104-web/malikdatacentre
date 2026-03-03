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

/* ─── Light glass card ─── */
const glass = "rounded-xl border border-[hsl(210,40%,88%)] bg-white/60 backdrop-blur-md shadow-[0_2px_16px_rgba(59,130,246,0.06)]";
const glassHover = "hover:border-[hsl(210,70%,72%)] hover:bg-white/80 hover:shadow-[0_8px_30px_rgba(59,130,246,0.1)] hover:-translate-y-0.5 transition-all duration-300";

/* ─── Circuit corner accent (light version) ─── */
const CircuitCorner = ({ position = "tl" }: { position?: "tl" | "tr" | "bl" | "br" }) => {
  const pos = {
    tl: "top-0 left-0",
    tr: "top-0 right-0 rotate-90",
    bl: "bottom-0 left-0 -rotate-90",
    br: "bottom-0 right-0 rotate-180",
  };
  return (
    <div className={`absolute ${pos[position]} w-8 h-8 pointer-events-none opacity-[0.15]`}>
      <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
        <path d="M0 0h12v2H2v10H0V0z" fill="hsl(210,70%,55%)" />
        <circle cx="12" cy="2" r="1.5" fill="hsl(210,70%,55%)" />
      </svg>
    </div>
  );
};

/* ─── Soundwave (light blue) ─── */
const Soundwave = () => (
  <div className="flex items-center gap-[3px] h-8 justify-center">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="w-[2px] rounded-full bg-gradient-to-t from-[hsl(210,80%,60%)]/20 to-[hsl(210,80%,55%)]/50"
        animate={{ height: [4, 12 + Math.random() * 18, 6, 16 + Math.random() * 14, 4] }}
        transition={{ duration: 1.8 + Math.random() * 0.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.08 }}
      />
    ))}
  </div>
);

/* ─── Chat bubble (light) ─── */
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
          <div className={`px-4 py-2.5 rounded-2xl text-xs max-w-[200px] ${
            m.bot
              ? "bg-[hsl(210,40%,96%)] border border-[hsl(210,40%,90%)] text-[hsl(220,20%,40%)] rounded-bl-md"
              : "bg-[hsl(210,80%,55%)]/10 border border-[hsl(210,80%,55%)]/20 text-[hsl(210,70%,40%)] rounded-br-md"
          }`}>
            {m.text}
          </div>
        </motion.div>
      ))}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.9 }} className="flex justify-start">
        <div className="bg-[hsl(210,40%,96%)] border border-[hsl(210,40%,90%)] rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5">
          {[0, 1, 2].map((d) => (
            <motion.div
              key={d}
              className="w-1.5 h-1.5 rounded-full bg-[hsl(210,60%,60%)]"
              animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: d * 0.15 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

/* ─── Light grid background ─── */
const GridBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div
      className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage: `
          linear-gradient(hsl(210,60%,70%) 1px, transparent 1px),
          linear-gradient(90deg, hsl(210,60%,70%) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }}
    />
    <motion.div
      className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(210,80%,60%)]/8 to-transparent"
      animate={{ top: ["0%", "100%"] }}
      transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

/* ─── Divider ─── */
const Divider = () => (
  <div className="container mx-auto px-4">
    <div className="h-px relative">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(210,50%,85%)] to-transparent" />
      <motion.div
        className="absolute top-0 h-px w-32 bg-gradient-to-r from-transparent via-[hsl(210,80%,60%)]/30 to-transparent"
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

/* ─── Data ─── */
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

/* ─── Color tokens ─── */
const accent = "hsl(210,80%,50%)";
const accentLight = "hsl(210,80%,60%)";
const textHeading = "text-[hsl(220,25%,15%)]";
const textBody = "text-[hsl(220,15%,40%)]";
const textMuted = "text-[hsl(220,10%,55%)]";
const tagStyle = `inline-flex items-center gap-2 rounded-full border border-[hsl(210,70%,80%)] bg-[hsl(210,60%,96%)] px-5 py-2 text-sm text-[hsl(210,70%,45%)] tracking-widest uppercase`;

const AIBased = () => {
  return (
    <div className="min-h-screen relative" style={{ background: "linear-gradient(180deg, hsl(210,40%,98%) 0%, hsl(210,50%,95%) 30%, hsl(210,45%,97%) 60%, hsl(210,50%,94%) 100%)" }}>
      <GridBackground />
      <SEOHead
        title="AI Chatbots & Voice Agents | Malik Data Centre"
        description="Custom AI chatbots, voice calling agents, and intelligent assistants for businesses. Automate communication, generate leads, and scale operations with Malik Data Centre."
      />
      <Navbar />

      {/* ═══════ Hero ═══════ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, hsl(210,50%,97%) 0%, hsl(210,45%,94%) 50%, hsl(210,40%,96%) 100%)" }} />

        {/* Ambient light glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[8%] left-[3%] w-96 h-96 rounded-full bg-[hsl(210,80%,80%)]/20 blur-[120px]" />
          <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-[hsl(195,70%,85%)]/15 blur-[140px]" />

          {/* Neural network sphere */}
          <motion.div
            className="absolute top-[15%] right-[10%] w-52 h-52 md:w-72 md:h-72"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 200 200" className="w-full h-full opacity-[0.1]">
              <circle cx="100" cy="100" r="80" stroke={accentLight} strokeWidth="0.6" fill="none" />
              <circle cx="100" cy="100" r="60" stroke={accentLight} strokeWidth="0.4" fill="none" />
              <circle cx="100" cy="100" r="40" stroke={accentLight} strokeWidth="0.4" fill="none" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                return <circle key={deg} cx={100 + 80 * Math.cos(rad)} cy={100 + 80 * Math.sin(rad)} r="2.5" fill={accentLight} opacity="0.5" />;
              })}
              <line x1="20" y1="100" x2="180" y2="100" stroke={accentLight} strokeWidth="0.3" opacity="0.35" />
              <line x1="100" y1="20" x2="100" y2="180" stroke={accentLight} strokeWidth="0.3" opacity="0.35" />
              <line x1="43" y1="43" x2="157" y2="157" stroke={accentLight} strokeWidth="0.25" opacity="0.25" />
              <line x1="157" y1="43" x2="43" y2="157" stroke={accentLight} strokeWidth="0.25" opacity="0.25" />
            </svg>
          </motion.div>

          {/* Floating glass shapes */}
          <motion.div
            className="absolute bottom-[25%] left-[8%] w-20 h-20 rounded-2xl border border-[hsl(210,60%,85%)] bg-white/30 backdrop-blur-sm"
            animate={{ y: [0, -14, 0], rotate: [0, 6, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }}
          />
          <motion.div
            className="absolute top-[48%] left-[50%] w-10 h-10 rounded-lg border border-[hsl(210,60%,88%)] bg-white/20"
            animate={{ y: [0, -8, 0], rotate: [10, -6, 10] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10 py-28">
          <FadeIn className="max-w-4xl mx-auto text-center">
            <div className={tagStyle + " mb-10"}>
              <Brain className="h-4 w-4" />
              AI-Powered Business Solutions
            </div>
            <h1 className={`text-4xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.06] mb-7 tracking-tight ${textHeading}`}>
              Intelligent AI Chatbots &{" "}
              <br className="hidden md:block" />
              Voice Agents That Work{" "}
              <span className="bg-gradient-to-r from-[hsl(210,90%,50%)] to-[hsl(195,80%,45%)] bg-clip-text text-transparent">24/7</span>
            </h1>
            <p className={`text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed tracking-wide ${textMuted}`}>
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
            <h2 className={`text-3xl md:text-4xl font-bold mb-5 tracking-tight ${textHeading}`}>Smart AI Systems for Modern Businesses</h2>
            <p className={`leading-relaxed max-w-3xl mx-auto text-[15px] ${textBody}`}>
              At Malik Data Centre, we design and deploy intelligent AI chatbots and AI voice calling agents that help businesses automate communication, reduce manual workload, and improve customer experience. Our systems are built for performance, scalability, and real-world business use.
            </p>
          </FadeIn>
          <FadeIn delay={0.2} className="text-center">
            <div className={`${glass} inline-block px-8 py-4 mt-4 relative`}>
              <CircuitCorner position="tl" />
              <CircuitCorner position="br" />
              <p className="text-sm font-medium text-[hsl(210,70%,45%)] italic tracking-wide">
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
            <div className={tagStyle + " mb-5"}>
              <Bot className="h-4 w-4" /> Text-Based Automation
            </div>
            <h2 className={`text-3xl md:text-4xl font-bold tracking-tight ${textHeading}`}>What Our AI Chatbots Can Do</h2>
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
            <p className={`text-center mb-6 tracking-widest text-xs uppercase ${textMuted}`}>Our AI chatbots integrate with</p>
            <div className="flex flex-wrap justify-center gap-3">
              {chatbotPlatforms.map((p) => (
                <div key={p.label} className={`${glass} ${glassHover} flex items-center gap-2.5 px-5 py-3 text-sm group cursor-default`}>
                  <p.icon className="h-4 w-4 text-[hsl(210,70%,55%)] group-hover:text-[hsl(210,80%,45%)] transition-colors duration-300" />
                  <span className={`${textBody} group-hover:text-[hsl(220,25%,20%)] transition-colors duration-300`}>{p.label}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Capabilities & Benefits */}
          <div className="grid md:grid-cols-2 gap-14 max-w-5xl mx-auto">
            <FadeIn delay={0.2}>
              <h3 className={`text-xl font-semibold mb-5 tracking-tight ${textHeading}`}>Capabilities</h3>
              <div className="space-y-2.5">
                {capabilities.map((c) => (
                  <div key={c} className="flex items-start gap-3 group py-1">
                    <CheckCircle2 className="h-[17px] w-[17px] text-[hsl(210,70%,60%)] mt-0.5 shrink-0 group-hover:text-[hsl(210,80%,45%)] transition-colors duration-300" />
                    <span className={`text-[15px] ${textBody} group-hover:text-[hsl(220,20%,25%)] transition-colors duration-300`}>{c}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.25}>
              <h3 className={`text-xl font-semibold mb-5 tracking-tight ${textHeading}`}>Business Benefits</h3>
              <div className="space-y-3">
                {chatbotBenefits.map((b) => (
                  <div key={b} className={`${glass} ${glassHover} flex items-start gap-3 p-4 group`}>
                    <ArrowRight className="h-[17px] w-[17px] text-[hsl(210,70%,60%)] mt-0.5 shrink-0 group-hover:text-[hsl(210,80%,45%)] group-hover:translate-x-0.5 transition-all duration-300" />
                    <span className={`text-[15px] ${textBody} group-hover:text-[hsl(220,20%,25%)] transition-colors duration-300`}>{b}</span>
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
            <div className={tagStyle + " mb-5"}>
              <Mic className="h-4 w-4" /> AI Voice Calling
            </div>
            <h2 className={`text-3xl md:text-4xl font-bold mb-5 tracking-tight ${textHeading}`}>Smart AI That Can Make & Receive Calls</h2>
            <p className={`max-w-2xl mx-auto text-[15px] ${textBody}`}>
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
                  className="w-14 h-14 rounded-full border border-[hsl(210,70%,80%)] bg-[hsl(210,80%,96%)] flex items-center justify-center"
                  animate={{ boxShadow: ["0 0 0 0 hsla(210,80%,60%,0)", "0 0 0 14px hsla(210,80%,60%,0.08)", "0 0 0 0 hsla(210,80%,60%,0)"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Mic className="h-6 w-6 text-[hsl(210,70%,50%)]" />
                </motion.div>
                <Soundwave />
                <p className={`text-xs tracking-widest uppercase ${textMuted}`}>AI Voice Agent Active</p>
              </div>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-14 max-w-5xl mx-auto">
            <FadeIn delay={0.15}>
              <h3 className={`text-xl font-semibold mb-5 tracking-tight ${textHeading}`}>What They Can Do</h3>
              <div className="space-y-2.5">
                {voiceCapabilities.map((c) => (
                  <div key={c} className="flex items-start gap-3 group py-1">
                    <CheckCircle2 className="h-[17px] w-[17px] text-[hsl(210,70%,60%)] mt-0.5 shrink-0 group-hover:text-[hsl(210,80%,45%)] transition-colors duration-300" />
                    <span className={`text-[15px] ${textBody} group-hover:text-[hsl(220,20%,25%)] transition-colors duration-300`}>{c}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h3 className={`text-xl font-semibold mb-5 tracking-tight ${textHeading}`}>Ideal Use Cases</h3>
              <div className="grid grid-cols-2 gap-3">
                {voiceUseCases.map((u) => (
                  <div key={u} className={`${glass} ${glassHover} p-4 text-sm ${textBody} text-center cursor-default`}>
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
            <div className={tagStyle + " mb-5"}>
              <Sparkles className="h-4 w-4" /> Jarvis-Style Systems
            </div>
            <h2 className={`text-3xl md:text-4xl font-bold mb-5 tracking-tight ${textHeading}`}>Personal AI Assistants for Businesses</h2>
            <p className={`max-w-2xl mx-auto text-[15px] ${textBody}`}>
              We build customized AI assistants tailored to your business needs. Every assistant is built according to your workflow and requirements.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {assistantCapabilities.map((c) => (
                <div key={c} className={`${glass} ${glassHover} flex items-start gap-3 p-5 group`}>
                  <CheckCircle2 className="h-[17px] w-[17px] text-[hsl(210,70%,60%)] mt-0.5 shrink-0 group-hover:text-[hsl(210,80%,45%)] transition-colors duration-300" />
                  <span className={`text-sm ${textBody} group-hover:text-[hsl(220,20%,25%)] transition-colors duration-300`}>{c}</span>
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
            <div className={tagStyle + " mb-5"}>
              <Plug className="h-4 w-4" /> Integrations
            </div>
            <h2 className={`text-3xl md:text-4xl font-bold mb-5 tracking-tight ${textHeading}`}>Automation & Integration</h2>
            <p className={`text-[15px] ${textBody}`}>We create complete automation flows — not just bots.</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3">
              {integrations.map((item) => (
                <span key={item} className={`${glass} ${glassHover} px-6 py-3 text-sm ${textBody} cursor-default`}>
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
            <h2 className={`text-3xl md:text-4xl font-bold mb-5 tracking-tight ${textHeading}`}>Why Choose Malik Data Centre</h2>
            <p className={`max-w-2xl mx-auto text-[15px] ${textBody}`}>
              We don't just install bots — we build intelligent systems that improve efficiency and drive measurable impact.
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyChoose.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <div className={`${glass} ${glassHover} p-6 group h-full relative`}>
                  <CircuitCorner position="tl" />
                  <div className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-[hsl(210,80%,95%)] text-[hsl(210,70%,50%)] mb-4 group-hover:bg-[hsl(210,80%,90%)] group-hover:scale-110 transition-all duration-300">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className={`font-semibold mb-2 tracking-tight ${textHeading}`}>{item.title}</h3>
                  <p className={`text-sm leading-relaxed ${textMuted}`}>{item.desc}</p>
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
            <h2 className={`text-3xl md:text-4xl font-bold tracking-tight ${textHeading}`}>Our Process</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {processSteps.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.08}>
                <div className={`${glass} ${glassHover} p-6 text-center group relative`}>
                  <CircuitCorner position="tl" />
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[hsl(210,80%,95%)] text-[hsl(210,70%,50%)] mb-4 group-hover:bg-[hsl(210,80%,90%)] group-hover:scale-110 transition-all duration-300">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <p className="text-[10px] text-[hsl(210,70%,55%)] font-semibold mb-1.5 uppercase tracking-[0.2em]">Step {s.step}</p>
                  <h3 className={`font-semibold text-sm ${textHeading}`}>{s.title}</h3>
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
            <h2 className={`text-3xl md:text-4xl font-bold mb-5 tracking-tight ${textHeading}`}>Who Is This For?</h2>
            <p className={`text-[15px] ${textBody}`}>Our AI Chatbots & Voice Agents are perfect for:</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {audienceItems.map((a) => (
                <div key={a.label} className={`${glass} ${glassHover} flex flex-col items-center gap-3 p-6 group cursor-default`}>
                  <a.icon className="h-6 w-6 text-[hsl(210,70%,55%)] group-hover:text-[hsl(210,80%,45%)] group-hover:scale-110 transition-all duration-300" />
                  <span className={`text-sm font-medium text-center ${textBody} group-hover:text-[hsl(220,20%,20%)] transition-colors duration-300`}>{a.label}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <Divider />

      {/* ═══════ Final CTA ═══════ */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, hsl(210,50%,94%) 0%, hsl(210,55%,92%) 50%, hsl(210,50%,95%) 100%)" }} />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[hsl(210,80%,70%)]/[0.08]"
            animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <CircuitCorner position="tl" />
        <CircuitCorner position="tr" />
        <CircuitCorner position="bl" />
        <CircuitCorner position="br" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <FadeIn>
            <h2 className={`text-3xl md:text-5xl font-bold mb-5 tracking-tight ${textHeading}`}>Ready to Automate Your Business?</h2>
            <p className={`text-lg max-w-2xl mx-auto mb-12 ${textBody}`}>
              Let's build an AI system that works 24/7 for you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <WhatsAppButton message="Hi, I'd like to schedule a consultation about AI chatbots/voice agents for my business." size="lg">
                Schedule Consultation
              </WhatsAppButton>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-[hsl(210,50%,82%)] text-[hsl(220,20%,35%)] hover:bg-white/60 hover:text-[hsl(220,25%,15%)] hover:border-[hsl(210,70%,65%)] hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all duration-300">
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
