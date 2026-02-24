import { useState } from "react";
import { CreatorStudioLayout } from "@/components/creator-studio/CreatorStudioLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreatorStudioGenerator } from "@/hooks/useCreatorStudioGenerator";
import { Copy, Loader2 } from "lucide-react";

interface TagResult {
  shortTail: string[];
  longTail: string[];
}

const CreatorTagOptimization = () => {
  const [keyword, setKeyword] = useState("");
  const { result, isLoading, generate, copyToClipboard } = useCreatorStudioGenerator<TagResult>("tag-optimization");

  const handleGenerate = () => {
    if (!keyword.trim()) return;
    generate({ keyword: keyword.trim() });
  };

  const allTags = result ? [...(result.shortTail || []), ...(result.longTail || [])] : [];

  return (
    <CreatorStudioLayout
      title="Tag Optimization Tool"
      metaTitle="YouTube Tag Optimization – Generate 40 Optimized Tags"
      metaDescription="Generate 40 SEO-optimized YouTube tags grouped by short-tail and long-tail keywords. Maximize your video reach with AI-powered tag suggestions."
      canonical="/creator-studio/tag-optimization"
      breadcrumbs={[{ label: "Creator Studio", href: "/creator-studio" }, { label: "Tag Optimization" }]}
      faqItems={[
        { question: "How many tags should I use on YouTube?", answer: "YouTube allows up to 500 characters for tags. Using 30-40 relevant tags that mix short-tail and long-tail keywords gives you the best coverage for search queries." },
        { question: "What's the difference between short-tail and long-tail tags?", answer: "Short-tail tags are 1-2 word broad terms with high search volume. Long-tail tags are 3-5 word specific phrases with lower competition. Using both helps you rank for various search queries." },
        { question: "Do YouTube tags still matter for SEO?", answer: "Yes, tags help YouTube understand your video's content and context. While not as impactful as titles and descriptions, they still play a role in search rankings and suggested video placement." },
      ]}
      seoContent={
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">YouTube Tag Optimization: The Complete Strategy</h2>
          <p className="text-muted-foreground mb-4">Tags remain an important ranking factor on YouTube. They help the algorithm understand what your video is about and connect it with relevant search queries. The Tag Optimization Tool generates 40 strategically selected tags organized by type to maximize your video's discoverability.</p>
          <h3 className="font-display text-xl font-bold text-foreground mb-3">Short-Tail vs Long-Tail Tags</h3>
          <p className="text-muted-foreground mb-4">Short-tail tags are broad keywords like "cooking" or "fitness." They have massive search volume but extreme competition. Long-tail tags like "easy dinner recipes for beginners" have less competition and attract viewers with specific intent. The best strategy uses both types together, placing your most important tags first.</p>
          <h3 className="font-display text-xl font-bold text-foreground mb-3">Tag Placement Strategy</h3>
          <p className="text-muted-foreground mb-4">YouTube weighs the first few tags more heavily. Start with your exact target keyword, followed by close variations, then broader related terms. This signals to the algorithm exactly what your video covers while casting a wider net for related searches. Our tool organizes tags in this optimal order automatically.</p>
          <h3 className="font-display text-xl font-bold text-foreground mb-3">Common Tag Mistakes</h3>
          <p className="text-muted-foreground mb-4">Avoid using irrelevant popular tags (this can hurt your rankings), single-character tags, or competitor channel names as tags. YouTube's algorithm is sophisticated enough to detect tag spam and may penalize your video. Focus on relevance and accuracy over volume. Every tag should genuinely describe some aspect of your content.</p>
          <h3 className="font-display text-xl font-bold text-foreground mb-3">Combining Tags with Other SEO Elements</h3>
          <p className="text-muted-foreground mb-4">Tags work best as part of a comprehensive SEO strategy. Your primary keyword should appear in your title, first line of description, and first tag. Use our SEO Score Analyzer to check alignment between these elements. Consistent keyword usage across all metadata signals strong topical relevance to the YouTube algorithm, improving your chances of ranking for target searches.</p>
        </div>
      }
    >
      <section className="py-8">
        <div className="container px-4 max-w-2xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Tag Optimization Tool</h1>
          <p className="text-muted-foreground text-center mb-8">Generate 40 optimized tags grouped by short-tail and long-tail keywords.</p>

          <div className="space-y-4">
            <Input placeholder="Enter main keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleGenerate()} />
            <Button onClick={handleGenerate} disabled={isLoading || !keyword.trim()} className="w-full">
              {isLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generating...</> : "Generate Tags"}
            </Button>
          </div>

          {isLoading && <div className="mt-8 space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-12 bg-muted/30 rounded-lg animate-pulse" />)}</div>}

          {result && !isLoading && (
            <div className="mt-8 space-y-8">
              <div className="flex justify-end">
                <Button variant="outline" size="sm" onClick={() => copyToClipboard(allTags.join(", "))}>
                  <Copy className="h-4 w-4 mr-1" /> Copy All ({allTags.length})
                </Button>
              </div>

              {result.shortTail && result.shortTail.length > 0 && (
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">Short-Tail Tags ({result.shortTail.length})</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.shortTail.map((tag, i) => (
                      <button key={i} onClick={() => copyToClipboard(tag)} className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-full text-sm text-foreground transition-colors cursor-pointer" title="Click to copy">{tag}</button>
                    ))}
                  </div>
                </div>
              )}

              {result.longTail && result.longTail.length > 0 && (
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">Long-Tail Tags ({result.longTail.length})</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.longTail.map((tag, i) => (
                      <button key={i} onClick={() => copyToClipboard(tag)} className="px-3 py-1.5 bg-muted/50 hover:bg-muted border border-border/50 rounded-full text-sm text-foreground transition-colors cursor-pointer" title="Click to copy">{tag}</button>
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

export default CreatorTagOptimization;
