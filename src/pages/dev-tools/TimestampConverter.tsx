import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Clock } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { toast } from "@/hooks/use-toast";

const TimestampConverter = () => {
  const [timestamp, setTimestamp] = useState(String(Math.floor(Date.now() / 1000)));
  const [dateStr, setDateStr] = useState("");
  const copy = (t: string) => { navigator.clipboard.writeText(t); toast({ title: "Copied!" }); };

  const tsNum = Number(timestamp);
  const isMs = timestamp.length > 10;
  const date = !isNaN(tsNum) ? new Date(isMs ? tsNum : tsNum * 1000) : null;
  const dateToTs = dateStr ? Math.floor(new Date(dateStr).getTime() / 1000) : null;

  const now = () => setTimestamp(String(Math.floor(Date.now() / 1000)));
  const schema = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Timestamp Converter", applicationCategory: "DeveloperApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };

  return (
    <AIToolLayout title="Timestamp Converter" metaTitle="Timestamp Converter — Unix to Date" metaDescription="Convert Unix timestamps to human-readable dates and vice versa." canonical="/dev-tools/timestamp-converter">
      <SEOHead title="Timestamp Converter" description="Convert Unix timestamps to dates" canonical="/dev-tools/timestamp-converter" schema={schema} />
      <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2"><Clock className="h-7 w-7 text-primary" /> Timestamp Converter</h1>
      <p className="text-muted-foreground mb-6">Convert between Unix timestamps and dates.</p>
      <div className="space-y-4 mb-8">
        <div className="flex gap-2"><Input placeholder="Unix timestamp" value={timestamp} onChange={(e) => setTimestamp(e.target.value)} className="font-mono" /><Button variant="outline" onClick={now}>Now</Button></div>
        {date && !isNaN(date.getTime()) && (
          <Card><CardContent className="pt-4 space-y-2">
            {[["UTC", date.toUTCString()], ["ISO", date.toISOString()], ["Local", date.toLocaleString()], ["Seconds", String(Math.floor(date.getTime() / 1000))], ["Milliseconds", String(date.getTime())]].map(([l, v]) => (
              <div key={l} className="flex justify-between items-center"><div><span className="text-xs text-muted-foreground">{l}</span><p className="font-mono text-sm text-foreground">{v}</p></div><Button variant="ghost" size="sm" onClick={() => copy(v)}><Copy className="h-3 w-3" /></Button></div>
            ))}
          </CardContent></Card>
        )}
        <div className="border-t border-border pt-4">
          <p className="text-sm text-foreground mb-2">Date → Timestamp</p>
          <Input type="datetime-local" value={dateStr} onChange={(e) => setDateStr(e.target.value)} />
          {dateToTs && !isNaN(dateToTs) && <Card className="mt-3"><CardContent className="pt-4 flex justify-between items-center"><code className="font-mono text-foreground">{dateToTs}</code><Button variant="ghost" size="sm" onClick={() => copy(String(dateToTs))}><Copy className="h-3 w-3" /></Button></CardContent></Card>}
        </div>
      </div>
      <section className="mt-16 space-y-6"><h2 className="text-2xl font-bold text-foreground">Unix Timestamp Tool</h2><p className="text-muted-foreground">Convert between Unix timestamps and human-readable dates. Supports seconds and millisecond precision.</p></section>
    </AIToolLayout>
  );
};
export default TimestampConverter;
