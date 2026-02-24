import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { useAIToolGenerator } from "@/hooks/useAIToolGenerator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Copy, Mail } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

interface Result { subject: string; body: string; closing: string; signatureFormat: string; }

const TYPES = ["Job Application", "Leave Application", "Complaint", "Bank Request", "Visa Application", "Resignation", "Recommendation Request"];
const TONES = ["Formal", "Polite", "Professional"];

const AILetterWriter = () => {
  const [letterType, setLetterType] = useState("Job Application");
  const [details, setDetails] = useState("");
  const [tone, setTone] = useState("Formal");
  const { result, isLoading, generate, copyToClipboard } = useAIToolGenerator<Result>("letter-writer");

  const schema = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "AI Letter Writer", applicationCategory: "BusinessApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };

  const fullLetter = result ? `Subject: ${result.subject}\n\n${result.body}\n\n${result.closing}\n\n${result.signatureFormat}` : "";

  return (
    <AIToolLayout title="AI Letter Writer" metaTitle="AI Letter Writer — Professional Letters Instantly" metaDescription="Generate professional letters for jobs, leave, complaints, bank requests, and more using AI." canonical="/everyday-ai/letter-writer">
      <SEOHead title="AI Letter Writer" description="Generate professional letters instantly" canonical="/everyday-ai/letter-writer" schema={schema} />
      <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2"><Mail className="h-7 w-7 text-primary" /> AI Letter Writer</h1>
      <p className="text-muted-foreground mb-6">Generate professional letters in seconds.</p>

      <div className="space-y-4 mb-8">
        <Select value={letterType} onValueChange={setLetterType}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select>
        <Select value={tone} onValueChange={setTone}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{TONES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select>
        <Textarea placeholder="Key details (e.g. company name, reason, dates...)" value={details} onChange={(e) => setDetails(e.target.value.slice(0, 2000))} rows={4} />
        <Button onClick={() => generate({ letterType, details, tone })} disabled={isLoading || !details.trim()} className="w-full">
          {isLoading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Generating...</> : "Generate Letter"}
        </Button>
      </div>

      {result && (
        <Card><CardContent className="pt-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-semibold text-foreground">Your Letter</h3>
            <Button variant="ghost" size="sm" onClick={() => copyToClipboard(fullLetter)}><Copy className="h-3 w-3 mr-1" /> Copy</Button>
          </div>
          <div className="whitespace-pre-wrap text-sm text-muted-foreground bg-muted/30 p-4 rounded-lg">{fullLetter}</div>
        </CardContent></Card>
      )}

      <section className="mt-16 space-y-6">
        <h2 className="text-2xl font-bold text-foreground">AI-Powered Letter Writing</h2>
        <p className="text-muted-foreground">Create professional letters for any occasion — job applications, leave requests, complaints, bank letters, and visa applications. Our AI ensures proper formatting and professional tone.</p>
        <h2 className="text-xl font-bold text-foreground">FAQ</h2>
        <details className="border border-border rounded-lg p-4"><summary className="font-medium cursor-pointer">What types of letters can I generate?</summary><p className="mt-2 text-sm text-muted-foreground">Job applications, leave requests, complaints, bank requests, visa applications, resignations, and more.</p></details>
        <details className="border border-border rounded-lg p-4"><summary className="font-medium cursor-pointer">Can I customize the tone?</summary><p className="mt-2 text-sm text-muted-foreground">Yes — choose Formal, Polite, or Professional tone.</p></details>
      </section>
    </AIToolLayout>
  );
};

export default AILetterWriter;
