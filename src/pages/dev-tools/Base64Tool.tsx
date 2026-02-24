import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Binary } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { toast } from "@/hooks/use-toast";

const Base64Tool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const encode = () => { try { setOutput(btoa(unescape(encodeURIComponent(input)))); } catch { setOutput("Error encoding"); } };
  const decode = () => { try { setOutput(decodeURIComponent(escape(atob(input)))); } catch { setOutput("Invalid Base64 input"); } };
  const copy = () => { navigator.clipboard.writeText(output); toast({ title: "Copied!" }); };

  const schema = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Base64 Encoder/Decoder", applicationCategory: "DeveloperApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };

  return (
    <AIToolLayout title="Base64 Tool" metaTitle="Base64 Encoder/Decoder" metaDescription="Encode and decode Base64 strings instantly. Free online Base64 tool." canonical="/dev-tools/base64">
      <SEOHead title="Base64 Encoder/Decoder" description="Encode and decode Base64" canonical="/dev-tools/base64" schema={schema} />
      <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2"><Binary className="h-7 w-7 text-primary" /> Base64 Encoder/Decoder</h1>
      <p className="text-muted-foreground mb-6">Encode or decode Base64 strings instantly.</p>
      <div className="space-y-4 mb-8">
        <Textarea placeholder="Enter text or Base64 string..." value={input} onChange={(e) => setInput(e.target.value)} rows={4} className="font-mono text-sm" />
        <div className="flex gap-2"><Button onClick={encode} disabled={!input} className="flex-1">Encode</Button><Button onClick={decode} disabled={!input} variant="outline" className="flex-1">Decode</Button></div>
      </div>
      {output && <Card><CardContent className="pt-6"><pre className="text-sm font-mono bg-muted/30 p-4 rounded-lg whitespace-pre-wrap break-all">{output}</pre><Button variant="ghost" size="sm" className="mt-2" onClick={copy}><Copy className="h-3 w-3 mr-1" /> Copy</Button></CardContent></Card>}
      <section className="mt-16 space-y-6"><h2 className="text-2xl font-bold text-foreground">Base64 Encoding</h2><p className="text-muted-foreground">Encode and decode Base64 entirely in your browser. No data sent to any server.</p></section>
    </AIToolLayout>
  );
};
export default Base64Tool;
