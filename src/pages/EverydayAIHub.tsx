import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { BookOpen, Mail, MessageCircle, GraduationCap, Plane, Scale, Rocket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const tools = [
  { icon: BookOpen, title: "AI Homework Helper", desc: "Step-by-step solutions for any subject", href: "/everyday-ai/homework-helper" },
  { icon: Mail, title: "AI Letter Writer", desc: "Professional letters in seconds", href: "/everyday-ai/letter-writer" },
  { icon: MessageCircle, title: "AI WhatsApp Improver", desc: "Polish your messages in any tone", href: "/everyday-ai/whatsapp-improver" },
  { icon: GraduationCap, title: "AI Study Planner", desc: "Smart study schedules for exams", href: "/everyday-ai/study-planner" },
  { icon: Plane, title: "AI Travel Planner", desc: "Day-by-day trip itineraries", href: "/everyday-ai/travel-planner" },
  { icon: Scale, title: "AI Decision Helper", desc: "Compare options with pros & cons", href: "/everyday-ai/decision-helper" },
  { icon: Rocket, title: "AI Side Hustle Finder", desc: "Discover earning opportunities", href: "/everyday-ai/side-hustle-finder" },
];

const EverydayAIHub = () => (
  <main className="min-h-screen bg-background">
    <SEOHead title="Everyday AI Tools" description="Free AI tools for daily life — homework help, letter writing, travel planning, study schedules, and more." canonical="/everyday-ai" />
    <Navbar />
    <div className="pt-24 pb-16">
      <div className="container px-4 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground text-center mb-3">Everyday AI Tools</h1>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">Practical AI tools for your daily life — study, travel, decisions, and more.</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <Link key={t.href} to={t.href}>
              <Card className="h-full hover:border-primary/50 transition-colors group">
                <CardContent className="pt-6">
                  <t.icon className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                  <h2 className="font-semibold text-foreground mb-1">{t.title}</h2>
                  <p className="text-sm text-muted-foreground">{t.desc}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </main>
);

export default EverydayAIHub;
