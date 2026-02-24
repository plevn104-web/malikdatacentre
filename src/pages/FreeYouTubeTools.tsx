import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Type, FileText, Key, Sparkles } from "lucide-react";

const tools = [
  {
    title: "YouTube Title Generator",
    description: "Generate click-worthy, SEO-optimized titles for your YouTube videos.",
    icon: <Type className="h-8 w-8" />,
    placeholder: "Enter your video topic...",
    buttonText: "Generate Titles",
  },
  {
    title: "Description Template Generator",
    description: "Create professional, SEO-friendly video descriptions in seconds.",
    icon: <FileText className="h-8 w-8" />,
    placeholder: "Enter your video title...",
    buttonText: "Generate Description",
  },
  {
    title: "Keyword Ideas Generator",
    description: "Discover high-ranking keywords for your YouTube videos and niche.",
    icon: <Key className="h-8 w-8" />,
    placeholder: "Enter your niche or topic...",
    buttonText: "Find Keywords",
  },
];

const FreeYouTubeTools = () => (
  <main className="min-h-screen bg-background">
    <Navbar />

    {/* Hero */}
    <section className="pt-32 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#FF0000]/5 via-transparent to-transparent pointer-events-none" />
      <div className="container px-4 relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="rounded-full bg-[#FF0000]/10 px-4 py-2 text-sm font-medium text-[#FF0000] inline-block mb-6">
            <Sparkles className="h-4 w-4 inline mr-1" /> Free Tools
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
            Free Tools to Boost Your <span className="text-[#FF0000]">YouTube Growth</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Powerful free tools designed to help you create better content, rank higher, and grow your audience.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Tools */}
    <section className="py-20">
      <div className="container px-4 max-w-4xl">
        <div className="space-y-8">
          {tools.map((tool, i) => (
            <motion.div key={tool.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
              <Card className="glass-card border-border/50 hover:border-[#FF0000]/20 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-14 w-14 rounded-xl bg-[#FF0000]/10 text-[#FF0000] flex items-center justify-center flex-shrink-0">{tool.icon}</div>
                    <div>
                      <h2 className="font-display text-2xl font-bold text-foreground">{tool.title}</h2>
                      <p className="text-muted-foreground text-sm">{tool.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <Input placeholder={tool.placeholder} className="flex-1 bg-muted/30 border-border/50" />
                    <Button className="bg-[#FF0000] hover:bg-[#FF0000]/90 text-white whitespace-nowrap">{tool.buttonText}</Button>
                  </div>
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

export default FreeYouTubeTools;
