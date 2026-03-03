import { lazy, Suspense, useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustSection } from "@/components/home/TrustSection";
import { WhyChooseSection } from "@/components/home/WhyChooseSection";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";
import { PricingPreview } from "@/components/home/PricingPreview";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { FounderSection } from "@/components/home/FounderSection";
import { CTASection } from "@/components/home/CTASection";
import { FreeHomepageDemoSection } from "@/components/home/FreeHomepageDemoSection";
import { WhoWeWorkWithSection } from "@/components/home/WhoWeWorkWithSection";
import { WhatYouGetSection } from "@/components/home/WhatYouGetSection";
import { AfterDeliverySupportSection } from "@/components/home/AfterDeliverySupportSection";
import { WhyClientsChooseUsSection } from "@/components/home/WhyClientsChooseUsSection";
import { DemoGuaranteeSection } from "@/components/home/DemoGuaranteeSection";
import { FinalMicroCTASection } from "@/components/home/FinalMicroCTASection";

// Lazy load ChatBot to avoid blocking initial render
const ChatBot = lazy(() => import("@/components/ChatBot").then(m => ({ default: m.ChatBot })));

const Index = () => {
  // Delay chatbot loading until page is interactive
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    // Load chatbot after page has rendered
    const timer = setTimeout(() => setShowChatbot(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <SEOHead
        title="Premium AI Tools & YouTube Growth Services"
        description="Get premium AI tools, YouTube monetization services, and channel growth strategies. Best prices in Pakistan for ChatGPT, SORA AI, and more."
        canonical="/"
      />
      <Navbar />
      <HeroSection />
      <TrustSection />
      <FreeHomepageDemoSection />
      <WhyChooseSection />
      <WhoWeWorkWithSection />
      <ServicesPreview />
      <WhatYouGetSection />
      <PortfolioPreview />
      <PricingPreview />
      <DemoGuaranteeSection />
      <WhyClientsChooseUsSection />
      <AfterDeliverySupportSection />
      <ReviewsSection />
      <FounderSection />
      <CTASection />
      <FinalMicroCTASection />
      <Footer />
      
      {/* ChatBot - lazy loaded after page render */}
      {showChatbot && (
        <Suspense fallback={null}>
          <ChatBot />
        </Suspense>
      )}
    </main>
  );
};

export default Index;
