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

  "homework-helper": (i) =>
    `Help solve this ${i.subject ? i.subject + " " : ""}question/problem: "${i.question.slice(0, 3000)}". Return JSON with fields: stepByStep (array of {step (number), explanation (string)}), summary (string under 80 words), concept (string explaining the underlying concept). Use simple language a student can understand. Only return the JSON object, no other text.`,

  "letter-writer": (i) =>
    `Write a ${i.letterType} letter with these details: "${i.details.slice(0, 2000)}". Tone: ${i.tone || "Formal"}. Return JSON with fields: subject (string), body (string with proper formatting using newlines), closing (string), signatureFormat (string). Make it professional and properly structured. Only return the JSON object, no other text.`,

  "whatsapp-improver": (i) =>
    `Improve this WhatsApp message in ${i.tone || "Polite"} tone: "${i.message.slice(0, 1000)}". Return JSON with fields: variations (array of 3 objects with {improved (string), toneApplied (string), changesMade (string)}). Keep messages short and natural. Only return the JSON object, no other text.`,

  "study-planner": (i) =>
    `Create a study plan for exams on ${i.examDate}. Subjects: ${i.subjects}. Available: ${i.dailyHours} hours/day. Return JSON with fields: weeks (array of {weekNumber (number), days (array of {day (string), subjects (array of {subject (string), hours (number), focus (string)})})}), revisionDays (array of strings), tips (array of 5 motivation tips). Only return the JSON object, no other text.`,

  "travel-planner": (i) =>
    `Plan a ${i.days}-day trip to ${i.destination} with ${i.budget || "medium"} budget. Return JSON with fields: itinerary (array of {day (number), title (string), activities (array of {time (string), activity (string), tip (string)})}), budgetTips (array of 5 strings), travelTips (array of 5 strings). Only return the JSON object, no other text.`,

  "decision-helper": (i) =>
    `Help decide between Option A: "${i.optionA}" and Option B: "${i.optionB}". Context: "${i.context || "general decision"}". Return JSON with fields: optionA ({pros (array), cons (array), riskLevel (string)}), optionB ({pros (array), cons (array), riskLevel (string)}), comparison (string), recommendation (string). Only return the JSON object, no other text.`,

  "side-hustle-finder": (i) =>
    `Suggest 5 side hustle ideas for someone with skills: "${i.skills}", available ${i.timePerWeek || "10"} hours/week, budget: ${i.budget || "low"}. Return JSON array of 5 objects with fields: name (string), description (string), earningPotential (string), startingSteps (array of 3 strings), riskLevel (string: Low/Medium/High), investmentNeeded (string). Only return the JSON array, no other text.`,

  "code-explainer": (i) =>
    `Explain this code line by line in simple language:\n\`\`\`\n${i.code.slice(0, 4000)}\n\`\`\`\nReturn JSON with fields: lines (array of {lineNumber (number), code (string), explanation (string)}), summary (string), improvements (array of strings), edgeCases (array of strings). Only return the JSON object, no other text.`,

  "code-debugger": (i) =>
    `Debug this code:\n\`\`\`\n${i.code.slice(0, 4000)}\n\`\`\`\nError: "${i.error?.slice(0, 500) || "unknown"}"\nReturn JSON with fields: errorExplanation (string), rootCause (string), fixSuggestions (array of strings), correctedCode (string). Only return the JSON object, no other text.`,

  "code-optimizer": (i) =>
    `Optimize this code for performance and readability:\n\`\`\`\n${i.code.slice(0, 4000)}\n\`\`\`\nReturn JSON with fields: suggestions (array of {issue (string), fix (string)}), optimizedCode (string), bestPractices (array of strings). Only return the JSON object, no other text.`,

  "code-converter": (i) =>
    `Convert this code to ${i.targetLanguage}:\n\`\`\`\n${i.code.slice(0, 4000)}\n\`\`\`\nReturn JSON with fields: convertedCode (string), notes (array of strings explaining key differences). Only return the JSON object, no other text.`,

  "regex-generator": (i) =>
    `Generate a regex pattern for: "${i.description.slice(0, 500)}". Return JSON with fields: pattern (string), flags (string), explanation (string describing each part), testExamples (array of {input (string), matches (boolean)}). Only return the JSON object, no other text.`,

  "api-doc-generator": (i) =>
    `Generate API documentation for this code:\n\`\`\`\n${i.code.slice(0, 4000)}\n\`\`\`\nReturn JSON with fields: name (string), description (string), parameters (array of {name (string), type (string), required (boolean), description (string)}), returnType (string), exampleUsage (string), notes (array of strings). Only return the JSON object, no other text.`,

  "sql-generator": (i) =>
    `Generate an SQL query for: "${i.description.slice(0, 1000)}". Return JSON with fields: query (string), explanation (string), notes (array of strings). Only return the JSON object, no other text.`,

  "git-commit-generator": (i) =>
    `Generate git commit messages for these changes: "${i.description.slice(0, 1000)}". Return JSON with fields: conventional (string in conventional commit format), short (string under 50 chars), detailed (string with body). Only return the JSON object, no other text.`,

  "readme-generator": (i) =>
    `Generate a README.md for this project: "${i.description.slice(0, 2000)}". Return JSON with fields: title (string), description (string), installation (string), usage (string), features (array of strings), contributing (string), license (string). Only return the JSON object, no other text.`,

  "code-complexity": (i) =>
    `Analyze code complexity:\n\`\`\`\n${i.code.slice(0, 4000)}\n\`\`\`\nReturn JSON with fields: overallComplexity (string: Low/Medium/High), score (number 1-10), metrics (array of {metric (string), value (string), assessment (string)}), refactorSuggestions (array of strings), summary (string). Only return the JSON object, no other text.`,

  "architecture-suggestion": (i) =>
    `Suggest architecture for this app idea: "${i.idea.slice(0, 2000)}". Return JSON with fields: techStack ({frontend (string), backend (string), database (string), hosting (string)}), architecture (string describing the overall approach), databaseDesign (string), scalabilityNotes (array of strings), additionalTools (array of strings). Only return the JSON object, no other text.`,
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
