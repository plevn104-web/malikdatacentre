import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AdPlaceholder } from "@/components/layout/AdPlaceholder";
import { blogPosts } from "@/data/blogPosts";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import React from "react";

// Internal link map: phrase → route
const internalLinks: Record<string, string> = {
  "our AI Tools Library": "/ai-tools",
  "AI Tools Library": "/ai-tools",
  "our YouTube Growth Services": "/youtube-growth",
  "YouTube Growth Services": "/youtube-growth",
  "our free YouTube tools": "/free-youtube-tools",
  "Free YouTube Tools": "/free-youtube-tools",
  "free YouTube tools": "/free-youtube-tools",
  "our services page": "/services",
  "services page": "/services",
  "explore our blog": "/blog",
  "our blog": "/blog",
  "our courses": "/courses",
  "contact us": "/contact",
  "Contact Us": "/contact",
  "About Us": "/about",
  "Success Stories": "/success-stories",
  "Support & FAQ": "/support",
};

const sortedLinkKeys = Object.keys(internalLinks).sort((a, b) => b.length - a.length);

const renderTextWithLinks = (text: string): React.ReactNode[] => {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let keyIndex = 0;

  while (remaining.length > 0) {
    let earliestIndex = -1;
    let matchedKey = "";

    for (const key of sortedLinkKeys) {
      const idx = remaining.indexOf(key);
      if (idx !== -1 && (earliestIndex === -1 || idx < earliestIndex)) {
        earliestIndex = idx;
        matchedKey = key;
      }
    }

    if (earliestIndex === -1) {
      parts.push(remaining);
      break;
    }

    if (earliestIndex > 0) {
      parts.push(remaining.slice(0, earliestIndex));
    }

    parts.push(
      <Link key={`il-${keyIndex++}`} to={internalLinks[matchedKey]} className="text-primary hover:underline font-medium">
        {matchedKey}
      </Link>
    );

    remaining = remaining.slice(earliestIndex + matchedKey.length);
  }

  return parts;
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);
  const postIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
  const nextPost = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;

  const related = post
    ? blogPosts.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 3)
    : [];

  if (!post) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="container px-4 pt-32 pb-20 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you are looking for does not exist.</p>
          <Button asChild><Link to="/blog">Back to Blog</Link></Button>
        </div>
        <Footer />
      </main>
    );
  }

  const renderContent = (block: string) => {
    if (block.startsWith("## ")) {
      return <h2 className="font-display text-2xl font-bold text-foreground mt-8 mb-4">{block.slice(3)}</h2>;
    }
    if (block.startsWith("### ")) {
      return <h3 className="font-display text-xl font-semibold text-foreground mt-6 mb-3">{block.slice(4)}</h3>;
    }
    return <p className="text-muted-foreground leading-relaxed mb-4">{renderTextWithLinks(block)}</p>;
  };

  const midpoint = Math.floor(post.content.length / 2);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />
      <AdPlaceholder position="header" />

      <article className="py-8 pb-16">
        <div className="container px-4 max-w-3xl">
          <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{post.category}</span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-4 mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {post.date}</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {post.readTime}</span>
            </div>
          </motion.header>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            {post.content.slice(0, midpoint).map((block, i) => (
              <div key={i}>{renderContent(block)}</div>
            ))}

            <AdPlaceholder position="content" />

            {post.content.slice(midpoint).map((block, i) => (
              <div key={i + midpoint}>{renderContent(block)}</div>
            ))}
          </motion.div>

          {/* Post Navigation */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-12 pt-8 border-t border-border">
            {prevPost ? (
              <Link to={`/blog/${prevPost.slug}`} className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="h-4 w-4" />
                <span className="line-clamp-1">{prevPost.title}</span>
              </Link>
            ) : <div />}
            {nextPost && (
              <Link to={`/blog/${nextPost.slug}`} className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors text-right">
                <span className="line-clamp-1">{nextPost.title}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="py-12 bg-muted/20">
          <div className="container px-4">
            <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">Related Articles</h2>
            <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
              {related.map((r) => (
                <Link key={r.slug} to={`/blog/${r.slug}`}>
                  <Card className="glass-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 h-full">
                    <CardContent className="p-5">
                      <span className="text-xs font-medium text-primary">{r.category}</span>
                      <h3 className="font-display text-sm font-bold text-foreground mt-2 mb-2 line-clamp-2">{r.title}</h3>
                      <p className="text-muted-foreground text-xs line-clamp-2">{r.excerpt}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <AdPlaceholder position="footer" />
      <Footer />
    </main>
  );
};

export default BlogPost;
