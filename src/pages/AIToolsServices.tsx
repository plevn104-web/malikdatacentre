import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Video, Bot, Search, FileText, Share2, Settings, Headphones,
  Building2, Users, Briefcase, TrendingUp, MessageCircle, ArrowRight,
  Zap, Lock, Clock, Filter, ShieldCheck,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const WHATSAPP_URL = "https://wa.me/923489057646?text=Hi! I'm interested in AI Tools & Digital Services. Please share details.";
const ENTERPRISE_URL = "https://wa.me/923489057646?text=Hi! I need enterprise-level AI deployment and custom setup. Please share details.";

type ToolCategory = "all" | "ai" | "video" | "growth" | "vpn" | "accounts";

interface Tool {
  name: string;
  price: string;
  badge: string | null;
  type: "instant" | "private" | "demand";
  category: ToolCategory[];
  desc: string;
}

const tools: Tool[] = [
  { name: "ChatGPT Business", price: "1,499/- / Month", badge: "Best Seller", type: "instant", category: ["ai"], desc: "Full GPT-4o access for teams and professionals." },
  { name: "CapCut Pro", price: "499/-", badge: "Popular", type: "instant", category: ["video"], desc: "Professional video editing with premium effects." },
  { name: "Sora AI Pro", price: "2,999/-", badge: "Best Seller", type: "instant", category: ["ai", "video"], desc: "OpenAI's text-to-video generation platform." },
  { name: "Gemini Veo 3 Ultra", price: "1,499/- / Month", badge: null, type: "instant", category: ["ai", "video"], desc: "Google's advanced multimodal AI model." },
  { name: "HeyGen AI", price: "4,500/- / Month", badge: null, type: "private", category: ["ai", "video"], desc: "AI-powered video avatar generation." },
  { name: "Higgsfield", price: "6,499/- / Month", badge: null, type: "private", category: ["ai", "video"], desc: "Next-gen AI video creation platform." },
  { name: "Hailuo AI", price: "4,500/-", badge: null, type: "private", category: ["ai", "video"], desc: "Advanced AI video synthesis tool." },
  { name: "One Time OTP Number", price: "200/-", badge: null, type: "instant", category: ["accounts"], desc: "Instant verification number for any platform." },
  { name: "Grok AI", price: "2,999/-", badge: null, type: "private", category: ["ai"], desc: "xAI's conversational intelligence model." },
  { name: "MiniMax AI", price: "4,500/-", badge: null, type: "private", category: ["ai", "video"], desc: "Multimodal AI for text, image, and video." },
  { name: "Runway ML (Unlimited)", price: "4,000/-", badge: "Best Seller", type: "instant", category: ["ai", "video"], desc: "Unlimited AI video generation and editing." },
  { name: "GenSpark AI", price: "4,999/-", badge: null, type: "instant", category: ["ai"], desc: "AI-powered research and content engine." },
  { name: "Kling AI", price: "2,300/-", badge: null, type: "private", category: ["ai", "video"], desc: "High-quality AI video generation." },
  { name: "ElevenLabs", price: "2,400/-", badge: "Popular", type: "private", category: ["ai"], desc: "Premium AI voice synthesis and cloning." },
  { name: "Lovable Pro", price: "2,999/- / Month", badge: "Popular", type: "instant", category: ["ai"], desc: "AI-powered full-stack app builder." },
  { name: "Cursor Pro", price: "4,200/- / Month", badge: null, type: "instant", category: ["ai"], desc: "AI-first code editor for developers." },
  { name: "Claude AI", price: "3,499/- / Month", badge: null, type: "instant", category: ["ai"], desc: "Anthropic's advanced reasoning AI assistant." },
  { name: "Nord VPN", price: "1,499/- / Month", badge: null, type: "instant", category: ["vpn"], desc: "Military-grade encryption and global servers." },
  { name: "Surfshark Premium VPN", price: "499/- / Month", badge: null, type: "instant", category: ["vpn"], desc: "Unlimited devices with premium security." },
  { name: "YouTube Premium", price: "200/-", badge: null, type: "instant", category: ["vpn"], desc: "Ad-free YouTube with background play." },
  { name: "Veo 3 Ultra 45K Credits (50 Accounts)", price: "38,500/-", badge: null, type: "demand", category: ["ai", "growth"], desc: "Bulk Veo 3 credits for enterprise use." },
  { name: "4K Hours Watch Time", price: "4,000/-", badge: null, type: "demand", category: ["growth"], desc: "YouTube monetization watch time package." },
  { name: "1K YouTube Subscribers", price: "999/-", badge: null, type: "demand", category: ["growth"], desc: "Organic subscriber growth for YouTube." },
  { name: "1K TikTok Followers", price: "799/-", badge: null, type: "demand", category: ["growth"], desc: "TikTok audience growth package." },
  { name: "1K Facebook Followers", price: "799/-", badge: null, type: "demand", category: ["growth"], desc: "Facebook page growth package." },
  { name: "1K Instagram Followers", price: "799/-", badge: null, type: "demand", category: ["growth"], desc: "Instagram profile growth package." },
  { name: "SMM Panel", price: "19,999/-", badge: null, type: "demand", category: ["growth"], desc: "Complete social media marketing panel." },
  { name: "YouTube Channels", price: "On Demand", badge: null, type: "demand", category: ["growth", "accounts"], desc: "Ready-to-use YouTube channels." },
  { name: "Google / Gmail Accounts", price: "150/-", badge: null, type: "instant", category: ["accounts"], desc: "Fresh Google accounts for any purpose." },
];

