import { motion } from "framer-motion";
import { Sparkles, Rocket, ArrowRight } from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5" />
        <div className="floating absolute left-[20%] top-[30%] h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="floating-delayed absolute right-[20%] top-[40%] h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-card mx-auto max-w-4xl overflow-hidden p-12 text-center md:p-16"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mx-auto mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary"
          >
            <Rocket className="h-10 w-10 text-primary-foreground" />
          </motion.div>

          {/* Heading */}
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-5xl">
            Start Earning with{" "}
            <span className="gradient-text">AI & YouTube</span>
            {" "}Today
          </h2>

          {/* Subheading */}
          <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground">
            Join hundreds of successful creators and entrepreneurs. 
            Get premium AI tools and YouTube monetization services now.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <WhatsAppButton 
              size="xl" 
              message="Hi! I want to start earning with AI tools and YouTube services." 
            >
              Get Started on WhatsApp
            </WhatsAppButton>
            <Button variant="outline" size="xl" asChild>
              <a href="#services">
                <Sparkles className="h-5 w-5" />
                View All Services
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Instant Delivery
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              24/7 Support
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-secondary" />
              100% Secure
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
