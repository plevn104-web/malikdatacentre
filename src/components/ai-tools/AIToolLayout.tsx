import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { UsageBar } from "@/components/auth/UsageBar";

interface AIToolLayoutProps {
  title: string;
  metaTitle: string;
  metaDescription: string;
  canonical: string;
  children: React.ReactNode;
}

export const AIToolLayout = ({ title, metaTitle, metaDescription, canonical, children }: AIToolLayoutProps) => (
  <main className="min-h-screen bg-background">
    <SEOHead title={metaTitle} description={metaDescription} canonical={canonical} />
    <Navbar />
    <div className="pt-24 pb-16">
      <div className="container px-4 max-w-3xl mx-auto">
        <Breadcrumbs items={[{ label: "AI Tools", href: "/ai-tools" }, { label: title }]} />
        <UsageBar />
        {children}
      </div>
    </div>
    <Footer />
  </main>
);
