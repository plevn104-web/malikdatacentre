import { motion } from "framer-motion";
import { ArrowLeft, FileText, User, CreditCard, ShieldAlert, Server, Ban } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const sections = [
  {
    icon: User,
    title: "1. Account Responsibility",
    content: [
      "Users are responsible for maintaining the security of their accounts",
      "Sharing login credentials is not allowed",
      "Any misuse of the account is the user's responsibility",
    ],
  },
  {
    icon: Server,
    title: "2. Services & Access",
    content: [
      "Services, tools, and courses are provided digitally",
      "Access is granted after payment confirmation and approval",
      "Access is limited to the purchasing account only",
    ],
  },
  {
    icon: CreditCard,
    title: "3. Payments",
    content: [
      "All payments must be made through approved payment methods",
      "Manual payment approval may take some time",
      "Prices are subject to change without prior notice",
    ],
  },
  {
    icon: Ban,
    title: "4. Prohibited Use",
    intro: "Users must not:",
    content: [
      "Attempt to access other users' data",
      "Misuse or resell services without permission",
      "Engage in fraud, abuse, or illegal activities",
    ],
  },
  {
    icon: Server,
    title: "5. Service Availability",
    content: [
      "Services may be updated, modified, or discontinued",
      "We are not responsible for third-party platform changes (AI tools, YouTube, etc.)",
    ],
  },
  {
    icon: ShieldAlert,
    title: "6. Termination",
    paragraph: "We reserve the right to suspend or terminate accounts violating these terms.",
  },
];

export default function TermsConditions() {
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
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-display text-4xl font-bold md:text-5xl">
              Terms & <span className="gradient-text">Conditions</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              MALIK DATA CENTRE
            </p>
            <p className="mt-2 text-muted-foreground">
              By using this website, you agree to the following Terms & Conditions.
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