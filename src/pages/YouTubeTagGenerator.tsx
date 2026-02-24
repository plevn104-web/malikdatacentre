import { useState } from "react";
import { YouTubeToolLayout } from "@/components/youtube-tools/YouTubeToolLayout";
import { ResultsList } from "@/components/youtube-tools/ResultsList";
import { useYouTubeToolGenerator } from "@/hooks/useYouTubeToolGenerator";
import { generateTagsLocally } from "@/lib/youtubeToolLogic";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap } from "lucide-react";

const YouTubeTagGenerator = () => {
  const [keyword, setKeyword] = useState("");
  const [localResults, setLocalResults] = useState<string[]>([]);
  const { results: aiResults, isLoading, generate, copyToClipboard, copyAll } = useYouTubeToolGenerator("tag-generator");

  const results = aiResults.length > 0 ? aiResults : localResults;

  const handleGenerateLocal = () => {
    if (!keyword.trim()) return;
    setLocalResults(generateTagsLocally(keyword.trim()));
  };

  const handleGenerateAI = () => {
    if (!keyword.trim()) return;
    generate({ keyword: keyword.trim() });
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(results.join(", "));
  };

  return (
    <YouTubeToolLayout
      title="YouTube Tag Generator"
      metaTitle="Free YouTube Tag Generator – 30 SEO Tags"
      metaDescription="Generate 30 SEO-optimized YouTube tags instantly. Mix of short and long-tail keywords to boost your video rankings. Free AI-powered tool."
      canonical="/youtube-tools/tag-generator"
      breadcrumbs={[{ label: "YouTube Tools", href: "/youtube-tools" }, { label: "Tag Generator" }]}
      faqItems={[
        { question: "How many tags should I use on YouTube?", answer: "YouTube allows up to 500 characters of tags. Using 20-35 tags is optimal. Include a mix of broad and specific tags. Our generator creates 30 tags that balance short keywords with long-tail phrases for maximum discoverability." },
        { question: "Do YouTube tags still matter for SEO?", answer: "While tags are less important than titles and descriptions, they still help YouTube understand your content context. Tags are especially useful for commonly misspelled topics and for helping YouTube associate your video with similar content." },
        { question: "Should I use the same tags for every video?", answer: "No. While some channel-specific tags can be reused, most tags should be unique to each video. Using the same tags across all videos dilutes their effectiveness and can make it harder for YouTube to properly categorize your content." },
      ]}
      seoContent={<TagSEOContent />}
    >
      <section className="pb-16">
        <div className="container px-4 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">YouTube Tag Generator</h1>
            <p className="text-muted-foreground">Generate 30 SEO-optimized tags to boost your video rankings.</p>
          </div>

          <div className="border border-border/50 rounded-xl p-6 md:p-8">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Main Keyword *</label>
                <Input placeholder="e.g., react tutorial for beginners" value={keyword} onChange={(e) => setKeyword(e.target.value)} maxLength={200} onKeyDown={(e) => e.key === "Enter" && handleGenerateLocal()} />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleGenerateLocal} disabled={!keyword.trim()} className="flex-1 bg-[#FF0000] hover:bg-[#FF0000]/90 text-white">
                  <Zap className="h-4 w-4 mr-2" />
                  Generate Instantly
                </Button>
                <Button onClick={handleGenerateAI} disabled={!keyword.trim() || isLoading} variant="outline" className="flex-1">
                  <Sparkles className="h-4 w-4 mr-2" />
                  {isLoading ? "Generating..." : "AI Enhanced"}
                </Button>
              </div>
            </div>
            <ResultsList results={results} isLoading={isLoading} onCopy={copyToClipboard} onCopyAll={aiResults.length > 0 ? copyAll : handleCopyAll} onRegenerate={handleGenerateLocal} format="tags" />
          </div>

          <div className="mt-8 p-5 bg-muted/20 rounded-lg border border-border/30">
            <h3 className="font-semibold text-foreground mb-2">💡 Tag Optimization Tip</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Place your most important tags first — YouTube gives more weight to tags listed earlier. Use a combination of single-word tags, multi-word phrases, and long-tail keywords. Include your channel name as a tag to help YouTube recommend your own videos as related content.
            </p>
          </div>
        </div>
      </section>
    </YouTubeToolLayout>
  );
};

const TagSEOContent = () => (
  <div className="container px-4 max-w-3xl mx-auto">
    <h2 className="font-display text-2xl font-bold text-foreground mb-4">YouTube Tags: A Complete SEO Guide</h2>
    <p className="text-muted-foreground mb-4">YouTube tags are descriptive keywords that tell YouTube what your video is about. While they've become less important relative to titles and descriptions over the years, tags still play a role in YouTube's discovery algorithm, especially for new channels and videos targeting competitive keywords.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">How YouTube Tags Work</h3>
    <p className="text-muted-foreground mb-4">Tags serve primarily as a signal to help YouTube understand the context and content of your video. They're particularly useful for handling common misspellings and alternative phrasings that viewers might search for. YouTube uses tags in combination with your title, description, and actual video content to determine when to show your video in search results and suggested videos.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">The Optimal Number of Tags</h3>
    <p className="text-muted-foreground mb-4">YouTube allows up to 500 characters of tags per video. Research shows that using between 20-35 tags provides the best balance of coverage and specificity. Too few tags means missed opportunities for discovery. Too many diluted or irrelevant tags can actually confuse the algorithm about your video's topic.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">Types of Tags to Include</h3>
    <p className="text-muted-foreground mb-4">A balanced tag strategy includes: exact-match keywords (your primary keyword exactly as people search it), broad category tags (like "tutorial" or "review"), long-tail variations (specific phrases with 3-5 words), and related topic tags (adjacent topics viewers might also be interested in). Our generator automatically creates this balanced mix for optimal performance.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">Tag Placement and Priority</h3>
    <p className="text-muted-foreground mb-4">The order of your tags matters. YouTube gives slightly more weight to tags listed first. Always place your most important and relevant tags at the beginning of your tag list. Start with your primary keyword, then add variations, and finally include broader related terms. This hierarchical approach ensures YouTube prioritizes the most relevant associations.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">Tags vs. Hashtags</h3>
    <p className="text-muted-foreground mb-4">Tags and hashtags serve different purposes on YouTube. Tags are hidden metadata visible only in the page source, while hashtags appear in your description and above your title. Tags help with search and suggested video placement, while hashtags create clickable links that group content. Use both for maximum discoverability — our Tag Generator focuses on metadata tags, while our Hashtag Generator handles the visible hashtags.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">Common Tag Mistakes</h3>
    <p className="text-muted-foreground mb-4">Using irrelevant tags to try to piggyback on popular searches is a violation of YouTube's policies and can result in your video being removed. Single-character or overly generic tags like "video" provide no value. Repeating the same tag with minor variations wastes character space. Using competitor channel names as tags is against YouTube's terms of service. Focus on relevant, specific, and diverse tags for the best results.</p>
  </div>
);

export default YouTubeTagGenerator;
