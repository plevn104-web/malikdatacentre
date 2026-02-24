import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Hash } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { toast } from "@/hooks/use-toast";

const HashGenerator = () => {
  const [input, setInput] = useState("");
  const [algo, setAlgo] = useState("SHA-256");
  const [output, setOutput] = useState("");

  const generate = async () => {
    const enc = new TextEncoder().encode(input);
    const hashBuffer = await crypto.subtle.digest(algo, enc);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    setOutput(hashArray.map(b => b.toString(16).padStart(2, "0")).join(""));
  };
  const copy = () => { navigator.clipboard.writeText(output); toast({ title: "Copied!" }); };
  const schema = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Hash Generator", applicationCategory: "SecurityApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };

  return (
    <AIToolLayout title="Hash Generator" metaTitle="Hash Generator — SHA-256, SHA-1, SHA-512" metaDescription="Generate SHA-256, SHA-1, and SHA-512 hashes instantly. Free online hash tool." canonical="/dev-tools/hash-generator">
      <SEOHead title="Hash Generator" description="Generate hashes online" canonical="/dev-tools/hash-generator" schema={schema} />
      <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2"><Hash className="h-7 w-7 text-primary" /> Hash Generator</h1>
      <p className="text-muted-foreground mb-6">Generate cryptographic hashes from text.</p>
      <div className="space-y-4 mb-8">
        <Textarea placeholder="Enter text to hash..." value={input} onChange={(e) => setInput(e.target.value)} rows={3} className="font-mono text-sm" />
        <Select value={algo} onValueChange={setAlgo}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{["SHA-1", "SHA-256", "SHA-384", "SHA-512"].map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent></Select>
        <Button onClick={generate} disabled={!input} className="w-full">Generate Hash</Button>
      </div>
      {output && <Card className="border-primary/30"><CardContent className="pt-6"><code className="font-mono text-sm text-foreground break-all">{output}</code><Button variant="ghost" size="sm" className="mt-2" onClick={copy}><Copy className="h-3 w-3 mr-1" /> Copy</Button></CardContent></Card>}
      <section className="mt-16 space-y-6"><h2 className="text-2xl font-bold text-foreground">Cryptographic Hashing</h2><p className="text-muted-foreground">Generate SHA-1, SHA-256, SHA-384, and SHA-512 hashes using the Web Crypto API. All processing happens locally.</p></section>
    </AIToolLayout>
  );
};
export default HashGenerator;
