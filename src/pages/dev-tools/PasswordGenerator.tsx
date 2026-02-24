import { useState, useCallback } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Copy, KeyRound } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { toast } from "@/hooks/use-toast";

const PasswordGenerator = () => {
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");

  const generate = useCallback(() => {
    let chars = "";
    if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!chars) { toast({ title: "Select at least one option", variant: "destructive" }); return; }
    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    setPassword(Array.from(arr, (v) => chars[v % chars.length]).join(""));
  }, [length, uppercase, lowercase, numbers, symbols]);

  const copy = () => { navigator.clipboard.writeText(password); toast({ title: "Copied!" }); };
  const schema = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Secure Password Generator", applicationCategory: "SecurityApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };

  return (
    <AIToolLayout title="Password Generator" metaTitle="Secure Password Generator" metaDescription="Generate strong, secure passwords with customizable length and character options." canonical="/dev-tools/password-generator">
      <SEOHead title="Secure Password Generator" description="Generate secure passwords" canonical="/dev-tools/password-generator" schema={schema} />
      <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2"><KeyRound className="h-7 w-7 text-primary" /> Secure Password Generator</h1>
      <p className="text-muted-foreground mb-6">Generate cryptographically secure passwords.</p>
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-4"><span className="text-sm text-foreground w-20">Length: {length}</span><Input type="range" min="8" max="128" value={length} onChange={(e) => setLength(+e.target.value)} className="flex-1" /></div>
        {[["Uppercase", uppercase, setUppercase], ["Lowercase", lowercase, setLowercase], ["Numbers", numbers, setNumbers], ["Symbols", symbols, setSymbols]].map(([label, val, set]) => (
          <div key={label as string} className="flex items-center justify-between"><span className="text-sm text-foreground">{label as string}</span><Switch checked={val as boolean} onCheckedChange={set as (v: boolean) => void} /></div>
        ))}
        <Button onClick={generate} className="w-full">Generate Password</Button>
      </div>
      {password && <Card className="border-primary/30"><CardContent className="pt-6 flex items-center justify-between"><code className="font-mono text-sm text-foreground break-all">{password}</code><Button variant="ghost" size="sm" onClick={copy}><Copy className="h-4 w-4" /></Button></CardContent></Card>}
      <section className="mt-16 space-y-6"><h2 className="text-2xl font-bold text-foreground">Secure Passwords</h2><p className="text-muted-foreground">Uses Web Crypto API for cryptographically secure random generation. Nothing leaves your browser.</p></section>
    </AIToolLayout>
  );
};
export default PasswordGenerator;
