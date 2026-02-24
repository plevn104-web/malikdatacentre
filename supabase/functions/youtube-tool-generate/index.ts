import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const TOOL_PROMPTS: Record<string, (inputs: Record<string, string>) => string> = {
  "title-generator": (inputs) => `Generate exactly 15 SEO-optimized YouTube video titles for the keyword "${inputs.keyword}"${inputs.niche ? ` in the ${inputs.niche} niche` : ""}.

Rules:
- Each title must be under 70 characters
- Mix these styles: emotional hooks, curiosity gaps, list-style (numbers), how-to, SEO-keyword-first
- Make them click-worthy but not clickbait
- Include the primary keyword naturally

Return ONLY a JSON array of 15 title strings. No explanation.`,

  "description-generator": (inputs) => `Generate 3 SEO-optimized YouTube video descriptions for the keyword "${inputs.keyword}".
Target audience: ${inputs.audience || "general YouTube viewers"}
Tone: ${inputs.tone || "Professional"}

Each description must:
- Be 150-300 words
- Include a strong hook in the first 2 lines (above the fold)
- Include a clear CTA (subscribe, like, comment)
- Include 3-5 relevant hashtags at the end
- Naturally place the keyword 2-3 times
- Include a timestamps placeholder section
- Include social media links placeholder

Return ONLY a JSON array of 3 description strings. No explanation.`,

  "tag-generator": (inputs) => `Generate exactly 30 SEO-optimized YouTube tags for the keyword "${inputs.keyword}".

Rules:
- Mix short tags (1-2 words) and long-tail tags (3-5 words)
- Include variations, synonyms, and related terms
- Include the main keyword and close variations first
- Make them relevant and searchable
- No hashtag symbols, just plain tags

Return ONLY a JSON array of 30 tag strings. No explanation.`,

  "thumbnail-headline": (inputs) => `Generate exactly 20 high-CTR YouTube thumbnail headline texts for the video topic: "${inputs.topic}".

Rules:
- Each headline must be 3-6 words MAXIMUM (thumbnail text must be short)
- Use emotional triggers: shock, curiosity, urgency, excitement
- Use power words: SECRET, SHOCKING, FINALLY, INSANE, etc.
- Make them visually impactful when displayed on a thumbnail
- Mix styles: questions, statements, revelations, warnings

Return ONLY a JSON array of 20 headline strings. No explanation.`,

  "hashtag-generator": (inputs) => `Generate exactly 20 relevant YouTube hashtags for the keyword "${inputs.keyword}".

Rules:
- Each hashtag must start with #
- Mix broad/popular hashtags and niche-specific ones
- Include trending format hashtags
- Keep them relevant and searchable
- No spaces in hashtags

Return ONLY a JSON array of 20 hashtag strings. No explanation.`,
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

    if (!inputs || !inputs.keyword && !inputs.topic) {
      return new Response(JSON.stringify({ error: "Input is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate input lengths
    for (const [key, val] of Object.entries(inputs)) {
      if (typeof val === "string" && val.length > 200) {
        return new Response(JSON.stringify({ error: `${key} is too long (max 200 chars)` }), {
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
          { role: "system", content: "You are a YouTube SEO expert. Always respond with valid JSON arrays only. No markdown, no explanation, no code blocks." },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "[]";
    
    // Parse the JSON from the response
    let results: string[];
    try {
      const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      results = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse AI response:", content);
      results = content.split("\n").filter((l: string) => l.trim()).map((l: string) => l.replace(/^\d+\.\s*/, "").replace(/^["']|["']$/g, "").trim());
    }

    return new Response(JSON.stringify({ results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("YouTube tool error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
