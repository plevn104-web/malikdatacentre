import { motion } from "framer-motion";
import { ArrowLeft, Shield, Lock, Eye, Cookie, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const sections = [
  {
    icon: Eye,
    title: "1. Information We Collect",
    content: [
      "Name and email address",
      "Login credentials",
      "Payment and transaction details",
      "Purchased services, tools, and courses",
      "Communication data (chatbot or WhatsApp)",
    ],
  },
  {
    icon: UserCheck,
    title: "2. How We Use Your Information",
    intro: "Your information is used to:",
    content: [
      "Provide and manage services",
      "Process payments and orders",
      "Grant access to purchased tools and courses",
      "Improve user experience and security",
      "Provide customer support",
    ],
  },
  {
    icon: Lock,
    title: "3. Data Protection & Security",
    content: [
      "All user data is securely stored",
      "Each user can access only their own data",
      "Financial and personal data is never shared publicly",
      "Only the Admin has access to overall system data",
      "Strong security measures are used to prevent unauthorized access",
    ],
  },
  {
    icon: Shield,
    title: "4. Data Sharing",
    content: [
      "We do not sell or share your personal data with third parties",
      "Your information is used only for service delivery",
    ],
  },
  {
    icon: Cookie,
    title: "5. Cookies",
    paragraph: "We may use cookies to improve website functionality and user experience.",
  },
  {
    icon: UserCheck,
    title: "6. Your Rights",
    intro: "You have the right to:",
    content: [
      "Access your personal data",
      "Request correction of incorrect data",
      "Contact support regarding privacy concerns",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container px-4 max-w-4xl">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-display text-4xl font-bold md:text-5xl">
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              MALIK DATA CENTRE
            </p>
            <p className="mt-2 text-muted-foreground">
              At MALIK DATA CENTRE, we respect and protect your privacy. This Privacy Policy explains how we collect, use, and secure your information.
            </p>
          </motion.div>

          {/* Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-xl border border-border bg-card p-6 md:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <section.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-foreground mb-3">
                      {section.title}
                    </h2>
                    {section.intro && (
                      <p className="text-muted-foreground mb-3">{section.intro}</p>
                    )}
                    {section.paragraph && (
                      <p className="text-muted-foreground">{section.paragraph}</p>
                    )}
                    {section.content && (
                      <ul className="space-y-2">
                        {section.content.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-muted-foreground">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Last Updated */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center text-sm text-muted-foreground"
          >
            Last updated: December 2024
          </motion.p>
        </div>
      </section>

      <Footer />
    </main>
  );
}