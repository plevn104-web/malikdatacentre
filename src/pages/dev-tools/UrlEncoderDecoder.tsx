import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Link } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { toast } from "@/hooks/use-toast";

const UrlEncoderDecoder = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const encode = () => setOutput(encodeURIComponent(input));
  const decode = () => { try { setOutput(decodeURIComponent(input)); } catch { setOutput("Invalid encoded URL"); } };
  const copy = () => { navigator.clipboard.writeText(output); toast({ title: "Copied!" }); };
  const schema = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "URL Encoder/Decoder", applicationCategory: "DeveloperApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };

  return (
    <AIToolLayout title="URL Encoder/Decoder" metaTitle="URL Encoder/Decoder" metaDescription="Encode and decode URLs instantly. Free online URL encoding tool." canonical="/dev-tools/url-encoder">
      <SEOHead title="URL Encoder/Decoder" description="Encode and decode URLs online" canonical="/dev-tools/url-encoder" schema={schema} />
      <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2"><Link className="h-7 w-7 text-primary" /> URL Encoder/Decoder</h1>
      <p className="text-muted-foreground mb-6">Encode or decode URL components.</p>
      <div className="space-y-4 mb-8">
        <Textarea placeholder="Enter URL or text..." value={input} onChange={(e) => setInput(e.target.value)} rows={3} className="font-mono text-sm" />
        <div className="flex gap-2"><Button onClick={encode} disabled={!input} className="flex-1">Encode</Button><Button onClick={decode} disabled={!input} variant="outline" className="flex-1">Decode</Button></div>
      </div>
      {output && <Card><CardContent className="pt-6"><pre className="text-sm font-mono bg-muted/30 p-4 rounded-lg break-all whitespace-pre-wrap">{output}</pre><Button variant="ghost" size="sm" className="mt-2" onClick={copy}><Copy className="h-3 w-3 mr-1" /> Copy</Button></CardContent></Card>}
      <section className="mt-16 space-y-6"><h2 className="text-2xl font-bold text-foreground">URL Encoding</h2><p className="text-muted-foreground">Encode and decode URL components for safe use in web addresses. Runs entirely in your browser.</p></section>
    </AIToolLayout>
  );
};
export default UrlEncoderDecoder;
