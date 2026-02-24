import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star, TrendingUp, Clock, DollarSign, Play } from "lucide-react";

const stats = [
  { label: "Subscribers Growth", value: "500K+", icon: <TrendingUp className="h-8 w-8" />, color: "text-primary" },
  { label: "Watch Time Increase", value: "2M+ Hours", icon: <Clock className="h-8 w-8" />, color: "text-[#FF0000]" },
  { label: "Revenue Growth", value: "PKR 10M+", icon: <DollarSign className="h-8 w-8" />, color: "text-green-500" },
];

const testimonials = [
  { name: "Usman Ali", role: "Tech YouTuber", text: "Malik Data Centre helped me reach 100K subscribers and get monetized in record time. Their service is unmatched!", rating: 5 },
  { name: "Fatima Zahra", role: "Lifestyle Vlogger", text: "The YouTube SEO optimization completely transformed my channel. My views tripled in just one month!", rating: 5 },
  { name: "Hassan Sheikh", role: "Gaming Channel", text: "Their complete monetization package delivered exactly what was promised. Now I'm earning from AdSense!", rating: 5 },
  { name: "Ayesha Khan", role: "Education Channel", text: "Professional service with real results. My channel grew from 200 to 5,000 subscribers in 2 months.", rating: 4 },
  { name: "Rizwan Ahmed", role: "Business Coach", text: "The AI tools they provided helped me create content 10x faster. Absolutely worth every rupee!", rating: 5 },
];

const videoTestimonials = [
  { title: "How I Got 50K Subscribers", thumbnail: "/placeholder.svg" },
  { title: "My Monetization Journey", thumbnail: "/placeholder.svg" },
  { title: "From 0 to 100K Views", thumbnail: "/placeholder.svg" },
];

const SuccessStories = () => (
  <main className="min-h-screen bg-background">
    <Navbar />

    {/* Hero */}
    <section className="pt-32 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="container px-4 relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
            Real Results. <span className="gradient-text">Real Growth.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">See how our clients have transformed their YouTube channels and digital businesses with our services.</p>
        </motion.div>
      </div>
    </section>

    {/* Stats */}
    <section className="py-16">
      <div className="container px-4">
        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
              <Card className="glass-card border-border/50 text-center">
                <CardContent className="p-8">
                  <div className={`${s.color} mx-auto mb-4`}>{s.icon}</div>
                  <div className={`text-4xl font-bold ${s.color} mb-2`}>{s.value}</div>
                  <p className="text-muted-foreground">{s.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-16 bg-muted/20">
      <div className="container px-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12">Client Testimonials</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }}>
              <Card className="glass-card border-border/50 h-full">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic text-sm">"{t.text}"</p>
                  <div>
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Video Testimonials */}
    <section className="py-16">
      <div className="container px-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12">Video Testimonials</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {videoTestimonials.map((v, i) => (
            <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
              <Card className="glass-card border-border/50 overflow-hidden group cursor-pointer">
                <div className="aspect-video bg-muted/30 relative">
                  <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 flex items-center justify-center bg-background/40 group-hover:bg-background/20 transition-colors">
                    <div className="h-16 w-16 rounded-full bg-[#FF0000] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="h-8 w-8 text-white ml-1" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-display font-semibold text-foreground">{v.title}</h3>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <Footer />
  </main>
);

export default SuccessStories;
