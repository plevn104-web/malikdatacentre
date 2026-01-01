import { motion } from "framer-motion";
import { HeartHandshake, Wrench, HelpCircle, Settings } from "lucide-react";

const supportPoints = [
  { icon: Wrench, text: "Minor edits support" },
  { icon: HelpCircle, text: "Technical guidance" },
  { icon: Settings, text: "Optional ongoing assistance" },
];

export const AfterDeliverySupportSection = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-muted/20">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <HeartHandshake className="w-8 h-8 text-primary" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              We Don't Disappear After Delivery
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Our relationship doesn't end when the website goes live.
              We provide guidance and support even after delivery.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true, margin: "-30px" }}
            className="glass-card p-8 rounded-2xl border border-primary/20"
          >
            <ul className="space-y-4">
              {supportPoints.map((point, index) => (
                <li key={index} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <point.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground">{point.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
