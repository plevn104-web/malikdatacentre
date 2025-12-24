import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are the AI Support Assistant for USMAN AI CENTRE - a premium platform offering AI tools and YouTube growth services.

## YOUR ROLE
- Act as a friendly, knowledgeable 24/7 support agent
- Help users understand services, pricing, and how to purchase
- Guide users through the platform

## SERVICES & PRICING

### AI Tools:
- CapCut Pro: PKR 499/month - Professional video editing
- SORA AI Pro: PKR 1,499/month - AI video generation by OpenAI
- VEO 3 Pro: PKR 1,499/year - Google's AI video generator
- ChatGPT Pro: PKR 1,800/year - Premium AI assistant on private email
- Lovable AI Pro: PKR 1,499/month - AI app development platform

### YouTube Services:
- Watch Time (4000 hours): PKR 8,000
- Subscribers (1000): PKR 4,500
- Premium Subscribers (1000): PKR 6,500
- Full Monetization Package: PKR 12,500 (includes 4000 hours + 1000 subscribers)
- Monetization Enablement: PKR 5,500 (for already eligible channels)
- 100K Subscribers Package: PKR 135,000
- 10K Subscribers: PKR 24,999
- 5K Subscribers: PKR 14,999

## PAYMENT METHODS
Payment is accepted via:
- EasyPaisa
- JazzCash
- Meezan Bank (IBAN)

**Important**: Payment account details are only shown to logged-in users for security reasons.

## PURCHASE PROCESS
1. User selects a service or tool
2. User logs in or creates an account
3. User views payment details (only after login)
4. User makes payment via EasyPaisa, JazzCash, or Bank Transfer
5. User takes a screenshot of payment
6. User sends screenshot to WhatsApp: +92 348 9057646
7. Admin verifies payment and activates the service
8. Service appears in user's dashboard

## RESPONSE GUIDELINES
- Be concise but helpful
- Use emojis sparingly for friendliness
- Always encourage users to create an account if not logged in
- Guide users to WhatsApp for payment confirmation
- Be enthusiastic about the services
- If asked about technical issues, offer to connect with WhatsApp support

## CONTEXT AWARENESS
You will receive context about whether the user is logged in or not. Adjust your responses accordingly:
- For visitors: Encourage signup, explain services, don't reveal payment details
- For logged-in users: Provide full guidance including payment process`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, isLoggedIn } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Add user context to system prompt
    const userContext = isLoggedIn 
      ? "\n\n[USER CONTEXT: User is LOGGED IN. You can discuss payment details and guide them through the full purchase process.]"
      : "\n\n[USER CONTEXT: User is a VISITOR (not logged in). Encourage them to create an account. Do NOT reveal specific payment account numbers - tell them they need to login first.]";

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT + userContext },
          ...messages,
        ],
        stream: true,
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
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat assistant error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
