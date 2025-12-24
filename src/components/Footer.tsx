import { motion } from "framer-motion";
import { MessageCircle, Mail, MapPin, Clock, AlertCircle } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative border-t border-border bg-card/50 py-16">
      <div className="container px-4">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 font-display text-2xl font-bold">
              <span className="gradient-text">MALIK DATA</span>
              <br />
              <span className="text-foreground">CENTRE</span>
            </div>
            <p className="mb-6 text-sm text-muted-foreground">
              Premium AI tools, automation services, and YouTube growth solutions for creators and entrepreneurs.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/923489057646"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366] transition-colors hover:bg-[#25D366]/20"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF0000]/10 text-[#FF0000] transition-colors hover:bg-[#FF0000]/20"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-4 font-display font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="#services" className="transition-colors hover:text-primary">AI Tools & Services</a>
              </li>
              <li>
                <a href="#youtube" className="transition-colors hover:text-primary">YouTube Services</a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">Pricing</a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">About Us</a>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-4 font-display font-semibold text-foreground">Contact Us</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-[#25D366]" />
                <a href="https://wa.me/923489057646" className="transition-colors hover:text-primary">
                  +92 348 9057646
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>24/7 Available</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Pakistan & Worldwide</span>
              </li>
            </ul>
          </motion.div>

          {/* Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="glass-card border-primary/30 bg-primary/5 p-4">
              <div className="mb-2 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                <span className="font-semibold text-primary">Limited Slots!</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Due to high demand, we have limited slots available. 
                Order now to secure your spot!
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2024 MALIK DATA CENTRE. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Trusted by 500+ clients
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
