import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageCircle, Star, Search, Image, BarChart3, DollarSign, Check, ArrowRight } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/923489057646";

const services = [
  {
    title: "YouTube SEO Optimization",
    description: "Rank higher in YouTube search results and get discovered by your target audience.",
    icon: <Search className="h-8 w-8" />,
    benefits: ["Keyword research & optimization", "Tag & metadata strategy", "Competitor analysis"],
  },
  {
    title: "Thumbnail Design",
    description: "Eye-catching thumbnails that boost your click-through rate and views.",
    icon: <Image className="h-8 w-8" />,
    benefits: ["Custom branded designs", "A/B testing ready", "High-resolution output"],
  },
  {
    title: "Channel Audit",
    description: "Comprehensive analysis of your channel to identify growth opportunities.",
    icon: <BarChart3 className="h-8 w-8" />,
    benefits: ["Performance deep-dive", "Content gap analysis", "Actionable recommendations"],
  },
  {
    title: "Monetization Strategy",
    description: "Strategic planning to maximize your YouTube revenue streams.",
    icon: <DollarSign className="h-8 w-8" />,
    benefits: ["AdSense optimization", "Sponsorship guidance", "Multiple revenue streams"],
  },
];

const testimonials = [
  { name: "Ahmed R.", text: "My channel went from 500 to 10K subscribers in just 3 months!", rating: 5 },
  { name: "Sara K.", text: "Their SEO optimization doubled my views within weeks. Highly recommended!", rating: 5 },
  { name: "Bilal M.", text: "Got monetized faster than I ever expected. Amazing service!", rating: 4 },
];

const faqs = [
  { q: "How long does it take to see results?", a: "Most clients see noticeable growth within 2-4 weeks depending on the service chosen and channel niche." },
  { q: "Is the growth organic and safe?", a: "Yes, we use 100% safe, YouTube-compliant strategies. No bots or fake engagement." },
  { q: "Do you guarantee monetization?", a: "While we can't guarantee monetization approval (YouTube decides), we ensure your channel meets all requirements." },
  { q: "What information do you need from me?", a: "We typically need your channel URL and access to YouTube Studio. We never ask for passwords." },
  { q: "Can I cancel at any time?", a: "Yes, there are no long-term contracts. You can cancel your service at any time." },
  { q: "Do you work with any niche?", a: "Yes, we work with all YouTube niches including gaming, education, vlogging, tech, and more." },
  { q: "How do payments work?", a: "We accept bank transfer, EasyPaisa, JazzCash, and cryptocurrency. Payment is required upfront." },
  { q: "Will my channel get a strike?", a: "No, our methods are fully compliant with YouTube's Terms of Service." },
];

const YouTubeGrowth = () => (
  <main className="min-h-screen bg-background">
    <Navbar />

    {/* Hero */}
    <section className="pt-32 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#FF0000]/5 via-transparent to-transparent pointer-events-none" />
      <div className="container px-4 relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="rounded-full bg-[#FF0000]/10 px-4 py-2 text-sm font-medium text-[#FF0000] inline-block mb-6">YouTube Growth Services</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
            Grow Your YouTube Channel <span className="text-[#FF0000]">the Smart Way</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-8">
            Expert strategies and proven techniques to accelerate your YouTube channel growth, increase engagement, and maximize your revenue potential.
          </p>
          <Button size="xl" className="bg-[#FF0000] hover:bg-[#FF0000]/90 text-white" asChild>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 mr-2" /> Get Started
            </a>
          </Button>
        </motion.div>
      </div>
    </section>

    {/* Services */}
    <section className="py-20">
      <div className="container px-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-4">Our YouTube Growth Services</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">Comprehensive solutions tailored to take your channel to the next level.</p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
              <Card className="glass-card h-full border-border/50 hover:border-[#FF0000]/30 transition-all duration-300 group">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-[#FF0000]/10 text-[#FF0000] group-hover:scale-110 transition-transform">{s.icon}</div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{s.description}</p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {s.benefits.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-[#FF0000] flex-shrink-0" /> {b}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full border-[#FF0000]/30 text-[#FF0000] hover:bg-[#FF0000]/10" asChild>
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                      Get Started <ArrowRight className="h-4 w-4 ml-1" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-20 bg-muted/20">
      <div className="container px-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12">What Our Clients Say</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
              <Card className="glass-card border-border/50">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{t.text}"</p>
                  <p className="font-semibold text-foreground">{t.name}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="py-20">
      <div className="container px-4 max-w-3xl">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12">Frequently Asked Questions</h2>
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

    {/* Final CTA */}
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#FF0000]/10 via-transparent to-[#FF0000]/10 pointer-events-none" />
      <div className="container px-4 text-center relative z-10">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to Grow Your Channel?</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">Join hundreds of creators who have accelerated their YouTube growth with our expert services.</p>
        <Button size="xl" className="bg-[#FF0000] hover:bg-[#FF0000]/90 text-white" asChild>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-5 w-5 mr-2" /> Start Growing Today
          </a>
        </Button>
      </div>
    </section>

    <Footer />
  </main>
);

export default YouTubeGrowth;
