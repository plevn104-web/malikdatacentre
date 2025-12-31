import { motion } from "framer-motion";

const partners = [
  { name: "Google", logo: "G" },
  { name: "Meta", logo: "M" },
  { name: "Microsoft", logo: "MS" },
  { name: "Shopify", logo: "S" },
  { name: "OpenAI", logo: "AI" },
  { name: "Amazon", logo: "A" },
];

export const TrustSection = () => {
  return (
    <section className="py-16 border-y border-border/30 bg-card/20">
      <div className="container px-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mb-8"
        >
          Tools & platforms we work with
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16"
        >
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2 text-muted-foreground/60 hover:text-muted-foreground transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-muted/30 flex items-center justify-center font-display font-bold text-sm">
                {partner.logo}
              </div>
              <span className="font-medium text-sm hidden sm:inline">{partner.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
