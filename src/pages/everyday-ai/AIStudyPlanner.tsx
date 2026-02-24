import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { useAIToolGenerator } from "@/hooks/useAIToolGenerator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Copy, GraduationCap } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

interface Week { weekNumber: number; days: { day: string; subjects: { subject: string; hours: number; focus: string }[] }[]; }
interface Result { weeks: Week[]; revisionDays: string[]; tips: string[]; }

const AIStudyPlanner = () => {
  const [examDate, setExamDate] = useState("");
  const [subjects, setSubjects] = useState("");
  const [dailyHours, setDailyHours] = useState("4");
  const { result, isLoading, generate, copyToClipboard } = useAIToolGenerator<Result>("study-planner");

  const schema = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "AI Study Planner", applicationCategory: "EducationalApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };

  return (
    <AIToolLayout title="AI Study Planner" metaTitle="AI Study Planner — Smart Study Timetable" metaDescription="Generate a structured study timetable with AI. Plan subjects, revision days, and stay motivated." canonical="/everyday-ai/study-planner">
      <SEOHead title="AI Study Planner" description="Generate smart study timetables with AI" canonical="/everyday-ai/study-planner" schema={schema} />
      <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2"><GraduationCap className="h-7 w-7 text-primary" /> AI Study Planner</h1>
      <p className="text-muted-foreground mb-6">Get a personalized study schedule based on your exam dates and available time.</p>

      <div className="space-y-4 mb-8">
        <Input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} />
        <Input placeholder="Subjects (e.g. Math, Physics, Chemistry)" value={subjects} onChange={(e) => setSubjects(e.target.value.slice(0, 500))} />
        <Input type="number" placeholder="Daily available hours" value={dailyHours} onChange={(e) => setDailyHours(e.target.value)} min="1" max="16" />
        <Button onClick={() => generate({ examDate, subjects, dailyHours })} disabled={isLoading || !subjects.trim() || !examDate} className="w-full">
          {isLoading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Planning...</> : "Generate Study Plan"}
        </Button>
      </div>

      {result && (
        <div className="space-y-4">
          {result.weeks?.map((week) => (
            <Card key={week.weekNumber}><CardContent className="pt-4">
              <h3 className="font-semibold text-foreground mb-3">Week {week.weekNumber}</h3>
              <div className="space-y-2">
                {week.days.map((day, i) => (
                  <div key={i} className="bg-muted/30 p-3 rounded-lg">
                    <p className="text-sm font-medium text-foreground mb-1">{day.day}</p>
                    {day.subjects.map((s, j) => (
                      <p key={j} className="text-xs text-muted-foreground">• {s.subject} — {s.hours}h — {s.focus}</p>
                    ))}
                  </div>
                ))}
              </div>
            </CardContent></Card>
          ))}
          {result.revisionDays?.length > 0 && (
            <Card><CardContent className="pt-4">
              <h3 className="font-semibold text-foreground mb-2">Revision Days</h3>
              <p className="text-sm text-muted-foreground">{result.revisionDays.join(", ")}</p>
            </CardContent></Card>
          )}
          {result.tips?.length > 0 && (
            <Card><CardContent className="pt-4">
              <h3 className="font-semibold text-foreground mb-2">Motivation Tips</h3>
              {result.tips.map((t, i) => <p key={i} className="text-sm text-muted-foreground">💡 {t}</p>)}
            </CardContent></Card>
          )}
          <Button variant="outline" onClick={() => copyToClipboard(JSON.stringify(result, null, 2))}><Copy className="h-3 w-3 mr-1" /> Copy Full Plan</Button>
        </div>
      )}

      <section className="mt-16 space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Smart AI Study Planning</h2>
        <p className="text-muted-foreground">Our AI creates personalized study timetables with subject distribution, revision days, and motivation tips. Perfect for exam preparation.</p>
        <h2 className="text-xl font-bold text-foreground">FAQ</h2>
        <details className="border border-border rounded-lg p-4"><summary className="font-medium cursor-pointer">How does the planner work?</summary><p className="mt-2 text-sm text-muted-foreground">Enter your exam date, subjects, and daily hours. The AI distributes subjects intelligently across weeks with built-in revision time.</p></details>
        <details className="border border-border rounded-lg p-4"><summary className="font-medium cursor-pointer">Can I adjust the plan?</summary><p className="mt-2 text-sm text-muted-foreground">Yes, you can regenerate with different hours or add/remove subjects anytime.</p></details>
      </section>
    </AIToolLayout>
  );
};

export default AIStudyPlanner;
