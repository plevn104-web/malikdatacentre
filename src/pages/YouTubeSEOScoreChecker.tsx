import { useState } from "react";
import { YouTubeToolLayout } from "@/components/youtube-tools/YouTubeToolLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Search, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

interface ScoreResult {
  score: number;
  checks: { label: string; passed: boolean; tip: string }[];
}

function analyzeSEO(title: string, description: string): ScoreResult {
  const checks: { label: string; passed: boolean; tip: string }[] = [];
  const titleTrimmed = title.trim();
  const descTrimmed = description.trim();
  const titleLower = titleTrimmed.toLowerCase();
  const descLower = descTrimmed.toLowerCase();

  // Title length
  checks.push({
    label: "Title length (30-70 chars)",
    passed: titleTrimmed.length >= 30 && titleTrimmed.length <= 70,
    tip: titleTrimmed.length < 30
      ? `Title is too short (${titleTrimmed.length} chars). Aim for 30-70 characters for better SEO.`
      : titleTrimmed.length > 70
      ? `Title is too long (${titleTrimmed.length} chars). Keep under 70 to avoid truncation.`
      : `Title length is optimal (${titleTrimmed.length} chars).`,
  });

  // Title has numbers
  checks.push({
    label: "Title contains numbers",
    passed: /\d/.test(titleTrimmed),
    tip: /\d/.test(titleTrimmed)
      ? "Numbers in titles increase CTR by up to 36%."
      : "Add numbers (e.g., '5 Tips', 'Top 10') to boost click-through rate.",
  });

  // Title has power words
  const powerWords = ["how", "best", "top", "ultimate", "guide", "secret", "proven", "free", "easy", "fast", "new", "amazing", "complete", "step"];
  const hasPowerWord = powerWords.some((w) => titleLower.includes(w));
  checks.push({
    label: "Title uses power words",
    passed: hasPowerWord,
    tip: hasPowerWord
      ? "Title includes compelling power words that drive clicks."
      : "Add power words like 'Ultimate', 'Best', 'How to', 'Free', or 'Proven' to your title.",
  });

  // Description length
  const descWordCount = descTrimmed.split(/\s+/).filter(Boolean).length;
  checks.push({
    label: "Description length (50+ words)",
    passed: descWordCount >= 50,
    tip: descWordCount < 50
      ? `Description is too short (${descWordCount} words). Aim for 150-300 words for SEO.`
      : `Description has ${descWordCount} words — good for SEO.`,
  });

  // Description has hashtags
  const hashtagCount = (descTrimmed.match(/#\w+/g) || []).length;
  checks.push({
    label: "Description includes hashtags",
    passed: hashtagCount >= 3,
    tip: hashtagCount >= 3
      ? `Found ${hashtagCount} hashtags. First 3 will appear above your title.`
      : `Only ${hashtagCount} hashtag(s) found. Add 3-5 relevant hashtags for discoverability.`,
  });

  // Description has CTA
  const ctaWords = ["subscribe", "like", "comment", "share", "click", "check out", "link", "watch"];
  const hasCta = ctaWords.some((w) => descLower.includes(w));
  checks.push({
    label: "Description includes CTA",
    passed: hasCta,
    tip: hasCta
      ? "Description includes a call-to-action — great for engagement."
      : "Add a CTA (e.g., 'Subscribe for more', 'Like and comment') to boost engagement.",
  });

  // Keyword in title appears in description
  const titleWords = titleLower.split(/\s+/).filter((w) => w.length > 3);
  const keywordOverlap = titleWords.filter((w) => descLower.includes(w)).length;
  const overlapRatio = titleWords.length > 0 ? keywordOverlap / titleWords.length : 0;
  checks.push({
    label: "Keyword alignment (title ↔ description)",
    passed: overlapRatio >= 0.4,
    tip: overlapRatio >= 0.4
      ? "Good keyword alignment between title and description."
      : "Include more title keywords in your description for better SEO relevance.",
  });

  // Description has timestamps
  const hasTimestamps = /\d+:\d{2}/.test(descTrimmed);
  checks.push({
    label: "Description includes timestamps",
    passed: hasTimestamps,
    tip: hasTimestamps
      ? "Timestamps detected — enables YouTube chapters for better UX."
      : "Add timestamps (e.g., '0:00 Intro') to enable chapters and boost engagement.",
  });

  // Title capitalization
  const words = titleTrimmed.split(/\s+/);
  const capitalizedWords = words.filter((w) => w[0] === w[0]?.toUpperCase()).length;
  const isProperCase = capitalizedWords / words.length >= 0.5;
  checks.push({
    label: "Title uses proper capitalization",
    passed: isProperCase,
    tip: isProperCase
      ? "Title capitalization looks professional."
      : "Capitalize the first letter of major words in your title for a professional look.",
  });

  // Description has links
  const hasLinks = /https?:\/\//.test(descTrimmed);
  checks.push({
    label: "Description includes links",
    passed: hasLinks,
    tip: hasLinks
      ? "Links detected — great for driving traffic to other content."
      : "Add relevant links (social media, related videos, website) to your description.",
  });

  const passedCount = checks.filter((c) => c.passed).length;
  const score = Math.round((passedCount / checks.length) * 100);

  return { score, checks };
}

const YouTubeSEOScoreChecker = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState<ScoreResult | null>(null);

  const handleAnalyze = () => {
    if (!title.trim() || !description.trim()) return;
    setResult(analyzeSEO(title, description));
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Needs Work";
    return "Poor";
  };

  return (
    <YouTubeToolLayout
      title="YouTube SEO Score Checker"
      metaTitle="Free YouTube SEO Score Checker – Analyze & Improve"
      metaDescription="Analyze your YouTube title and description for SEO optimization. Get a score out of 100 with actionable improvement suggestions. Free tool."
      canonical="/youtube-tools/seo-score-checker"
      breadcrumbs={[{ label: "YouTube Tools", href: "/youtube-tools" }, { label: "SEO Score Checker" }]}
      faqItems={[
        { question: "What does the YouTube SEO score measure?", answer: "Our SEO score analyzes 10 key factors including title length, power word usage, description length, keyword alignment, hashtag usage, CTA presence, timestamps, links, capitalization, and number usage. Each factor is weighted equally, giving you a score from 0-100 with specific improvement suggestions." },
        { question: "What is a good YouTube SEO score?", answer: "A score of 80+ is excellent and means your metadata is well-optimized. 60-79 is good but has room for improvement. Below 60 means there are significant optimization opportunities you're missing. Focus on the failed checks first for the biggest impact on your video's discoverability." },
        { question: "Does SEO guarantee more views on YouTube?", answer: "SEO optimization increases your chances of being discovered in search and suggested videos, but it's not a guarantee. Content quality, thumbnail design, upload consistency, and audience engagement all play major roles. Think of SEO as ensuring your great content gets the visibility it deserves." },
      ]}
      seoContent={<SEOCheckerContent />}
    >
      <section className="pb-16">
        <div className="container px-4 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">YouTube SEO Score Checker</h1>
            <p className="text-muted-foreground">Analyze your title and description for SEO optimization and get actionable suggestions.</p>
          </div>

          <div className="border border-border/50 rounded-xl p-6 md:p-8">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Video Title *</label>
                <Input
                  placeholder="Paste your YouTube video title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={200}
                />
                <p className="text-xs text-muted-foreground mt-1">{title.length} characters</p>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Video Description *</label>
                <Textarea
                  placeholder="Paste your YouTube video description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  maxLength={5000}
                  className="bg-muted/20"
                />
                <p className="text-xs text-muted-foreground mt-1">{description.split(/\s+/).filter(Boolean).length} words</p>
              </div>
              <Button onClick={handleAnalyze} disabled={!title.trim() || !description.trim()} className="w-full bg-[#FF0000] hover:bg-[#FF0000]/90 text-white">
                <Search className="h-4 w-4 mr-2" />
                Analyze SEO Score
              </Button>
            </div>

            {result && (
              <div className="mt-8">
                <div className="text-center mb-6">
                  <p className={`font-display text-6xl font-bold ${getScoreColor(result.score)}`}>{result.score}</p>
                  <p className={`text-lg font-medium ${getScoreColor(result.score)}`}>{getScoreLabel(result.score)}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {result.checks.filter((c) => c.passed).length} of {result.checks.length} checks passed
                  </p>
                </div>

                <div className="space-y-3">
                  {result.checks.map((check, i) => (
                    <div key={i} className={`flex items-start gap-3 p-3 rounded-lg border ${check.passed ? "border-green-500/20 bg-green-500/5" : "border-red-500/20 bg-red-500/5"}`}>
                      {check.passed ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="text-sm font-medium text-foreground">{check.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{check.tip}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </YouTubeToolLayout>
  );
};

const SEOCheckerContent = () => (
  <div className="container px-4 max-w-3xl mx-auto">
    <h2 className="font-display text-2xl font-bold text-foreground mb-4">YouTube SEO: A Complete Optimization Guide</h2>
    <p className="text-muted-foreground mb-4">YouTube SEO (Search Engine Optimization) is the practice of optimizing your video metadata — titles, descriptions, tags, and thumbnails — to improve visibility in YouTube search results and suggested videos. With over 500 hours of video uploaded every minute, proper SEO is essential for standing out and getting your content discovered by the right audience.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">Why YouTube SEO Matters</h3>
    <p className="text-muted-foreground mb-4">YouTube is the world's second-largest search engine, processing over 3 billion searches per month. Unlike social media where content has a short lifespan, well-optimized YouTube videos can generate views for years. A video ranking on page one for a competitive keyword can drive thousands of views daily on autopilot. Our SEO Score Checker helps you optimize before publishing to maximize your video's long-term potential.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">The Anatomy of an Optimized Title</h3>
    <p className="text-muted-foreground mb-4">Your title is the most important ranking factor for YouTube search. Keep it between 30-70 characters to avoid truncation. Place your primary keyword near the beginning. Use numbers and power words to increase click-through rate. Avoid all-caps and excessive punctuation. The best titles balance SEO keywords with emotional appeal — they rank well AND get clicks.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">Crafting the Perfect Description</h3>
    <p className="text-muted-foreground mb-4">Descriptions provide context that helps YouTube understand and rank your video. Write at least 150-300 words with your primary keyword in the first 25 words. Include timestamps to enable chapters, which improve user experience and can earn featured snippets. Add 3-5 relevant hashtags — the first three appear above your title. Include links to related content, social media, and resources mentioned in the video.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">Keyword Research for YouTube</h3>
    <p className="text-muted-foreground mb-4">YouTube keyword research differs from Google keyword research. Use YouTube's search suggest feature — type your topic and note the autocomplete suggestions. These represent actual searches people make. Check competitor videos for keywords they target. Use our Tag Generator and Title Generator tools to discover relevant keywords. Focus on long-tail keywords (3-5 words) for less competition and higher conversion.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">The Role of Engagement Signals</h3>
    <p className="text-muted-foreground mb-4">Beyond metadata, YouTube considers engagement signals: likes, comments, shares, and click-through rate. Include clear calls-to-action in your description to encourage these interactions. Ask a specific question to prompt comments. The first 48 hours after upload are critical — YouTube tests your video with a small audience and expands distribution based on engagement metrics.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">Common SEO Mistakes to Avoid</h3>
    <p className="text-muted-foreground mb-4">Empty or one-line descriptions waste valuable ranking opportunities. Keyword stuffing (repeating the same keyword unnaturally) can trigger penalties. Misleading titles that don't match content increase bounce rate and hurt future recommendations. Ignoring thumbnails — even with perfect SEO, a poor thumbnail means low CTR. Not including timestamps misses a chance for chapters and enhanced search presence.</p>

    <h3 className="font-display text-xl font-bold text-foreground mb-3 mt-6">Measuring and Improving SEO Performance</h3>
    <p className="text-muted-foreground mb-4">Monitor your SEO performance in YouTube Studio under the Traffic Sources report. Track which keywords drive views to your videos. Compare CTR across videos to identify which title and thumbnail combinations work best. Re-optimize underperforming videos by updating titles, descriptions, and thumbnails — YouTube re-evaluates videos when metadata changes. Use our SEO Score Checker regularly to maintain optimization standards across all your uploads.</p>
  </div>
);

export default YouTubeSEOScoreChecker;
