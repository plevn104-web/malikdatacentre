import { motion } from "framer-motion";
import { Linkedin, Brain, Bot, Youtube, Briefcase, Shield, GraduationCap, Target, Rocket, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import founderImage from "@/assets/founder-malik-amir-usman.png";

const LINKEDIN_URL = "https://www.linkedin.com/in/malik-amir-usman-71ab54397";

const expertiseItems = [
  { icon: Brain, label: "Artificial Intelligence & Automation" },
  { icon: Bot, label: "AI Tools & SaaS Platforms" },
  { icon: Youtube, label: "YouTube Automation & Monetization" },
  { icon: Briefcase, label: "Digital Business Solutions" },
  { icon: GraduationCap, label: "AI Education & Training" },
  { icon: Shield, label: "Data Security & Privacy" },
];

export default function Founder() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        
        <div className="container relative px-4">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center lg:justify-start"
            >
              <div className="relative">
                {/* Decorative ring */}
                <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/20 blur-xl" />
                <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-primary to-secondary opacity-20" />
                
                <img
                  src={founderImage}
                  alt="Malik Amir Usman - Founder & CEO of MALIK DATA CENTRE"
                  className="relative h-72 w-72 rounded-full object-cover border-4 border-background shadow-2xl md:h-96 md:w-96"
                />
                
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg"
                >
                  Founder & CEO
                </motion.div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center lg:text-left"
            >
              <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                <span className="gradient-text">Malik Amir Usman</span>
              </h1>
              <p className="mt-2 text-lg text-primary font-medium md:text-xl">
                Founder & CEO – MALIK DATA CENTRE
              </p>
              
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Malik Amir Usman is the Founder and Owner of MALIK DATA CENTRE, a modern AI-powered platform providing premium AI tools, automation services, digital solutions, and professional training programs. He focuses on building secure, scalable, and practical AI systems for real-world use.
              </p>

              {/* LinkedIn Button */}
              <div className="mt-8">
                <Button
                  size="lg"
                  className="gap-2 bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white"
                  asChild
                >
                  <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                    Connect on LinkedIn
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Areas of <span className="gradient-text">Expertise</span>
            </h2>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {expertiseItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-4 rounded-xl bg-background p-4 shadow-sm border border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="font-medium text-foreground">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 border border-primary/20"
            >
              <div className="absolute top-4 right-4 h-20 w-20 rounded-full bg-primary/10 blur-2xl" />
              <div className="relative">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <Target className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                  Our Vision
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Making AI accessible and useful for everyone – empowering individuals and businesses to harness the power of artificial intelligence without complexity.
                </p>
              </div>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary/10 via-secondary/5 to-transparent p-8 border border-secondary/20"
            >
              <div className="absolute top-4 right-4 h-20 w-20 rounded-full bg-secondary/10 blur-2xl" />
              <div className="relative">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10">
                  <Rocket className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                  Our Mission
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Helping users learn, grow, and earn with AI through premium tools, professional training, and reliable automation services that deliver real results.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-display text-3xl font-bold md:text-4xl mb-4">
              Ready to <span className="gradient-text">Get Started?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore our AI tools, courses, and services to transform your skills and business.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/courses">
                <Button size="lg" className="gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Explore Courses
                </Button>
              </Link>
              <Link to="/#services">
                <Button size="lg" variant="outline" className="gap-2">
                  View AI Tools
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}