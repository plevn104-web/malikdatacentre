import { lazy, Suspense, memo } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ChatBot } from "@/components/ChatBot";

// Lazy load below-the-fold components for faster initial load
const AIToolsSection = lazy(() => import("@/components/AIToolsSection").then(m => ({ default: m.AIToolsSection })));
const YouTubeServicesSection = lazy(() => import("@/components/YouTubeServicesSection").then(m => ({ default: m.YouTubeServicesSection })));
const WhyChooseUsSection = lazy(() => import("@/components/WhyChooseUsSection").then(m => ({ default: m.WhyChooseUsSection })));
const ReviewsSection = lazy(() => import("@/components/ReviewsSection").then(m => ({ default: m.ReviewsSection })));
const PaymentSection = lazy(() => import("@/components/PaymentSection").then(m => ({ default: m.PaymentSection })));
const CTASection = lazy(() => import("@/components/CTASection").then(m => ({ default: m.CTASection })));
const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));
const PremiumPlanCard = lazy(() => import("@/components/PremiumPlanCard").then(m => ({ default: m.PremiumPlanCard })));
const FounderSection = lazy(() => import("@/components/FounderSection").then(m => ({ default: m.FounderSection })));
const DevelopmentServicesSection = lazy(() => import("@/components/DevelopmentServicesSection").then(m => ({ default: m.DevelopmentServicesSection })));

// Simple loading placeholder for lazy sections
const SectionLoader = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      
      <Suspense fallback={<SectionLoader />}>
        <section id="services">
          <AIToolsSection />
        </section>
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <PremiumPlanCard />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <section id="youtube">
          <YouTubeServicesSection />
        </section>
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <section id="development">
          <DevelopmentServicesSection />
        </section>
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <WhyChooseUsSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <FounderSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <section id="reviews">
          <ReviewsSection />
        </section>
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <PaymentSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <section id="contact">
          <CTASection />
        </section>
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
      
      {/* AI Chatbot - Primary Support */}
      <ChatBot />
    </main>
  );
};

export default memo(Index);
