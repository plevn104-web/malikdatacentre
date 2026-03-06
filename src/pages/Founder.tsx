import { motion } from "framer-motion";
import { Linkedin, Brain, Bot, Youtube, Briefcase, Shield, GraduationCap, Target, Rocket, ArrowLeft, Monitor, Wifi, Lock, CreditCard, Video, MessageSquare, Phone, Zap, Users, Code, Palette, TrendingUp, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import founderPhoto from "@/assets/founder-photo.png";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5 },
};

const gradientText = "bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent";

const teamItems = [
  { icon: Palette, label: "Professional Editors Team" },
  { icon: Code, label: "Software Developers" },
  { icon: Bot, label: "AI Assistant Systems" },
  { icon: Youtube, label: "YouTubers Team (50/50 Partnership)" },
  { icon: Video, label: "TikTok Automation Team" },
  { icon: Users, label: "Content Creators & Media Support" },
];

const aiTools = [
  "ChatGPT", "Claude AI", "Grok AI", "Lovable", "Cursor Pro",
  "Kling AI", "HeyGen AI", "CapCut Pro", "Other Advanced AI Tools",
];

const aiCapabilities = [
  { icon: MessageSquare, label: "AI Chatbot Development" },
  { icon: Phone, label: "AI Calling Agents" },
  { icon: Zap, label: "AI Automated Workflows" },
  { icon: Brain, label: "AI Content Systems" },
];

const infraItems = [
  { icon: Monitor, label: "Laptop & Mobile Systems for Digital Operations" },
  { icon: Wifi, label: "High-Speed Internet / WiFi Availability" },
  { icon: Lock, label: "Secure VPN Infrastructure (NordVPN, Surfshark)" },
  { icon: CreditCard, label: "Online Payment Systems (Stripe)" },
];

const currentProjects = [
  "AI Chatbot Systems",
  "AI Automation Solutions",
  "AI Calling Agents",
  "Content Creation Systems",
  "Social Media Automation",
  "YouTube Channel Development",
  "TikTok Automation Projects",
  "AI Powered Digital Products",
];

export default function Founder() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,40%,8%)] via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(210,80%,20%,0.2),transparent_60%)]" />

        <div className="container relative px-4">
          <motion.div {...fadeUp} className="mb-8">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-cyan-500/30 via-blue-500/20 to-indigo-600/20 blur-2xl" />
                <img
                  src={founderPhoto}
                  alt="Founder of Malik Data Centre"
                  className="relative h-80 w-80 md:h-[26rem] md:w-[26rem] rounded-2xl object-cover object-top border-2 border-white/10 shadow-2xl"
                />
              </div>
            </motion.div>

            {/* Hero Text */}
            <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.15 }} className="text-center lg:text-left">
              <span className="inline-block rounded-full bg-cyan-500/10 border border-cyan-500/20 px-4 py-1.5 text-sm font-medium text-cyan-400 mb-5">
                Meet the Founder
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4">
                Meet the Founder of{" "}
                <span className={gradientText}>
                  Malik Data Centre
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                Building the future of digital innovation, AI automation, and modern men's success.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About the Founder */}
      <section className="py-16 md:py-24">
        <div className="container px-4 max-w-4xl">
          <motion.div {...fadeUp} className="text-center mb-8">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
              About the <span className={gradientText}>Founder</span>
            </h2>
          </motion.div>
          <motion.p {...fadeUp} className="text-lg text-muted-foreground leading-relaxed text-center">
            A digital entrepreneur working on multiple online projects, AI automation systems, and digital media platforms. He is building <strong className="text-foreground">Malik Data Centre</strong> as a platform to inspire and help men grow in business, technology, mindset, and lifestyle — creating a powerful ecosystem where ambition meets execution.
          </motion.p>
        </div>
      </section>

      {/* Team & Ecosystem */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Our Team & <span className={gradientText}>Ecosystem</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Malik Data Centre operates with a growing team and digital ecosystem.
            </p>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {teamItems.map((item, i) => (
              <motion.div
                key={item.label}
                {...fadeUp}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-center gap-4 rounded-xl bg-background p-5 border border-border hover:border-cyan-500/40 transition-colors"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10">
                  <item.icon className="h-5 w-5 text-cyan-400" />
                </div>
                <span className="font-medium text-foreground text-sm">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology & AI Infrastructure */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Technology & <span className={gradientText}>AI Infrastructure</span>
            </h2>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
            {/* Paid AI Tools */}
            <motion.div {...fadeUp} className="rounded-2xl bg-gradient-to-br from-blue-950/40 to-background p-6 border border-cyan-500/15">
              <h3 className="font-display text-xl font-bold text-foreground mb-4">Paid AI Tools</h3>
              <div className="flex flex-wrap gap-2">
                {aiTools.map((tool) => (
                  <span key={tool} className="rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3 py-1.5 text-xs font-medium text-cyan-300">
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* AI Capabilities */}
            <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="rounded-2xl bg-gradient-to-br from-blue-950/40 to-background p-6 border border-cyan-500/15">
              <h3 className="font-display text-xl font-bold text-foreground mb-4">AI Capabilities</h3>
              <div className="space-y-3">
                {aiCapabilities.map((cap) => (
                  <div key={cap.label} className="flex items-center gap-3">
                    <cap.icon className="h-5 w-5 text-cyan-400 shrink-0" />
                    <span className="text-sm text-muted-foreground">{cap.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Business Infrastructure */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Business <span className={gradientText}>Infrastructure</span>
            </h2>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto">
            {infraItems.map((item, i) => (
              <motion.div
                key={item.label}
                {...fadeUp}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-center gap-4 rounded-xl bg-background p-5 border border-border hover:border-cyan-500/40 transition-colors"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10">
                  <item.icon className="h-5 w-5 text-cyan-400" />
                </div>
                <span className="font-medium text-foreground text-sm">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Projects */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Current <span className={gradientText}>Projects</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              The team is actively delivering multiple digital projects.
            </p>
          </motion.div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {currentProjects.map((project, i) => (
              <motion.div
                key={project}
                {...fadeUp}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-xl bg-gradient-to-br from-blue-950/30 to-background border border-cyan-500/10 p-4 text-center"
              >
                <span className="text-sm font-medium text-foreground">{project}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 max-w-4xl">
          <motion.div {...fadeUp} className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
                <Globe className="h-8 w-8 text-cyan-400" />
              </div>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Vision for the <span className={gradientText}>Future</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              To build <strong className="text-foreground">Malik Data Centre</strong> into a global platform focused on AI innovation, digital entrepreneurship, automation systems, and personal development for modern men.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Connect */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <motion.div {...fadeUp} className="text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Connect with the <span className={gradientText}>Founder</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Interested in collaboration, partnerships, or just want to connect? Reach out through the links below.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="gap-2 bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white" asChild>
                <a href="https://www.linkedin.com/in/malik-amir-usman-71ab54397" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                  LinkedIn
                </a>
              </Button>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="gap-2 border-cyan-500/30 hover:border-cyan-500/60">
                  <MessageSquare className="h-5 w-5" />
                  Get in Touch
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
