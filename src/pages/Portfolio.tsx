import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  { title: "Tech Startup Platform", category: "SaaS Website", gradient: "from-blue-500/20 to-cyan-500/20" },
  { title: "E-Commerce Store", category: "Online Store", gradient: "from-purple-500/20 to-pink-500/20" },
  { title: "Agency Portfolio", category: "Corporate Website", gradient: "from-orange-500/20 to-red-500/20" },
  { title: "FinTech Dashboard", category: "Web Application", gradient: "from-green-500/20 to-emerald-500/20" },
  { title: "Healthcare Platform", category: "Medical Website", gradient: "from-teal-500/20 to-blue-500/20" },
  { title: "Real Estate Portal", category: "Property Listings", gradient: "from-amber-500/20 to-orange-500/20" },
];

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-24">
        <div className="container px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our <span className="gradient-text">Portfolio</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">Premium websites we've built for clients worldwide.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card-hover group overflow-hidden">
                <div className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                  <span className="font-display font-semibold text-foreground/50">{project.category}</span>
                </div>
                <div className="p-6">
                  <span className="text-xs text-primary font-medium uppercase">{project.category}</span>
                  <h3 className="font-display text-xl font-semibold text-foreground mt-2">{project.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
