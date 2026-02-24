import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Lightbulb, DollarSign, BarChart3, FileText, 
  Instagram, Linkedin, Twitter, Hash,
  FileSearch, RefreshCw, BookOpen, ShieldCheck,
  PenTool, Search, HelpCircle, Network,
  Send, ClipboardList, ScrollText,
  Layout, TrendingUp, Package, Bot,
  ArrowRight
} from "lucide-react";

const tools = [
  { category: "Business", items: [
    { name: "Business Idea Generator", desc: "Generate 5 detailed startup ideas with revenue models", icon: Lightbulb, href: "/ai-tools/business-idea-generator" },
    { name: "Pricing Strategy", desc: "AI pricing models and competitive analysis", icon: DollarSign, href: "/ai-tools/pricing-strategy" },
    { name: "Market Research", desc: "Market trends, demographics, and growth analysis", icon: BarChart3, href: "/ai-tools/market-research" },
    { name: "Business Plan", desc: "Full business plan with financial overview", icon: FileText, href: "/ai-tools/business-plan" },
  ]},
  { category: "Social Media", items: [
    { name: "Instagram Caption", desc: "Engaging captions with optimized hashtags", icon: Instagram, href: "/ai-tools/instagram-caption" },
    { name: "LinkedIn Post", desc: "Professional posts for thought leadership", icon: Linkedin, href: "/ai-tools/linkedin-post" },
    { name: "Twitter/X Thread", desc: "Viral thread generation with hooks", icon: Twitter, href: "/ai-tools/twitter-thread" },
    { name: "Hashtag Research", desc: "Trending, niche, and broad hashtags", icon: Hash, href: "/ai-tools/hashtag-research" },
  ]},
  { category: "Writing & Utility", items: [
    { name: "Text Summarizer", desc: "Key points and summaries from any text", icon: FileSearch, href: "/ai-tools/text-summarizer" },
    { name: "Paraphrasing Tool", desc: "Rewrite text in any tone", icon: RefreshCw, href: "/ai-tools/paraphrasing" },
    { name: "PDF to Notes", desc: "Convert text into structured study notes", icon: BookOpen, href: "/ai-tools/pdf-to-notes" },
    { name: "Plagiarism Checker", desc: "AI-powered originality analysis", icon: ShieldCheck, href: "/ai-tools/plagiarism-checker" },
  ]},
  { category: "SEO", items: [
    { name: "Blog Intro Generator", desc: "5 SEO-optimized blog intros in different styles", icon: PenTool, href: "/ai-tools/blog-intro" },
    { name: "Meta Description", desc: "SEO meta descriptions under 160 chars", icon: Search, href: "/ai-tools/meta-description" },
    { name: "FAQ Generator", desc: "10 comprehensive FAQ Q&As", icon: HelpCircle, href: "/ai-tools/faq-generator" },
    { name: "Keyword Cluster", desc: "Organized keyword clusters with intent", icon: Network, href: "/ai-tools/keyword-cluster" },
  ]},
  { category: "Freelancer", items: [
    { name: "Proposal Generator", desc: "Winning freelance proposals instantly", icon: Send, href: "/ai-tools/proposal-generator" },
    { name: "Client Brief Analyzer", desc: "Extract key info from client briefs", icon: ClipboardList, href: "/ai-tools/client-brief-analyzer" },
    { name: "Contract Template", desc: "Professional contract templates", icon: ScrollText, href: "/ai-tools/contract-template" },
  ]},
  { category: "Advanced", items: [
    { name: "Landing Page Copy", desc: "Complete landing page copy with CTAs", icon: Layout, href: "/ai-tools/landing-page-copy" },
    { name: "Sales Funnel Planner", desc: "Full funnel with stages and metrics", icon: TrendingUp, href: "/ai-tools/sales-funnel" },
    { name: "Product Description", desc: "3 descriptions in different tones", icon: Package, href: "/ai-tools/product-description" },
    { name: "Chatbot Flow Builder", desc: "Design chatbot conversation flows", icon: Bot, href: "/ai-tools/chatbot-builder" },
  ]},
];

const AIToolsHub = () => (
  <main className="min-h-screen bg-background">
    <SEOHead title="AI Tools – 23 Free AI-Powered Tools" description="Access 23 AI-powered tools for business, social media, SEO, writing, freelancing, and more. All tools are free to use with your account." canonical="/ai-tools" />
    <Navbar />
    <section className="pt-32 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="container px-4 relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary inline-block mb-6">23 AI Tools</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">AI-Powered <span className="gradient-text">Tools Suite</span></h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">Real AI-powered tools for business strategy, content creation, SEO, freelancing, and more. No dummy responses — real AI output every time.</p>
        </motion.div>
      </div>
    </section>

    {tools.map((cat, ci) => (
      <section key={cat.category} className={`py-12 ${ci % 2 === 1 ? "bg-muted/20" : ""}`}>
        <div className="container px-4">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">{cat.category} Tools</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {cat.items.map((tool, ti) => (
              <motion.div key={tool.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: ti * 0.05 }} viewport={{ once: true }}>
                <Link to={tool.href}>
                  <Card className="h-full border-border/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
                    <CardContent className="p-5">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors"><tool.icon className="h-5 w-5" /></div>
                      <h3 className="font-display text-base font-bold text-foreground mb-1">{tool.name}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{tool.desc}</p>
                      <span className="text-xs text-primary flex items-center gap-1">Try now <ArrowRight className="h-3 w-3" /></span>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    ))}

    <Footer />
  </main>
);

export default AIToolsHub;
