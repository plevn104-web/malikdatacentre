import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, style, aspectRatio } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build enhanced prompt with style and aspect ratio
    let enhancedPrompt = prompt;
    
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

    console.log("Generating image with prompt:", enhancedPrompt);

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
