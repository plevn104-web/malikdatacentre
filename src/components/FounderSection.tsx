import { motion } from "framer-motion";
import { Linkedin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import founderImage from "@/assets/founder-malik-amir-usman.png";

const LINKEDIN_URL = "https://www.linkedin.com/in/malik-amir-usman-71ab54397";

export const FounderSection = () => {
  return (
    <section className="cgi-section-alt py-16 md:py-24 overflow-hidden relative">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            Meet Our Founder
          </span>
          <h2 className="font-display text-3xl font-bold md:text-4xl lg:text-5xl">
            The Mind Behind <span className="gradient-text">MALIK DATA CENTRE</span>
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center max-w-5xl mx-auto">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/20 blur-xl" />
              <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-primary to-secondary opacity-20" />
              
              <img
                src={founderImage}
                alt="Malik Amir Usman - Founder & CEO of MALIK DATA CENTRE"
                className="relative h-64 w-64 rounded-full object-cover border-4 border-background shadow-2xl md:h-80 md:w-80"
              />
              
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <h3 className="font-display text-3xl font-bold md:text-4xl">
              <span className="gradient-text">Malik Amir Usman</span>
            </h3>
            <p className="mt-1 text-lg text-primary font-medium">
              Founder & CEO – MALIK DATA CENTRE
            </p>
            
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Malik Amir Usman is the Founder and Owner of MALIK DATA CENTRE, a modern AI-powered platform providing premium AI tools, automation services, digital solutions, and professional training programs. He focuses on building secure, scalable, and practical AI systems for real-world use.
            </p>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap gap-3 justify-center lg:justify-start">
              <Button
                className="gap-2 bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white"
                asChild
              >
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                  Connect on LinkedIn
                </a>
              </Button>
              <Link to="/founder">
                <Button variant="outline" className="gap-2">
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};