import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FounderSection } from "@/components/home/FounderSection";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-12">
        <div className="container px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              About <span className="gradient-text">Malik Data Centre</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We build powerful digital experiences that help businesses succeed online.
            </p>
          </motion.div>
          <div className="max-w-3xl mx-auto glass-card p-8 mb-16">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              At Malik Data Centre, we believe every business deserves a powerful online presence. 
              We leverage cutting-edge AI technology and modern design principles to create websites 
              that not only look stunning but also drive real business results.
            </p>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">What We Do</h2>
            <p className="text-muted-foreground leading-relaxed">
              From small business websites to complex web applications, we deliver premium quality 
              work with fast turnaround times. Our AI-powered workflow ensures efficiency while 
              maintaining the highest standards of design and functionality.
            </p>
          </div>
        </div>
      </section>
      <FounderSection />
      <Footer />
    </div>
  );
}
