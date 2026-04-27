import { google } from "@ai-sdk/google";
import { streamObject } from "ai";
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

  const cacheKey = `generate:${userId}:${Buffer.from(prompt).toString("base64").slice(0, 64)}`;
  const cached = await redis.get(cacheKey);
  if (cached) {
    return new Response(JSON.stringify(cached), {
      headers: { "Content-Type": "application/json", "X-Cache": "HIT" },
    });
  }

  const result = streamObject({
    model: google("gemini-2.0-flash"),
    schema: DashboardGenerationSchema,
    prompt: `You are a dashboard generation AI. Given this user request, generate a complete, realistic analytics dashboard with sample data.

User request: "${prompt}"

Rules:
- Generate 2-4 metric widgets with realistic values
- Generate 1-3 chart widgets (line, bar, area, or pie) with 6-12 data points
- Optionally include 1 data table with 5-8 rows
- All widget IDs must be unique short strings
- Use realistic, domain-appropriate numbers
- Chart data arrays must have consistent keys matching xKey and yKey
- Pie chart data must be objects with "name" and "value" keys`,
  });

  const response = result.toTextStreamResponse();

  result.object.then(async (obj) => {
    await redis.set(cacheKey, obj, { ex: 3600 });
  }).catch(() => {});

  return response;
}
