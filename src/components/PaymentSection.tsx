import { motion } from "framer-motion";
import { Smartphone, Building2, Shield, Copy, Check, MessageSquare, Camera, Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import { WhatsAppButton } from "./WhatsAppButton";
import { toast } from "@/hooks/use-toast";

const paymentMethods = [
  {
    name: "EasyPaisa",
    icon: <Smartphone className="h-8 w-8" />,
    color: "#00A651",
    details: [
      { label: "Account Number", value: "03363337895" },
      { label: "Account Holder", value: "Malik Ameer Usman" },
    ],
  },
  {
    name: "JazzCash",
    icon: <Smartphone className="h-8 w-8" />,
    color: "#E31937",
    details: [
      { label: "Account Number", value: "03075484104" },
      { label: "Account Holder", value: "Malik Ghulam Hussain" },
    ],
  },
  {
    name: "Bank Transfer",
    icon: <Building2 className="h-8 w-8" />,
    color: "#0066B3",
    details: [
      { label: "Bank Name", value: "Meezan Bank" },
      { label: "IBAN", value: "PK40MEZN0000300111059733" },
    ],
  },
];

const confirmationSteps = [
  {
    icon: <Camera className="h-6 w-6" />,
    title: "Take Screenshot",
    description: "Capture your payment confirmation screen",
  },
  {
    icon: <Send className="h-6 w-6" />,
    title: "Send on WhatsApp",
    description: "Share the screenshot with us on WhatsApp",
  },
  {
    icon: <CheckCircle className="h-6 w-6" />,
    title: "Instant Delivery",
    description: "We verify and deliver your services instantly",
  },
];

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: "Copied!",
      description: `${text} copied to clipboard`,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="ml-2 rounded-lg bg-primary/20 p-2 text-primary transition-all hover:bg-primary/30 hover:scale-110"
      aria-label="Copy to clipboard"
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </button>
  );
};

export const PaymentSection = () => {
  return (
    <section id="payment" className="section-gradient relative py-24">
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
            💳 Secure Payment
          </span>
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-5xl">
            Payment & Order Instructions
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Simple, secure payment process. Choose your preferred method and follow the easy steps below.
          </p>
        </motion.div>

        {/* Payment methods grid */}
        <div className="mx-auto mb-16 grid max-w-5xl gap-6 md:grid-cols-3">
          {paymentMethods.map((method, index) => (
            <motion.div
              key={method.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="glass-card group overflow-hidden p-6"
            >
              {/* Header */}
              <div className="mb-6 flex items-center gap-4">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${method.color}20`, color: method.color }}
                >
                  {method.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">{method.name}</h3>
              </div>

              {/* Details */}
              <div className="space-y-4">
                {method.details.map((detail) => (
                  <div key={detail.label} className="rounded-lg bg-background/50 p-3">
                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {detail.label}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-sm font-semibold text-foreground">{detail.value}</p>
                      <CopyButton text={detail.value} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Glow effect */}
              <div
                className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full opacity-20 blur-3xl transition-opacity group-hover:opacity-40"
                style={{ backgroundColor: method.color }}
              />
            </motion.div>
          ))}
        </div>

        {/* Payment Confirmation Process */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-4xl"
        >
          <div className="glass-card relative overflow-hidden p-8">
            {/* Header */}
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  📩 Payment Confirmation Process
                </h3>
                <p className="text-sm text-muted-foreground">Follow these simple steps after payment</p>
              </div>
            </div>

            {/* Steps */}
            <div className="grid gap-6 md:grid-cols-3">
              {confirmationSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Step number */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                    Step {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="mb-4 mt-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary">
                    {step.icon}
                  </div>

                  <h4 className="mb-2 font-display font-semibold text-foreground">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>

                  {/* Connector line */}
                  {index < confirmationSteps.length - 1 && (
                    <div className="absolute right-0 top-1/2 hidden h-0.5 w-full translate-x-1/2 bg-gradient-to-r from-primary/50 to-transparent md:block" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <div className="mt-8 flex justify-center">
              <WhatsAppButton
                message="Hello, I have sent the payment. Here is the screenshot. Please process my order."
                size="lg"
              >
                Send Payment Screenshot
              </WhatsAppButton>
            </div>

            {/* Decorative glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground"
        >
          <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2">
            <Shield className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium text-green-500">Secure Transactions</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">Verified Seller</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2">
            <MessageSquare className="h-5 w-5 text-accent" />
            <span className="text-sm font-medium text-accent">24/7 WhatsApp Support</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
