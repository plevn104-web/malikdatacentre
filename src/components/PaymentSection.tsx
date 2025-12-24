import { motion } from "framer-motion";
import { CreditCard, Smartphone, Building2, Shield } from "lucide-react";

const paymentMethods = [
  {
    name: "Bank Transfer",
    description: "Direct bank card payment",
    icon: <CreditCard className="h-8 w-8" />,
  },
  {
    name: "JazzCash",
    description: "Mobile wallet payment",
    icon: <Smartphone className="h-8 w-8" />,
    color: "#E31937",
  },
  {
    name: "EasyPaisa",
    description: "Quick mobile payment",
    icon: <Smartphone className="h-8 w-8" />,
    color: "#00A651",
  },
  {
    name: "Bank Card",
    description: "Visa/Mastercard accepted",
    icon: <Building2 className="h-8 w-8" />,
  },
];

export const PaymentSection = () => {
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
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Easy Payment
          </span>
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-5xl">
            Secure Payment Methods
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Multiple secure payment options for your convenience. 
            Order via WhatsApp and pay with your preferred method.
          </p>
        </motion.div>

        {/* Payment methods grid */}
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2 lg:grid-cols-4">
          {paymentMethods.map((method, index) => (
            <motion.div
              key={method.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card-hover group p-6 text-center"
            >
              <div 
                className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110"
                style={{ color: method.color || 'hsl(var(--primary))' }}
              >
                {method.icon}
              </div>
              <h3 className="mb-1 font-display font-semibold text-foreground">{method.name}</h3>
              <p className="text-sm text-muted-foreground">{method.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Security badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 flex items-center justify-center gap-3 text-muted-foreground"
        >
          <Shield className="h-5 w-5 text-green-500" />
          <span className="text-sm">All transactions are secure and encrypted</span>
        </motion.div>
      </div>
    </section>
  );
};
