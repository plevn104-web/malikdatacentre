import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const PLAN_DAILY_LIMITS: Record<string, number> = {
  Free: 3,
  Starter: 15,
  "Creator Pro": 50,
  "Elite Creator": 80,
  "VEO Ultra": 150,
};

// Simple content moderation - block harmful/unsafe prompts
const BLOCKED_PATTERNS = [
  /\b(nude|naked|nsfw|porn|sex|violence|gore|blood|kill|murder|weapon|gun|drug|terrorist)\b/i,
  /\b(child|minor|underage)\b.*\b(abuse|exploit|inappropriate)\b/i,
];

function isPromptSafe(prompt: string): boolean {
  return !BLOCKED_PATTERNS.some((pattern) => pattern.test(prompt));
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticate user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = user.id;

    const { scene, orientation, style, language } = await req.json();

    // Validate inputs
    if (!scene || typeof scene !== "string" || scene.trim().length === 0) {
      return new Response(JSON.stringify({ error: "Scene description is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (scene.length > 300) {
      return new Response(JSON.stringify({ error: "Scene description must be under 300 characters" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!isPromptSafe(scene)) {
      return new Response(JSON.stringify({ error: "Content policy violation. Please modify your prompt." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get user plan
    const { data: subsData } = await supabase
      .from("user_subscriptions")
      .select("id, plan_id, premium_plans(name)")
      .eq("user_id", userId)
      .eq("status", "active")
      .gt("expires_at", new Date().toISOString())
      .limit(1);

    const planName = (subsData?.[0] as any)?.premium_plans?.name || "Free";
    const dailyLimit = PLAN_DAILY_LIMITS[planName] || PLAN_DAILY_LIMITS["Free"];

    // Check daily usage
    const today = new Date().toISOString().slice(0, 10);
    const { data: usageData } = await supabase
      .from("video_daily_usage")
      .select("generation_count")
      .eq("user_id", userId)
      .eq("usage_date", today)
      .maybeSingle();

    const currentCount = usageData?.generation_count || 0;
    if (currentCount >= dailyLimit) {
      return new Response(
        JSON.stringify({
          error: "Daily video generation limit reached",
          limit: dailyLimit,
          used: currentCount,
          plan: planName,
        }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Build the prompt
    const aspectRatio = orientation === "vertical" ? "9:16" : "16:9";
    const fullPrompt = `${style} style video: ${scene.trim()}. Language/narration: ${language || "English"}. Aspect ratio: ${aspectRatio}.`;

    // Call Replicate API
    const REPLICATE_API_TOKEN = Deno.env.get("REPLICATE_API_TOKEN");
    if (!REPLICATE_API_TOKEN) {
      throw new Error("REPLICATE_API_TOKEN is not configured");
    }

    // Create prediction using Replicate's minimax video model
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 120000); // 2 min timeout

    const createRes = await fetch("https://api.replicate.com/v1/models/minimax/video-01/predictions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
        Prefer: "wait",
      },
      body: JSON.stringify({
        input: {
          prompt: fullPrompt,
          prompt_optimizer: true,
        },
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!createRes.ok) {
      const errText = await createRes.text();
      console.error("Replicate create error:", createRes.status, errText);

      if (createRes.status === 422) {
        return new Response(JSON.stringify({ error: "Invalid video request. Try a different prompt." }), {
          status: 422,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ error: "Video generation service unavailable. Try again later." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const prediction = await createRes.json();

    // If using Prefer: wait, the prediction should be completed
    // Otherwise poll for completion
    let videoUrl = null;

    if (prediction.status === "succeeded" && prediction.output) {
      videoUrl = typeof prediction.output === "string" ? prediction.output : prediction.output?.[0] || prediction.output?.video;
    } else if (prediction.status === "processing" || prediction.status === "starting") {
      // Poll for result
      const predictionId = prediction.id;
      for (let i = 0; i < 60; i++) {
        await new Promise((r) => setTimeout(r, 3000)); // 3s intervals
        const pollRes = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
          headers: { Authorization: `Bearer ${REPLICATE_API_TOKEN}` },
        });
        const pollData = await pollRes.json();

        if (pollData.status === "succeeded") {
          videoUrl = typeof pollData.output === "string" ? pollData.output : pollData.output?.[0] || pollData.output?.video;
          break;
        }
        if (pollData.status === "failed" || pollData.status === "canceled") {
          return new Response(
            JSON.stringify({ error: pollData.error || "Video generation failed" }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
      }
    } else if (prediction.status === "failed") {
      return new Response(
        JSON.stringify({ error: prediction.error || "Video generation failed" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!videoUrl) {
      return new Response(JSON.stringify({ error: "Video generation timed out. Please try again." }), {
        status: 504,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Record usage - upsert daily count
    if (usageData) {
      await supabase
        .from("video_daily_usage")
        .update({ generation_count: currentCount + 1, updated_at: new Date().toISOString() })
        .eq("user_id", userId)
        .eq("usage_date", today);
    } else {
      await supabase.from("video_daily_usage").insert({
        user_id: userId,
        usage_date: today,
        generation_count: 1,
      });
    }

    return new Response(
      JSON.stringify({
        videoUrl,
        used: currentCount + 1,
        limit: dailyLimit,
        plan: planName,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return new Response(JSON.stringify({ error: "Request timed out. Please try again." }), {
        status: 504,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    console.error("generate-video error:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
