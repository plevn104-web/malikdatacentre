import { motion } from "framer-motion";
import { Monitor, Sparkles } from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const FreeHomepageDemoSection = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Zero Risk</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            See Your Website{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Before You Pay
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            We create a free homepage demo for your business.
            If you like it, we continue. If not, no obligation.
          </p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-10 rounded-2xl border border-primary/20 bg-card/50 backdrop-blur-sm"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center">
                <Monitor className="w-8 h-8 text-primary" />
              </div>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Get a professional homepage design preview — completely free
            </p>
            
            <WhatsAppButton
              message="Hi, I'm interested in getting a free homepage demo for my business. Please share the process."
              size="xl"
              className="btn-jelly"
            >
              Get Free Website Demo
            </WhatsAppButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
