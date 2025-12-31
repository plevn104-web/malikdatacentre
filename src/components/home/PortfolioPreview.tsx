import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Tech Startup Platform",
    category: "SaaS Website",
    description: "Modern SaaS platform with AI integration and sleek UI design.",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "E-Commerce Store",
    category: "Online Store",
    description: "High-converting e-commerce platform with seamless checkout.",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "Agency Portfolio",
    category: "Corporate Website",
    description: "Premium agency website showcasing creative work and services.",
    gradient: "from-orange-500/20 to-red-500/20",
  },
  {
    title: "FinTech Dashboard",
    category: "Web Application",
    description: "Comprehensive financial dashboard with real-time analytics.",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
];

export const PortfolioPreview = () => {
  return (
    <section className="py-24">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Portfolio
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our <span className="gradient-text">Recent Work</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of premium websites we've built for clients worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card-hover group overflow-hidden"
            >
              {/* Project Preview */}
              <div className={`h-48 md:h-56 bg-gradient-to-br ${project.gradient} relative`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4/5 h-4/5 rounded-lg bg-card/80 backdrop-blur-sm border border-border/50 shadow-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
                    <span className="font-display font-semibold text-foreground/50">{project.category}</span>
                  </div>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    View Project
                  </Button>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <span className="text-xs text-primary font-medium uppercase tracking-wider">
                  {project.category}
                </span>
                <h3 className="font-display text-xl font-semibold text-foreground mt-2 mb-3">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button size="lg" variant="outline" className="btn-jelly" asChild>
            <Link to="/portfolio">
              View Full Portfolio
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
