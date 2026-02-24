import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FounderSection } from "@/components/home/FounderSection";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, Zap, Globe, Target, Award } from "lucide-react";

const values = [
  { icon: <Shield className="h-6 w-6" />, title: "Trust & Transparency", desc: "We operate with full transparency. Every service, price, and policy is clearly communicated to our clients." },
  { icon: <Users className="h-6 w-6" />, title: "Client-Centric Approach", desc: "Our clients are at the heart of everything we do. We tailor our services to meet individual needs and goals." },
  { icon: <Zap className="h-6 w-6" />, title: "Innovation & Quality", desc: "We leverage the latest AI technologies and industry best practices to deliver cutting-edge digital solutions." },
  { icon: <Globe className="h-6 w-6" />, title: "Global Reach", desc: "Serving clients worldwide with localized expertise. From Pakistan to the world, we bridge digital gaps." },
  { icon: <Target className="h-6 w-6" />, title: "Results-Driven", desc: "We measure our success by the results we deliver. Every strategy is designed to achieve measurable outcomes." },
  { icon: <Award className="h-6 w-6" />, title: "Continuous Support", desc: "Our relationship with clients extends beyond project delivery. We provide ongoing support and guidance." },
];

export default function About() {
  return (
    <main className="min-h-screen bg-background">
      <SEOHead title="About Us" description="Learn about Malik Data Centre — your trusted partner for AI tools, YouTube growth services, and digital solutions in Pakistan." canonical="/about" />
      <Navbar />
      <Breadcrumbs items={[{ label: "About Us" }]} />

      <section className="pt-8 pb-12">
        <div className="container px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              About <span className="gradient-text">Malik Data Centre</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Your trusted partner for premium digital services, AI tools, and YouTube growth solutions worldwide.
            </p>
          </motion.div>

          {/* Who We Are */}
          <div className="max-w-3xl mx-auto glass-card p-8 mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Who We Are</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Malik Data Centre is a professional digital services provider founded by Malik Amir Usman. We specialize in delivering premium AI tool subscriptions, YouTube channel growth and monetization services, social media marketing solutions, web development, and comprehensive digital consulting. Our mission is to empower businesses, creators, and entrepreneurs with the tools and strategies they need to succeed in the digital landscape.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Since our founding, we have served hundreds of satisfied clients across Pakistan and internationally. We believe that every business and creator deserves access to world-class digital tools and expert guidance, regardless of their size or budget.
            </p>

            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Our mission is to democratize access to premium digital tools and professional growth services. We bridge the gap between cutting-edge technology and everyday creators and businesses, providing affordable, reliable, and results-driven solutions that help our clients achieve their digital goals.
            </p>

            <h2 className="font-display text-2xl font-bold text-foreground mb-4">What We Offer</h2>
            <ul className="space-y-3 text-muted-foreground mb-6">
              <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> Premium AI tool subscriptions including ChatGPT Business, Claude AI, Gemini, and more</li>
              <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> YouTube channel growth services including SEO optimization, monetization assistance, and subscriber growth</li>
              <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> Social media marketing across TikTok, Instagram, Facebook, and other platforms</li>
              <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> Professional web development and design services</li>
              <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> Digital consulting and strategy planning for businesses of all sizes</li>
              <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> Educational courses on digital marketing, AI tools, and online business</li>
            </ul>

            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Why Choose Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              We combine technical expertise with a deep understanding of our clients' needs. Our team stays current with the latest developments in AI, digital marketing, and content creation to ensure we always provide the most effective and up-to-date solutions. With competitive pricing, reliable delivery, and dedicated after-sales support, Malik Data Centre is the partner you can trust for all your digital needs.
            </p>
          </div>

          {/* Values */}
          <div className="mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-8">Our Core Values</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {values.map((v, i) => (
                <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }}>
                  <Card className="glass-card border-border/50 h-full">
                    <CardContent className="p-6">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">{v.icon}</div>
                      <h3 className="font-display text-lg font-bold text-foreground mb-2">{v.title}</h3>
                      <p className="text-muted-foreground text-sm">{v.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-8">Why Clients Trust Us</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { value: "500+", label: "Clients Served" },
                { value: "98%", label: "Satisfaction Rate" },
                { value: "24/7", label: "Support Available" },
                { value: "2+ Years", label: "Industry Experience" },
              ].map((badge) => (
                <div key={badge.label} className="glass-card p-4 text-center">
                  <p className="font-display text-2xl font-bold text-primary">{badge.value}</p>
                  <p className="text-muted-foreground text-sm">{badge.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="max-w-3xl mx-auto glass-card p-8 text-center">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Get in Touch</h2>
            <p className="text-muted-foreground mb-2">
              Have questions or want to learn more about our services? We would love to hear from you.
            </p>
            <p className="text-muted-foreground">
              Email: <a href="mailto:support@malikdatacentre.store" className="text-primary hover:underline">support@malikdatacentre.store</a>
            </p>
            <p className="text-muted-foreground">
              WhatsApp: <a href="https://wa.me/923489057646" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">+92 348 9057646</a>
            </p>
          </div>
        </div>
      </section>

      <FounderSection />
      <Footer />
    </main>
  );
}
