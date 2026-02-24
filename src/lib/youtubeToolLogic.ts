// Local logic-based generators for YouTube tools — no API calls needed

const TITLE_PATTERNS = [
  (kw: string) => `How to ${kw} in 2026`,
  (kw: string) => `Best ${kw} for Beginners`,
  (kw: string) => `${kw} – Ultimate Guide`,
  (kw: string) => `Top 10 ${kw} Tips You Need`,
  (kw: string) => `${kw} Mistakes to Avoid`,
  (kw: string) => `Why ${kw} Is Important in 2026`,
  (kw: string) => `${kw} Tutorial – Step by Step`,
  (kw: string) => `7 Ways to Improve ${kw}`,
  (kw: string) => `${kw} for Beginners – Complete Guide`,
  (kw: string) => `The Secret to ${kw} Nobody Tells You`,
  (kw: string) => `5 ${kw} Hacks That Actually Work`,
  (kw: string) => `${kw} vs Competition – Honest Review`,
  (kw: string) => `Stop Making These ${kw} Mistakes`,
  (kw: string) => `Everything You Need to Know About ${kw}`,
  (kw: string) => `${kw} Tips for Faster Results`,
  (kw: string) => `Is ${kw} Worth It in 2026?`,
  (kw: string) => `How I Mastered ${kw} in 30 Days`,
  (kw: string) => `${kw} Explained in 10 Minutes`,
  (kw: string) => `Beginner to Pro – ${kw} Guide`,
  (kw: string) => `${kw} – What No One Tells You`,
];

function capitalize(str: string): string {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

export function generateTitlesLocally(keyword: string): string[] {
  const kw = capitalize(keyword.trim());
  const seen = new Set<string>();
  const results: string[] = [];

  for (const pattern of TITLE_PATTERNS) {
    if (results.length >= 15) break;
    let title = pattern(kw);
    if (title.length > 70) title = title.slice(0, 67) + "...";
    const lower = title.toLowerCase();
    if (!seen.has(lower)) {
      seen.add(lower);
      results.push(title);
    }
  }
  return results;
}

const TAG_SUFFIXES = [
  "", "tutorial", "guide", "tips", "2026", "for beginners",
  "explained", "how to", "best", "review", "top", "step by step",
  "tricks", "course", "learn", "free", "pro tips", "advanced",
  "mistakes", "vs", "comparison", "what is", "why", "examples",
  "strategy", "tools", "resources", "hacks", "masterclass", "secrets",
];

export function generateTagsLocally(keyword: string): string[] {
  const kw = keyword.trim().toLowerCase();
  const words = kw.split(/\s+/);
  const seen = new Set<string>();
  const tags: string[] = [];

  const add = (tag: string) => {
    const t = tag.trim().toLowerCase();
    if (t && !seen.has(t) && t.length <= 50) {
      seen.add(t);
      tags.push(tag.trim());
    }
  };

  // Exact match
  add(kw);

  // Long-tail with suffixes
  for (const suffix of TAG_SUFFIXES) {
    if (tags.length >= 30) break;
    if (suffix) {
      add(`${kw} ${suffix}`);
      add(`${suffix} ${kw}`);
    }
  }

  // Question variations
  add(`how to ${kw}`);
  add(`what is ${kw}`);
  add(`why ${kw}`);
  add(`best ${kw} 2026`);

  // Individual words + keyword combos
  if (words.length > 1) {
    for (const w of words) {
      if (w.length > 2) add(w);
    }
  }

  return tags.slice(0, 30);
}

const CONTENT_TYPES = ["Educational", "Comparison", "Problem Solving", "Trending", "Authority"];
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const WEEK_THEMES = [
  (n: string) => `${n} Fundamentals`,
  (n: string) => `Advanced ${n} Techniques`,
  (n: string) => `${n} Trends & News`,
  (n: string) => `${n} Mastery & Recap`,
];
const VIDEO_TEMPLATES: Record<string, (niche: string, i: number) => { title: string; notes: string }> = {
  Educational: (n, i) => ({
    title: [`How to Get Started with ${n}`, `${n} Explained Simply`, `Beginner's Guide to ${n}`, `Top Concepts in ${n}`, `${n} 101 – What You Need to Know`][i % 5],
    notes: "Focus on teaching core concepts with clear examples. Use screen recordings or slides.",
  }),
  Comparison: (n, i) => ({
    title: [`${n} vs Alternatives – Honest Comparison`, `Best ${n} Tools in 2026`, `${n} – Free vs Paid Options`, `Top 5 ${n} Resources Compared`, `Which ${n} Method Is Best?`][i % 5],
    notes: "Compare options fairly with pros/cons. Include personal recommendation at the end.",
  }),
  "Problem Solving": (n, i) => ({
    title: [`Fix These Common ${n} Mistakes`, `${n} Troubleshooting Guide`, `Why Your ${n} Isn't Working`, `${n} Problems & Solutions`, `5 ${n} Issues Everyone Faces`][i % 5],
    notes: "Address pain points your audience faces. Provide actionable solutions they can apply immediately.",
  }),
  Trending: (n, i) => ({
    title: [`${n} Trends You Can't Ignore in 2026`, `What's New in ${n} This Month`, `${n} Industry Update`, `Upcoming ${n} Changes`, `Is ${n} Still Worth It in 2026?`][i % 5],
    notes: "Cover recent developments and give your perspective. Timely content gets higher initial traction.",
  }),
  Authority: (n, i) => ({
    title: [`My ${n} Journey – Lessons Learned`, `${n} Case Study – Real Results`, `Expert ${n} Tips from Experience`, `The Truth About ${n}`, `${n} Secrets from a Pro`][i % 5],
    notes: "Share personal experience and results. Build trust by being transparent about what worked and what didn't.",
  }),
};

export function generateContentPlanLocally(
  niche: string,
  uploadsPerWeek: number
): { weeks: { weekNumber: number; theme: string; videos: { day: string; title: string; notes: string }[] }[] } {
  const n = capitalize(niche.trim());
  const freq = Math.min(Math.max(uploadsPerWeek || 3, 1), 7);
  const uploadDays = DAYS.slice(0, freq);

  const weeks = Array.from({ length: 4 }, (_, wi) => {
    const theme = WEEK_THEMES[wi](n);
    const contentType = CONTENT_TYPES[wi % CONTENT_TYPES.length];
    const videos = uploadDays.map((day, di) => {
      const typeIndex = (wi + di) % CONTENT_TYPES.length;
      const type = CONTENT_TYPES[typeIndex];
      const template = VIDEO_TEMPLATES[type](n, wi * freq + di);
      return { day, title: template.title, notes: template.notes };
    });
    return { weekNumber: wi + 1, theme, videos };
  });

  return { weeks };
}
