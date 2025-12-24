import { motion } from "framer-motion";
import { ArrowLeft, RefreshCcw, Ban, CheckCircle, XCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const sections = [
  {
    icon: Ban,
    title: "1. No Automatic Refunds",
    content: [
      "Payments are non-refundable by default",
      "Digital services cannot be returned once delivered",
    ],
  },
  {
    icon: RefreshCcw,
    title: "2. Replacement Policy (Primary Solution)",
    intro: "A replacement will be provided instead of a refund in cases such as:",
    content: [
      "Wrong account details provided initially",
      "Temporary access issues",
      "Technical problems from service side",
    ],
    note: "We will fix the issue or replace the service accordingly.",
  },
  {
    icon: CheckCircle,
    title: "3. Refund Eligibility (Limited Cases Only)",
    intro: "A refund will be issued only if:",
    content: [
      "You receive a completely wrong service",
      "The service provided does not match what was purchased",
      "The issue cannot be resolved or replaced",
    ],
  },
  {
    icon: XCircle,
    title: "4. Non-Refundable Cases",
    intro: "Refunds will NOT be issued if:",
    content: [
      "User changes their mind",
      "User fails to understand the service",
      "Delay occurs due to third-party platforms",
      "User violates terms or misuses services",
    ],
  },
  {
    icon: Clock,
    title: "5. Refund Processing",
    content: [
      "Approved refunds are processed within a reasonable time",
      "Refund method depends on the original payment method",
    ],
  },
];

export default function RefundPolicy() {
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
              <RefreshCcw className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-display text-4xl font-bold md:text-5xl">
              Refund & <span className="gradient-text">Replacement Policy</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              MALIK DATA CENTRE
            </p>
            <p className="mt-2 text-muted-foreground">
              We aim to provide high-quality digital services. Please read our refund policy carefully.
            </p>
          </motion.div>

          {/* Important Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 rounded-xl border border-secondary/50 bg-secondary/10 p-6"
          >
            <p className="text-center text-secondary font-medium">
              💡 Our primary solution is <strong>replacement</strong>, not refund. We always try to resolve issues first.
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
                    {section.note && (
                      <p className="mt-3 text-sm text-primary font-medium">{section.note}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact for Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-12 text-center rounded-xl border border-border bg-muted/30 p-6"
          >
            <p className="text-muted-foreground mb-4">
              Have questions about refunds or replacements?
            </p>
            <Button asChild>
              <a href="https://wa.me/923489057646" target="_blank" rel="noopener noreferrer">
                Contact Support on WhatsApp
              </a>
            </Button>
          </motion.div>

          {/* Last Updated */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-center text-sm text-muted-foreground"
          >
            Last updated: December 2024
          </motion.p>
        </div>
      </section>

      <Footer />
    </main>
  );
}