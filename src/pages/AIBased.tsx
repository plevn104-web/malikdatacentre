import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import {
  Bot, Globe, MessageSquare, Zap, Shield, Settings, Users,
  CheckCircle2, ArrowRight, Sparkles, Brain, Mic, Plug, Target,
  ClipboardList, Rocket, Headphones, ShoppingCart, GraduationCap,
  Building2, Briefcase, MessageCircle,
} from "lucide-react";

/* ─── Premium 3D Button ─── */
const Premium3DButton = ({ children, onClick, variant = "primary" }: { children: React.ReactNode; onClick: () => void; variant?: "primary" | "secondary" }) => {
  const isPrimary = variant === "primary";
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04, y: -3 }}
      whileTap={{ scale: 0.97, y: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`
        relative group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-base tracking-wide cursor-pointer overflow-hidden
        transition-all duration-300 ease-out
        ${isPrimary
          ? "bg-gradient-to-br from-[hsl(210,90%,56%)] via-[hsl(210,85%,50%)] to-[hsl(220,80%,45%)] text-white shadow-[0_6px_20px_rgba(59,130,246,0.35),inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-2px_4px_rgba(0,0,0,0.15)] hover:shadow-[0_10px_35px_rgba(59,130,246,0.45),inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-2px_4px_rgba(0,0,0,0.1)]"
          : "bg-white/[0.04] backdrop-blur-md text-white/90 border border-white/[0.12] shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-1px_2px_rgba(0,0,0,0.2)] hover:bg-[hsl(210,80%,55%)]/[0.12] hover:border-[hsl(210,80%,60%)]/30 hover:shadow-[0_8px_28px_rgba(59,130,246,0.2),inset_0_1px_0_rgba(255,255,255,0.1)]"
        }
      `}
    >
      {/* Shimmer sweep */}
      <span className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1.2s] ease-in-out bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
      </span>
      {/* Top highlight bevel */}
      <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
      <span className="relative z-10 flex items-center gap-2.5">{children}</span>
    </motion.button>
  );
};

/* ─── Tokens ─── */
const glass = "rounded-xl border border-white/[0.06] bg-[hsl(220,30%,12%)]/60 backdrop-blur-lg shadow-[0_4px_24px_rgba(0,0,0,0.4)]";
const glassHover = "hover:border-[hsl(210,80%,55%)]/25 hover:bg-[hsl(220,30%,14%)]/70 hover:shadow-[0_8px_40px_rgba(59,130,246,0.12)] hover:-translate-y-1 transition-all duration-300";

/* ─── Circuit corner ─── */
const CircuitCorner = ({ position = "tl" }: { position?: "tl" | "tr" | "bl" | "br" }) => {
  const pos = { tl: "top-0 left-0", tr: "top-0 right-0 rotate-90", bl: "bottom-0 left-0 -rotate-90", br: "bottom-0 right-0 rotate-180" };
  return (
    <div className={`absolute ${pos[position]} w-8 h-8 pointer-events-none opacity-[0.12]`}>
      <svg viewBox="0 0 32 32" fill="none"><path d="M0 0h12v2H2v10H0V0z" fill="hsl(210,80%,60%)" /><circle cx="12" cy="2" r="1.5" fill="hsl(210,80%,60%)" /></svg>
    </div>
  );
};

/* ─── Floating particles ─── */
const Particles = () => {
  const particles = useMemo(() => Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1.5 + Math.random() * 2,
    duration: 15 + Math.random() * 25,
    delay: Math.random() * 10,
  })), []);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[hsl(210,80%,65%)]"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0.15, 0.35, 0], y: [0, -40, -20, -60, -80] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
        />
      ))}
    </div>
  );
};

