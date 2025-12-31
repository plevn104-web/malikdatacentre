import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { YouTubeServicesSection } from "@/components/home/YouTubeServicesSection";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/923489057646?text=Hi! I'm interested in YouTube monetization services.";

export default function YouTubeMonetization() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-8">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF0000]/10 text-[#FF0000] text-sm font-medium mb-4">
              Additional Service
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              YouTube <span className="text-[#FF0000]">Monetization</span> Services
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Accelerate your YouTube journey with our trusted monetization services. 
              We help creators reach YouTube Partner Program requirements safely and efficiently.
            </p>
            <Button
              size="lg"
              className="bg-[#25D366] hover:bg-[#25D366]/90 text-white btn-jelly"
              asChild
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                Get Started on WhatsApp
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* YouTube Services Section */}
      <YouTubeServicesSection />

      {/* Disclaimer */}
      <section className="py-16">
        <div className="container px-4">
          <div className="glass-card p-8 max-w-3xl mx-auto text-center">
            <h3 className="font-display text-xl font-semibold text-foreground mb-4">
              Important Information
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Our YouTube monetization services are designed to help creators reach 
              the YouTube Partner Program requirements. We use safe, gradual delivery 
              methods to ensure your channel's safety. Results may vary based on 
              your content and channel status. This is an additional specialized 
              service offered by Malik Data Centre.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
