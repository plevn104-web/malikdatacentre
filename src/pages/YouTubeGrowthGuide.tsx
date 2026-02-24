import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Check, Download, Shield, Star, Users } from "lucide-react";

const benefits = [
  "Step-by-step roadmap from 0 to monetization",
  "Proven SEO strategies for YouTube ranking",
  "Thumbnail design tips that boost CTR by 300%",
  "Content calendar template for consistent uploads",
  "Secret growth hacks used by top creators",
];

const trustBadges = [
  { icon: <Users className="h-6 w-6" />, label: "10,000+ Downloads" },
  { icon: <Star className="h-6 w-6" />, label: "4.9/5 Rating" },
  { icon: <Shield className="h-6 w-6" />, label: "100% Free" },
];

const YouTubeGrowthGuide = () => (
  <main className="min-h-screen bg-background">
    <Navbar />

    {/* Hero */}
    <section className="pt-32 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#FF0000]/5 via-transparent to-transparent pointer-events-none" />
      <div className="container px-4 relative z-10">
        <div className="max-w-4xl mx-auto grid gap-12 lg:grid-cols-2 items-center">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <span className="rounded-full bg-[#FF0000]/10 px-4 py-2 text-sm font-medium text-[#FF0000] inline-block mb-6">Free Guide</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
              Download the Ultimate <span className="text-[#FF0000]">YouTube Growth Guide</span>
            </h1>
            <p className="text-muted-foreground mb-8">
              Everything you need to grow your YouTube channel from scratch. Packed with actionable strategies, templates, and insider tips.
            </p>
            <ul className="space-y-3 mb-8">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-3 text-foreground">
                  <Check className="h-5 w-5 text-[#FF0000] flex-shrink-0" /> {b}
                </li>
              ))}
            </ul>
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4">
              {trustBadges.map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 rounded-lg bg-muted/30 px-4 py-2 text-sm text-muted-foreground">
                  <span className="text-primary">{badge.icon}</span> {badge.label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Email Capture */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card className="glass-card border-[#FF0000]/20">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <Download className="h-12 w-12 text-[#FF0000] mx-auto mb-4" />
                  <h2 className="font-display text-2xl font-bold text-foreground">Get Your Free Guide</h2>
                  <p className="text-muted-foreground text-sm mt-2">Enter your email to download instantly</p>
                </div>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <Input placeholder="Your full name" className="bg-muted/30 border-border/50" />
                  <Input type="email" placeholder="Your email address" className="bg-muted/30 border-border/50" />
                  <Button className="w-full bg-[#FF0000] hover:bg-[#FF0000]/90 text-white" size="lg">
                    <Download className="h-5 w-5 mr-2" /> Download Free Guide
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground text-center mt-4">
                  <Shield className="h-3 w-3 inline mr-1" />
                  We respect your privacy. No spam, ever. Unsubscribe anytime.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>

    <Footer />
  </main>
);

export default YouTubeGrowthGuide;
