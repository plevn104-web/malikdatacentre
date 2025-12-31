import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/923489057646?text=Hi! I want a free homepage demo for my business.";

export const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-[100px]" />
      </div>

      <div className="container px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to Build Your{" "}
            <span className="gradient-text">Powerful Website?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Get a free homepage demo for your business. No commitment, just see what we can create for you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="btn-jelly bg-gradient-to-r from-primary to-secondary text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 animate-gradient-shift"
              asChild
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                Get Free Website Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            ✓ No payment required &nbsp;&nbsp; ✓ Free consultation &nbsp;&nbsp; ✓ Quick response
          </p>
        </motion.div>
      </div>
    </section>
  );
};
