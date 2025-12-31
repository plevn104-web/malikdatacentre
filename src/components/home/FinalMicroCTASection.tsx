import { motion } from "framer-motion";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const FinalMicroCTASection = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="text-2xl md:text-3xl font-medium text-foreground mb-2">
            Ready when you are.
          </p>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Let's build something professional.
          </p>
          
          <WhatsAppButton
            message="Hi, I'm ready to discuss my website project. Let's get started."
            size="xl"
            className="btn-jelly"
          >
            Get Free Website Demo
          </WhatsAppButton>
        </motion.div>
      </div>
    </section>
  );
};
