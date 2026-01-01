import { motion } from "framer-motion";
import { Globe, Rocket, RefreshCcw, Bot, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Globe,
    title: "Business Website Development",
    description: "Professional websites that establish your brand's online presence and credibility.",
  },
  {
    icon: Rocket,
    title: "High-Converting Landing Pages",
    description: "Targeted landing pages designed to maximize conversions and drive sales.",
  },
  {
    icon: RefreshCcw,
    title: "Website Redesign & Optimization",
    description: "Transform your existing website into a modern, high-performing digital asset.",
  },
  {
    icon: Bot,
    title: "AI Content & Automation",
    description: "Integrate AI-powered features to automate content and enhance user experience.",
  },
];

export const ServicesPreview = () => {
  return (
    <section className="py-24 section-gradient-alt">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What We <span className="gradient-text">Build</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Premium web development services tailored to make your business stand out.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="glass-card-hover p-8 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 transition-transform duration-200 group-hover:scale-105 shadow-lg shadow-primary/15">
                <service.icon className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-foreground mb-4">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <Button 
            size="lg" 
            className="transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98]" 
            asChild
          >
            <Link to="/services">
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
