import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AIToolsSection } from "@/components/AIToolsSection";
import { YouTubeServicesSection } from "@/components/YouTubeServicesSection";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { PaymentSection } from "@/components/PaymentSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ChatBot } from "@/components/ChatBot";
import { PremiumPlanCard } from "@/components/PremiumPlanCard";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <section id="services">
        <AIToolsSection />
      </section>
      <PremiumPlanCard />
      <section id="youtube">
        <YouTubeServicesSection />
      </section>
      <WhyChooseUsSection />
      <section id="reviews">
        <ReviewsSection />
      </section>
      <PaymentSection />
      <section id="contact">
        <CTASection />
      </section>
      <Footer />
      
      {/* Floating WhatsApp Button */}
      <WhatsAppButton floating message="Hi! I'm interested in your AI tools and YouTube services." />
      
      {/* AI Chatbot */}
      <ChatBot />
    </main>
  );
};

export default Index;
