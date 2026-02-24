import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { motion } from "framer-motion";
import { MessageCircle, Linkedin, Mail, Send, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const WHATSAPP_URL = "https://wa.me/923489057646?text=Hi! I want a free homepage demo for my business.";
const LINKEDIN_URL = "https://www.linkedin.com/in/malik-amir-usman-71ab54397";

export default function Contact() {
  return (
    <main className="min-h-screen bg-background">
      <SEOHead title="Contact Us" description="Get in touch with Malik Data Centre. We respond within 24-48 hours. Reach us via WhatsApp, email, or contact form." canonical="/contact" />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="container px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Get In <span className="gradient-text">Touch With Us</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have a question, need support, or want to discuss a project? We'd love to hear from you. Reach out and let's make something great together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-16">
        <div className="container px-4">
          <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <Card className="glass-card border-border/50">
                <CardContent className="p-8">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">Send Us a Message</h2>
                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" placeholder="Enter your full name" className="mt-1 bg-muted/30 border-border/50" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="Enter your email" className="mt-1 bg-muted/30 border-border/50" />
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="What is this about?" className="mt-1 bg-muted/30 border-border/50" />
                    </div>
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <textarea
                        id="message"
                        rows={5}
                        placeholder="Write your message here..."
                        className="mt-1 w-full rounded-md border border-border/50 bg-muted/30 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    </div>
                    <Button className="w-full" size="lg">
                      <Send className="h-4 w-4 mr-2" /> Submit Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="space-y-6">
              <Card className="glass-card border-border/50">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <p className="text-muted-foreground text-sm">support@malikdatacentre.store</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-border/50">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">WhatsApp</h3>
                    <p className="text-muted-foreground text-sm">+92 348 9057646</p>
                    <Button size="sm" className="mt-2 bg-[#25D366] hover:bg-[#25D366]/90 text-white" asChild>
                      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Chat Now</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-border/50">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-[#0A66C2]/10 text-[#0A66C2] flex items-center justify-center flex-shrink-0">
                    <Linkedin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">LinkedIn</h3>
                    <p className="text-muted-foreground text-sm">Malik Amir Usman</p>
                    <Button size="sm" variant="outline" className="mt-2" asChild>
                      <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">Connect</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-primary/20">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Response Time</h3>
                    <p className="text-muted-foreground text-sm">We typically respond within 24–48 hours.</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
