import { groq } from "@ai-sdk/groq";
import { generateObject } from "ai";
import { auth } from "@clerk/nextjs/server";
import { rateLimiter, redis } from "@/lib/redis";
import { DashboardGenerationSchema } from "@/lib/ai/schema";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { success } = await rateLimiter.limit(userId);
  if (!success) {
    return new Response("Rate limit exceeded. Please wait a moment.", { status: 429 });
  }

  const { prompt } = await req.json();

  if (!prompt || typeof prompt !== "string" || prompt.trim().length < 5) {
    return new Response("Invalid prompt", { status: 400 });
  }

  const cacheKey = `generate:${userId}:${btoa(encodeURIComponent(prompt)).slice(0, 64)}`;
  const cached = await redis.get(cacheKey);
  if (cached) {
    return new Response(JSON.stringify(cached), {
      headers: { "Content-Type": "application/json", "X-Cache": "HIT" },
    });
  }

  try {
    const result = await generateObject({
      model: groq("llama-3.3-70b-versatile"),
      // @ts-ignore - explicitly forcing json mode to bypass json_schema restriction on Groq Llama 3.3
      mode: "json",
      schema: DashboardGenerationSchema,
      prompt: `You are a dashboard generation AI. Given this user request, generate a complete, realistic analytics dashboard with sample data.

User request: "${prompt}"

CRITICAL INSTRUCTIONS:
- You must output RAW JSON ONLY.
- DO NOT wrap your response in markdown backticks (e.g. \`\`\`json).
- Your output must exactly match the provided JSON schema.

Rules:
- Generate 2-4 metric widgets with realistic values
- Generate 1-3 chart widgets (line, bar, area, or pie) with 6-12 data points
- Optionally include 1 data table with 5-8 rows
- All widget IDs must be unique short strings
- Use realistic, domain-appropriate numbers
- Chart data arrays must have consistent keys matching xKey and yKey
- Pie chart data must be objects with "name" and "value" keys`,
    });

    await redis.set(cacheKey, result.object, { ex: 3600 });
    return Response.json(result.object);
  } catch (error: any) {
    console.error("Generation Error:", error);
    return new Response(JSON.stringify({ error: error.message || "Failed to generate dashboard" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
