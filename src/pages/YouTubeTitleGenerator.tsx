import { useState } from "react";
import { YouTubeToolLayout } from "@/components/youtube-tools/YouTubeToolLayout";
import { ResultsList } from "@/components/youtube-tools/ResultsList";
import { useYouTubeToolGenerator } from "@/hooks/useYouTubeToolGenerator";
import { generateTitlesLocally } from "@/lib/youtubeToolLogic";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap } from "lucide-react";

const faqItems = [
  {
    question: "How does the YouTube Title Generator work?",
    answer: "Our AI-powered title generator analyzes your keyword and niche to create 15 SEO-optimized titles. It uses proven formulas including emotional hooks, curiosity gaps, list-style formats, and keyword-first patterns that drive higher click-through rates.",
  },
  {
    question: "Are these titles safe for YouTube SEO?",
    answer: "Yes! All generated titles follow YouTube SEO best practices. They're kept under 70 characters, include your primary keyword naturally, and avoid clickbait patterns that could harm your channel. Each title is designed to be both search-friendly and viewer-appealing.",
  },
  {
    question: "Can I customize the generated titles?",
    answer: "Absolutely. The generated titles serve as a strong starting point. You can copy any title and modify it to better match your video content, brand voice, or specific audience preferences. We recommend A/B testing different titles to find what resonates best with your viewers.",
  },
];

const YouTubeTitleGenerator = () => {
  const [keyword, setKeyword] = useState("");
  const [niche, setNiche] = useState("");
  const [localResults, setLocalResults] = useState<string[]>([]);
  const { results: aiResults, isLoading, generate, copyToClipboard, copyAll } = useYouTubeToolGenerator("title-generator");

  const results = aiResults.length > 0 ? aiResults : localResults;

  const handleGenerateLocal = () => {
    if (!keyword.trim()) return;
    setLocalResults(generateTitlesLocally(keyword.trim()));
  };

  const handleGenerateAI = () => {
    if (!keyword.trim()) return;
    generate({ keyword: keyword.trim(), niche: niche.trim() });
  };

  const handleCopyAll = () => {
    const allText = results.join("\n");
    navigator.clipboard.writeText(allText);
  };

  return (
    <YouTubeToolLayout
      title="YouTube Title Generator"
      metaTitle="Free YouTube Title Generator – SEO Optimized"
      metaDescription="Generate 15 SEO-optimized YouTube video titles for free. Click-worthy titles with emotional hooks, curiosity gaps, and keyword optimization."
      canonical="/youtube-tools/title-generator"
      breadcrumbs={[{ label: "YouTube Tools", href: "/youtube-tools" }, { label: "Title Generator" }]}
      faqItems={faqItems}
      seoContent={<TitleSEOContent />}
    >
      <section className="pb-16">
        <div className="container px-4 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              YouTube Title Generator
            </h1>
            <p className="text-muted-foreground">Generate 15 SEO-optimized, click-worthy titles for your YouTube videos.</p>
          </div>

          <div className="border border-border/50 rounded-xl p-6 md:p-8">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Primary Keyword *</label>
                <Input
                  placeholder="e.g., how to grow on YouTube"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  maxLength={200}
                  onKeyDown={(e) => e.key === "Enter" && handleGenerateLocal()}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Video Niche (optional)</label>
                <Input
                  placeholder="e.g., Tech, Gaming, Education"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  maxLength={100}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleGenerateLocal}
                  disabled={!keyword.trim()}
                  className="flex-1 bg-[#FF0000] hover:bg-[#FF0000]/90 text-white"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Generate Instantly
                </Button>
                <Button
                  onClick={handleGenerateAI}
                  disabled={!keyword.trim() || isLoading}
                  variant="outline"
                  className="flex-1"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  {isLoading ? "Generating..." : "AI Enhanced"}
                </Button>
              </div>
            </div>

            <ResultsList
              results={results}
              isLoading={isLoading}
              onCopy={copyToClipboard}
              onCopyAll={aiResults.length > 0 ? copyAll : handleCopyAll}
              onRegenerate={handleGenerateLocal}
            />
          </div>

          <div className="mt-8 p-5 bg-muted/20 rounded-lg border border-border/30">
            <h3 className="font-semibold text-foreground mb-2">💡 SEO Tip</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              YouTube titles should be under 70 characters and include your primary keyword near the beginning. Emotional triggers and numbers in titles increase CTR by up to 36%. Try different title styles and monitor your analytics to see which format resonates best with your audience.
            </p>
          </div>
        </div>
      </section>
    </YouTubeToolLayout>
  );
};

