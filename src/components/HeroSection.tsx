import { motion } from "framer-motion";
import { Bot, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CGIBackground } from "@/components/CGIBackground";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* CGI Animated Background */}
      <CGIBackground variant="hero" />

      <div className="container relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="glass-card inline-flex items-center gap-2 px-5 py-2.5">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-foreground/80">MALIK DATA CENTRE</span>
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 text-center font-display text-4xl font-bold leading-tight md:text-6xl lg:text-7xl"
        >
          <span className="text-foreground">Premium </span>
          <span className="gradient-text">AI Tools</span>
          <br />
          <span className="text-foreground">& YouTube Growth</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-10 max-w-2xl text-center text-lg text-muted-foreground md:text-xl"
        >
          AI automation, premium content tools & YouTube monetization — all in one place. 
          Unlock your earning potential with cutting-edge technology.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <WhatsAppButton size="xl" message="Hi, I'm interested in your AI tools and services!" />
          <Button variant="glass" size="xl" asChild>
            <a href="#services">
              <Zap className="h-5 w-5" />
              Explore Services
            </a>
          </Button>
        </motion.div>

        {/* Floating 3D elements */}
        <div className="absolute left-[5%] top-[40%] hidden lg:block">
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="glass-card p-4 pulse-glow"
          >
            <Bot className="h-12 w-12 text-primary" />
          </motion.div>
        </div>

        <div className="absolute right-[8%] top-[50%] hidden lg:block">
          <motion.div
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="glass-card p-4"
          >
            <svg className="h-12 w-12 text-[#FF0000]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
            </svg>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {[
            { value: "500+", label: "Happy Clients" },
            { value: "20+", label: "AI Tools" },
            { value: "100%", label: "Trusted" },
            { value: "24/7", label: "Support" },
          ].map((stat, index) => (
            <motion.div 
              key={index} 
              className="text-center glass-card px-6 py-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="font-display text-3xl font-bold gradient-text md:text-4xl">{stat.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent z-20" />
    </section>
  );
};
