import { useState } from "react";
import { YouTubeToolLayout } from "@/components/youtube-tools/YouTubeToolLayout";
import { ResultsList } from "@/components/youtube-tools/ResultsList";
import { useYouTubeToolGenerator } from "@/hooks/useYouTubeToolGenerator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const YouTubeThumbnailHeadlineGenerator = () => {
  const [topic, setTopic] = useState("");
  const { results, isLoading, generate, copyToClipboard, copyAll } = useYouTubeToolGenerator("thumbnail-headline");

  const handleGenerate = () => {
    if (!topic.trim()) return;
    generate({ topic: topic.trim(), keyword: topic.trim() });
  };

  return (
    <YouTubeToolLayout
      title="Thumbnail Headline Generator"
      metaTitle="Free Thumbnail Headline Generator – High CTR"
      metaDescription="Generate 20 high-CTR YouTube thumbnail headlines. Emotional, curiosity-driven short text (3-6 words) designed to maximize clicks. Free tool."
      canonical="/youtube-tools/thumbnail-headline-generator"
      breadcrumbs={[{ label: "YouTube Tools", href: "/youtube-tools" }, { label: "Thumbnail Headlines" }]}
      faqItems={[
        { question: "What makes a good thumbnail headline?", answer: "Great thumbnail headlines are 3-6 words maximum, use emotional triggers or curiosity gaps, and are easily readable at small sizes. They should complement the visual elements of your thumbnail rather than repeat the video title. Power words like 'SECRET,' 'SHOCKING,' and 'FINALLY' consistently drive higher click-through rates." },
        { question: "Should thumbnail text match the video title?", answer: "No — thumbnail text and video title should complement each other, not duplicate. The thumbnail headline should tease or highlight the most compelling aspect of your video, while the title provides more context and keywords for SEO. Together they should create an irresistible combination." },
        { question: "How many words should be on a thumbnail?", answer: "Keep thumbnail text to 3-6 words maximum. Text needs to be readable when the thumbnail is displayed at small sizes (like on mobile or in the sidebar). Use large, bold fonts with high contrast against the background. Our generator specifically creates headlines within this optimal length range." },
      ]}
      seoContent={<ThumbnailSEOContent />}
    >
      <section className="pb-16">
        <div className="container px-4 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">Thumbnail Headline Generator</h1>
            <p className="text-muted-foreground">Generate 20 high-CTR thumbnail headlines with emotional hooks and curiosity triggers.</p>
          </div>

          <div className="border border-border/50 rounded-xl p-6 md:p-8">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Video Topic *</label>
                <Input placeholder="e.g., iPhone 16 review" value={topic} onChange={(e) => setTopic(e.target.value)} maxLength={200} onKeyDown={(e) => e.key === "Enter" && handleGenerate()} />
              </div>
              <Button onClick={handleGenerate} disabled={!topic.trim() || isLoading} className="w-full bg-[#FF0000] hover:bg-[#FF0000]/90 text-white">
                <Sparkles className="h-4 w-4 mr-2" />
                {isLoading ? "Generating..." : "Generate 20 Headlines"}
              </Button>
            </div>
            <ResultsList results={results} isLoading={isLoading} onCopy={copyToClipboard} onCopyAll={copyAll} onRegenerate={handleGenerate} />
          </div>

          <div className="mt-8 p-5 bg-muted/20 rounded-lg border border-border/30">
            <h3 className="font-semibold text-foreground mb-2">🎨 Thumbnail Design Tip</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Use bold, sans-serif fonts with a contrasting outline or shadow for maximum readability. Place text in the upper-left or center of your thumbnail. Avoid covering faces with text. Use no more than 6 words and ensure the text is readable even at mobile thumbnail sizes.
            </p>
          </div>
        </div>
      </section>
    </YouTubeToolLayout>
  );
};

const ThumbnailSEOContent = () => (
  <div className="container px-4 max-w-3xl mx-auto">
    <h2 className="font-display text-2xl font-bold text-foreground mb-4">Mastering YouTube Thumbnail Headlines</h2>
    <p className="text-muted-foreground mb-4">Your YouTube thumbnail is the single most important factor in determining whether someone clicks on your video. Studies show that 90% of the best-performing YouTube videos have custom thumbnails, and the text overlay on those thumbnails plays a crucial role in communicating your video's value proposition at a glance.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">The Psychology Behind Click-Worthy Headlines</h3>
    <p className="text-muted-foreground mb-4">Effective thumbnail headlines tap into fundamental psychological triggers. Curiosity gaps ("You Won't Believe...") create an information void that viewers feel compelled to fill. Emotional triggers ("This Changed Everything") create personal connection. Urgency ("Before It's Too Late") motivates immediate action. Social proof ("Why Everyone's Switching") leverages herd behavior. Understanding these psychological principles helps you craft headlines that consistently drive clicks.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">Readability at Every Size</h3>
    <p className="text-muted-foreground mb-4">Thumbnails appear at vastly different sizes across YouTube — from large desktop displays to tiny mobile sidebar suggestions. Your headline text must be readable at all sizes. This means using bold, sans-serif fonts, high contrast colors (white text with dark outline works universally), and keeping text to 3-6 words maximum. If a viewer can't read your thumbnail text in the mobile app, you're losing potential clicks.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">Headline vs. Title Synergy</h3>
    <p className="text-muted-foreground mb-4">Your thumbnail headline and video title should work together as a team, not repeat the same information. The thumbnail headline grabs attention with an emotional hook, while the title provides context and SEO keywords. For example, a thumbnail might say "GAME CHANGER!" while the title reads "This $20 Camera Accessory Changed My Photography Forever." Together, they create a compelling reason to click.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">Power Words That Drive Clicks</h3>
    <p className="text-muted-foreground mb-4">Certain words consistently outperform others in thumbnail headlines. Words that create urgency (NOW, FINALLY, STOP), surprise (SHOCKING, INSANE, WOW), exclusivity (SECRET, HIDDEN, HACK), and value (FREE, EASY, FAST) tend to generate the highest click-through rates. Our generator uses a database of proven power words to create headlines that maximize your CTR.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">Testing and Optimization</h3>
    <p className="text-muted-foreground mb-4">The best creators constantly test different thumbnail headlines. YouTube's built-in A/B testing feature (available to some creators) lets you test multiple thumbnails simultaneously. Without this feature, you can still test by changing thumbnails after a few days and comparing CTR in your analytics. Keep a swipe file of high-performing headlines in your niche for inspiration.</p>
  </div>
);

export default YouTubeThumbnailHeadlineGenerator;
