import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ArrowRight, Sparkles, Youtube, Zap, Palette } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/923489057646";

const categories = [
  {
    name: "Content Creation Tools",
    icon: <Sparkles className="h-6 w-6" />,
    tools: [
      { name: "ChatGPT Business", desc: "Advanced AI for writing scripts, blogs, and content ideas.", benefits: ["Unlimited prompts", "GPT-4 access", "Team collaboration"] },
      { name: "Claude AI", desc: "Powerful reasoning AI for research, analysis, and long-form content.", benefits: ["200K context window", "Code generation", "Advanced reasoning"] },
      { name: "HeyGen AI", desc: "Create AI-powered videos with realistic avatars and voiceovers.", benefits: ["AI video avatars", "Multi-language support", "Brand templates"] },
    ],
  },
  {
    name: "YouTube SEO Tools",
    icon: <Youtube className="h-6 w-6" />,
    tools: [
      { name: "Gemini Veo 3 Ultra", desc: "Google's most advanced AI for video analysis and SEO insights.", benefits: ["Video optimization", "Trend detection", "Keyword analysis"] },
      { name: "Veo 3 Ultra Panel", desc: "Full 50-account panel with 45K credits for agencies and power users.", benefits: ["50 accounts included", "45K credits", "Bulk management"] },
      { name: "SMM Panel", desc: "Complete social media management panel for all platforms.", benefits: ["Multi-platform support", "Analytics dashboard", "Scheduling tools"] },
    ],
  },
  {
    name: "Automation Tools",
    icon: <Zap className="h-6 w-6" />,
    tools: [
      { name: "Lovable Pro", desc: "Build full-stack web applications with AI-powered development.", benefits: ["AI code generation", "Instant deployment", "Cloud backend"] },
      { name: "Cursor Pro", desc: "AI-powered code editor for rapid software development.", benefits: ["AI autocomplete", "Multi-file editing", "Code refactoring"] },
      { name: "Nord VPN", desc: "Secure, fast VPN for privacy and unrestricted access.", benefits: ["Global servers", "No-log policy", "6 devices"] },
    ],
  },
  {
    name: "Design & Thumbnail Tools",
    icon: <Palette className="h-6 w-6" />,
    tools: [
      { name: "Higgsfield", desc: "AI-powered video and motion design for stunning visual content.", benefits: ["AI motion graphics", "Template library", "Export in 4K"] },
      { name: "AI Thumbnail Generator", desc: "Create high-CTR YouTube thumbnails using AI in seconds.", benefits: ["Auto face detection", "Text overlay", "Brand colors"] },
      { name: "AI Logo Maker", desc: "Generate professional logos and brand kits with AI.", benefits: ["Unlimited concepts", "Vector output", "Brand guidelines"] },
    ],
  },
];

const AIToolsLibrary = () => (
  <main className="min-h-screen bg-background">
    <Navbar />

    {/* Hero */}
    <section className="pt-32 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="container px-4 relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary inline-block mb-6">AI Tools Library</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
            Premium AI Tools for <span className="gradient-text">Creators & Businesses</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-8">
            Supercharge your productivity with our curated collection of premium AI tools. From content creation to automation, we've got you covered.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Categories */}
    {categories.map((cat, ci) => (
      <section key={cat.name} className={`py-16 ${ci % 2 === 1 ? "bg-muted/20" : ""}`}>
        <div className="container px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center gap-3 mb-8">
            <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">{cat.icon}</div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">{cat.name}</h2>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cat.tools.map((tool, ti) => (
              <motion.div key={tool.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: ti * 0.1 }} viewport={{ once: true }}>
                <Card className="glass-card h-full border-border/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group">
                  <CardContent className="p-6 flex flex-col h-full">
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">{tool.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{tool.desc}</p>
                    <ul className="space-y-2 mb-6 flex-1">
                      {tool.benefits.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="h-4 w-4 text-primary flex-shrink-0" /> {b}
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                        Learn More <ArrowRight className="h-4 w-4 ml-1" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    ))}

    <Footer />
  </main>
);

export default AIToolsLibrary;
