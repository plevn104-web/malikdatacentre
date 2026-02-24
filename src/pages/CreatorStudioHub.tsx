import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Link } from "react-router-dom";
import { Search, BarChart3, Tag, Users, DollarSign, Clock, MousePointer, FileText, Repeat, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const tools = [
  {
    title: "Keyword Explorer Lite",
    description: "Discover long-tail keywords, search intent, and competition levels for any topic.",
    href: "/creator-studio/keyword-explorer",
    icon: <Search className="h-7 w-7" />,
  },
  {
    title: "SEO Score Analyzer",
    description: "Analyze your video title and description for keyword placement and optimization.",
    href: "/creator-studio/seo-analyzer",
    icon: <BarChart3 className="h-7 w-7" />,
  },
  {
    title: "Tag Optimization Tool",
    description: "Generate 40 optimized tags grouped by short-tail and long-tail for maximum reach.",
    href: "/creator-studio/tag-optimization",
    icon: <Tag className="h-7 w-7" />,
  },
  {
    title: "Competitor Breakdown",
    description: "Analyze competitor video titles for hook styles, keywords, and improvement angles.",
    href: "/creator-studio/competitor-breakdown",
    icon: <Users className="h-7 w-7" />,
  },
  {
    title: "Monetization Estimator Pro",
    description: "Estimate YouTube earnings with CPM analysis and revenue growth scenarios.",
    href: "/creator-studio/monetization-estimator",
    icon: <DollarSign className="h-7 w-7" />,
  },
  {
    title: "Watch Time Growth Simulator",
    description: "Project monthly watch hours and monetization eligibility based on your upload schedule.",
    href: "/creator-studio/watch-time-simulator",
    icon: <Clock className="h-7 w-7" />,
  },
  {
    title: "CTR Optimization Assistant",
    description: "Get AI-powered suggestions to improve your click-through rate with better titles and thumbnails.",
    href: "/creator-studio/ctr-assistant",
    icon: <MousePointer className="h-7 w-7" />,
  },
  {
    title: "AI Script Builder",
    description: "Generate structured video scripts with hooks, talking points, and CTAs.",
    href: "/creator-studio/script-builder",
    icon: <FileText className="h-7 w-7" />,
  },
  {
    title: "Content Repurposing Engine",
    description: "Transform your content into YouTube descriptions, LinkedIn posts, Instagram captions, and more.",
    href: "/creator-studio/content-repurposing",
    icon: <Repeat className="h-7 w-7" />,
  },
  {
    title: "30-Day Content Planner",
    description: "Get a personalized 30-day content strategy with weekly themes and video titles.",
    href: "/creator-studio/content-planner",
    icon: <Calendar className="h-7 w-7" />,
  },
];

const CreatorStudioHub = () => (
  <main className="min-h-screen bg-background">
    <SEOHead
      title="AI Creator Studio – Smart Tools for YouTube Growth"
      description="Your all-in-one YouTube optimization platform. Free AI-powered tools for keyword research, SEO analysis, script building, content planning, and more."
      canonical="/creator-studio"
      schema={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "AI Creator Studio",
        description: "Smart AI tools for YouTube creators to grow their channels.",
      }}
    />
    <Navbar />
    <Breadcrumbs items={[{ label: "Creator Studio" }]} />

    <section className="pt-8 pb-16">
      <div className="container px-4 text-center max-w-3xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          Your All-in-One YouTube Optimization Platform
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          Grow smarter with data-driven AI tools. Analyze competitors, optimize your SEO, plan content, and build scripts — all in one place, completely free.
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-sm">
          <Link to="/blog" className="text-primary hover:underline">Read Our Blog</Link>
          <span className="text-muted-foreground">•</span>
          <Link to="/youtube-growth" className="text-primary hover:underline">YouTube Growth Services</Link>
          <span className="text-muted-foreground">•</span>
          <Link to="/youtube-tools" className="text-primary hover:underline">YouTube Tools</Link>
        </div>
      </div>
    </section>

    <section className="pb-20">
      <div className="container px-4 max-w-5xl mx-auto">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              to={tool.href}
              className="group border border-border/50 hover:border-primary/30 rounded-xl p-6 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 flex flex-col"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors mb-4">
                {tool.icon}
              </div>
              <h2 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {tool.title}
              </h2>
              <p className="text-muted-foreground text-sm flex-1 mb-4">{tool.description}</p>
              <Button variant="outline" size="sm" className="w-full mt-auto">
                Launch Tool
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <Footer />
  </main>
);

export default CreatorStudioHub;
