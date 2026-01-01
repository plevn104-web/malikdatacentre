import { motion } from "framer-motion";
import { Check, X, Building2, GraduationCap, Users, Briefcase, Award } from "lucide-react";

const goodFit = [
  { icon: Building2, text: "Businesses" },
  { icon: GraduationCap, text: "Institutes" },
  { icon: Users, text: "Coaches" },
  { icon: Briefcase, text: "Service providers" },
  { icon: Award, text: "Brands that value quality" },
];

const notFit = [
  "Free work requests",
  "Unrealistic deadlines",
  "Non-serious inquiries",
];

export const WhoWeWorkWithSection = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-muted/20">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Who We Work With
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We partner with clients who appreciate professional work and clear communication
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Good Fit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            viewport={{ once: true, margin: "-30px" }}
            className="glass-card p-8 rounded-2xl border border-primary/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Check className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">We're a good fit for</h3>
            </div>
            
            <ul className="space-y-4">
              {goodFit.map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-muted-foreground">
                  <item.icon className="w-5 h-5 text-primary/70" />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Not Fit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true, margin: "-30px" }}
            className="glass-card p-8 rounded-2xl border border-muted/40"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-muted/30 flex items-center justify-center">
                <X className="w-5 h-5 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">We may not be a fit for</h3>
            </div>
            
            <ul className="space-y-4">
              {notFit.map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-muted-foreground">
                  <span className="w-5 h-5 flex items-center justify-center text-muted-foreground/50">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
