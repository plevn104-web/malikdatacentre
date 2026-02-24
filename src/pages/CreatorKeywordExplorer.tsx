import { useState } from "react";
import { CreatorStudioLayout } from "@/components/creator-studio/CreatorStudioLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreatorStudioGenerator } from "@/hooks/useCreatorStudioGenerator";
import { Copy, Loader2 } from "lucide-react";

interface KeywordResult {
  keywords: { keyword: string; intent: string; competition: string }[];
  relatedTopics: string[];
}

const CreatorKeywordExplorer = () => {
  const [keyword, setKeyword] = useState("");
  const { result, isLoading, generate, copyToClipboard } = useCreatorStudioGenerator<KeywordResult>("keyword-explorer");

  const handleGenerate = () => {
    if (!keyword.trim()) return;
    generate({ keyword: keyword.trim() });
  };

  const competitionColor = (level: string) => {
    const l = level.toLowerCase();
    if (l === "low") return "text-primary";
    if (l === "high") return "text-destructive";
    return "text-muted-foreground";
  };

  return (
    <CreatorStudioLayout
      title="Keyword Explorer Lite"
      metaTitle="YouTube Keyword Explorer – Find Long-Tail Keywords"
      metaDescription="Discover profitable long-tail keywords for YouTube with search intent analysis and competition indicators. Free AI-powered keyword research tool."
      canonical="/creator-studio/keyword-explorer"
      breadcrumbs={[{ label: "Creator Studio", href: "/creator-studio" }, { label: "Keyword Explorer" }]}
      faqItems={[
        { question: "How does the Keyword Explorer work?", answer: "Our AI analyzes your seed keyword and generates related long-tail keywords with search intent classification and competition indicators to help you find the best topics for your YouTube videos." },
        { question: "What is search intent and why does it matter?", answer: "Search intent describes what the viewer is looking for — informational, commercial, navigational, or transactional. Matching your content to the right intent increases viewer satisfaction and engagement." },
        { question: "How accurate are the competition indicators?", answer: "Competition levels are AI-estimated based on keyword patterns and common YouTube trends. For precise data, combine these insights with YouTube Studio analytics and other SEO tools." },
      ]}
      seoContent={
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">The Complete Guide to YouTube Keyword Research</h2>
          <p className="text-muted-foreground mb-4">Keyword research is the foundation of YouTube SEO. Without understanding what your audience searches for, you're creating content in the dark. The Keyword Explorer Lite helps you uncover hidden opportunities by analyzing search patterns and suggesting long-tail keywords that have lower competition but high viewer intent.</p>
          <h3 className="font-display text-xl font-bold text-foreground mb-3">Why Long-Tail Keywords Matter</h3>
          <p className="text-muted-foreground mb-4">Long-tail keywords are longer, more specific phrases that viewers type into YouTube's search bar. While they individually have lower search volume, they collectively account for the majority of YouTube searches. More importantly, they indicate higher viewer intent — someone searching for "how to edit YouTube videos on iPhone for beginners" is much more specific about their needs than someone searching "video editing."</p>
          <h3 className="font-display text-xl font-bold text-foreground mb-3">Understanding Search Intent</h3>
          <p className="text-muted-foreground mb-4">Every search has an underlying intent. Informational searches seek knowledge ("what is SEO"), commercial searches compare options ("best camera for YouTube"), navigational searches look for specific channels, and transactional searches aim to take action ("buy ring light"). Aligning your content with the right intent dramatically improves watch time and engagement.</p>
          <h3 className="font-display text-xl font-bold text-foreground mb-3">Competition Analysis</h3>
          <p className="text-muted-foreground mb-4">Not all keywords are equally competitive. High-competition keywords are dominated by established channels with millions of subscribers. As a growing creator, targeting low-to-medium competition keywords gives you the best chance of ranking on the first page of YouTube search results. Our tool estimates competition based on keyword patterns to help you identify these opportunities.</p>
          <h3 className="font-display text-xl font-bold text-foreground mb-3">Building a Keyword Strategy</h3>
          <p className="text-muted-foreground mb-4">The most successful YouTube channels don't just find random keywords — they build a coherent keyword strategy. This means organizing your keywords into topic clusters, creating content pillars, and ensuring each video targets a specific keyword while supporting your overall channel theme. Use the related topics feature to discover connected subjects that can form a content series.</p>
          <h3 className="font-display text-xl font-bold text-foreground mb-3">From Keywords to Content</h3>
          <p className="text-muted-foreground mb-4">Once you've identified your target keywords, the next step is creating content that fully addresses the search intent. Use your primary keyword in the title, description, and tags. Mention it naturally in the first 30 seconds of your video. Create content that thoroughly covers the topic — YouTube's algorithm favors comprehensive videos that keep viewers watching. Combine keyword research with our other Creator Studio tools like the SEO Analyzer and Script Builder for a complete optimization workflow.</p>
        </div>
      }
    >
      <section className="py-8">
        <div className="container px-4 max-w-2xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
            YouTube Keyword Explorer Lite
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            Enter a keyword to discover long-tail suggestions, search intent, and competition levels.
          </p>

          <div className="space-y-4">
            <Input placeholder="Enter your keyword (e.g., 'video editing')" value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleGenerate()} />
            <Button onClick={handleGenerate} disabled={isLoading || !keyword.trim()} className="w-full">
              {isLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Analyzing...</> : "Explore Keywords"}
            </Button>
          </div>

          {isLoading && (
            <div className="mt-8 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (<div key={i} className="h-12 bg-muted/30 rounded-lg animate-pulse" />))}
            </div>
          )}

          {result && !isLoading && (
            <div className="mt-8 space-y-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-lg font-semibold text-foreground">Keyword Suggestions ({result.keywords?.length || 0})</h3>
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(result.keywords?.map((k) => k.keyword).join("\n") || "")}>
                    <Copy className="h-4 w-4 mr-1" /> Copy All
                  </Button>
                </div>
                <div className="space-y-2">
                  {result.keywords?.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-muted/20 hover:bg-muted/40 border border-border/30 rounded-lg transition-colors group">
                      <div className="flex-1 mr-3">
                        <span className="text-foreground text-sm">{item.keyword}</span>
                        <div className="flex gap-3 mt-1">
                          <span className="text-xs text-muted-foreground">{item.intent}</span>
                          <span className={`text-xs font-medium ${competitionColor(item.competition)}`}>{item.competition}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(item.keyword)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {result.relatedTopics && result.relatedTopics.length > 0 && (
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">Related Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.relatedTopics.map((topic, i) => (
                      <span key={i} className="px-3 py-1.5 bg-muted/50 border border-border/50 rounded-full text-sm text-foreground">{topic}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </CreatorStudioLayout>
  );
};

export default CreatorKeywordExplorer;
