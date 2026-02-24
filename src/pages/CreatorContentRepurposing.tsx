import { useState } from "react";
import { CreatorStudioLayout } from "@/components/creator-studio/CreatorStudioLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCreatorStudioGenerator } from "@/hooks/useCreatorStudioGenerator";
import { Copy, Loader2 } from "lucide-react";

interface RepurposeResult {
  youtubeDescription: string;
  linkedinPost: string;
  instagramCaption: string;
  shortVideoScript: string;
}

const CreatorContentRepurposing = () => {
  const [content, setContent] = useState("");
  const { result, isLoading, generate, copyToClipboard } = useCreatorStudioGenerator<RepurposeResult>("content-repurposing");

  const handleGenerate = () => {
    if (!content.trim()) return;
    generate({ content: content.trim() });
  };

  const sections = result
    ? [
        { label: "YouTube Description", content: result.youtubeDescription },
        { label: "LinkedIn Post", content: result.linkedinPost },
        { label: "Instagram Caption", content: result.instagramCaption },
        { label: "Short Video Script (60s)", content: result.shortVideoScript },
      ]
    : [];

  return (
    <CreatorStudioLayout
      title="Content Repurposing Engine"
      metaTitle="Content Repurposing Engine – Transform Content for Multiple Platforms"
      metaDescription="Transform your blog posts, scripts, or articles into YouTube descriptions, LinkedIn posts, Instagram captions, and short video scripts. Free AI repurposing tool."
      canonical="/creator-studio/content-repurposing"
      breadcrumbs={[{ label: "Creator Studio", href: "/creator-studio" }, { label: "Content Repurposing" }]}
      faqItems={[
        { question: "What type of content can I repurpose?", answer: "You can input blog posts, video scripts, articles, podcast notes, or any written content. The AI adapts it to each platform's format, tone, and best practices automatically." },
        { question: "Why should I repurpose content?", answer: "Repurposing maximizes your content ROI. One piece of content can become 4-5 posts across different platforms, reaching different audiences with minimal extra effort. It also reinforces your messaging and brand consistency." },
        { question: "Will the repurposed content be unique for each platform?", answer: "Yes! Each output is tailored to the platform's best practices — professional tone for LinkedIn, casual with emojis for Instagram, SEO-optimized for YouTube, and concise for short video scripts." },
      ]}
      seoContent={
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Content Repurposing: Multiply Your Reach</h2>
          <p className="text-muted-foreground mb-4">Content repurposing is the strategy of adapting a single piece of content for multiple platforms and formats. Instead of creating unique content for YouTube, LinkedIn, Instagram, and TikTok separately, you create one comprehensive piece and transform it. This approach saves time while maintaining consistent messaging across your entire online presence.</p>
          <h3 className="font-display text-xl font-bold text-foreground mb-3">Platform-Specific Optimization</h3>
          <p className="text-muted-foreground mb-4">Each social platform has unique content requirements. YouTube descriptions need SEO keywords and timestamps. LinkedIn favors professional insights with personal stories. Instagram thrives on casual, emoji-rich captions with hashtags. Short-form video needs hook-heavy scripts under 60 seconds. The Content Repurposing Engine automatically adapts your content to each platform's best practices.</p>
          <h3 className="font-display text-xl font-bold text-foreground mb-3">The Content Multiplication Framework</h3>
          <p className="text-muted-foreground mb-4">Start with your highest-effort content — typically a YouTube video or blog post. Extract the key messages, stats, and insights. Then cascade downward: create a LinkedIn article, an Instagram carousel, Twitter threads, and short-form video clips. Each adaptation should feel native to its platform while carrying the same core message.</p>
          <h3 className="font-display text-xl font-bold text-foreground mb-3">Maximizing Content ROI</h3>
          <p className="text-muted-foreground mb-4">Most creators spend hours creating a single piece of content that reaches one audience on one platform. Repurposing transforms that single piece into 5-10 pieces that reach audiences across multiple platforms. Combined with our 30-Day Content Planner, you can build a sustainable content ecosystem that keeps all your channels active with minimal additional effort.</p>
        </div>
      }
    >
      <section className="py-8">
        <div className="container px-4 max-w-2xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Content Repurposing Engine</h1>
          <p className="text-muted-foreground text-center mb-8">Paste your content and get optimized versions for multiple platforms.</p>

          <div className="space-y-4">
            <Textarea placeholder="Paste your blog post, script, or article here..." value={content} onChange={(e) => setContent(e.target.value)} rows={8} />
            <Button onClick={handleGenerate} disabled={isLoading || !content.trim()} className="w-full">
              {isLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Repurposing...</> : "Repurpose Content"}
            </Button>
          </div>

          {isLoading && <div className="mt-8 space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-24 bg-muted/30 rounded-lg animate-pulse" />)}</div>}

          {result && !isLoading && (
            <div className="mt-8 space-y-6">
              {sections.map((section, i) => (
                <div key={i} className="border border-border/50 rounded-lg p-5 relative group">
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(section.content)}><Copy className="h-4 w-4" /></Button>
                  </div>
                  <h3 className="font-display text-sm font-semibold text-muted-foreground mb-3">{section.label}</h3>
                  <p className="text-foreground text-sm leading-relaxed whitespace-pre-wrap">{section.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </CreatorStudioLayout>
  );
};

export default CreatorContentRepurposing;
