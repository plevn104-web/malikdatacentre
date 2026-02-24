import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { PricingPreview } from "@/components/home/PricingPreview";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Pricing Plans" description="Affordable pricing for AI tools, YouTube growth services, and web development. Choose the plan that fits your budget." canonical="/pricing" />
      <Navbar />
      <div className="pt-20">
        <PricingPreview />
      </div>
      <Footer />
    </div>
  );
}
