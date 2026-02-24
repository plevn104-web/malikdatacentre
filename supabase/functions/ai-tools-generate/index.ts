import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const TOOL_PROMPTS: Record<string, (inputs: Record<string, string>) => string> = {
  "business-idea-generator": (i) =>
    `Generate 5 detailed startup ideas for the ${i.industry} industry with a ${i.budget} budget targeting ${i.targetMarket}. For each idea return JSON with fields: name, description, revenueModel, targetAudience, riskLevel (Low/Medium/High), estimatedStartupCost. Return a JSON array of 5 objects. Only return the JSON array, no other text.`,

  "pricing-strategy": (i) =>
    `Generate a pricing strategy for a ${i.productType} product at ${i.marketLevel} market level targeting ${i.targetCustomer}. Return JSON with fields: pricingModels (array of {model, description, pros, cons}), competitiveAnalysis (string), psychologicalPricing (array of tips), tieredPricing ({basic: {price, features}, pro: {price, features}, enterprise: {price, features}}). Only return the JSON object, no other text.`,

  "market-research": (i) =>
    `Provide a market research summary for "${i.topic}"${i.region ? ` in ${i.region}` : ""}. Return JSON with fields: overview (string), trends (array of strings), growthPotential (string), targetDemographics (array of strings), keyChallenges (array of strings), monetizationInsights (array of strings). Only return the JSON object, no other text.`,

  "business-plan": (i) =>
    `Generate a business plan for: "${i.businessIdea}" targeting ${i.targetMarket} with revenue model: ${i.revenueModel}. Return JSON with fields: executiveSummary (string), marketAnalysis (string), marketingStrategy (string), operationsPlan (string), financialOverview (string). Only return the JSON object, no other text.`,

  "instagram-caption": (i) =>
    `Generate 5 Instagram captions for: "${i.topic}" with tone: ${i.tone || "engaging"}. Return JSON array of objects with fields: caption, hashtags (array of 10 strings). Only return the JSON array, no other text.`,

  "linkedin-post": (i) =>
    `Generate 3 LinkedIn posts about: "${i.topic}" with tone: ${i.tone || "professional"}. Return JSON array of objects with fields: post, hashtags (array of 5 strings). Only return the JSON array, no other text.`,

  "twitter-thread": (i) =>
    `Generate a Twitter/X thread (7-10 tweets) about: "${i.topic}". Return JSON object with fields: tweets (array of strings), hashtags (array of 5 strings). Only return the JSON object, no other text.`,

  "hashtag-research": (i) =>
    `Generate hashtag research for: "${i.topic}" on ${i.platform || "Instagram"}. Return JSON with fields: trending (array of 10), niche (array of 10), broad (array of 10), tips (array of 3 strings). Only return the JSON object, no other text.`,

  "text-summarizer": (i) =>
    `Summarize the following text. Return JSON with fields: keyPoints (array of strings), bulletSummary (array of strings), shortSummary (string under 100 words), detailedSummary (string under 300 words). Text: "${i.text.slice(0, 5000)}". Only return the JSON object, no other text.`,

  "paraphrasing": (i) =>
    `Paraphrase the following text in ${i.tone || "formal"} tone. Improve clarity. Return JSON with fields: paraphrased (string), changes (array of strings describing improvements). Text: "${i.text.slice(0, 3000)}". Only return the JSON object, no other text.`,

  "pdf-to-notes": (i) =>
    `Convert the following extracted text into structured study notes. Return JSON with fields: title (string), keyPoints (array of strings), summary (string), sections (array of {heading, content}). Text: "${i.text.slice(0, 5000)}". Only return the JSON object, no other text.`,

  "plagiarism-checker": (i) =>
    `Analyze the following text for originality. Check for common phrases, clichés, and generic patterns. Return JSON with fields: similarityScore (number 0-100), flaggedPhrases (array of {phrase, reason}), verdict (string: "Likely Original" | "Possibly Unoriginal" | "Likely Unoriginal"), suggestions (array of strings). Text: "${i.text.slice(0, 3000)}". Only return the JSON object, no other text.`,

  "blog-intro": (i) =>
    `Generate 5 blog introduction paragraphs for the topic: "${i.topic}" targeting keyword: "${i.keyword || i.topic}". Return JSON array of objects with fields: intro (string), style (string like "Story-based", "Statistical", "Question-based", etc). Only return the JSON array, no other text.`,

  "meta-description": (i) =>
    `Generate 5 SEO meta descriptions for: "${i.topic}" with keyword: "${i.keyword || i.topic}". Each must be under 160 characters. Return JSON array of objects with fields: description (string), characterCount (number). Only return the JSON array, no other text.`,

  "faq-generator": (i) =>
    `Generate 10 FAQ questions and answers for: "${i.topic}". Return JSON array of objects with fields: question (string), answer (string). Only return the JSON array, no other text.`,

  "keyword-cluster": (i) =>
    `Generate keyword clusters for the seed keyword: "${i.keyword}". Return JSON with fields: clusters (array of {clusterName, keywords (array of strings), searchIntent (string)}). Generate 5 clusters with 5-8 keywords each. Only return the JSON object, no other text.`,

  "proposal-generator": (i) =>
    `Generate a freelance proposal for: "${i.projectDescription}" with budget: ${i.budget || "flexible"}. Return JSON with fields: subject (string), introduction (string), approach (string), timeline (string), pricing (string), whyMe (string), closing (string). Only return the JSON object, no other text.`,

  "client-brief-analyzer": (i) =>
    `Analyze this client brief and extract key information: "${i.brief.slice(0, 3000)}". Return JSON with fields: projectType (string), objectives (array of strings), deliverables (array of strings), estimatedScope (string), potentialChallenges (array of strings), suggestedQuestions (array of strings to ask the client). Only return the JSON object, no other text.`,

  "contract-template": (i) =>
    `Generate a freelance contract template for: ${i.serviceType} service with scope: "${i.scope}". Return JSON with fields: title (string), sections (array of {heading, content}). Include scope, payment terms, revisions, timeline, IP rights, termination, confidentiality. Only return the JSON object, no other text.`,

  "landing-page-copy": (i) =>
    `Generate landing page copy for: "${i.product}" targeting: ${i.audience || "general audience"}. Return JSON with fields: headline (string), subheadline (string), heroText (string), features (array of {title, description}), testimonialPrompts (array of strings), ctaText (string), urgencyText (string). Only return the JSON object, no other text.`,

  "sales-funnel": (i) =>
    `Create a sales funnel plan for: "${i.product}" targeting: ${i.audience || "general audience"}. Return JSON with fields: stages (array of {name, goal, content, channels (array), metrics (array)}). Include awareness, interest, decision, action stages. Only return the JSON object, no other text.`,

  "product-description": (i) =>
    `Generate 3 product descriptions for: "${i.product}" with key features: "${i.features || "premium quality"}". Return JSON array of objects with fields: description (string), tone (string like "Luxury", "Conversational", "Technical"), wordCount (number). Only return the JSON array, no other text.`,

  "chatbot-flow": (i) =>
    `Design a chatbot conversation flow for: "${i.purpose}" in the ${i.industry || "general"} industry. Return JSON with fields: greeting (string), flows (array of {trigger, responses (array of strings), followUp (string)}), fallbackMessage (string), handoffMessage (string). Generate 5-7 flows. Only return the JSON object, no other text.`,
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { toolType, inputs } = await req.json();

    if (!toolType || !inputs) {
      return new Response(JSON.stringify({ error: "Missing toolType or inputs" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Input validation
    for (const [key, val] of Object.entries(inputs)) {
      if (typeof val === "string" && val.length > 6000) {
        return new Response(JSON.stringify({ error: `Input "${key}" exceeds maximum length` }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const promptFn = TOOL_PROMPTS[toolType];
    if (!promptFn) {
      return new Response(JSON.stringify({ error: "Unknown tool type" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const userPrompt = promptFn(inputs as Record<string, string>);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          {
            role: "system",
            content:
              "You are a professional business and content AI assistant. Always return valid JSON only. No markdown, no backticks, no explanation text. Just the raw JSON.",
          },
          { role: "user", content: userPrompt },
        ],
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please try later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      return new Response(JSON.stringify({ error: "AI generation failed" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return new Response(JSON.stringify({ error: "No response from AI" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Parse JSON from response, stripping any markdown
    let parsed;
    try {
      const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch {
      console.error("JSON parse error, raw:", content.slice(0, 500));
      return new Response(JSON.stringify({ error: "Failed to parse AI response" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ result: parsed }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return new Response(JSON.stringify({ error: "Request timed out. Please try again." }), {
        status: 504,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    console.error("ai-tools-generate error:", err);
    return new Response(JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
