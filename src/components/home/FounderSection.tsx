import { motion } from "framer-motion";
import { Linkedin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import founderImage from "@/assets/founder-malik-amir-usman.png";

const LINKEDIN_URL = "https://www.linkedin.com/in/malik-amir-usman-71ab54397";

export const FounderSection = () => {
  return (
    <section className="py-24 section-gradient">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Meet Our Founder
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            The Mind Behind <span className="gradient-text">Malik Data Centre</span>
          </h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 items-center max-w-5xl mx-auto">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-2xl" />
              
              <img
                src={founderImage}
                alt="Malik Amir Usman - Founder & CEO of Malik Data Centre"
                className="relative h-64 w-64 md:h-80 md:w-80 rounded-full object-cover border-4 border-background shadow-2xl"
              />
              
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-2 text-sm font-semibold text-primary-foreground shadow-lg"
              >
                Founder & CEO
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center lg:text-left"
          >
            <h3 className="font-display text-3xl md:text-4xl font-bold gradient-text mb-2">
              Malik Amir Usman
            </h3>
            <p className="text-lg text-primary font-medium mb-4">
              Founder & CEO – Malik Data Centre
            </p>
            
            <p className="text-muted-foreground leading-relaxed mb-6">
              Malik Amir Usman is the visionary founder of Malik Data Centre, a modern platform 
              dedicated to building powerful digital experiences for businesses worldwide. With 
              expertise in AI-powered web development and a passion for helping businesses succeed 
              online, he leads a team committed to delivering premium quality websites.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <Button
                className="btn-jelly bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white gap-2"
                asChild
              >
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                  Connect on LinkedIn
                </a>
              </Button>
              <Button variant="outline" className="btn-jelly gap-2" asChild>
                <Link to="/about">
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
