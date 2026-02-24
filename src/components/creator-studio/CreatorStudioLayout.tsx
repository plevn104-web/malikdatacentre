import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { UsageBar } from "@/components/auth/UsageBar";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AdPlaceholder } from "@/components/layout/AdPlaceholder";
import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface CreatorStudioLayoutProps {
  title: string;
  metaTitle: string;
  metaDescription: string;
  canonical: string;
  breadcrumbs: { label: string; href?: string }[];
  children: ReactNode;
  faqItems?: { question: string; answer: string }[];
  seoContent?: ReactNode;
}

export const CreatorStudioLayout = ({
  title,
  metaTitle,
  metaDescription,
  canonical,
  breadcrumbs,
  children,
  faqItems,
  seoContent,
}: CreatorStudioLayoutProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: title,
    description: metaDescription,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  const faqSchema = faqItems
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : undefined;

  return (
    <main className="min-h-screen bg-background">
      <SEOHead
        title={metaTitle}
        description={metaDescription}
        canonical={canonical}
        schema={[schema, ...(faqSchema ? [faqSchema] : [])]}
      />
      <Navbar />
      <Breadcrumbs items={breadcrumbs} />

      <div className="container px-4 max-w-3xl mx-auto pt-4">
        <UsageBar />
      </div>

      <AdPlaceholder position="header" />

      {children}

      <AdPlaceholder position="content" />

      {faqItems && faqItems.length > 0 && (
        <section className="py-16">
          <div className="container px-4 max-w-3xl">
            <h2 className="font-display text-3xl font-bold text-foreground mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqItems.map((item, i) => (
                <div key={i} className="border border-border/50 rounded-lg p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {item.question}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {seoContent && (
        <section className="py-16 border-t border-border/30">
          <div className="container px-4 max-w-3xl prose prose-invert prose-sm max-w-none">
            {seoContent}
          </div>
        </section>
      )}

      <section className="py-12 border-t border-border/30">
        <div className="container px-4 max-w-3xl">
          <h3 className="font-display text-xl font-bold text-foreground mb-4">
            Explore Creator Studio Tools
          </h3>
          <div className="flex flex-wrap gap-3">
            <Link to="/creator-studio/keyword-explorer" className="text-sm text-primary hover:underline">Keyword Explorer</Link>
            <Link to="/creator-studio/seo-analyzer" className="text-sm text-primary hover:underline">SEO Analyzer</Link>
            <Link to="/creator-studio/tag-optimization" className="text-sm text-primary hover:underline">Tag Optimization</Link>
            <Link to="/creator-studio/competitor-breakdown" className="text-sm text-primary hover:underline">Competitor Breakdown</Link>
            <Link to="/creator-studio/monetization-estimator" className="text-sm text-primary hover:underline">Monetization Estimator</Link>
            <Link to="/creator-studio/watch-time-simulator" className="text-sm text-primary hover:underline">Watch Time Simulator</Link>
            <Link to="/creator-studio/ctr-assistant" className="text-sm text-primary hover:underline">CTR Assistant</Link>
            <Link to="/creator-studio/script-builder" className="text-sm text-primary hover:underline">Script Builder</Link>
            <Link to="/creator-studio/content-repurposing" className="text-sm text-primary hover:underline">Content Repurposing</Link>
            <Link to="/creator-studio/content-planner" className="text-sm text-primary hover:underline">30-Day Planner</Link>
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
            <Link to="/youtube-tools" className="text-sm text-muted-foreground hover:text-primary">YouTube Tools</Link>
            <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary">Blog</Link>
            <Link to="/youtube-growth" className="text-sm text-muted-foreground hover:text-primary">YouTube Growth Services</Link>
            <Link to="/services" className="text-sm text-muted-foreground hover:text-primary">All Services</Link>
          </div>
        </div>
      </section>

      <AdPlaceholder position="footer" />
      <Footer />
    </main>
  );
};
