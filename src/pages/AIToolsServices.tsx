import { motion } from "framer-motion";
import { 
  Sparkles, 
  Video, 
  Bot, 
  Wand2, 
  Search, 
  FileText, 
  Share2, 
  Settings, 
  Headphones,
  Building2,
  Users,
  Briefcase,
  TrendingUp,
  MessageCircle,
  ArrowRight
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/923489057646?text=Hi! I'm interested in AI Tools & Digital Services. Please share details.";

const aiTools = [
  {
    name: "CapCut Pro",
    benefit: "Professional video editing with AI-powered features",
    price: "Rs 499",
  },
  {
    name: "Sora AI Pro",
    benefit: "Advanced AI video generation capabilities",
    price: "Rs 1,499",
  },
  {
    name: "Veo 3 Pro",
    benefit: "Next-gen AI video creation tools",
    price: "Rs 1,499/year",
  },
  {
    name: "ChatGPT Pro",
    benefit: "Premium AI assistant access on private email",
    price: "Rs 1,499/year",
  },
];

const digitalServices = [
  {
    icon: Search,
    name: "SEO Services",
    description: "Website SEO, on-page optimization, and basic technical SEO to improve your search visibility.",
  },
  {
    icon: Video,
    name: "Video Ads Creation",
    description: "Social media video ads and short-form promotional videos for your brand.",
  },
  {
    icon: FileText,
    name: "Website Content Writing",
    description: "Professional content writing for websites, landing pages, and product descriptions.",
  },
  {
    icon: Share2,
    name: "Social Media Setup & Optimization",
    description: "Complete social media profile setup and optimization for better reach.",
  },
  {
    icon: Settings,
    name: "Basic Automation Setup",
    description: "Simple automation workflows to save time on repetitive tasks.",
  },
  {
    icon: Headphones,
    name: "Online Business Support",
    description: "General support services for managing and growing your online business.",
  },
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
              <span className="text-sm text-secondary font-medium">Additional Services</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              AI Tools & <span className="gradient-text">Digital Services</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide access to powerful AI tools and professional digital services 
              to help businesses and creators grow efficiently.
            </p>
          </motion.div>
        </div>
      </section>

      {/* AI Tools Section */}
      <section className="py-16 md:py-24 bg-muted/20">
        <div className="container px-4">
          <motion.div {...fadeIn} className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              AI Tools Available
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Access premium AI tools at affordable prices
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {aiTools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass-card p-6 rounded-xl border border-border/50 hover:border-primary/30 transition-colors duration-200"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-2">{tool.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{tool.benefit}</p>
                <div className="text-primary font-semibold">{tool.price}</div>
              </motion.div>
            ))}
          </div>

          {/* Other Tools Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="glass-card p-8 rounded-xl border border-secondary/20 max-w-2xl mx-auto text-center"
          >
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center mx-auto mb-4">
              <Wand2 className="w-7 h-7 text-secondary" />
            </div>
            <h3 className="font-semibold text-foreground text-xl mb-3">
              Other AI & Automation Tools Available
            </h3>
            <p className="text-muted-foreground">
              Multiple AI tools for content creation, automation, and productivity 
              are available on request. Contact us for the full catalog.
            </p>
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

      {/* Who Can Benefit Section */}
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

      {/* CTA Section */}
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

            <p className="mt-6 text-sm text-muted-foreground">
              Response within 24 hours
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
