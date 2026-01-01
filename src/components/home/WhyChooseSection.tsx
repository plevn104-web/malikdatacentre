import { motion } from "framer-motion";
import { Zap, Brain, Smartphone, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "Get your website delivered in record time without compromising on quality.",
  },
  {
    icon: Brain,
    title: "AI-Powered Workflow",
    description: "We leverage cutting-edge AI tools to build smarter, faster websites.",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Every website is optimized for perfect performance on all devices.",
  },
  {
    icon: TrendingUp,
    title: "Conversion-Focused",
    description: "Layouts designed to turn visitors into customers and drive results.",
  },
];

export const WhyChooseSection = () => {
  return (
    <section className="py-24 section-gradient">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Why Choose <span className="gradient-text">Malik Data Centre</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="glass-card-hover p-6 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-5 transition-transform duration-200 group-hover:scale-105">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
