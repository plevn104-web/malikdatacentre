import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Link } from "react-router-dom";
import { Type, FileText, Hash, Image, Tag, DollarSign, Clock, Search } from "lucide-react";

const tools = [
  {
    title: "YouTube Title Generator",
    description: "Generate 15 SEO-optimized, click-worthy titles for your YouTube videos instantly.",
    href: "/youtube-tools/title-generator",
    icon: <Type className="h-7 w-7" />,
  },
  {
    title: "YouTube Description Generator",
    description: "Create professional, keyword-rich video descriptions with CTAs and hashtags.",
    href: "/youtube-tools/description-generator",
    icon: <FileText className="h-7 w-7" />,
  },
  {
    title: "YouTube Tag Generator",
    description: "Get 30 SEO-optimized tags mixing short and long-tail keywords for better rankings.",
    href: "/youtube-tools/tag-generator",
    icon: <Tag className="h-7 w-7" />,
  },
  {
    title: "Thumbnail Headline Generator",
    description: "Generate 20 high-CTR thumbnail headlines with emotional and curiosity-driven hooks.",
    href: "/youtube-tools/thumbnail-headline-generator",
    icon: <Image className="h-7 w-7" />,
  },
  {
    title: "YouTube Hashtag Generator",
    description: "Discover 20 relevant hashtags mixing broad and niche-specific tags for reach.",
    href: "/youtube-tools/hashtag-generator",
    icon: <Hash className="h-7 w-7" />,
  },
  {
    title: "Revenue Estimator",
    description: "Estimate your YouTube ad earnings based on monthly views and RPM.",
    href: "/youtube-tools/revenue-estimator",
    icon: <DollarSign className="h-7 w-7" />,
  },
  {
    title: "Watch Time Calculator",
    description: "Calculate watch hours and plan your path to 4,000 hours for monetization.",
    href: "/youtube-tools/watch-time-calculator",
    icon: <Clock className="h-7 w-7" />,
  },
  {
    title: "SEO Score Checker",
    description: "Analyze your title and description for SEO optimization with a score out of 100.",
    href: "/youtube-tools/seo-score-checker",
    icon: <Search className="h-7 w-7" />,
  },
];

const YouTubeToolsHub = () => (
  <main className="min-h-screen bg-background">
    <SEOHead
      title="Free YouTube Optimization Tools for Creators"
      description="Free AI-powered YouTube tools to generate titles, descriptions, tags, thumbnail headlines, and hashtags. Grow your channel with SEO-optimized content."
      canonical="/youtube-tools"
      schema={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Free YouTube Optimization Tools",
        description: "AI-powered YouTube tools for creators",
      }}
    />
    <Navbar />
    <Breadcrumbs items={[{ label: "YouTube Tools" }]} />

    <section className="pt-8 pb-16">
      <div className="container px-4 text-center max-w-3xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          Free YouTube Optimization Tools for Creators
        </h1>
        <p className="text-lg text-muted-foreground mb-4">
          Powerful AI-driven tools designed to help you create better content, rank higher in search, and grow your YouTube audience — completely free.
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-sm">
          <Link to="/blog" className="text-primary hover:underline">Read Our Blog</Link>
          <span className="text-muted-foreground">•</span>
          <Link to="/youtube-growth" className="text-primary hover:underline">YouTube Growth Services</Link>
          <span className="text-muted-foreground">•</span>
          <Link to="/services" className="text-primary hover:underline">All Services</Link>
        </div>
      </div>
    </section>

    <section className="pb-20">
      <div className="container px-4 max-w-4xl mx-auto">
        <div className="grid gap-6 md:grid-cols-2">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              to={tool.href}
              className="group border border-border/50 hover:border-primary/30 rounded-xl p-6 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  {tool.icon}
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {tool.title}
                  </h2>
                  <p className="text-muted-foreground text-sm">{tool.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <Footer />
  </main>
);

export default YouTubeToolsHub;
