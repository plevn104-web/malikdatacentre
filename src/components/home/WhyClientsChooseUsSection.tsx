import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";

const ourBenefits = [
  "Structured process",
  "Clear pricing",
  "Demo before payment",
  "Professional communication",
];

const othersChallenges = [
  "Unclear timelines",
  "No preview",
  "Limited support",
  "Inconsistent delivery",
];

export const WhyClientsChooseUsSection = () => {
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
            Why Clients Choose Us
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A professional approach that sets us apart
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Our Approach */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-transparent"
          >
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <span className="text-primary">Malik Data Centre</span>
            </h3>
            
            <ul className="space-y-4">
              {ourBenefits.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Others */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-2xl border border-muted/40 bg-card/30"
          >
            <h3 className="text-xl font-semibold text-muted-foreground mb-6">
              Common Challenges Elsewhere
            </h3>
            
            <ul className="space-y-4">
              {othersChallenges.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-muted/30 flex items-center justify-center flex-shrink-0">
                    <Minus className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

