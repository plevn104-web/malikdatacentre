import { motion } from "framer-motion";
import { MessageCircle, ShoppingCart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface AIToolCardProps {
  name: string;
  description: string;
  price: string;
  icon: React.ReactNode;
  delay?: number;
}

const AIToolCard = ({ name, description, price, icon, delay = 0 }: AIToolCardProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBuyWebsite = () => {
    if (!user) {
      navigate('/auth');
    } else {
      navigate('/dashboard?tab=wallet');
    }
  };

  const handleBuyWhatsApp = () => {
    const message = encodeURIComponent(`Hi, I want to order ${name} - ${price}`);
    window.open(`https://wa.me/923489057646?text=${message}`, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="glass-card-hover group relative overflow-hidden p-6"
    >
      {/* Glow effect on hover */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 blur transition-opacity duration-500 group-hover:opacity-100" />
      
      <div className="relative z-10">
        {/* Icon */}
        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
          {icon}
        </div>

        {/* Content */}
        <h3 className="mb-2 font-display text-xl font-semibold text-foreground">{name}</h3>
        <p className="mb-4 text-sm text-muted-foreground">{description}</p>

        {/* Price */}
        <div className="mb-4">
          <span className="text-2xl font-bold text-primary">{price}</span>
        </div>

        {/* Purchase Options Label */}
        <p className="text-xs text-muted-foreground mb-2 font-medium">Choose purchase method:</p>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-2">
          <Button
            variant="default"
            size="sm"
            onClick={handleBuyWebsite}
            className="w-full gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Buy on Website
          </Button>
          <Button
            variant="whatsapp"
            size="sm"
            onClick={handleBuyWhatsApp}
            className="w-full gap-2"
          >
            <MessageCircle className="h-4 w-4" />
            Buy via WhatsApp
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const tools = [
  {
    name: "CapCut Pro",
    description: "Professional video editing with advanced AI features",
    price: "PKR 499/mo",
    icon: <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>,
  },
  {
    name: "SORA AI Pro",
    description: "Next-gen AI video generation from text prompts",
    price: "PKR 1,499/mo",
    icon: <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>,
  },
  {
    name: "VEO 3 Pro",
    description: "Google's advanced AI video generation platform",
    price: "PKR 1,499/yr",
    icon: <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>,
  },
  {
    name: "ElevenLabs Pro",
    description: "Ultra-realistic AI voice generation & cloning",
    price: "PKR 1,500/mo",
    icon: <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z"/></svg>,
  },
  {
    name: "HeyGen AI",
    description: "AI avatar video creation (Shared/Semi/Private)",
    price: "From PKR 800",
    icon: <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>,
  },
  {
    name: "ChatGPT Pro",
    description: "Private email login, full access to GPT-4",
    price: "PKR 1,800/yr",
    icon: <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/></svg>,
  },
  {
    name: "Lovable AI Pro",
    description: "Build full-stack apps with AI assistance",
    price: "PKR 1,499/mo",
    icon: <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>,
  },
  {
    name: "Leonardo AI Pro",
    description: "Professional AI image generation & editing",
    price: "PKR 1,200/mo",
    icon: <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>,
  },
  {
    name: "Ideogram Pro",
    description: "AI art with perfect text rendering",
    price: "PKR 1,000/mo",
    icon: <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24"><path d="M5 4v3h5.5v12h3V7H19V4H5z"/></svg>,
  },
  {
    name: "GenSpark Pro",
    description: "AI-powered search and content creation",
    price: "PKR 900/mo",
    icon: <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>,
  },
  {
    name: "Hedra Pro",
    description: "AI-powered video avatars and characters",
    price: "PKR 1,400/mo",
    icon: <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24"><path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"/></svg>,
  },
  {
    name: "VidIQ Pro",
    description: "YouTube SEO & analytics powerhouse",
    price: "PKR 700/mo",
    icon: <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>,
  },
  {
    name: "Semrush Pro",
    description: "Complete SEO & marketing toolkit",
    price: "PKR 2,000/mo",
    icon: <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>,
  },
  {
    name: "Canva Pro",
    description: "Professional design made easy",
    price: "PKR 600/mo",
    icon: <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>,
  },
  {
    name: "Adobe Creative Cloud",
    description: "Full suite: Photoshop, Premiere, After Effects",
    price: "PKR 2,500/mo",
    icon: <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24"><path d="M9.5 3L3 21h3.5l1.5-4h7l1.5 4H20L13.5 3h-4zm.5 11l2-6 2 6h-4z"/></svg>,
  },
  {
    name: "Envato Elements",
    description: "Unlimited creative assets & templates",
    price: "PKR 1,500/mo",
    icon: <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM10 9h8v2h-8zm0 3h4v2h-4zm0-6h8v2h-8z"/></svg>,
  },
  {
    name: "Freepik Pro",
    description: "Premium vectors, photos & PSD files",
    price: "PKR 500/mo",
    icon: <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24"><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"/></svg>,
  },
];

export const AIToolsSection = () => {
  return (
    <section id="services" className="section-gradient relative py-24">
      <div className="container px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Premium AI Tools
          </span>
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-5xl">
            AI Tools & Pro Services
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Access the world's most powerful AI tools at unbeatable prices. 
            Boost your productivity and creativity with premium subscriptions.
          </p>
          
          {/* Purchase Options Info */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
              <ShoppingCart className="h-4 w-4 text-primary" />
              <span className="text-sm text-foreground">Buy on Website</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-[#25D366]/10 px-4 py-2">
              <MessageCircle className="h-4 w-4 text-[#25D366]" />
              <span className="text-sm text-foreground">Buy via WhatsApp</span>
            </div>
          </div>
        </motion.div>

        {/* Tools grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tools.map((tool, index) => (
            <AIToolCard
              key={tool.name}
              {...tool}
              delay={index * 0.05}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
