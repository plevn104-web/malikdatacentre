import { useState } from "react";
import { CreatorStudioLayout } from "@/components/creator-studio/CreatorStudioLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const analyzeContent = (title: string, description: string) => {
  let score = 0;
  const tips: string[] = [];
  const checks: { label: string; passed: boolean; detail: string }[] = [];

  // Title length
  const titleLen = title.length;
  if (titleLen >= 40 && titleLen <= 70) {
    score += 15;
    checks.push({ label: "Title Length", passed: true, detail: `${titleLen} chars — optimal range (40-70)` });
  } else if (titleLen > 0) {
    score += 5;
    checks.push({ label: "Title Length", passed: false, detail: `${titleLen} chars — aim for 40-70 characters` });
    tips.push("Adjust your title to be between 40-70 characters for best results.");
  }

  // Title has numbers
  if (/\d/.test(title)) {
    score += 8;
    checks.push({ label: "Numbers in Title", passed: true, detail: "Numbers increase CTR" });
  } else {
    checks.push({ label: "Numbers in Title", passed: false, detail: "Add numbers for higher CTR" });
    tips.push("Include a number in your title (e.g., '5 Tips', '10 Ways').");
  }

  // Title has power words
  const powerWords = ["how", "best", "top", "ultimate", "guide", "secret", "free", "new", "proven", "easy", "fast", "complete", "step"];
  const hasPowerWord = powerWords.some((w) => title.toLowerCase().includes(w));
  if (hasPowerWord) {
    score += 10;
    checks.push({ label: "Power Words", passed: true, detail: "Title contains engaging power words" });
  } else {
    checks.push({ label: "Power Words", passed: false, detail: "Add words like 'Best', 'Ultimate', 'Guide'" });
    tips.push("Use power words in your title to increase engagement.");
  }

  // Description length
  const descLen = description.length;
  if (descLen >= 200) {
    score += 15;
    checks.push({ label: "Description Length", passed: true, detail: `${descLen} chars — good length` });
  } else if (descLen > 50) {
    score += 7;
    checks.push({ label: "Description Length", passed: false, detail: `${descLen} chars — aim for 200+ characters` });
    tips.push("Write at least 200 characters in your description for better SEO.");
  } else if (descLen > 0) {
    score += 2;
    checks.push({ label: "Description Length", passed: false, detail: "Description is too short" });
    tips.push("Your description needs much more content. Aim for 200+ characters.");
  }

  // CTA presence
  const ctaWords = ["subscribe", "like", "comment", "share", "click", "link", "check out", "watch"];
  const hasCTA = ctaWords.some((w) => description.toLowerCase().includes(w));
  if (hasCTA) {
    score += 10;
    checks.push({ label: "Call to Action", passed: true, detail: "Description includes a CTA" });
  } else {
    checks.push({ label: "Call to Action", passed: false, detail: "No CTA found" });
    tips.push("Add a call-to-action like 'Subscribe for more' or 'Like and comment'.");
  }

  // Hashtags
  const hashtagCount = (description.match(/#\w+/g) || []).length;
  if (hashtagCount >= 3 && hashtagCount <= 15) {
    score += 10;
    checks.push({ label: "Hashtag Usage", passed: true, detail: `${hashtagCount} hashtags — good range` });
  } else if (hashtagCount > 0) {
    score += 5;
    checks.push({ label: "Hashtag Usage", passed: false, detail: `${hashtagCount} hashtags — aim for 3-15` });
    tips.push("Use 3-15 relevant hashtags in your description.");
  } else {
    checks.push({ label: "Hashtag Usage", passed: false, detail: "No hashtags found" });
    tips.push("Add 3-15 relevant hashtags to boost discoverability.");
  }

  // Keywords from title in description
  const titleWords = title.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
  const descLower = description.toLowerCase();
  const matchedWords = titleWords.filter((w) => descLower.includes(w));
  const keywordRatio = titleWords.length > 0 ? matchedWords.length / titleWords.length : 0;
  if (keywordRatio >= 0.5) {
    score += 12;
    checks.push({ label: "Keyword Alignment", passed: true, detail: "Title keywords appear in description" });
  } else if (keywordRatio > 0) {
    score += 5;
    checks.push({ label: "Keyword Alignment", passed: false, detail: "Some title keywords missing from description" });
    tips.push("Include your main title keywords naturally in the description.");
  } else if (titleWords.length > 0) {
    checks.push({ label: "Keyword Alignment", passed: false, detail: "Title keywords not found in description" });
    tips.push("Mirror your title keywords in your description for better SEO.");
  }

  // Timestamps
  const hasTimestamps = /\d{1,2}:\d{2}/.test(description);
  if (hasTimestamps) {
    score += 10;
    checks.push({ label: "Timestamps", passed: true, detail: "Timestamps detected — great for viewer experience" });
  } else {
    checks.push({ label: "Timestamps", passed: false, detail: "No timestamps found" });
    tips.push("Add timestamps to help viewers navigate and boost SEO.");
  }

  // Links
  const hasLinks = /https?:\/\//.test(description);
  if (hasLinks) {
    score += 5;
    checks.push({ label: "External Links", passed: true, detail: "Links found in description" });
  } else {
    checks.push({ label: "External Links", passed: false, detail: "No links found" });
    tips.push("Include relevant links (social media, resources) in your description.");
  }

  // Emoji
  const hasEmoji = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u.test(description);
  if (hasEmoji) {
    score += 5;
    checks.push({ label: "Emoji Usage", passed: true, detail: "Emojis can improve readability" });
  }

  return { score: Math.min(score, 100), checks, tips };
};

const CreatorSEOAnalyzer = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [analysis, setAnalysis] = useState<ReturnType<typeof analyzeContent> | null>(null);

  const handleAnalyze = () => {
    if (!title.trim() && !description.trim()) return;
    setAnalysis(analyzeContent(title, description));
  };

  const scoreColor = (score: number) => {
    if (score >= 70) return "text-primary";
    if (score >= 40) return "text-muted-foreground";
    return "text-destructive";
  };

  return (
    <CreatorStudioLayout
      title="SEO Score Analyzer"
      metaTitle="YouTube SEO Score Analyzer – Check Your Video SEO"
      metaDescription="Analyze your YouTube video title and description for SEO optimization. Get a score out of 100 with actionable improvement tips. Free SEO checker tool."
      canonical="/creator-studio/seo-analyzer"
      breadcrumbs={[{ label: "Creator Studio", href: "/creator-studio" }, { label: "SEO Score Analyzer" }]}
      faqItems={[
        { question: "How is the SEO score calculated?", answer: "The score evaluates title length, power words, keyword alignment between title and description, CTA presence, hashtag usage, timestamps, and more. Each factor contributes points to a total score out of 100." },
        { question: "What score should I aim for?", answer: "A score of 70+ indicates strong SEO optimization. Scores between 40-70 are decent but have room for improvement. Below 40 means significant optimization is needed." },
        { question: "Does this tool guarantee YouTube rankings?", answer: "No tool can guarantee rankings. This analyzer provides optimization suggestions based on YouTube SEO best practices. Rankings also depend on content quality, viewer engagement, channel authority, and competition." },
      ]}
      seoContent={
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Mastering YouTube SEO: A Complete Guide</h2>
          <p className="text-muted-foreground mb-4">YouTube is the world's second largest search engine, and SEO (Search Engine Optimization) determines whether your videos get discovered or buried. The SEO Score Analyzer evaluates your title and description against proven optimization criteria, giving you actionable insights to improve your video's searchability.</p>
          <h3 className="font-display text-xl font-bold text-foreground mb-3">The Anatomy of a Perfect YouTube Title</h3>
          <p className="text-muted-foreground mb-4">Your title is the single most important SEO element. It should be 40-70 characters long, contain your primary keyword near the beginning, include a number or power word for CTR, and create curiosity without being clickbait. The algorithm uses your title to understand your content and match it with relevant searches.</p>
          <h3 className="font-display text-xl font-bold text-foreground mb-3">Description Optimization</h3>
          <p className="text-muted-foreground mb-4">The first 150 characters of your description appear in search results, so front-load it with your keyword and a compelling hook. Write at least 200 words total, naturally weaving in keywords, adding timestamps for navigation, including relevant hashtags, and placing a strong CTA. Your description gives YouTube context about your video's content.</p>
          <h3 className="font-display text-xl font-bold text-foreground mb-3">Keyword Strategy</h3>
          <p className="text-muted-foreground mb-4">Effective YouTube SEO starts with keyword research. Use tools like our Keyword Explorer to find terms your audience searches for. Place your primary keyword in the title, first two lines of the description, and tags. Use related keywords throughout the description to signal topical relevance without keyword stuffing.</p>
          <h3 className="font-display text-xl font-bold text-foreground mb-3">CTAs and Engagement Signals</h3>
          <p className="text-muted-foreground mb-4">YouTube's algorithm heavily weighs engagement metrics. Including clear calls-to-action for likes, comments, and subscriptions directly impacts these metrics. Ask specific questions to encourage comments, use end screens and cards for longer watch sessions, and always tell viewers what to do next.</p>
          <h3 className="font-display text-xl font-bold text-foreground mb-3">Technical SEO Elements</h3>
          <p className="text-muted-foreground mb-4">Beyond title and description, optimize your thumbnails for CTR, add closed captions for accessibility and SEO, use playlists to increase session time, and create end screens that keep viewers on your channel. Each of these elements contributes to your overall YouTube SEO performance and helps the algorithm recommend your content to more viewers.</p>
        </div>
      }
    >
      <section className="py-8">
        <div className="container px-4 max-w-2xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
            YouTube SEO Score Analyzer
          </h1>
          <p className="text-muted-foreground text-center mb-8">Paste your video title and description to get an instant SEO score with improvement tips.</p>

          <div className="space-y-4">
            <Input placeholder="Video Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Textarea placeholder="Video Description" value={description} onChange={(e) => setDescription(e.target.value)} rows={6} />
            <Button onClick={handleAnalyze} disabled={!title.trim() && !description.trim()} className="w-full">Analyze SEO Score</Button>
          </div>

          {analysis && (
            <div className="mt-8 space-y-6">
              <div className="text-center p-8 border border-border/50 rounded-xl">
                <p className="text-sm text-muted-foreground mb-2">Your SEO Score</p>
                <p className={`font-display text-6xl font-bold ${scoreColor(analysis.score)}`}>{analysis.score}</p>
                <p className="text-sm text-muted-foreground mt-2">out of 100</p>
              </div>

              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">Detailed Analysis</h3>
                <div className="space-y-2">
                  {analysis.checks.map((check, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-muted/20 border border-border/30 rounded-lg">
                      <span className={`text-lg mt-0.5 ${check.passed ? "text-primary" : "text-destructive"}`}>{check.passed ? "✓" : "✗"}</span>
                      <div>
                        <p className="text-sm font-medium text-foreground">{check.label}</p>
                        <p className="text-xs text-muted-foreground">{check.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {analysis.tips.length > 0 && (
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">Improvement Suggestions</h3>
                  <ul className="space-y-2">
                    {analysis.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-0.5">→</span> {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </CreatorStudioLayout>
  );
};

export default CreatorSEOAnalyzer;
