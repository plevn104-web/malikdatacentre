import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export const DemoGuaranteeSection = () => {
  return (
    <section className="py-12 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          <div className="glass-card px-6 py-4 rounded-xl border border-primary/20 bg-primary/5 flex items-center justify-center gap-3 text-center">
            <Shield className="w-5 h-5 text-primary flex-shrink-0" />
            <p className="text-foreground font-medium">
              You only proceed if you like the demo. <span className="text-muted-foreground">No demo. No commitment.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
