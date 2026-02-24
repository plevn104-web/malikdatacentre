import { motion } from "framer-motion";
import { ArrowLeft, Shield, Lock, Eye, Cookie, UserCheck, Globe, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";

const sections = [
  {
    icon: Eye,
    title: "1. Information We Collect",
    intro: "We collect the following types of information:",
    content: [
      "Personal Information: Name, email address, and contact details when you reach out, subscribe, or place an order.",
      "Non-Personal Data: Browser type, IP address, device information, and pages visited for analytics purposes.",
      "Cookies and Tracking Technologies: We use cookies and similar technologies to enhance your browsing experience and analyze site traffic.",
    ],
  },
  {
    icon: Cookie,
    title: "2. Cookies Policy",
    paragraph: "Malik Data Centre uses cookies to improve user experience, remember preferences, and analyze website traffic. Cookies are small data files stored on your device. You may disable cookies through your browser settings, but some website features may not function properly without them.",
  },
  {
    icon: Globe,
    title: "3. Google AdSense Disclosure",
    intro: "We use Google AdSense to display advertisements on our website. Please note:",
    content: [
      "Google, as a third-party vendor, uses cookies (including the DART cookie) to serve ads based on your visits to this and other websites.",
      "Users may opt out of personalized advertising by visiting Google Ads Settings (https://adssettings.google.com).",
      "Third-party vendors and ad networks may collect data through cookies to serve relevant ads.",
      "We do not have control over cookies placed by third-party advertisers.",
    ],
  },
  {
    icon: Globe,
    title: "4. Third-Party Services",
    intro: "Our website may use or integrate with the following third-party services:",
    content: [
      "Analytics tools (e.g., Google Analytics) to understand website usage",
      "AI tools and platforms for service delivery",
      "Affiliate programs and partnerships",
      "External service providers for payment processing and communication",
    ],
    paragraph: "These services may collect information as governed by their own privacy policies.",
  },
  {
    icon: UserCheck,
    title: "5. How We Use Your Information",
    intro: "Your information is used to:",
    content: [
      "Provide, manage, and improve our services",
      "Process orders and payments",
      "Respond to inquiries and provide customer support",
      "Send relevant updates and promotional content (with your consent)",
      "Analyze website traffic and user behavior for improvements",
    ],
  },
  {
    icon: Lock,
    title: "6. Data Protection & Security",
    content: [
      "We implement reasonable security measures to protect your personal data from unauthorized access, alteration, or destruction.",
      "All user data is securely stored with access controls in place.",
      "Financial and personal data is never sold or shared publicly.",
      "While we strive to protect your data, no method of electronic transmission is 100% secure.",
    ],
  },
  {
    icon: Shield,
    title: "7. Data Sharing",
    content: [
      "We do not sell, trade, or rent your personal information to third parties.",
      "Data may be shared only when required by law or to protect our legal rights.",
      "Aggregated, non-identifiable data may be used for analytics and improvement purposes.",
    ],
  },
  {
    icon: UserCheck,
    title: "8. Your Rights",
    intro: "You have the right to:",
    content: [
      "Access and review your personal data",
      "Request correction of inaccurate information",
      "Request deletion of your personal data by contacting us",
      "Opt out of marketing communications at any time",
    ],
  },
  {
    icon: Mail,
    title: "9. Contact Information",
    paragraph: "If you have any questions or concerns about this Privacy Policy, please contact us at: support@malikdatacentre.store",
  },
];

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background">
      <SEOHead title="Privacy Policy" description="Read the Malik Data Centre privacy policy. Learn how we collect, use, and protect your personal information." canonical="/privacy-policy" />
      <Navbar />
      
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="mb-8">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to Home
              </Button>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-display text-4xl font-bold md:text-5xl">
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">MALIK DATA CENTRE</p>
            <p className="mt-2 text-muted-foreground">
              At Malik Data Centre, we respect and protect your privacy. This Privacy Policy explains how we collect, use, store, and secure your information when you visit our website or use our services.
            </p>
          </motion.div>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="rounded-xl border border-border bg-card p-6 md:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <section.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-foreground mb-3">{section.title}</h2>
                    {section.intro && <p className="text-muted-foreground mb-3">{section.intro}</p>}
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
                    {section.paragraph && <p className="text-muted-foreground mt-2">{section.paragraph}</p>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-12 text-center text-sm text-muted-foreground">
            Last updated: February 2026
          </motion.p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
