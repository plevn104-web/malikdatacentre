import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AdPlaceholder } from "@/components/layout/AdPlaceholder";
import { SEOHead } from "@/components/SEOHead";
import { blogPosts } from "@/data/blogPosts";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, Mail, Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const categories = ["All", "AI Tools", "YouTube Growth", "SEO Tips", "Automation"];

const Blog = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? blogPosts : blogPosts.filter((p) => p.category === active);

  return (
    <main className="min-h-screen bg-background">
      <SEOHead
        title="Blog & Resources"
        description="Expert insights, tutorials, and strategies on AI tools, YouTube growth, SEO, and content automation. Learn from in-depth articles."
        canonical="/blog"
      />
      <Navbar />
      <Breadcrumbs items={[{ label: "Blog" }]} />
      <AdPlaceholder position="header" />

      {/* Hero */}
      <section className="pt-8 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="container px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
              Learn, Grow & <span className="gradient-text">Dominate YouTube</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Expert insights, tutorials, and strategies to accelerate your digital growth. Explore our library of in-depth articles on AI tools, YouTube growth, SEO, and automation.
            </p>
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
              <motion.div key={post.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} viewport={{ once: true }}>
                <Link to={`/blog/${post.slug}`}>
                  <Card className="glass-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden group h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <span className="text-xs font-medium text-primary mb-2">{post.category}</span>
                      <h2 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{post.title}</h2>
                      <p className="text-muted-foreground text-sm mb-4 flex-1">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AdPlaceholder position="content" />

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

      <AdPlaceholder position="footer" />
      <Footer />
    </main>
  );
};

export default Blog;
