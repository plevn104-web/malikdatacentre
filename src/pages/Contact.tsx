import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { MessageCircle, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/923489057646?text=Hi! I want a free homepage demo for my business.";
const LINKEDIN_URL = "https://www.linkedin.com/in/malik-amir-usman-71ab54397";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-24">
        <div className="container px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Get In <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get a free homepage demo for your business. We'd love to hear from you!
            </p>
          </motion.div>
          <div className="max-w-lg mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 text-center space-y-6">
              <p className="text-foreground">Ready to build your powerful website? Contact us now!</p>
              <Button size="lg" className="w-full btn-jelly bg-[#25D366] hover:bg-[#25D366]/90 text-white" asChild>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />Contact on WhatsApp
                </a>
              </Button>
              <Button size="lg" variant="outline" className="w-full btn-jelly" asChild>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-5 w-5" />Connect on LinkedIn
                </a>
              </Button>
              <p className="text-sm text-muted-foreground">Phone: +92 348 9057646</p>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