const TitleSEOContent = () => (
  <div className="container px-4 max-w-3xl mx-auto">
    <h2 className="font-display text-2xl font-bold text-foreground mb-4">The Complete Guide to YouTube Title Optimization</h2>
    <p className="text-muted-foreground mb-4">Creating the perfect YouTube title is both an art and a science. Your video title is the first thing potential viewers see, and it plays a crucial role in determining whether someone clicks on your video or scrolls past it. A well-crafted title can dramatically increase your click-through rate (CTR) and help your video rank higher in YouTube search results.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">Why YouTube Titles Matter for SEO</h3>
    <p className="text-muted-foreground mb-4">YouTube is the second largest search engine in the world, processing over 3 billion searches per month. Your video title is one of the most important ranking factors that YouTube's algorithm considers when determining which videos to show in search results and recommendations. A title that includes relevant keywords signals to YouTube what your video is about, helping it appear in front of the right audience.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">Best Practices for YouTube Titles</h3>
    <p className="text-muted-foreground mb-4">Keep your titles under 70 characters to avoid truncation in search results. Place your primary keyword at the beginning of the title for maximum SEO impact. Use power words that trigger emotional responses — words like "ultimate," "proven," "secret," and "incredible" have been shown to boost CTR. Numbers in titles (like "7 Ways" or "Top 10") consistently outperform titles without numbers.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">Title Formats That Drive Clicks</h3>
    <p className="text-muted-foreground mb-4">The most successful YouTube titles typically follow proven formats: How-to titles ("How to Edit Videos Like a Pro"), List titles ("10 Apps Every Student Needs"), Question titles ("Is This the Best Camera Under $500?"), and Curiosity-gap titles ("I Tried This for 30 Days and..."). Each format serves a different purpose and appeals to different viewer motivations.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">Common Title Mistakes to Avoid</h3>
    <p className="text-muted-foreground mb-4">Avoid vague titles that don't communicate value. Don't stuff keywords unnaturally — YouTube's algorithm is sophisticated enough to detect keyword stuffing and may penalize your video. Avoid ALL CAPS for entire titles as it appears unprofessional, though capitalizing key words can be effective. Never use misleading titles that don't match your content, as this increases your bounce rate and signals poor quality to the algorithm.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">How Our Title Generator Helps</h3>
    <p className="text-muted-foreground mb-4">Our AI-powered YouTube Title Generator analyzes your keyword and niche to create 15 unique, SEO-optimized titles using proven formulas. Each title is crafted to be under 70 characters, includes your primary keyword naturally, and uses a mix of emotional hooks, curiosity gaps, list formats, and SEO-first structures. This saves you hours of brainstorming and ensures your titles follow current best practices.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">A/B Testing Your Titles</h3>
    <p className="text-muted-foreground mb-4">YouTube now offers a title testing feature for some creators. Take advantage of this by generating multiple title options and testing them against each other. Monitor your CTR in YouTube Analytics — a good CTR is typically between 4-10%, depending on your niche. If a title isn't performing well after 48 hours, consider changing it. Our tool generates 15 options so you always have alternatives ready.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">Title Optimization for Different Content Types</h3>
    <p className="text-muted-foreground mb-4">Different types of content require different title approaches. Tutorial content benefits from clear, descriptive titles with "How to" or "Tutorial" keywords. Entertainment content can lean more heavily on curiosity and emotional triggers. News and trending content should include timely keywords and current references. Product reviews perform well with specific product names and honest assessment words like "Honest Review" or "Worth It?"</p>
  </div>
);

export default YouTubeTitleGenerator;
