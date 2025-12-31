import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustSection } from "@/components/home/TrustSection";
import { WhyChooseSection } from "@/components/home/WhyChooseSection";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";
import { PricingPreview } from "@/components/home/PricingPreview";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { FounderSection } from "@/components/home/FounderSection";
import { CTASection } from "@/components/home/CTASection";
import { ChatBot } from "@/components/ChatBot";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <TrustSection />
      <WhyChooseSection />
      <ServicesPreview />
      <PortfolioPreview />
      <PricingPreview />
      <ReviewsSection />
      <FounderSection />
      <CTASection />
      <Footer />
      <ChatBot />
      <WhatsAppButton floating />
    </main>
  );
};

export default Index;
