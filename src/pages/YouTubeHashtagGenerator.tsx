import { useState } from "react";
import { YouTubeToolLayout } from "@/components/youtube-tools/YouTubeToolLayout";
import { ResultsList } from "@/components/youtube-tools/ResultsList";
import { useYouTubeToolGenerator } from "@/hooks/useYouTubeToolGenerator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const YouTubeHashtagGenerator = () => {
  const [keyword, setKeyword] = useState("");
  const { results, isLoading, generate, copyToClipboard, copyAll } = useYouTubeToolGenerator("hashtag-generator");

  const handleGenerate = () => {
    if (!keyword.trim()) return;
    generate({ keyword: keyword.trim() });
  };

  return (
    <YouTubeToolLayout
      title="YouTube Hashtag Generator"
      metaTitle="Free YouTube Hashtag Generator – Boost Reach"
      metaDescription="Generate 20 relevant YouTube hashtags mixing broad and niche-specific tags. Increase your video's discoverability with the right hashtags. Free tool."
      canonical="/youtube-tools/hashtag-generator"
      breadcrumbs={[{ label: "YouTube Tools", href: "/youtube-tools" }, { label: "Hashtag Generator" }]}
      faqItems={[
        { question: "How many hashtags should I use on YouTube?", answer: "YouTube allows up to 15 hashtags per video. Using 3-5 hashtags is generally recommended. The first three hashtags from your description appear above your video title as clickable links, making them the most impactful. Over-tagging with more than 15 hashtags may cause YouTube to ignore all of them." },
        { question: "Where should I put hashtags in my YouTube video?", answer: "Place hashtags in your video description. The first 3 hashtags will automatically appear above your video title as clickable blue links. You can place them at the end of your description or strategically throughout the text. Avoid putting hashtags in the title itself as it looks unprofessional." },
        { question: "Do hashtags help YouTube videos get more views?", answer: "Yes, hashtags create clickable links that lead to hashtag search pages, helping viewers discover your content. They're especially useful for trending topics and niche-specific content. However, hashtags alone won't dramatically increase views — they work best as part of a comprehensive SEO strategy including optimized titles, descriptions, and tags." },
      ]}
      seoContent={<HashtagSEOContent />}
    >
      <section className="pb-16">
        <div className="container px-4 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">YouTube Hashtag Generator</h1>
            <p className="text-muted-foreground">Discover 20 relevant hashtags to boost your video's discoverability.</p>
          </div>

          <div className="border border-border/50 rounded-xl p-6 md:p-8">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Keyword *</label>
                <Input placeholder="e.g., travel vlog" value={keyword} onChange={(e) => setKeyword(e.target.value)} maxLength={200} onKeyDown={(e) => e.key === "Enter" && handleGenerate()} />
              </div>
              <Button onClick={handleGenerate} disabled={!keyword.trim() || isLoading} className="w-full bg-[#FF0000] hover:bg-[#FF0000]/90 text-white">
                <Sparkles className="h-4 w-4 mr-2" />
                {isLoading ? "Generating..." : "Generate 20 Hashtags"}
              </Button>
            </div>
            <ResultsList results={results} isLoading={isLoading} onCopy={copyToClipboard} onCopyAll={copyAll} onRegenerate={handleGenerate} format="tags" />
          </div>

          <div className="mt-8 p-5 bg-muted/20 rounded-lg border border-border/30">
            <h3 className="font-semibold text-foreground mb-2"># Hashtag Best Practice</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Place your 3 most important hashtags first in your description — these appear above your video title. Mix broad hashtags (#YouTube, #Tutorial) with niche ones (#ReactJS, #WebDev) for balanced reach. Avoid using more than 15 hashtags as YouTube may ignore all of them.
            </p>
          </div>
        </div>
      </section>
    </YouTubeToolLayout>
  );
};

const HashtagSEOContent = () => (
  <div className="container px-4 max-w-3xl mx-auto">
    <h2 className="font-display text-2xl font-bold text-foreground mb-4">YouTube Hashtags: Complete Strategy Guide</h2>
    <p className="text-muted-foreground mb-4">YouTube hashtags are clickable keywords that help categorize your content and make it discoverable through hashtag search pages. When used strategically, hashtags can expose your videos to new audiences who are browsing content by topic. Understanding how to choose and place hashtags effectively is a key part of any YouTube growth strategy.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">How YouTube Hashtags Work</h3>
    <p className="text-muted-foreground mb-4">When you add hashtags to your video description, they become clickable links. The first three hashtags appear prominently above your video title in blue text, making them highly visible to viewers. Clicking a hashtag takes viewers to a page showing all videos tagged with that hashtag, similar to how hashtags work on social media platforms.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">Choosing the Right Hashtags</h3>
    <p className="text-muted-foreground mb-4">The best hashtag strategy combines broad, high-volume hashtags with specific, niche hashtags. Broad hashtags like #YouTube or #Tutorial have massive search volume but intense competition. Niche hashtags like #FlutterDev or #VeganMealPrep have lower volume but much less competition, meaning your video is more likely to be discovered. Our generator creates this optimal mix automatically.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">Hashtag Rules and Limitations</h3>
    <p className="text-muted-foreground mb-4">YouTube enforces several rules for hashtags: no spaces within hashtags, no special characters besides underscores, maximum of 15 hashtags per video, and no misleading or inappropriate hashtags. If you use more than 15 hashtags, YouTube will ignore ALL hashtags on your video. Violating hashtag policies can result in video removal or channel penalties.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">Trending Hashtags vs. Evergreen Hashtags</h3>
    <p className="text-muted-foreground mb-4">Trending hashtags can give your video a temporary boost in visibility but lose effectiveness quickly. Evergreen hashtags like #HowTo or #Tutorial provide consistent, long-term discoverability. The best approach is to use 1-2 trending hashtags alongside 3-5 evergreen ones, giving you both immediate and sustained visibility.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">Measuring Hashtag Performance</h3>
    <p className="text-muted-foreground mb-4">While YouTube doesn't provide direct hashtag analytics, you can assess their impact by monitoring traffic sources in YouTube Studio. Look for increases in "Browse features" and "Search" traffic after implementing a hashtag strategy. You can also search for your hashtags on YouTube to see where your videos appear in the hashtag results page.</p>
  </div>
);

export default YouTubeHashtagGenerator;
