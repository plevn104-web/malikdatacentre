import { motion } from "framer-motion";
import { ArrowLeft, FileText, User, CreditCard, ShieldAlert, Server, Ban, Globe, RefreshCw, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const sections = [
  {
    icon: FileText,
    title: "1. Acceptance of Terms",
    paragraph: "By accessing and using the Malik Data Centre website, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you must not use this website.",
  },
  {
    icon: User,
    title: "2. Use of Website",
    content: [
      "All content on this website is provided for informational and educational purposes only.",
      "Users must not misuse the website or attempt to disrupt its functionality.",
      "No illegal activities, including hacking, data scraping, or unauthorized access, are permitted.",
      "Users are responsible for maintaining the security of their accounts and login credentials.",
    ],
  },
  {
    icon: ShieldAlert,
    title: "3. Intellectual Property",
    paragraph: "All content, design elements, graphics, logos, text, and materials on this website are the intellectual property of Malik Data Centre unless otherwise stated. Reproduction, distribution, or modification of any content without prior written permission is strictly prohibited.",
  },
  {
    icon: Server,
    title: "4. Services & Access",
    content: [
      "Services, tools, and courses are provided digitally after payment confirmation.",
      "Access is limited to the purchasing account only; sharing credentials is not allowed.",
      "Prices are subject to change without prior notice.",
      "We reserve the right to modify, update, or discontinue any service at any time.",
    ],
  },
  {
    icon: CreditCard,
    title: "5. Payments",
    content: [
      "All payments must be made through approved payment methods (bank transfer, EasyPaisa, JazzCash, cryptocurrency).",
      "Manual payment approval may take some time depending on the payment method.",
      "No automatic refunds are issued for digital services. Please refer to our Refund Policy for details.",
    ],
  },
  {
    icon: Ban,
    title: "6. Limitation of Liability",
    content: [
      "Malik Data Centre is not responsible for any direct, indirect, incidental, or consequential losses resulting from the use of this website or its services.",
      "We do not guarantee specific results, earnings, or outcomes from using our services.",
      "Use of third-party tools and platforms is subject to their respective terms and conditions.",
    ],
  },
  {
    icon: Globe,
    title: "7. External Links",
    paragraph: "Our website may contain links to third-party websites for reference or convenience. Malik Data Centre is not responsible for the content, privacy practices, or accuracy of information on external websites. Visiting external links is at your own risk.",
  },
  {
    icon: Ban,
    title: "8. Prohibited Use",
    intro: "Users must not:",
    content: [
      "Attempt to access other users' data or accounts",
      "Misuse, resell, or redistribute services without permission",
      "Engage in fraud, abuse, or any illegal activities",
      "Use automated tools to scrape or collect data from the website",
    ],
  },
  {
    icon: ShieldAlert,
    title: "9. Termination",
    paragraph: "We reserve the right to suspend or terminate accounts that violate these Terms & Conditions without prior notice. Any remaining balances or access may be forfeited upon termination.",
  },
  {
    icon: RefreshCw,
    title: "10. Modifications",
    paragraph: "Malik Data Centre reserves the right to update, modify, or change these Terms & Conditions at any time without prior notice. Continued use of the website after changes constitutes acceptance of the updated terms.",
  },
  {
    icon: Mail,
    title: "11. Contact Information",
    paragraph: "If you have any questions regarding these Terms & Conditions, please contact us at: support@malikdatacentre.store",
  },
];

export default function TermsConditions() {
  return (
    <main className="min-h-screen bg-background">
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
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-display text-4xl font-bold md:text-5xl">
              Terms & <span className="gradient-text">Conditions</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">MALIK DATA CENTRE</p>
            <p className="mt-2 text-muted-foreground">
              By accessing and using this website, you agree to comply with and be bound by the following Terms & Conditions.
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
                    {section.paragraph && <p className="text-muted-foreground">{section.paragraph}</p>}
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

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-12 text-center text-sm text-muted-foreground">
            Last updated: February 2026
          </motion.p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