/* ─── Animated neural network background ─── */
const NeuralBackground = () => {
  const nodes = useMemo(() => Array.from({ length: 18 }, (_, i) => ({
    id: i,
    cx: 5 + Math.random() * 90,
    cy: 5 + Math.random() * 90,
  })), []);
  const lines = useMemo(() => {
    const l: { x1: number; y1: number; x2: number; y2: number; id: string }[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].cx - nodes[j].cx;
        const dy = nodes[i].cy - nodes[j].cy;
        if (Math.sqrt(dx * dx + dy * dy) < 35) {
          l.push({ x1: nodes[i].cx, y1: nodes[i].cy, x2: nodes[j].cx, y2: nodes[j].cy, id: `${i}-${j}` });
        }
      }
    }
    return l;
  }, [nodes]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsl(210,60%,50%) 1px, transparent 1px), linear-gradient(90deg, hsl(210,60%,50%) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
      }} />
      {/* Scan line */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[hsl(210,80%,55%)]/8 to-transparent"
        animate={{ top: ["-2%", "102%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      {/* Neural lines SVG */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        {lines.map((ln, i) => (
          <motion.line
            key={ln.id}
            x1={`${ln.x1}%`} y1={`${ln.y1}%`} x2={`${ln.x2}%`} y2={`${ln.y2}%`}
            stroke="hsl(210,80%,60%)" strokeWidth="0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.02, 0.07, 0.03, 0.06, 0.02] }}
            transition={{ duration: 6 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
          />
        ))}
        {nodes.map((n) => (
          <motion.circle
            key={n.id}
            cx={`${n.cx}%`} cy={`${n.cy}%`} r="2"
            fill="hsl(210,80%,60%)"
            animate={{ opacity: [0.05, 0.2, 0.08, 0.18, 0.05], r: [1.5, 2.5, 1.5] }}
            transition={{ duration: 5 + Math.random() * 4, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 3 }}
          />
        ))}
      </svg>
    </div>
  );
};

/* ─── Hero AI core orb ─── */
const AIOrb = () => (
  <div className="absolute top-[12%] right-[8%] w-56 h-56 md:w-80 md:h-80 pointer-events-none">
    <motion.div className="relative w-full h-full" animate={{ rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }}>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <radialGradient id="orbGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(210,80%,60%)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="hsl(210,80%,60%)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="90" fill="url(#orbGlow)" />
        <circle cx="100" cy="100" r="80" stroke="hsl(210,80%,60%)" strokeWidth="0.4" fill="none" opacity="0.15" />
        <circle cx="100" cy="100" r="60" stroke="hsl(210,80%,60%)" strokeWidth="0.3" fill="none" opacity="0.1" />
        <circle cx="100" cy="100" r="40" stroke="hsl(195,70%,55%)" strokeWidth="0.3" fill="none" opacity="0.1" />
        <circle cx="100" cy="100" r="20" stroke="hsl(195,70%,55%)" strokeWidth="0.4" fill="none" opacity="0.15" />
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const r1 = 80, r2 = 40;
          return <line key={deg} x1={100 + r1 * Math.cos(rad)} y1={100 + r1 * Math.sin(rad)} x2={100 + r2 * Math.cos(rad + 0.3)} y2={100 + r2 * Math.sin(rad + 0.3)} stroke="hsl(210,80%,60%)" strokeWidth="0.25" opacity="0.12" />;
        })}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return <circle key={deg} cx={100 + 80 * Math.cos(rad)} cy={100 + 80 * Math.sin(rad)} r="2" fill="hsl(210,80%,60%)" opacity="0.3" />;
        })}
      </svg>
    </motion.div>
    {/* Pulse ring */}
    <motion.div
      className="absolute inset-0 rounded-full border border-[hsl(210,80%,60%)]/10"
      animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0, 0.1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

/* ─── Soundwave ─── */
const Soundwave = () => (
  <div className="flex items-center gap-[3px] h-8 justify-center">
    {[...Array(22)].map((_, i) => (
      <motion.div
        key={i}
        className="w-[2px] rounded-full bg-gradient-to-t from-[hsl(210,80%,55%)]/25 to-[hsl(195,70%,55%)]/50"
        animate={{ height: [3, 10 + Math.random() * 20, 5, 14 + Math.random() * 16, 3] }}
        transition={{ duration: 1.6 + Math.random() * 0.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.07 }}
      />
    ))}
  </div>
);

/* ─── Chat bubbles ─── */
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
            m.bot ? "bg-white/[0.04] border border-white/[0.07] text-white/55 rounded-bl-md" : "bg-[hsl(210,80%,55%)]/10 border border-[hsl(210,80%,55%)]/15 text-[hsl(210,80%,70%)] rounded-br-md"
          }`}>{m.text}
            {m.bot && i === 2 && (
              <motion.span className="inline-block w-[2px] h-3 bg-[hsl(210,80%,60%)]/50 ml-1 align-middle" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />
            )}
          </div>
        </motion.div>
      ))}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.9 }} className="flex justify-start">
        <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5">
          {[0, 1, 2].map((d) => (
            <motion.div key={d} className="w-1.5 h-1.5 rounded-full bg-[hsl(210,80%,60%)]/40" animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: d * 0.15 }} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

/* ─── Glowing divider ─── */
const Divider = () => (
  <div className="container mx-auto px-4">
    <div className="h-px relative">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
      <motion.div className="absolute top-0 h-px w-40 bg-gradient-to-r from-transparent via-[hsl(210,80%,55%)]/25 to-transparent" animate={{ left: ["0%", "100%", "0%"] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
    </div>
  </div>
);

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
};

/* ─── Section with parallax ─── */
const ParallaxSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);
  return (
    <section ref={ref} className={`py-28 relative ${className}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </section>
  );
};

