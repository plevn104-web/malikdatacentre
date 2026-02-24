import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { useAIToolGenerator } from "@/hooks/useAIToolGenerator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Copy, Rocket, Badge } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

interface Hustle { name: string; description: string; earningPotential: string; startingSteps: string[]; riskLevel: string; investmentNeeded: string; }

const AISideHustleFinder = () => {
  const [skills, setSkills] = useState("");
  const [timePerWeek, setTimePerWeek] = useState("10");
  const [budget, setBudget] = useState("Low");
  const { result, isLoading, generate, copyToClipboard } = useAIToolGenerator<Hustle[]>("side-hustle-finder");

  const schema = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "AI Side Hustle Finder", applicationCategory: "BusinessApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };

  const riskColor = (r: string) => r === "Low" ? "text-green-600" : r === "High" ? "text-red-600" : "text-yellow-600";

  return (
    <AIToolLayout title="AI Side Hustle Finder" metaTitle="AI Side Hustle Finder — Discover Earning Ideas" metaDescription="Find the best side hustle ideas based on your skills, time, and budget using AI." canonical="/everyday-ai/side-hustle-finder">
      <SEOHead title="AI Side Hustle Finder" description="Discover AI-powered side hustle ideas" canonical="/everyday-ai/side-hustle-finder" schema={schema} />
      <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2"><Rocket className="h-7 w-7 text-primary" /> AI Side Hustle Finder</h1>
      <p className="text-muted-foreground mb-6">Discover personalized side hustle ideas based on your skills and time.</p>

      <div className="space-y-4 mb-8">
        <Input placeholder="Your skills (e.g. writing, design, coding)" value={skills} onChange={(e) => setSkills(e.target.value.slice(0, 500))} />
        <Input type="number" placeholder="Hours available per week" value={timePerWeek} onChange={(e) => setTimePerWeek(e.target.value)} min="1" max="60" />
        <Select value={budget} onValueChange={setBudget}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{["Low", "Medium", "High"].map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent></Select>
        <Button onClick={() => generate({ skills, timePerWeek, budget })} disabled={isLoading || !skills.trim()} className="w-full">
          {isLoading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Finding...</> : "Find Side Hustles"}
        </Button>
      </div>

      {Array.isArray(result) && result.map((h, i) => (
        <Card key={i} className="mb-3"><CardContent className="pt-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-foreground">{h.name}</h3>
            <span className={`text-xs font-medium ${riskColor(h.riskLevel)}`}>{h.riskLevel} Risk</span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{h.description}</p>
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-2">
            <p>💰 {h.earningPotential}</p>
            <p>💵 Investment: {h.investmentNeeded}</p>
          </div>
          <p className="text-xs font-medium text-foreground mb-1">Getting Started:</p>
          {h.startingSteps.map((s, j) => <p key={j} className="text-xs text-muted-foreground">{j + 1}. {s}</p>)}
          <Button variant="ghost" size="sm" className="mt-2" onClick={() => copyToClipboard(`${h.name}\n${h.description}\n\nEarning: ${h.earningPotential}\nSteps:\n${h.startingSteps.join("\n")}`)}><Copy className="h-3 w-3 mr-1" /> Copy</Button>
        </CardContent></Card>
      ))}

      <section className="mt-16 space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Find Your Perfect Side Hustle</h2>
        <p className="text-muted-foreground">Our AI matches your skills, available time, and budget to suggest realistic side hustle opportunities with clear earning potential and starting steps.</p>
        <h2 className="text-xl font-bold text-foreground">FAQ</h2>
        <details className="border border-border rounded-lg p-4"><summary className="font-medium cursor-pointer">Are these real opportunities?</summary><p className="mt-2 text-sm text-muted-foreground">Yes, the AI suggests real, actionable side hustles based on current market trends and your inputs.</p></details>
        <details className="border border-border rounded-lg p-4"><summary className="font-medium cursor-pointer">How many ideas will I get?</summary><p className="mt-2 text-sm text-muted-foreground">You'll get 5 personalized side hustle suggestions per generation.</p></details>
      </section>
    </AIToolLayout>
  );
};

export default AISideHustleFinder;
