import { memo } from "react";
import { motion } from "framer-motion";
import { Globe, Smartphone, Code, ShoppingCart, LayoutDashboard, Brain, MessageCircle, Sparkles } from "lucide-react";
import { CGIBackground } from "./CGIBackground";
import { useIsMobile } from "@/hooks/useReducedMotion";

const websiteServices = [
  {
    icon: Globe,
    title: "Business Websites",
    description: "Professional websites for businesses with modern design and SEO optimization",
  },
  {
    icon: Brain,
    title: "AI-Based Websites",
    description: "Smart websites powered by artificial intelligence and automation",
  },
  {
    icon: Code,
    title: "SaaS Platforms",
    description: "Scalable Software-as-a-Service applications with subscription models",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Websites",
    description: "Full-featured online stores with payment integration and inventory",
  },
  {
    icon: LayoutDashboard,
    title: "Custom Dashboards",
    description: "Data visualization and analytics dashboards for your business",
  },
];

const appServices = [
  {
    icon: Smartphone,
    title: "Android Applications",
    description: "Native and cross-platform Android apps with modern UI/UX",
  },
  {
    icon: Smartphone,
    title: "iOS Applications",
    description: "iPhone and iPad apps following Apple's design guidelines",
  },
  {
    icon: Globe,
    title: "Web Applications",
    description: "Progressive web apps that work across all devices and browsers",
  },
  {
    icon: Brain,
    title: "AI-Powered Apps",
    description: "Applications with integrated AI features and machine learning",
  },
];

const DevelopmentServicesSectionComponent = () => {
  const isMobile = useIsMobile();
  const whatsappNumber = "923489057646";
  const whatsappMessage = encodeURIComponent("Hello! I'm interested in your Website/Application Development services. Please share more details about requirements, pricing, and timelines.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  // Simplified animation variants for mobile
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: isMobile ? 10 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.3 : 0.5,
      },
    },
  };

  return (
    <section className="relative py-20 overflow-hidden cgi-section lazy-section">
      {/* Only render CGIBackground on desktop */}
      {!isMobile && <CGIBackground variant="section" />}
      
      {/* Simple gradient for mobile */}
      {isMobile && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#0a0f1e] to-[#030712]" />
      )}
      
      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: isMobile ? 0.3 : 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 border border-neon-blue/30 mb-6">
            <Code className="h-4 w-4 text-neon-blue" />
            <span className="text-sm font-medium text-neon-blue">Development Services</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-blue via-neon-purple to-neon-cyan bg-clip-text text-transparent">
              Custom Website & Application
            </span>
            <br />
            <span className="text-foreground">Development</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform your ideas into reality with our professional development services. 
            From stunning websites to powerful mobile applications.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Website Development */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground">Website Development</h3>
            </div>
            
            <div className="space-y-4">
              {websiteServices.map((service) => (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  className="flex items-start gap-4 p-4 rounded-xl bg-background/30 border border-white/5 hover:border-neon-blue/30 transition-colors duration-200 group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-neon-blue/10 group-hover:bg-neon-blue/20 transition-colors">
                    <service.icon className="h-5 w-5 text-neon-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground group-hover:text-neon-blue transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Application Development */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-neon-purple to-neon-cyan">
                <Smartphone className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground">Application Development</h3>
            </div>
            
            <div className="space-y-4">
              {appServices.map((service) => (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  className="flex items-start gap-4 p-4 rounded-xl bg-background/30 border border-white/5 hover:border-neon-purple/30 transition-colors duration-200 group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-neon-purple/10 group-hover:bg-neon-purple/20 transition-colors">
                    <service.icon className="h-5 w-5 text-neon-purple" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground group-hover:text-neon-purple transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: isMobile ? 0.3 : 0.5 }}
          className="relative overflow-hidden rounded-2xl"
        >
          {/* Glowing border effect - only on desktop */}
          {!isMobile && (
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-cyan opacity-20 blur-xl" />
          )}
          
          <div className="relative glass-panel p-8 md:p-12 text-center">
            <Sparkles className="h-12 w-12 text-neon-purple mx-auto mb-4" />
            
            <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
              Ready to Build Your Dream Project?
            </h3>
            
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              For Website or Application Development, please contact us on WhatsApp for detailed requirements, 
              custom pricing, and project timelines.
            </p>
            
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-100"
            >
              <MessageCircle className="h-6 w-6" />
              Contact on WhatsApp
            </a>
            
            <p className="text-sm text-muted-foreground mt-4">
              📞 +92 348 9057646 • Available 24/7
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const DevelopmentServicesSection = memo(DevelopmentServicesSectionComponent);
