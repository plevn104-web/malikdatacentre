import { motion } from "framer-motion";
import { 
  Palette, 
  Smartphone, 
  MessageSquare, 
  Zap, 
  FileText, 
  Layout 
} from "lucide-react";

const features = [
  { icon: Palette, text: "Modern, clean design" },
  { icon: Smartphone, text: "Mobile-first experience" },
  { icon: MessageSquare, text: "WhatsApp lead setup" },
  { icon: Zap, text: "Fast loading performance" },
  { icon: FileText, text: "Professional content" },
  { icon: Layout, text: "Clear structure & layout" },
];

export const WhatYouGetSection = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            What You Get With Every Website
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every project includes these essentials — no hidden extras
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-6 rounded-xl border border-border/50 bg-card/30 hover:bg-card/50 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-foreground font-medium">{feature.text}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
