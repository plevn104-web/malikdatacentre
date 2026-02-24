import { motion } from "framer-motion";
import { Check, Star, ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/923489057646?text=Hi! I'm interested in getting a website built. Please share more details.";

const plans = [
  {
    name: "Free",
    price: "Rs 0",
    description: "Get started with basic YouTube tools",
    features: ["10 tool runs/month", "Basic YouTube tools", "Community support"],
    popular: false,
  },
  {
    name: "Creator Pro",
    price: "Rs 2,000",
    description: "For serious YouTube creators",
    features: ["600 tool runs/month", "Advanced tools access", "No ads in tools", "30-day history", "Priority support"],
    popular: true,
  },
  {
    name: "Elite Creator",
    price: "Rs 3,000",
    description: "Unlimited power for top creators",
    features: ["Unlimited tool runs", "All tools unlocked", "No ads", "Unlimited history", "Dedicated support"],
    popular: false,
  },
];

export const PricingPreview = () => {
  return (
    <section className="py-24 section-gradient">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Pricing
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your creator journey. All prices in PKR.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`glass-card p-8 relative ${plan.popular ? "border-primary/50 shadow-lg shadow-primary/10" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground text-xs font-semibold">
                    <Star className="h-3 w-3" /> Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">{plan.name}</h3>
                <div className="font-display text-4xl font-bold gradient-text mb-2">{plan.price}</div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full btn-jelly ${plan.popular ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground" : ""}`}
                variant={plan.popular ? "default" : "outline"}
                asChild
              >
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {plan.name === "Free" ? "Get Started" : `Get ${plan.name}`}
                </a>
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/pricing"
            className="text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-2 text-sm font-medium"
          >
            View all plans & comparison
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
