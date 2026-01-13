import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import LiveVisitorsIndicator from "./LiveVisitorsIndicator";
import PurchaseNotification from "./PurchaseNotification";

const WHATSAPP_URL = "https://wa.me/923489057646?text=Hi! I'd like to get a free website demo for my business.";

// Lightweight fade-in animation
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Static Background - no animation */}
      <div className="absolute inset-0">
        {/* Static gradient orbs - CSS only */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/15 rounded-full blur-[80px]" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="container px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            {...fadeIn}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-8"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-sm font-medium text-emerald-400">Online</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            {...fadeIn}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-foreground leading-tight mb-6"
          >
            Pakistan's Most Trusted{" "}
            <span className="gradient-text">AI Tools & Digital Services Provider</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            {...fadeIn}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4"
          >
            Premium AI tools, private accounts, and digital solutions, delivering reliability, value, and instant access across Pakistan.
          </motion.p>

          {/* Supporting Line */}
          <motion.p
            {...fadeIn}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="text-sm text-muted-foreground/80 mb-10"
          >
            Instant Delivery • Private Accounts • Trusted Nationwide
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            {...fadeIn}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
              asChild
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                Get Instant Access
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg font-semibold rounded-xl border-border hover:border-primary/50 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
              onClick={() => {
                document.getElementById('ai-tools-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Play className="mr-2 h-5 w-5" />
              View Portfolio
            </Button>
          </motion.div>

          {/* Live Visitors Indicator */}
          <LiveVisitorsIndicator />

          {/* Stats */}
          <motion.div
            {...fadeIn}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {[
              { value: "5000+", label: "Happy Clients" },
              { value: "100%", label: "Client Satisfaction" },
              { value: "24/7", label: "Support Available" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-display text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Static decorative elements - desktop only, no animation */}
      <div className="absolute bottom-20 left-10 hidden lg:block">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm border border-white/10 shadow-lg" />
      </div>
      <div className="absolute top-40 right-16 hidden lg:block">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/20 to-primary/20 backdrop-blur-sm border border-white/10 shadow-lg" />
      </div>

      {/* Purchase Notification Popup */}
      <PurchaseNotification />
    </section>
  );
};
