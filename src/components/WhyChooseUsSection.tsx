import { motion } from "framer-motion";
import { Shield, Zap, HeadphonesIcon, DollarSign, CheckCircle, Award } from "lucide-react";

const features = [
  {
    icon: <Shield className="h-8 w-8" />,
    title: "100% Trusted Services",
    description: "We prioritize your security and deliver only genuine, safe services.",
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Fast & Secure Delivery",
    description: "Quick turnaround times without compromising quality or safety.",
  },
  {
    icon: <DollarSign className="h-8 w-8" />,
    title: "Monetization Support",
    description: "Complete assistance to get your YouTube channel monetized.",
  },
  {
    icon: <Award className="h-8 w-8" />,
    title: "Best Prices in Market",
    description: "Premium services at the most competitive prices in Pakistan.",
  },
  {
    icon: <CheckCircle className="h-8 w-8" />,
    title: "Real Results",
    description: "Tangible outcomes that help you achieve your goals.",
  },
  {
    icon: <HeadphonesIcon className="h-8 w-8" />,
    title: "24/7 Support",
    description: "Our team is always available to assist you anytime.",
  },
];

export const WhyChooseUsSection = () => {
  return (
    <section className="section-gradient relative py-24">
      <div className="container px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-secondary/10 px-4 py-2 text-sm font-medium text-secondary">
            Why Us
          </span>
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-5xl">
            Why Choose Us?
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            We're committed to delivering exceptional value and results for every client.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card-hover group p-8 text-center"
            >
              <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)]">
                {feature.icon}
              </div>
              <h3 className="mb-3 font-display text-xl font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats counter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 grid gap-8 md:grid-cols-4"
        >
          {[
            { value: "500+", label: "Happy Clients" },
            { value: "1000+", label: "Orders Completed" },
            { value: "50+", label: "Channels Monetized" },
            { value: "4.9/5", label: "Client Rating" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="glass-card py-8 text-center"
            >
              <div className="font-display text-4xl font-bold gradient-text">{stat.value}</div>
              <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