const categories: { key: ToolCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "ai", label: "AI Tools" },
  { key: "video", label: "Video & Content" },
  { key: "growth", label: "Growth Services" },
  { key: "vpn", label: "VPN & Utilities" },
  { key: "accounts", label: "Accounts" },
];

const getTypeInfo = (type: string) => {
  switch (type) {
    case "instant":
      return { label: "Instant Access", icon: Zap, className: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" };
    case "private":
      return { label: "Private Account", icon: Lock, className: "text-blue-400 bg-blue-500/10 border-blue-500/20" };
    case "demand":
      return { label: "On Demand", icon: Clock, className: "text-amber-400 bg-amber-500/10 border-amber-500/20" };
    default:
      return { label: "Available", icon: Zap, className: "text-muted-foreground bg-muted/50 border-border" };
  }
};

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function AIToolsServices() {
  const [activeCategory, setActiveCategory] = useState<ToolCategory>("all");

  const filtered = activeCategory === "all"
    ? tools
    : tools.filter((t) => t.category.includes(activeCategory));

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-secondary/10 rounded-full blur-[100px]" />
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                                linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="container px-4 relative z-10">
          <motion.div {...fadeIn} className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Marketplace</span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Premium AI & <span className="gradient-text">Digital Tools Marketplace</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Instant access to powerful AI software, automation tools, and growth services — structured for modern businesses.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 transition-all duration-200 hover:-translate-y-0.5"
                onClick={() => document.getElementById("tools-catalog")?.scrollIntoView({ behavior: "smooth" })}
              >
                Browse Tools
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg font-semibold rounded-xl border-border hover:border-primary/50 transition-all duration-200 hover:-translate-y-0.5" asChild>
                <a href={ENTERPRISE_URL} target="_blank" rel="noopener noreferrer">
                  Request Enterprise Setup
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Filter + Product Grid ── */}
      <section id="tools-catalog" className="py-20 md:py-28 scroll-mt-20">
        <div className="container px-4">
          {/* Filter tabs */}
          <motion.div {...fadeIn} className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                  activeCategory === cat.key
                    ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                    : "bg-card/50 text-muted-foreground border-border/50 hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {filtered.map((tool) => {
                const info = getTypeInfo(tool.type);
                const TypeIcon = info.icon;
                return (
                  <Card
                    key={tool.name}
                    className="group relative h-full bg-card/60 backdrop-blur-sm border-border/50 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
                  >
                    {tool.badge && (
                      <Badge
                        className={`absolute -top-2.5 -right-2.5 z-10 text-xs ${
                          tool.badge === "Best Seller"
                            ? "bg-primary text-primary-foreground"
                            : "bg-emerald-500 text-white"
                        }`}
                      >
                        {tool.badge}
                      </Badge>
                    )}
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${info.className}`}>
                          <TypeIcon className="w-3 h-3" />
                          {info.label}
                        </span>
                      </div>
                      <h3 className="font-semibold text-foreground text-lg mb-1.5 group-hover:text-primary transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                        {tool.desc}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/30">
                        <span className="text-xl font-bold text-foreground">
                          Rs {tool.price}
                        </span>
                        <Button size="sm" variant="outline" className="text-xs" asChild>
                          <a
                            href={`https://wa.me/923489057646?text=${encodeURIComponent(`Hi, I'm interested in ${tool.name}. Please share details.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Get Access
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Enterprise Section ── */}
      <section className="py-20 md:py-28">
        <div className="container px-4">
          <motion.div {...fadeIn} className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card/80 to-secondary/5 p-10 md:p-16 text-center overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <ShieldCheck className="w-12 h-12 text-primary mx-auto mb-6" />
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Need Bulk Access or Custom Setup?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                  We provide enterprise-level AI deployment, automation integration, and private account setups — tailored for teams and organizations at scale.
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-10 py-6 text-lg font-semibold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                  asChild
                >
                  <a href={ENTERPRISE_URL} target="_blank" rel="noopener noreferrer">
                    Contact for Enterprise Pricing
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
