import { motion } from "framer-motion";
import { 
  Sparkles, Video, Bot, Wand2, Search, FileText, Share2, Settings, Headphones,
  Building2, Users, Briefcase, TrendingUp, MessageCircle, ArrowRight,
  Zap, Lock, Clock,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const WHATSAPP_URL = "https://wa.me/923489057646?text=Hi! I'm interested in AI Tools & Digital Services. Please share details.";

const tools = [
  { name: "ChatGPT Business", price: "1,499/- / Month", badge: "Best Seller", type: "instant" },
  { name: "CapCut Pro", price: "499/-", badge: "Popular", type: "instant" },
  { name: "Sora AI Pro", price: "2,999/-", badge: "Best Seller", type: "instant" },
  { name: "Gemini Veo 3 Ultra", price: "1,499/- / Month", badge: null, type: "instant" },
  { name: "HeyGen AI", price: "4,500/- / Month", badge: null, type: "private" },
  { name: "Higgsfield", price: "6,499/- / Month", badge: null, type: "private" },
  { name: "Hailuo AI", price: "4,500/-", badge: null, type: "private" },
  { name: "One Time OTP Number", price: "200/-", badge: null, type: "instant" },
  { name: "Grok AI", price: "2,999/-", badge: null, type: "private" },
  { name: "MiniMax AI", price: "4,500/-", badge: null, type: "private" },
  { name: "Runway ML (Unlimited)", price: "4,000/-", badge: "Best Seller", type: "instant" },
  { name: "GenSpark AI", price: "4,999/-", badge: null, type: "instant" },
  { name: "Kling AI", price: "2,300/-", badge: null, type: "private" },
  { name: "ElevenLabs", price: "2,400/-", badge: "Popular", type: "private" },
  { name: "Lovable Pro", price: "2,999/- / Month", badge: "Popular", type: "instant" },
  { name: "Cursor Pro", price: "4,200/- / Month", badge: null, type: "instant" },
  { name: "Claude AI", price: "3,499/- / Month", badge: null, type: "instant" },
  { name: "Nord VPN", price: "1,499/- / Month", badge: null, type: "instant" },
  { name: "Surfshark Premium VPN", price: "499/- / Month", badge: null, type: "instant" },
  { name: "YouTube Premium", price: "200/-", badge: null, type: "instant" },
  { name: "Veo 3 Ultra 45K Credits (50 Accounts)", price: "38,500/-", badge: null, type: "demand" },
  { name: "4K Hours Watch Time", price: "4,000/-", badge: null, type: "demand" },
  { name: "1K YouTube Subscribers", price: "999/-", badge: null, type: "demand" },
  { name: "1K TikTok Followers", price: "799/-", badge: null, type: "demand" },
  { name: "1K Facebook Followers", price: "799/-", badge: null, type: "demand" },
  { name: "1K Instagram Followers", price: "799/-", badge: null, type: "demand" },
  { name: "SMM Panel", price: "19,999/-", badge: null, type: "demand" },
  { name: "YouTube Channels", price: "On Demand", badge: null, type: "demand" },
  { name: "Google / Gmail Accounts", price: "150/-", badge: null, type: "instant" },
];

const getTypeLabel = (type: string) => {
  switch (type) {
    case "instant":
      return { label: "Instant Access", icon: Zap, className: "text-emerald-400" };
    case "private":
      return { label: "Private Account", icon: Lock, className: "text-blue-400" };
    case "demand":
      return { label: "On Demand", icon: Clock, className: "text-amber-400" };
    default:
      return { label: "Available", icon: Zap, className: "text-muted-foreground" };
  }
};

const digitalServices = [
  { icon: Search, name: "SEO Services", description: "Website SEO, on-page optimization, and basic technical SEO to improve your search visibility." },
  { icon: Video, name: "Video Ads Creation", description: "Social media video ads and short-form promotional videos for your brand." },
  { icon: FileText, name: "Website Content Writing", description: "Professional content writing for websites, landing pages, and product descriptions." },
  { icon: Share2, name: "Social Media Setup & Optimization", description: "Complete social media profile setup and optimization for better reach." },
  { icon: Settings, name: "Basic Automation Setup", description: "Simple automation workflows to save time on repetitive tasks." },
  { icon: Headphones, name: "Online Business Support", description: "General support services for managing and growing your online business." },
];

const beneficiaries = [
  { icon: Building2, text: "Businesses" },
  { icon: Users, text: "Content creators" },
  { icon: TrendingUp, text: "Online brands" },
  { icon: Briefcase, text: "Service providers" },
  { icon: Sparkles, text: "Digital entrepreneurs" },
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.4 },
};

export default function AIToolsServices() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="container px-4">
          <motion.div {...fadeIn} className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm text-secondary font-medium">Tools & Services Marketplace</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              AI Tools & <span className="gradient-text">Digital Services</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Access premium AI tools, digital products, VPNs, social media growth services, and more — all at affordable prices with instant delivery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Full Product Catalog */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background via-muted/20 to-background">
        <div className="container px-4">
          <motion.div {...fadeIn} className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-primary border-primary/50">
              <Zap className="w-3 h-3 mr-1" />
              Available Instantly
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Complete Product Catalog
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get instant access to premium AI tools and digital services at affordable prices
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {tools.map((tool, index) => {
              const typeInfo = getTypeLabel(tool.type);
              const TypeIcon = typeInfo.icon;
              return (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                >
                  <Card className="group relative h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                    {tool.badge && (
                      <Badge className={`absolute -top-2 -right-2 z-10 ${tool.badge === "Best Seller" ? "bg-primary text-primary-foreground" : "bg-emerald-500 text-white"}`}>
                        {tool.badge}
                      </Badge>
                    )}
                    <CardContent className="p-5">
                      <div className="flex flex-col h-full">
                        <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {tool.name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-sm mb-3">
                          <TypeIcon className={`w-3.5 h-3.5 ${typeInfo.className}`} />
                          <span className={typeInfo.className}>{typeInfo.label}</span>
                        </div>
                        <div className="mt-auto">
                          <p className="text-xl font-bold text-primary">Rs {tool.price}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <motion.div {...fadeIn} className="text-center mt-12">
            <Button size="lg" className="gap-2 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300" asChild>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" />
                Get Access Now
              </a>
            </Button>
            <p className="text-muted-foreground text-sm mt-4">Contact us on WhatsApp for instant delivery</p>
          </motion.div>
        </div>
      </section>

      {/* Digital Services Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <motion.div {...fadeIn} className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Online Digital Services
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional digital services to support your online presence
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {digitalServices.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.15) }}
                className="glass-card p-6 rounded-xl border border-border/50 hover:border-primary/30 transition-colors duration-200 group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors duration-200">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-2">{service.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Can Benefit */}
      <section className="py-16 md:py-24 bg-muted/20">
        <div className="container px-4">
          <motion.div {...fadeIn} className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Who Can Benefit From These Services
            </h2>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {beneficiaries.map((item, index) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex items-center gap-3 px-5 py-3 rounded-full bg-card border border-border/50"
              >
                <item.icon className="w-5 h-5 text-primary" />
                <span className="text-foreground font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <motion.div {...fadeIn} className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Interested in Any Service?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Contact us for availability, pricing details, and any questions you may have.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
              asChild
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                Contact on WhatsApp
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <p className="mt-6 text-sm text-muted-foreground">Response within 24 hours</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}