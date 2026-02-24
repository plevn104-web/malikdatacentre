import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Fingerprint } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { toast } from "@/hooks/use-toast";

const genUUID = () => crypto.randomUUID();

const UuidGenerator = () => {
  const [uuids, setUuids] = useState<string[]>([genUUID()]);
  const [count, setCount] = useState(1);

  const generate = () => {
    const n = Math.min(Math.max(count, 1), 50);
    setUuids(Array.from({ length: n }, () => genUUID()));
  };
  const copy = (t: string) => { navigator.clipboard.writeText(t); toast({ title: "Copied!" }); };
  const copyAll = () => { navigator.clipboard.writeText(uuids.join("\n")); toast({ title: "All copied!" }); };
  const schema = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "UUID Generator", applicationCategory: "DeveloperApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };

  return (
    <AIToolLayout title="UUID Generator" metaTitle="UUID Generator — Generate v4 UUIDs" metaDescription="Generate random UUIDs (v4) instantly. Free online UUID generator tool." canonical="/dev-tools/uuid-generator">
      <SEOHead title="UUID Generator" description="Generate random UUIDs" canonical="/dev-tools/uuid-generator" schema={schema} />
      <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2"><Fingerprint className="h-7 w-7 text-primary" /> UUID Generator</h1>
      <p className="text-muted-foreground mb-6">Generate random v4 UUIDs.</p>
      <div className="space-y-4 mb-8">
        <div className="flex gap-2 items-center">
          <span className="text-sm text-foreground">Count:</span>
          <input type="number" min="1" max="50" value={count} onChange={(e) => setCount(+e.target.value)} className="w-20 rounded-md border border-border bg-background px-3 py-2 text-sm" />
          <Button onClick={generate} className="flex-1">Generate</Button>
        </div>
      </div>
      <div className="space-y-2">
        {uuids.map((u, i) => (
          <Card key={i}><CardContent className="py-3 flex justify-between items-center"><code className="font-mono text-sm text-foreground">{u}</code><Button variant="ghost" size="sm" onClick={() => copy(u)}><Copy className="h-3 w-3" /></Button></CardContent></Card>
        ))}
        {uuids.length > 1 && <Button variant="outline" className="w-full mt-2" onClick={copyAll}>Copy All</Button>}
      </div>
      <section className="mt-16 space-y-6"><h2 className="text-2xl font-bold text-foreground">Random UUID Generation</h2><p className="text-muted-foreground">Generate cryptographically random v4 UUIDs using the Web Crypto API. Generate up to 50 at once.</p></section>
    </AIToolLayout>
  );
};
export default UuidGenerator;
