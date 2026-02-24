import { motion } from "framer-motion";
import { ArrowLeft, AlertTriangle, Info, Link2, Globe, ShieldAlert, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";

const sections = [
  {
    icon: Info,
    title: "1. General Information Disclaimer",
    paragraph: "The content provided on the Malik Data Centre website is for general informational and educational purposes only. While we strive to keep the information accurate and up-to-date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the information.",
  },
  {
    icon: AlertTriangle,
    title: "2. No Professional Advice",
    content: [
      "The information on this website does not constitute professional business, financial, or legal advice.",
      "We do not guarantee specific results for YouTube growth, channel monetization, or AI tool performance.",
      "Individual results may vary depending on multiple factors including effort, niche, content quality, and market conditions.",
      "Users should use their own judgment and seek professional advice where necessary.",
    ],
  },
  {
    icon: Link2,
    title: "3. Affiliate Disclosure",
    content: [
      "Some links on this website may be affiliate links.",
      "This means we may earn a commission if you make a purchase through these links, at no additional cost to you.",
      "Affiliate partnerships do not influence our recommendations or content.",
      "We only recommend products and services that we believe provide genuine value.",
    ],
  },
  {
    icon: Globe,
    title: "4. AdSense & Advertising Disclaimer",
    content: [
      "This website displays advertisements served by Google AdSense and other advertising networks.",
      "Advertisements may be personalized based on your browsing behavior and interests.",
      "We do not endorse or guarantee any products or services advertised on this website.",
      "Users interact with advertisements at their own discretion and risk.",
      "You may opt out of personalized ads by visiting Google Ads Settings.",
    ],
  },
  {
    icon: ShieldAlert,
    title: "5. No Guarantees",
    content: [
      "We do not guarantee any specific earnings, revenue, or income from using our services.",
      "YouTube monetization, subscriber growth, and watch time results depend on various factors beyond our control.",
      "AI tool availability and performance are subject to third-party platform policies.",
      "Business success depends on individual effort, strategy, and market conditions.",
      "Past results or testimonials do not guarantee future performance.",
    ],
  },
  {
    icon: Globe,
    title: "6. Third-Party Content",
    paragraph: "Our website may reference or link to third-party products, services, or websites. Malik Data Centre does not control and is not responsible for the content, accuracy, or practices of any third-party websites or services. Use of third-party services is at your own risk and subject to their respective terms.",
  },
  {
    icon: Mail,
    title: "7. Contact Us",
    paragraph: "If you have any questions about this Disclaimer, please contact us at: support@malikdatacentre.store",
  },
];

export default function Disclaimer() {
  return (
    <main className="min-h-screen bg-background">
      <SEOHead title="Disclaimer" description="Read the disclaimer for Malik Data Centre. Content is for informational purposes only." canonical="/disclaimer" />
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
              <AlertTriangle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-display text-4xl font-bold md:text-5xl">
              <span className="gradient-text">Disclaimer</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">MALIK DATA CENTRE</p>
            <p className="mt-2 text-muted-foreground">
              Please read this disclaimer carefully before using the Malik Data Centre website and services.
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
