import { useState } from "react";
import { AIToolLayout } from "@/components/ai-tools/AIToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Palette } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { toast } from "@/hooks/use-toast";

const hexToRgb = (hex: string) => {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16), g = parseInt(h.substring(2, 4), 16), b = parseInt(h.substring(4, 6), 16);
  return isNaN(r) ? null : { r, g, b };
};
const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min; s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) { case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break; case g: h = ((b - r) / d + 2) / 6; break; case b: h = ((r - g) / d + 4) / 6; break; }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};

const ColorConverter = () => {
  const [hex, setHex] = useState("#3b82f6");
  const rgb = hexToRgb(hex);
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;
  const copy = (t: string) => { navigator.clipboard.writeText(t); toast({ title: "Copied!" }); };
  const schema = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Color Code Converter", applicationCategory: "DesignApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };

  return (
    <AIToolLayout title="Color Converter" metaTitle="Color Code Converter — HEX to RGB to HSL" metaDescription="Convert color codes between HEX, RGB, and HSL formats instantly." canonical="/dev-tools/color-converter">
      <SEOHead title="Color Code Converter" description="Convert HEX to RGB to HSL" canonical="/dev-tools/color-converter" schema={schema} />
      <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2"><Palette className="h-7 w-7 text-primary" /> Color Code Converter</h1>
      <p className="text-muted-foreground mb-6">Enter a HEX color to convert to RGB and HSL.</p>
      <div className="space-y-4 mb-8">
        <div className="flex gap-3 items-center">
          <Input type="color" value={hex} onChange={(e) => setHex(e.target.value)} className="w-16 h-12 p-1 cursor-pointer" />
          <Input value={hex} onChange={(e) => setHex(e.target.value)} placeholder="#3b82f6" className="font-mono" />
        </div>
      </div>
      {rgb && hsl && (
        <div className="space-y-3">
          <div className="h-20 rounded-lg border border-border" style={{ backgroundColor: hex }} />
          {[
            { label: "HEX", value: hex },
            { label: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
            { label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
          ].map((c) => (
            <Card key={c.label}><CardContent className="pt-4 flex justify-between items-center"><div><span className="text-xs text-muted-foreground">{c.label}</span><p className="font-mono text-sm text-foreground">{c.value}</p></div><Button variant="ghost" size="sm" onClick={() => copy(c.value)}><Copy className="h-3 w-3" /></Button></CardContent></Card>
          ))}
        </div>
      )}
      <section className="mt-16 space-y-6"><h2 className="text-2xl font-bold text-foreground">Color Conversion</h2><p className="text-muted-foreground">Convert between HEX, RGB, and HSL color formats with a live preview. All processing runs in your browser.</p></section>
    </AIToolLayout>
  );
};
export default ColorConverter;
