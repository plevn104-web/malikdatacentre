import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, ShieldCheck } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { toast } from "@/hooks/use-toast";

const JwtDecoder = () => {
  const [token, setToken] = useState("");
  const [decoded, setDecoded] = useState<{ header: string; payload: string; valid: boolean } | null>(null);
  const [error, setError] = useState("");

  const decode = () => {
    try {
      const parts = token.trim().split(".");
      if (parts.length !== 3) throw new Error("Invalid JWT: must have 3 parts");
      const header = JSON.parse(atob(parts[0].replace(/-/g, "+").replace(/_/g, "/")));
      const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
      setDecoded({ header: JSON.stringify(header, null, 2), payload: JSON.stringify(payload, null, 2), valid: true });
      setError("");
    } catch (e: any) { setError(e.message); setDecoded(null); }
  };
  const copy = (t: string) => { navigator.clipboard.writeText(t); toast({ title: "Copied!" }); };
  const schema = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "JWT Decoder", applicationCategory: "SecurityApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };

  return (
    <AIToolLayout title="JWT Decoder" metaTitle="JWT Decoder — Decode JSON Web Tokens" metaDescription="Decode and inspect JWT tokens instantly. View header and payload without any server-side processing." canonical="/dev-tools/jwt-decoder">
      <SEOHead title="JWT Decoder" description="Decode JWT tokens online" canonical="/dev-tools/jwt-decoder" schema={schema} />
      <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2"><ShieldCheck className="h-7 w-7 text-primary" /> JWT Decoder</h1>
      <p className="text-muted-foreground mb-6">Paste a JWT to decode its header and payload.</p>
      <div className="space-y-4 mb-8">
        <Textarea placeholder="Paste JWT token here..." value={token} onChange={(e) => setToken(e.target.value)} rows={3} className="font-mono text-sm" />
        <Button onClick={decode} disabled={!token.trim()} className="w-full">Decode Token</Button>
      </div>
      {error && <Card className="border-destructive/50 bg-destructive/5 mb-4"><CardContent className="pt-4"><p className="text-sm text-destructive">❌ {error}</p></CardContent></Card>}
      {decoded && (
        <div className="space-y-4">
          <Card><CardContent className="pt-6"><h3 className="font-semibold text-foreground mb-2">Header</h3><pre className="text-sm font-mono bg-muted/30 p-4 rounded-lg">{decoded.header}</pre><Button variant="ghost" size="sm" className="mt-2" onClick={() => copy(decoded.header)}><Copy className="h-3 w-3 mr-1" /> Copy</Button></CardContent></Card>
          <Card><CardContent className="pt-6"><h3 className="font-semibold text-foreground mb-2">Payload</h3><pre className="text-sm font-mono bg-muted/30 p-4 rounded-lg">{decoded.payload}</pre><Button variant="ghost" size="sm" className="mt-2" onClick={() => copy(decoded.payload)}><Copy className="h-3 w-3 mr-1" /> Copy</Button></CardContent></Card>
        </div>
      )}
      <section className="mt-16 space-y-6"><h2 className="text-2xl font-bold text-foreground">JWT Token Inspection</h2><p className="text-muted-foreground">Decode JSON Web Tokens to inspect header and payload claims. Everything runs client-side — your tokens never leave the browser.</p></section>
    </AIToolLayout>
  );
};
export default JwtDecoder;
