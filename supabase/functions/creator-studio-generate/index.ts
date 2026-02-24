import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const TOOL_PROMPTS: Record<string, (inputs: Record<string, string>) => string> = {
  "keyword-explorer": (inputs) => `Act as a YouTube SEO expert. For the keyword "${inputs.keyword}", generate:
1. 15 long-tail keyword suggestions related to this topic
2. For each keyword, indicate:
   - Search intent type: one of "Informational", "Commercial", "Navigational", "Transactional"
   - Competition level: one of "Low", "Medium", "High"
3. Also suggest 5 related topics

Return ONLY a JSON object with this structure:
{
  "keywords": [{"keyword": "...", "intent": "...", "competition": "..."}],
  "relatedTopics": ["topic1", "topic2", ...]
}
No explanation, no markdown.`,

  "tag-optimization": (inputs) => `Generate exactly 40 SEO-optimized YouTube tags for the keyword "${inputs.keyword}".

Rules:
- First 20 should be short-tail tags (1-2 words)
- Last 20 should be long-tail tags (3-5 words)
- Include the main keyword and close variations first
- Make them relevant and searchable
- No hashtag symbols

Return ONLY a JSON object:
{
  "shortTail": ["tag1", "tag2", ...],
  "longTail": ["tag1", "tag2", ...]
}
No explanation.`,

  "competitor-breakdown": (inputs) => `Analyze this YouTube video title as a competitor analysis expert: "${inputs.title}"

Provide:
1. Title structure breakdown (what pattern/formula is used)
2. Hook style detection (what type of hook: curiosity, shock, how-to, list, etc.)
3. Keyword density analysis (main keywords identified)
4. 5 specific improvement suggestions for a competing video

Return ONLY a JSON object:
{
  "titleStructure": "description of the structure pattern",
  "hookStyle": "type of hook used and why it works",
  "mainKeywords": ["keyword1", "keyword2", ...],
  "improvementSuggestions": ["suggestion1", "suggestion2", ...]
}
No explanation.`,

  "ctr-assistant": (inputs) => `As a YouTube CTR optimization expert, analyze this title: "${inputs.title}"${inputs.thumbnailText ? ` and thumbnail text: "${inputs.thumbnailText}"` : ""}.

Provide:
1. CTR improvement suggestions (5 specific tips)
2. Emotional word enhancements (suggest powerful emotional words to add/replace)
3. Curiosity improvement tips (how to create more curiosity gap)
4. 3 improved title alternatives
5. 3 improved thumbnail text alternatives

Return ONLY a JSON object:
{
  "ctrTips": ["tip1", "tip2", ...],
  "emotionalWords": ["word1", "word2", ...],
  "curiosityTips": ["tip1", "tip2", ...],
  "improvedTitles": ["title1", "title2", "title3"],
  "improvedThumbnailTexts": ["text1", "text2", "text3"]
}
No explanation.`,

  "script-builder": (inputs) => `As a YouTube scriptwriter, create a video script for:
Topic: "${inputs.topic}"
Goal: ${inputs.goal || "educate and engage viewers"}

Generate a structured script with:
1. A powerful hook (first 15 seconds)
2. Introduction section
3. 3-5 main content sections with talking points
4. A strong CTA ending

Return ONLY a JSON object:
{
  "hook": "the opening hook text",
  "introduction": "intro paragraph",
  "sections": [{"title": "section title", "content": "section content"}],
  "cta": "closing CTA text"
}
No explanation.`,

  "content-repurposing": (inputs) => `Repurpose the following content into multiple formats:

Original content: "${inputs.content}"

Generate:
1. A YouTube video description (with CTA and hashtags)
2. A LinkedIn post (professional tone, 150-200 words)
3. An Instagram caption (casual, with emojis, under 150 words)
4. A short video script (60 seconds, for Shorts/Reels)

Return ONLY a JSON object:
{
  "youtubeDescription": "...",
  "linkedinPost": "...",
  "instagramCaption": "...",
  "shortVideoScript": "..."
}
No explanation.`,

  "content-planner": (inputs) => `Create a 30-day YouTube content strategy plan for:
Niche: "${inputs.niche}"
Upload frequency: ${inputs.frequency || "3 times per week"}
Goal: ${inputs.goal || "grow subscribers and engagement"}

Generate:
- 4 weekly themes
- Video titles for each upload day
- Brief content notes for each video

Return ONLY a JSON object:
{
  "weeks": [
    {
      "weekNumber": 1,
      "theme": "weekly theme",
      "videos": [{"day": "Monday", "title": "video title", "notes": "brief content notes"}]
    }
  ]
}
No explanation.`,
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { toolType, inputs } = await req.json();

    if (!toolType || !TOOL_PROMPTS[toolType]) {
      return new Response(JSON.stringify({ error: "Invalid tool type" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!inputs || Object.values(inputs).every((v) => !v)) {
      return new Response(JSON.stringify({ error: "Input is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    for (const [key, val] of Object.entries(inputs)) {
      if (typeof val === "string" && val.length > 2000) {
        return new Response(JSON.stringify({ error: `${key} is too long (max 2000 chars)` }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const prompt = TOOL_PROMPTS[toolType](inputs as Record<string, string>);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          { role: "system", content: "You are a YouTube growth and SEO expert. Always respond with valid JSON only. No markdown, no explanation, no code blocks." },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI error:", response.status, errorText);
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "{}";

    let result: unknown;
    try {
      const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      result = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse AI response:", content);
      result = { error: "Failed to parse response" };
    }

    return new Response(JSON.stringify({ result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Creator studio error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
