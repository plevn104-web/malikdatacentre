import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Security: Restrict CORS to allowed origins only
const ALLOWED_ORIGINS = [
  'https://ivrwcmtjruvritolfpae.lovableproject.com',
  'http://localhost:5173',
  'http://localhost:8080',
];

const getCorsHeaders = (origin: string | null) => {
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
};

// Input validation constants
const MAX_PROMPT_LENGTH = 1000;
const ALLOWED_STYLES = ['default', 'realistic', 'cartoon', 'anime', '3d', 'artistic', 'minimal'];
const ALLOWED_RATIOS = ['square', 'portrait', 'landscape'];

serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate origin/referer
    const referer = req.headers.get("referer");
    if (!origin && !referer) {
      console.warn("Request without origin or referer");
    } else if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      console.warn("Request from unauthorized origin:", origin);
      return new Response(JSON.stringify({ error: "Unauthorized origin" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { prompt, style, aspectRatio } = body;

    // Input validation: prompt
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return new Response(JSON.stringify({ error: "Prompt is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (prompt.length > MAX_PROMPT_LENGTH) {
      return new Response(JSON.stringify({ error: `Prompt too long (max ${MAX_PROMPT_LENGTH} characters)` }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Input validation: style
    if (style && !ALLOWED_STYLES.includes(style)) {
      return new Response(JSON.stringify({ error: "Invalid style. Allowed: " + ALLOWED_STYLES.join(", ") }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Input validation: aspectRatio
    if (aspectRatio && !ALLOWED_RATIOS.includes(aspectRatio)) {
      return new Response(JSON.stringify({ error: "Invalid aspect ratio. Allowed: " + ALLOWED_RATIOS.join(", ") }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build enhanced prompt with style and aspect ratio
    let enhancedPrompt = prompt.trim();
    
    if (style && style !== "default") {
      const styleDescriptions: Record<string, string> = {
        realistic: "photorealistic, highly detailed, professional photography",
        cartoon: "cartoon style, colorful, animated, fun",
        anime: "anime style, Japanese animation, vibrant colors",
        "3d": "3D render, CGI, cinema 4D style, octane render",
        artistic: "artistic, oil painting style, fine art",
        minimal: "minimalist, clean, simple design",
      };
      enhancedPrompt += `. Style: ${styleDescriptions[style] || style}`;
    }

    if (aspectRatio) {
      const ratioDescriptions: Record<string, string> = {
        square: "1:1 aspect ratio, square format",
        portrait: "portrait orientation, vertical, 3:4 aspect ratio",
        landscape: "landscape orientation, horizontal, 16:9 aspect ratio",
      };
      enhancedPrompt += `. ${ratioDescriptions[aspectRatio] || ""}`;
    }

    console.log("Generating image with prompt:", enhancedPrompt.substring(0, 100) + "...");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [
          {
            role: "user",
            content: enhancedPrompt,
          },
        ],
        modalities: ["image", "text"],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
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
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Image generation failed" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    console.log("Image generation response received");

    // Extract image from response
    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    const textContent = data.choices?.[0]?.message?.content || "Image generated successfully!";

    if (!imageUrl) {
      return new Response(JSON.stringify({ 
        error: "No image was generated. Please try a different prompt.",
        text: textContent 
      }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ 
      imageUrl,
      text: textContent,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Image generation error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
