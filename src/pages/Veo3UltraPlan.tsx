import { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Video, Download, Loader2, AlertTriangle, Sparkles, Clock, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const VIDEO_STYLES = ["Realistic", "Animated", "Cinematic", "3D", "Cartoon", "Anime", "Minimal"];
const ORIENTATIONS = [
  { value: "vertical", label: "Vertical (9:16)" },
  { value: "horizontal", label: "Horizontal (16:9)" },
];
const LANGUAGES = ["English", "Urdu", "Hindi", "Spanish", "Italian", "Other"];

const PLAN_LIMITS: Record<string, number> = {
  Free: 3,
  Starter: 15,
  "Creator Pro": 50,
  "Elite Creator": 80,
  "VEO Ultra": 150,
};

const FAQ_ITEMS = [
  { q: "How does VEO 3 Ultra Plan work?", a: "Enter a scene description, choose style and orientation, and our AI generates an 8-second video using advanced video generation models." },
  { q: "What video quality is generated?", a: "Videos are generated at 720p resolution by default for optimal balance between quality and processing speed." },
  { q: "How long does generation take?", a: "Typically 30 seconds to 2 minutes depending on complexity and server load." },
  { q: "What are the daily limits?", a: "Free users get 3 videos/day. Paid plans range from 15 to 150 videos/day depending on your subscription." },
  { q: "Can I download the generated videos?", a: "Yes, every generated video includes a download button for saving to your device." },
  { q: "What content is not allowed?", a: "Videos containing violence, explicit content, or harmful material are blocked by our content moderation system." },
];

const Veo3UltraPlan = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [scene, setScene] = useState("");
  const [orientation, setOrientation] = useState("horizontal");
  const [style, setStyle] = useState("Cinematic");
  const [language, setLanguage] = useState("English");
  const [customLanguage, setCustomLanguage] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [dailyUsed, setDailyUsed] = useState(0);
  const [dailyLimit, setDailyLimit] = useState(3);
  const [planName, setPlanName] = useState("Free");
  const [usageLoading, setUsageLoading] = useState(true);

  const fetchUsage = useCallback(async () => {
    if (!user) { setUsageLoading(false); return; }
    try {
      const today = new Date().toISOString().slice(0, 10);
      const [usageRes, subsRes] = await Promise.all([
        (supabase as any).from("video_daily_usage").select("generation_count").eq("user_id", user.id).eq("usage_date", today).maybeSingle(),
        supabase.from("user_subscriptions").select("id, plan_id, premium_plans(name)").eq("user_id", user.id).eq("status", "active").gt("expires_at", new Date().toISOString()).limit(1),
      ]);
      const count = usageRes.data?.generation_count || 0;
      setDailyUsed(count);
      const plan = (subsRes.data?.[0] as any)?.premium_plans?.name || "Free";
      setPlanName(plan);
      setDailyLimit(PLAN_LIMITS[plan] || 3);
    } catch { /* ignore */ }
    finally { setUsageLoading(false); }
  }, [user]);

  useEffect(() => { fetchUsage(); }, [fetchUsage]);

  const canGenerate = !loading && dailyUsed < dailyLimit && scene.trim().length > 0;

  const handleGenerate = async () => {
    if (!canGenerate) return;
    setLoading(true);
    setVideoUrl(null);

    try {
      const { data, error } = await supabase.functions.invoke("generate-video", {
        body: {
          scene: scene.trim(),
          orientation,
          style,
          language: language === "Other" ? customLanguage || "English" : language,
        },
      });

      if (error) throw new Error(error.message || "Generation failed");
      if (data?.error) {
        toast({ title: "Error", description: data.error, variant: "destructive" });
        return;
      }

      setVideoUrl(data.videoUrl);
      setDailyUsed(data.used || dailyUsed + 1);
      toast({ title: "Video Generated!", description: "Your video is ready to preview and download." });
    } catch (err: any) {
      toast({ title: "Generation Failed", description: err.message || "Please try again", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const remaining = Math.max(0, dailyLimit - dailyUsed);
  const usagePercent = dailyLimit > 0 ? (dailyUsed / dailyLimit) * 100 : 0;

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "VEO 3 Ultra Plan - AI Video Generator",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "PKR" },
    description: "Generate AI-powered videos with scene descriptions, multiple styles, and orientations.",
  };

  return (
    <>
      <Helmet>
        <title>VEO 3 Ultra Plan - AI Video Generator | Malik Data Centre</title>
        <meta name="description" content="Generate stunning AI videos with VEO 3 Ultra Plan. Choose styles, orientations, and languages for professional 8-second videos." />
        <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>
      </Helmet>

      <Navbar />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-10">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="h-3 w-3 mr-1" /> AI Video Generation
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              VEO 3 Ultra Plan
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Generate stunning AI-powered 8-second videos. Describe your scene, pick a style, and let AI bring it to life.
            </p>
          </div>

          {/* Usage Bar */}
          <Card className="mb-6 border-border/50">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Daily Usage</span>
                  <Badge variant="outline" className="text-xs">{planName}</Badge>
                </div>
                <span className="text-sm text-muted-foreground">
                  {usageLoading ? "..." : `${dailyUsed} / ${dailyLimit} videos`}
                </span>
              </div>
              <Progress value={usagePercent} className="h-2" />
              {remaining === 0 && !usageLoading && (
                <p className="text-xs text-destructive mt-2 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" /> Daily limit reached. Upgrade your plan for more videos.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Generator Form */}
          <Card className="mb-8 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5 text-primary" /> Video Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Scene */}
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Scene Description</label>
                <Textarea
                  placeholder="Describe your video scene... (e.g., A golden sunset over a calm ocean with waves gently crashing on the shore)"
                  value={scene}
                  onChange={(e) => setScene(e.target.value.slice(0, 300))}
                  className="min-h-[100px]"
                  maxLength={300}
                />
                <p className="text-xs text-muted-foreground mt-1 text-right">{scene.length}/300</p>
              </div>

              {/* Row: Orientation + Style */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Orientation</label>
                  <Select value={orientation} onValueChange={setOrientation}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {ORIENTATIONS.map((o) => (
                        <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Video Style</label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {VIDEO_STYLES.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Language */}
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Narration Language</label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((l) => (
                      <SelectItem key={l} value={l}>{l}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {language === "Other" && (
                  <Input
                    placeholder="Enter language..."
                    value={customLanguage}
                    onChange={(e) => setCustomLanguage(e.target.value.slice(0, 50))}
                    className="mt-2"
                    maxLength={50}
                  />
                )}
              </div>

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                disabled={!canGenerate || !user}
                className="w-full"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generating Video...
                  </>
                ) : !user ? (
                  "Log in to Generate"
                ) : remaining === 0 ? (
                  "Daily Limit Reached — Upgrade Plan"
                ) : (
                  <>
                    <Video className="h-4 w-4 mr-2" /> Generate Video ({remaining} remaining)
                  </>
                )}
              </Button>

              {loading && (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground">This may take 30 seconds to 2 minutes...</p>
                  <Progress value={undefined} className="h-1 mt-2 animate-pulse" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Video Preview */}
          {videoUrl && (
            <Card className="mb-8 border-border/50">
              <CardHeader>
                <CardTitle>Generated Video</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className={`relative rounded-lg overflow-hidden bg-black ${orientation === "vertical" ? "max-w-sm mx-auto aspect-[9/16]" : "aspect-video"}`}>
                  <video
                    src={videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                </div>
                <Button asChild variant="outline" className="w-full">
                  <a href={videoUrl} download="veo3-video.mp4" target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4 mr-2" /> Download Video
                  </a>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Plan Details */}
          <Card className="mb-8 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" /> Plan Limits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {Object.entries(PLAN_LIMITS).map(([plan, limit]) => (
                  <div
                    key={plan}
                    className={`text-center p-3 rounded-lg border ${planName === plan ? "border-primary bg-primary/5" : "border-border/50"}`}
                  >
                    <p className="text-xs font-medium text-muted-foreground">{plan}</p>
                    <p className="text-lg font-bold text-foreground">{limit}</p>
                    <p className="text-xs text-muted-foreground">videos/day</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* SEO Content */}
          <section className="prose prose-sm max-w-none mb-10">
            <h2 className="text-2xl font-bold text-foreground">AI Video Generation with VEO 3 Ultra</h2>
            <p className="text-muted-foreground">
              VEO 3 Ultra Plan is a powerful AI video generation tool that transforms text descriptions into stunning 8-second videos.
              Choose from multiple styles including Realistic, Cinematic, 3D, Anime, and more. Support for vertical (9:16) and
              horizontal (16:9) orientations makes it perfect for social media, presentations, and creative projects.
            </p>
            <p className="text-muted-foreground">
              Our AI understands complex scene descriptions and generates professional-quality video content. With plan-based daily
              limits, you can generate videos for free or upgrade for higher volume production needs.
            </p>
          </section>

          {/* FAQ */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {FAQ_ITEMS.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Veo3UltraPlan;
