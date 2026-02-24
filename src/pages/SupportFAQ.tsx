import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageCircle, Mail, Send } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/923489057646";

const faqs = [
  { q: "What services does Malik Data Centre offer?", a: "We offer AI tools subscriptions, YouTube growth services, social media marketing, web development, and digital consulting." },
  { q: "How do I place an order?", a: "Simply contact us via WhatsApp or use the order buttons on our website. We'll guide you through the process." },
  { q: "What payment methods do you accept?", a: "We accept bank transfer, EasyPaisa, JazzCash, cryptocurrency, and international payments." },
  { q: "How long does delivery take?", a: "Delivery times vary by service. AI tools are delivered within 1-24 hours. YouTube services may take 3-7 days." },
  { q: "Do you offer refunds?", a: "Yes, we have a refund policy. Please visit our Refund Policy page for detailed terms and conditions." },
  { q: "Are your YouTube growth services safe?", a: "Absolutely. We use 100% safe, YouTube-compliant methods. Your channel will never be at risk." },
  { q: "Can I get a custom package?", a: "Yes! Contact us on WhatsApp and we'll create a custom package tailored to your specific needs." },
  { q: "Do you provide after-sales support?", a: "Yes, we provide full after-delivery support. Our team is available to help with any issues." },
];

const SupportFAQ = () => (
  <main className="min-h-screen bg-background">
    <SEOHead title="Support & FAQ" description="Find answers to common questions about Malik Data Centre services. Contact us via WhatsApp, email, or our support form." canonical="/support" />
    <Navbar />

    {/* Hero */}
    <section className="pt-32 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="container px-4 relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
            Support & <span className="gradient-text">FAQ</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">Got questions? We've got answers. Can't find what you need? Reach out to us directly.</p>
        </motion.div>
      </div>
    </section>

    {/* FAQ */}
    <section className="py-16">
      <div className="container px-4 max-w-3xl">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-8">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="glass-card border-border/50 rounded-xl px-6">
              <AccordionTrigger className="text-foreground hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>

    {/* Contact Form + Info */}
    <section className="py-16 bg-muted/20">
      <div className="container px-4">
        <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
          {/* Form */}
          <Card className="glass-card border-border/50">
            <CardContent className="p-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Send Us a Message</h2>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <Label htmlFor="name">Your Name</Label>
                  <Input id="name" placeholder="Enter your name" className="mt-1 bg-muted/30 border-border/50" />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter your email" className="mt-1 bg-muted/30 border-border/50" />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <textarea id="message" rows={4} placeholder="Type your message..." className="mt-1 w-full rounded-md border border-border/50 bg-muted/30 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                </div>
                <Button className="w-full">
                  <Send className="h-4 w-4 mr-2" /> Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="glass-card border-border/50">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">WhatsApp</h3>
                  <p className="text-muted-foreground text-sm">+92 348 9057646</p>
                  <Button size="sm" className="mt-2 bg-[#25D366] hover:bg-[#25D366]/90 text-white" asChild>
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Chat Now</a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-border/50">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <p className="text-muted-foreground text-sm">support@malikdatacentre.com</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </main>
);

export default SupportFAQ;
