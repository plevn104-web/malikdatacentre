import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PricingPreview } from "@/components/home/PricingPreview";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <PricingPreview />
      </div>
      <Footer />
    </div>
  );
}
