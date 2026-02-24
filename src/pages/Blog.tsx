import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, Mail } from "lucide-react";

const categories = ["All", "AI Tools", "YouTube Growth", "SEO Tips", "Automation"];

const posts = [
  { title: "10 AI Tools Every YouTuber Needs in 2026", category: "AI Tools", excerpt: "Discover the must-have AI tools that are revolutionizing content creation and helping YouTubers grow faster than ever.", image: "/placeholder.svg" },
  { title: "YouTube SEO: The Complete Guide", category: "SEO Tips", excerpt: "Learn how to optimize your videos for YouTube search and get discovered by millions of potential viewers.", image: "/placeholder.svg" },
  { title: "How to Get Monetized in 30 Days", category: "YouTube Growth", excerpt: "A step-by-step strategy to reach 1,000 subscribers and 4,000 watch hours for YouTube monetization.", image: "/placeholder.svg" },
  { title: "Automate Your Content Workflow", category: "Automation", excerpt: "Save hours every week by automating repetitive tasks in your content creation pipeline.", image: "/placeholder.svg" },
  { title: "Thumbnail Design Secrets That Get Clicks", category: "YouTube Growth", excerpt: "The psychology behind high-CTR thumbnails and how to create them for your channel.", image: "/placeholder.svg" },
  { title: "ChatGPT vs Claude: Which is Better for Creators?", category: "AI Tools", excerpt: "An honest comparison of the two leading AI assistants for content creation and productivity.", image: "/placeholder.svg" },
];

const Blog = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="container px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
              Learn, Grow & <span className="gradient-text">Dominate YouTube</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">Expert insights, tutorials, and strategies to accelerate your digital growth.</p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8">
        <div className="container px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((c) => (
              <Button key={c} variant={active === c ? "default" : "outline"} size="sm" onClick={() => setActive(c)}>{c}</Button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-8">
        <div className="container px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post, i) => (
              <motion.div key={post.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }}>
                <Card className="glass-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden group h-full">
                  <div className="aspect-video bg-muted/30 overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                  </div>
                  <CardContent className="p-6 flex flex-col">
                    <span className="text-xs font-medium text-primary mb-2">{post.category}</span>
                    <h3 className="font-display text-lg font-bold text-foreground mb-2">{post.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 flex-1">{post.excerpt}</p>
                    <Button variant="ghost" className="w-fit p-0 text-primary hover:text-primary/80">
                      Read More <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20">
        <div className="container px-4 max-w-2xl">
          <Card className="glass-card border-primary/20">
            <CardContent className="p-8 text-center">
              <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">Subscribe to Our Newsletter</h2>
              <p className="text-muted-foreground mb-6">Get the latest tips, tools, and strategies delivered to your inbox weekly.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input placeholder="Enter your email address" className="flex-1 bg-muted/30 border-border/50" />
                <Button>Subscribe</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Blog;
