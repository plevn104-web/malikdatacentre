import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Globe, Rocket, RefreshCcw, Bot, ShoppingCart, Smartphone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/923489057646?text=Hi! I'm interested in your web development services.";

const services = [
  { icon: Globe, title: "Business Website Development", desc: "Professional websites that establish credibility." },
  { icon: Rocket, title: "High-Converting Landing Pages", desc: "Targeted pages designed to maximize conversions." },
  { icon: RefreshCcw, title: "Website Redesign", desc: "Transform your existing website into a modern asset." },
  { icon: Bot, title: "AI Content & Automation", desc: "Integrate AI-powered features for better UX." },
  { icon: ShoppingCart, title: "E-Commerce Development", desc: "Online stores that drive sales and growth." },
  { icon: Smartphone, title: "Web Applications", desc: "Custom web apps tailored to your needs." },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-24">
        <div className="container px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">Premium web development services for your business.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map((service, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card-hover p-8 group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Button size="lg" className="btn-jelly bg-[#25D366] hover:bg-[#25D366]/90 text-white" asChild>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />Get Started on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