/* ─── Data (unchanged) ─── */
const capabilities = ["24/7 Customer Support","Instant Response to Queries","Lead Capture & Qualification","Appointment Booking","Product/Service Information","FAQ Automation","Order Tracking","Smart Conversation Handling","Multi-language Support","CRM Integration"];
const chatbotBenefits = ["Reduce staff workload","Faster response time","Higher customer satisfaction","Increased lead conversion","Lower operational cost","24/7 availability"];
const voiceCapabilities = ["Make outbound calls automatically","Handle inbound calls","Follow conversation scripts intelligently","Answer FAQs naturally","Book appointments","Send follow-up messages","Qualify leads before human handover","Conduct surveys","Send reminders"];
const voiceUseCases = ["Sales follow-ups","Appointment confirmations","Lead qualification","Customer support","Payment reminders","Feedback collection","Campaign outreach"];
const assistantCapabilities = ["Access internal documents","Answer company-specific queries","Assist teams internally","Automate repetitive workflows","Generate reports","Manage customer communication","Connect with APIs & software tools"];
const integrations = ["CRM platforms","Google Sheets","Email systems","WhatsApp Business","Websites","Payment systems","Appointment systems"];
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

const tagStyle = "inline-flex items-center gap-2 rounded-full border border-[hsl(210,80%,55%)]/15 bg-[hsl(210,80%,55%)]/5 backdrop-blur-sm px-5 py-2 text-sm text-[hsl(210,80%,70%)] tracking-widest uppercase";

