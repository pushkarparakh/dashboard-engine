import { groq } from "@ai-sdk/groq";
import { generateText } from "ai";
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
    const result = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      prompt: `You are a dashboard generation AI. Given this user request, generate a complete, realistic analytics dashboard with sample data.

User request: "${prompt}"

CRITICAL INSTRUCTIONS:
- You must output RAW JSON ONLY.
- DO NOT wrap your response in markdown backticks (e.g. \`\`\`json).
- Your output must match this exact JSON structure:
{
  "name": "Dashboard Name",
  "description": "Dashboard Description",
  "widgets": [
    // Array of widgets (metric, line_chart, bar_chart, pie_chart, area_chart, data_table)
    // Example metric: { "type": "metric", "id": "m1", "title": "Revenue", "value": "$10,000", "trend": "up" }
    // Example chart: { "type": "line_chart", "id": "c1", "title": "Growth", "data": [{"name": "Jan", "value": 10}], "xKey": "name", "yKey": "value" }
  ]
}

Rules:
- Generate 2-4 metric widgets with realistic values
- Generate 1-3 chart widgets (line, bar, area, or pie) with 6-12 data points
- Optionally include 1 data table with 5-8 rows
- All widget IDs must be unique short strings
- Use realistic, domain-appropriate numbers
- Chart data arrays must have consistent keys matching xKey and yKey
- Pie chart data must be objects with "name" and "value" keys`,
    });

    const match = result.text.match(/\{[\s\S]*\}/);
    if (!match) {
      throw new Error("AI did not return a valid JSON object.");
    }
    
    const rawData = JSON.parse(match[0]);
    
    // Validate exactly against our schema to prevent React crashes
    const parsedData = DashboardGenerationSchema.parse(rawData);

    await redis.set(cacheKey, parsedData, { ex: 3600 });
    return Response.json(parsedData);
  } catch (error: any) {
    console.error("Generation Error:", error);
    return new Response(JSON.stringify({ error: error.message || "Failed to generate dashboard" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
