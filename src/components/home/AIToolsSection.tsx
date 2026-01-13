import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Zap, Lock, Clock } from "lucide-react";

const SECTION_ID = "ai-tools-section";

const tools = [
  { name: "CapCut Pro", price: "499/-", badge: "Popular", type: "instant" },
  { name: "Sora AI Pro", price: "1499/-", badge: "Best Seller", type: "instant" },
  { name: "Gemini Veo 3 Ultra", price: "1499/-", badge: null, type: "instant" },
  { name: "ChatGPT Go (Yearly)", price: "1499/- / Year", badge: "Popular", type: "instant" },
  { name: "ChatGPT Business", price: "1499/- / Month", badge: null, type: "instant" },
  { name: "HeyGen AI", price: "4800/-", badge: null, type: "private" },
  { name: "Hailuo AI", price: "4500/-", badge: null, type: "private" },
  { name: "One Time OTP Number", price: "200/-", badge: null, type: "instant" },
  { name: "Grok AI", price: "2999/-", badge: null, type: "private" },
  { name: "MiniMax AI", price: "4500/-", badge: null, type: "private" },
  { name: "Runway ML (Unlimited)", price: "4000/-", badge: "Best Seller", type: "instant" },
  { name: "GenSpark AI", price: "4999/-", badge: null, type: "instant" },
  { name: "Kling AI", price: "2300/-", badge: null, type: "private" },
  { name: "ElevenLabs", price: "2400/-", badge: "Popular", type: "private" },
  { name: "Surfshark Premium VPN", price: "499/- / Monthly", badge: null, type: "instant" },
  { name: "YouTube Premium", price: "200/-", badge: "Popular", type: "instant" },
  { name: "4K Hours Watch Time", price: "4000/-", badge: null, type: "demand" },
  { name: "1K YouTube Subscribers", price: "999/-", badge: null, type: "demand" },
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

export const AIToolsSection = () => {
  return (
    <section id={SECTION_ID} className="py-16 md:py-24 bg-gradient-to-b from-background via-muted/20 to-background scroll-mt-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 text-primary border-primary/50">
            <Zap className="w-3 h-3 mr-1" />
            Available Instantly
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            AI Tools & Digital Services
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
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
                    <Badge 
                      className={`absolute -top-2 -right-2 z-10 ${
                        tool.badge === "Best Seller" 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-emerald-500 text-white"
                      }`}
                    >
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
                        <p className="text-xl font-bold text-primary">
                          Rs {tool.price}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            className="gap-2 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            asChild
          >
            <a
              href="https://wa.me/923489057646?text=Hi%2C%20I'm%20interested%20in%20your%20AI%20Tools%20%26%20Digital%20Services"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-5 h-5" />
              Get Access Now
            </a>
          </Button>
          <p className="text-muted-foreground text-sm mt-4">
            Contact us on WhatsApp for instant delivery
          </p>
        </motion.div>
      </div>
    </section>
  );
};