const AIBased = () => {
  return (
    <div className="text-white min-h-screen relative" style={{ background: "linear-gradient(180deg, hsl(220,40%,8%) 0%, hsl(222,35%,6%) 25%, hsl(225,30%,9%) 50%, hsl(220,35%,7%) 75%, hsl(222,32%,5%) 100%)" }}>
      <NeuralBackground />
      <Particles />
      <SEOHead title="AI Chatbots & Voice Agents | Malik Data Centre" description="Custom AI chatbots, voice calling agents, and intelligent assistants for businesses. Automate communication, generate leads, and scale operations with Malik Data Centre." />
      <Navbar />

      {/* ═══════ Hero ═══════ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, hsl(220,45%,12%) 0%, transparent 70%)" }} />
        <AIOrb />
        {/* Ambient glows */}
        <div className="absolute top-[5%] left-[2%] w-96 h-96 rounded-full bg-[hsl(210,80%,50%)]/[0.04] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[3%] w-[450px] h-[450px] rounded-full bg-[hsl(195,70%,50%)]/[0.03] blur-[140px] pointer-events-none" />
        {/* Floating shapes */}
        <motion.div className="absolute bottom-[22%] left-[8%] w-16 h-16 rounded-2xl border border-white/[0.04] bg-white/[0.015] backdrop-blur-sm pointer-events-none" animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }} />

        <div className="container mx-auto px-4 relative z-10 py-28">
          <FadeIn className="max-w-4xl mx-auto text-center">
            <div className={tagStyle + " mb-10"}><Brain className="h-4 w-4" /> AI-Powered Business Solutions</div>
            <h1 className="text-4xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.06] mb-7 tracking-tight">
              Intelligent AI Chatbots &<br className="hidden md:block" /> Voice Agents That Work{" "}
              <span className="bg-gradient-to-r from-[hsl(210,90%,65%)] via-[hsl(195,80%,55%)] to-[hsl(210,80%,50%)] bg-clip-text text-transparent">24/7</span>
            </h1>
            <p className="text-base md:text-lg text-white/40 max-w-2xl mx-auto mb-12 leading-relaxed tracking-wide">
              Automate conversations, handle customer queries, generate leads, and make smart voice calls — powered by advanced AI technology.
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              <Premium3DButton onClick={() => window.open(`https://wa.me/923489057646?text=${encodeURIComponent("Hi, I'm interested in AI consultation for my business.")}`, "_blank")} variant="primary">
                <MessageCircle className="h-5 w-5" /> Get AI Consultation
              </Premium3DButton>
              <Premium3DButton onClick={() => window.open(`https://wa.me/923489057646?text=${encodeURIComponent("Hi, I'd like to request a demo of your AI chatbot/voice agent.")}`, "_blank")} variant="secondary">
                <MessageCircle className="h-5 w-5" /> Request Demo
              </Premium3DButton>
            </div>
          </FadeIn>
        </div>
      </section>

      <Divider />

      {/* ═══════ What We Build ═══════ */}
      <ParallaxSection>
        <CircuitCorner position="tl" /><CircuitCorner position="br" />
        <div className="container mx-auto px-4 max-w-4xl">
          <FadeIn className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-5 tracking-tight">Smart AI Systems for Modern Businesses</h2>
            <p className="text-white/40 leading-relaxed max-w-3xl mx-auto text-[15px]">At Malik Data Centre, we design and deploy intelligent AI chatbots and AI voice calling agents that help businesses automate communication, reduce manual workload, and improve customer experience. Our systems are built for performance, scalability, and real-world business use.</p>
          </FadeIn>
          <FadeIn delay={0.2} className="text-center">
            <div className={`${glass} inline-block px-8 py-4 mt-4 relative`}>
              <CircuitCorner position="tl" /><CircuitCorner position="br" />
              <p className="text-sm font-medium text-[hsl(210,80%,65%)]/70 italic tracking-wide">"AI isn't the future — it's the present. Businesses that automate early scale faster."</p>
            </div>
          </FadeIn>
        </div>
      </ParallaxSection>

      <Divider />

      {/* ═══════ AI Chatbots ═══════ */}
      <ParallaxSection>
        <CircuitCorner position="tr" /><CircuitCorner position="bl" />
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-14">
            <div className={tagStyle + " mb-5"}><Bot className="h-4 w-4" /> Text-Based Automation</div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">What Our AI Chatbots Can Do</h2>
          </FadeIn>
          <FadeIn delay={0.1} className="mb-14">
            <div className={`${glass} max-w-sm mx-auto p-6 relative`}>
              <CircuitCorner position="tl" /><CircuitCorner position="br" />
              <ChatBubblePreview />
            </div>
          </FadeIn>
          <FadeIn delay={0.15} className="mb-14">
            <p className="text-center text-white/30 mb-6 tracking-widest text-xs uppercase">Our AI chatbots integrate with</p>
            <div className="flex flex-wrap justify-center gap-3">
              {chatbotPlatforms.map((p) => (
                <div key={p.label} className={`${glass} ${glassHover} flex items-center gap-2.5 px-5 py-3 text-sm group cursor-default`}>
                  <p.icon className="h-4 w-4 text-[hsl(210,80%,60%)]/50 group-hover:text-[hsl(210,80%,60%)] transition-colors duration-300" />
                  <span className="text-white/55 group-hover:text-white/80 transition-colors duration-300">{p.label}</span>
                </div>
              ))}
            </div>
          </FadeIn>
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
      </ParallaxSection>

      <Divider />

      {/* ═══════ Voice Agents ═══════ */}
      <ParallaxSection>
        <CircuitCorner position="tl" /><CircuitCorner position="br" />
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-8">
            <div className={tagStyle + " mb-5"}><Mic className="h-4 w-4" /> AI Voice Calling</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-5 tracking-tight">Smart AI That Can Make & Receive Calls</h2>
            <p className="text-white/40 max-w-2xl mx-auto text-[15px]">These systems sound natural and human-like, ensuring professional communication at scale.</p>
          </FadeIn>
          <FadeIn delay={0.1} className="mb-14">
            <div className={`${glass} max-w-md mx-auto p-6 relative overflow-hidden`}>
              <CircuitCorner position="tl" /><CircuitCorner position="br" />
              {/* Waveform bg */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <svg className="absolute bottom-0 left-0 w-full h-12 opacity-[0.06]" viewBox="0 0 400 40" preserveAspectRatio="none">
                  <motion.path d="M0,20 Q50,5 100,20 T200,20 T300,20 T400,20" fill="none" stroke="hsl(210,80%,60%)" strokeWidth="1" animate={{ d: ["M0,20 Q50,5 100,20 T200,20 T300,20 T400,20","M0,20 Q50,35 100,20 T200,20 T300,20 T400,20","M0,20 Q50,5 100,20 T200,20 T300,20 T400,20"] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
                </svg>
              </div>
              <div className="flex flex-col items-center gap-4 relative z-10">
                <motion.div
                  className="w-14 h-14 rounded-full border border-[hsl(210,80%,55%)]/20 bg-[hsl(210,80%,55%)]/5 flex items-center justify-center"
                  animate={{ boxShadow: ["0 0 0 0 hsla(210,80%,55%,0)","0 0 0 14px hsla(210,80%,55%,0.06)","0 0 0 0 hsla(210,80%,55%,0)"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                    <Mic className="h-6 w-6 text-[hsl(210,80%,60%)]/60" />
                  </motion.div>
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
                  <div key={u} className={`${glass} ${glassHover} p-4 text-sm text-white/50 text-center cursor-default`}>{u}</div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </ParallaxSection>

      <Divider />

      {/* ═══════ Custom AI Assistants ═══════ */}
      <ParallaxSection>
        <CircuitCorner position="tr" /><CircuitCorner position="bl" />
        <div className="container mx-auto px-4 max-w-5xl">
          <FadeIn className="text-center mb-14">
            <div className={tagStyle + " mb-5"}><Sparkles className="h-4 w-4" /> Jarvis-Style Systems</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-5 tracking-tight">Personal AI Assistants for Businesses</h2>
            <p className="text-white/40 max-w-2xl mx-auto text-[15px]">We build customized AI assistants tailored to your business needs. Every assistant is built according to your workflow and requirements.</p>
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
      </ParallaxSection>

      <Divider />

      {/* ═══════ Automation & Integration ═══════ */}
      <ParallaxSection>
        <CircuitCorner position="tl" /><CircuitCorner position="br" />
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <FadeIn className="mb-12">
            <div className={tagStyle + " mb-5"}><Plug className="h-4 w-4" /> Integrations</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-5 tracking-tight">Automation & Integration</h2>
            <p className="text-white/40 text-[15px]">We create complete automation flows — not just bots.</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3">
              {integrations.map((item) => (
                <span key={item} className={`${glass} ${glassHover} px-6 py-3 text-sm text-white/50 cursor-default`}>{item}</span>
              ))}
            </div>
          </FadeIn>
        </div>
      </ParallaxSection>

      <Divider />

      {/* ═══════ Why Choose ═══════ */}
      <ParallaxSection>
        <CircuitCorner position="tr" /><CircuitCorner position="bl" />
        <div className="container mx-auto px-4 max-w-5xl">
          <FadeIn className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-5 tracking-tight">Why Choose Malik Data Centre</h2>
            <p className="text-white/40 max-w-2xl mx-auto text-[15px]">We don't just install bots — we build intelligent systems that improve efficiency and drive measurable impact.</p>
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
      </ParallaxSection>

      <Divider />

      {/* ═══════ Process ═══════ */}
      <ParallaxSection>
        <CircuitCorner position="tl" /><CircuitCorner position="br" />
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
      </ParallaxSection>

      <Divider />

      {/* ═══════ Who Is This For ═══════ */}
      <ParallaxSection>
        <CircuitCorner position="tr" /><CircuitCorner position="bl" />
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
      </ParallaxSection>

      <Divider />

      {/* ═══════ Final CTA ═══════ */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, hsl(220,45%,12%) 0%, transparent 70%)" }} />
        <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[hsl(210,80%,50%)]/[0.03] pointer-events-none" animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.07, 0.03] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
        <CircuitCorner position="tl" /><CircuitCorner position="tr" /><CircuitCorner position="bl" /><CircuitCorner position="br" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-bold mb-5 tracking-tight">Ready to Automate Your Business?</h2>
            <p className="text-lg text-white/40 max-w-2xl mx-auto mb-12">Let's build an AI system that works 24/7 for you.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <WhatsAppButton message="Hi, I'd like to schedule a consultation about AI chatbots/voice agents for my business." size="lg">Schedule Consultation</WhatsAppButton>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white/[0.08] text-white/60 hover:bg-white/[0.04] hover:text-white/90 hover:border-[hsl(210,80%,55%)]/20 hover:shadow-[0_0_24px_rgba(59,130,246,0.1)] transition-all duration-300">
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
