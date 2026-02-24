import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { useAIToolGenerator } from "@/hooks/useAIToolGenerator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Copy, MessageCircle } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

interface Result { variations: { improved: string; toneApplied: string; changesMade: string }[]; }
const TONES = ["Polite", "Romantic", "Professional", "Friendly"];

const AIWhatsAppImprover = () => {
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState("Polite");
  const { result, isLoading, generate, copyToClipboard } = useAIToolGenerator<Result>("whatsapp-improver");

  const schema = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "AI WhatsApp Message Improver", applicationCategory: "CommunicationApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };

  return (
    <AIToolLayout title="AI WhatsApp Improver" metaTitle="AI WhatsApp Message Improver" metaDescription="Improve your WhatsApp messages with AI. Get 3 polished variations in any tone." canonical="/everyday-ai/whatsapp-improver">
      <SEOHead title="AI WhatsApp Message Improver" description="Improve WhatsApp messages with AI" canonical="/everyday-ai/whatsapp-improver" schema={schema} />
      <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2"><MessageCircle className="h-7 w-7 text-primary" /> AI WhatsApp Message Improver</h1>
      <p className="text-muted-foreground mb-6">Paste your raw message and get 3 improved versions.</p>

      <div className="space-y-4 mb-8">
        <Textarea placeholder="Type or paste your message..." value={message} onChange={(e) => setMessage(e.target.value.slice(0, 1000))} rows={3} />
        <Select value={tone} onValueChange={setTone}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{TONES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select>
        <Button onClick={() => generate({ message, tone })} disabled={isLoading || !message.trim()} className="w-full">
          {isLoading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Improving...</> : "Improve Message"}
        </Button>
      </div>

      {result?.variations && (
        <div className="space-y-3">
          {result.variations.map((v, i) => (
            <Card key={i}><CardContent className="pt-4">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">{v.toneApplied}</span>
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(v.improved)}><Copy className="h-3 w-3 mr-1" /> Copy</Button>
              </div>
              <p className="text-sm text-foreground mb-2">{v.improved}</p>
              <p className="text-xs text-muted-foreground">{v.changesMade}</p>
            </CardContent></Card>
          ))}
        </div>
      )}

      <section className="mt-16 space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Improve Any WhatsApp Message</h2>
        <p className="text-muted-foreground">Our AI enhances clarity, adjusts tone, and provides 3 variations so you always send the perfect message.</p>
        <h2 className="text-xl font-bold text-foreground">FAQ</h2>
        <details className="border border-border rounded-lg p-4"><summary className="font-medium cursor-pointer">What tones are available?</summary><p className="mt-2 text-sm text-muted-foreground">Polite, Romantic, Professional, and Friendly.</p></details>
        <details className="border border-border rounded-lg p-4"><summary className="font-medium cursor-pointer">Is my message stored?</summary><p className="mt-2 text-sm text-muted-foreground">No, messages are processed in real-time and not stored on our servers.</p></details>
      </section>
    </AIToolLayout>
  );
};

export default AIWhatsAppImprover;
