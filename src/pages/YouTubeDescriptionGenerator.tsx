import { useState } from "react";
import { YouTubeToolLayout } from "@/components/youtube-tools/YouTubeToolLayout";
import { ResultsList } from "@/components/youtube-tools/ResultsList";
import { useYouTubeToolGenerator } from "@/hooks/useYouTubeToolGenerator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const toneOptions = ["Professional", "Casual", "Educational"];

const YouTubeDescriptionGenerator = () => {
  const [keyword, setKeyword] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState("Professional");
  const { results, isLoading, generate, copyToClipboard, copyAll } = useYouTubeToolGenerator("description-generator");

  const handleGenerate = () => {
    if (!keyword.trim()) return;
    generate({ keyword: keyword.trim(), audience: audience.trim(), tone });
  };

  return (
    <YouTubeToolLayout
      title="YouTube Description Generator"
      metaTitle="Free YouTube Description Generator – SEO Optimized"
      metaDescription="Create professional, SEO-friendly YouTube video descriptions with CTAs, hashtags, and natural keyword placement. Free AI-powered tool."
      canonical="/youtube-tools/description-generator"
      breadcrumbs={[{ label: "YouTube Tools", href: "/youtube-tools" }, { label: "Description Generator" }]}
      faqItems={[
        { question: "How long should a YouTube description be?", answer: "YouTube allows up to 5,000 characters in descriptions. For SEO, aim for at least 200-300 words. The first 2-3 lines (above the fold) are most critical as they appear in search results. Our generator creates descriptions optimized for both SEO and viewer engagement." },
        { question: "Do YouTube descriptions affect SEO?", answer: "Yes! YouTube descriptions are a key ranking factor. They help YouTube understand your video content, improve search visibility, and can drive traffic through links. Including relevant keywords naturally throughout your description significantly impacts discoverability." },
        { question: "Should I include hashtags in my description?", answer: "Yes, YouTube supports up to 15 hashtags in descriptions. The first 3 hashtags appear above your video title. Use a mix of broad and niche hashtags for maximum reach. Our tool automatically includes relevant hashtags with each generated description." },
      ]}
      seoContent={<DescriptionSEOContent />}
    >
      <section className="pb-16">
        <div className="container px-4 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">YouTube Description Generator</h1>
            <p className="text-muted-foreground">Create professional, SEO-optimized video descriptions with CTAs and hashtags.</p>
          </div>

          <div className="border border-border/50 rounded-xl p-6 md:p-8">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Primary Keyword *</label>
                <Input placeholder="e.g., beginner photography tips" value={keyword} onChange={(e) => setKeyword(e.target.value)} maxLength={200} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Target Audience (optional)</label>
                <Input placeholder="e.g., beginner photographers" value={audience} onChange={(e) => setAudience(e.target.value)} maxLength={100} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Tone</label>
                <div className="flex gap-2">
                  {toneOptions.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTone(t)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${tone === t ? "bg-primary text-primary-foreground border-primary" : "bg-muted/30 text-muted-foreground border-border/50 hover:border-primary/30"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <Button onClick={handleGenerate} disabled={!keyword.trim() || isLoading} className="w-full bg-[#FF0000] hover:bg-[#FF0000]/90 text-white">
                <Sparkles className="h-4 w-4 mr-2" />
                {isLoading ? "Generating..." : "Generate Descriptions"}
              </Button>
            </div>
            <ResultsList results={results} isLoading={isLoading} onCopy={copyToClipboard} onCopyAll={copyAll} onRegenerate={handleGenerate} format="descriptions" />
          </div>
        </div>
      </section>
    </YouTubeToolLayout>
  );
};

const DescriptionSEOContent = () => (
  <div className="container px-4 max-w-3xl mx-auto">
    <h2 className="font-display text-2xl font-bold text-foreground mb-4">The Ultimate Guide to YouTube Video Descriptions</h2>
    <p className="text-muted-foreground mb-4">YouTube video descriptions are one of the most underutilized tools in a creator's SEO arsenal. While many creators focus solely on titles and thumbnails, a well-optimized description can significantly boost your video's search ranking, increase watch time, and drive traffic to your other content and external links.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">Why Descriptions Matter More Than You Think</h3>
    <p className="text-muted-foreground mb-4">YouTube's algorithm uses your description to understand the context and content of your video. The text in your description helps YouTube categorize your content and match it with relevant search queries. A comprehensive description with naturally placed keywords can mean the difference between appearing on page one of search results or being buried under thousands of other videos.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">Anatomy of a Perfect YouTube Description</h3>
    <p className="text-muted-foreground mb-4">The ideal description has several key components: a compelling hook in the first 2-3 lines (this is what viewers see before clicking "Show More"), a detailed summary of the video content, timestamps for easy navigation, relevant links, a clear call-to-action, and strategically placed hashtags. Our AI generator creates descriptions that include all these elements in an optimized format.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">Keyword Placement Strategy</h3>
    <p className="text-muted-foreground mb-4">Place your primary keyword in the first 25 words of your description. This signals to both YouTube and viewers what your video is about. Include secondary keywords and related terms throughout the body naturally — keyword stuffing can trigger penalties. Aim to use your primary keyword 2-3 times in a 200-300 word description.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">The Power of Hashtags in Descriptions</h3>
    <p className="text-muted-foreground mb-4">YouTube supports up to 15 hashtags per video, and the first three appear as clickable links above your title. Using relevant hashtags increases discoverability through hashtag search pages. Mix broad hashtags (#YouTube, #Tutorial) with niche-specific ones (#PhotoshopTips, #BudgetTravel) for optimal reach. Avoid irrelevant or excessive hashtags as YouTube may penalize your content.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">Timestamps and Chapters</h3>
    <p className="text-muted-foreground mb-4">Adding timestamps to your description creates automatic chapters in your video, improving user experience and increasing engagement. Videos with chapters often receive a ranking boost because they help YouTube understand the structure and topics covered. Format timestamps as "0:00 Introduction" and list all major sections.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">CTAs That Convert</h3>
    <p className="text-muted-foreground mb-4">Every description should include clear calls-to-action. Ask viewers to subscribe, like, comment, or visit a link. Place your most important CTA in the above-the-fold section (first 2-3 lines) where it's visible without clicking "Show More." Secondary CTAs like social media links and merchandise can go in the lower section.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">Common Description Mistakes</h3>
    <p className="text-muted-foreground mb-4">Leaving descriptions empty or writing just one sentence is a missed opportunity. Copying the exact same description for every video signals low-quality content to the algorithm. Using misleading descriptions that don't match video content increases bounce rates. Including too many external links without context appears spammy. Our generator helps you avoid all these pitfalls by creating unique, optimized descriptions for each video.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">Description Templates for Different Content Types</h3>
    <p className="text-muted-foreground mb-4">Different video formats benefit from different description structures. Tutorial videos should emphasize learning outcomes and tools used. Vlogs benefit from personality-driven descriptions. Product reviews should include specs and comparison links. Our tool lets you choose your tone — Professional, Casual, or Educational — to match your content style perfectly.</p>
  </div>
);

export default YouTubeDescriptionGenerator;
