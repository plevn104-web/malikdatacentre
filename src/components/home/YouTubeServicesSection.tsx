import { memo } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Clock, Users, DollarSign, Check, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "923489057646";

interface YouTubeServiceCardProps {
  title: string;
  description: string;
  price: string;
  features: string[];
  icon: React.ReactNode;
  featured?: boolean;
  delay?: number;
}

const YouTubeServiceCard = ({
  title,
  description,
  price,
  features,
  icon,
  featured = false,
  delay = 0,
}: YouTubeServiceCardProps) => {
  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hi, I want to order ${title} - ${price}`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      viewport={{ once: true }}
      className={`glass-card group relative overflow-hidden p-8 ${
        featured ? "border-[#FF0000]/30 lg:scale-105" : ""
      }`}
    >
      {featured && (
        <div className="absolute -right-12 top-6 rotate-45 bg-[#FF0000] px-12 py-1 text-xs font-semibold text-white">
          POPULAR
        </div>
      )}

      <div className="relative z-10">
        {/* Icon */}
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FF0000]/10 text-[#FF0000]">
          {icon}
        </div>

        {/* Title & Description */}
        <h3 className="mb-2 font-display text-2xl font-bold text-foreground">{title}</h3>
        <p className="mb-6 text-muted-foreground">{description}</p>

        {/* Price */}
        <div className="mb-6">
          <span className="text-3xl font-bold text-[#FF0000]">{price}</span>
        </div>

        {/* Features */}
        <ul className="mb-6 space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3 text-sm text-muted-foreground">
              <Check className="h-5 w-5 flex-shrink-0 text-[#FF0000]" />
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Button 
          size="lg" 
          onClick={handleWhatsApp} 
          className="w-full gap-2 bg-[#FF0000] hover:bg-[#FF0000]/90 text-white btn-jelly"
        >
          <MessageCircle className="h-5 w-5" />
          Order on WhatsApp
        </Button>
      </div>
    </motion.div>
  );
};

const youtubeServices = [
  {
    title: "YouTube Watch Time",
    description: "Get real, safe watch hours for your channel monetization",
    price: "PKR 1/Hour",
    features: [
      "1 Hour Watch Time = PKR 1",
      "4 Hours Watch Time = PKR 4",
      "100% Real & Safe Delivery",
      "Gradual & Natural Growth",
      "No Risk to Your Channel",
    ],
    icon: <Clock className="h-8 w-8" />,
  },
  {
    title: "YouTube Subscribers",
    description: "High-quality subscribers for channel growth",
    price: "From PKR 999",
    features: [
      "1,000 Subscribers Available",
      "High-Quality Subscribers",
      "Monetization-Friendly",
      "Safe & Gradual Delivery",
      "No Password Required",
    ],
    icon: <Users className="h-8 w-8" />,
  },
  {
    title: "Complete Monetization",
    description: "Full package to get your channel monetized & earning",
    price: "PKR 7,500",
    features: [
      "4,000 Watch Hours Included",
      "1,000 Subscribers Included",
      "Google AdSense Setup",
      "AdSense Approval Assistance",
      "Channel Ready to Earn",
    ],
    icon: <DollarSign className="h-8 w-8" />,
    featured: true,
  },
];

const YouTubeServicesSectionComponent = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FF0000]/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="container px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <svg className="h-8 w-8 text-[#FF0000]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
            </svg>
            <span className="rounded-full bg-[#FF0000]/10 px-4 py-2 text-sm font-medium text-[#FF0000]">
              YouTube Growth
            </span>
          </div>
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-5xl">
            YouTube Growth & <span className="text-[#FF0000]">Monetization</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Accelerate your YouTube journey with our trusted monetization services. 
            Get real watch time, subscribers, and full monetization packages.
          </p>
        </motion.div>

        {/* Progress tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="glass-card mb-16 p-8"
        >
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-4">
              <TrendingUp className="h-10 w-10 text-primary" />
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground">Monetization Progress</h3>
                <p className="text-sm text-muted-foreground">Track your journey to YouTube Partner Program</p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row md:gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">4,000</div>
                <div className="text-xs text-muted-foreground">Watch Hours Required</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#FF0000]">1,000</div>
                <div className="text-xs text-muted-foreground">Subscribers Required</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">✓</div>
                <div className="text-xs text-muted-foreground">We Handle It All</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Services grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {youtubeServices.map((service, index) => (
            <YouTubeServiceCard
              key={service.title}
              {...service}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export const YouTubeServicesSection = memo(YouTubeServicesSectionComponent);
