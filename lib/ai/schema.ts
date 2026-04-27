import { z } from "zod";

export const DashboardGenerationSchema = z.object({
  name: z.string().describe("A concise dashboard name"),
  description: z.string().describe("Brief description of what this dashboard shows"),
  widgets: z.array(
    z.discriminatedUnion("type", [
      z.object({
        type: z.literal("metric"),
        id: z.string(),
        title: z.string(),
        value: z.string(),
        change: z.string().optional(),
        trend: z.enum(["up", "down", "neutral"]).optional(),
        icon: z.string().optional(),
        unit: z.string().optional(),
      }),
      z.object({
        type: z.literal("line_chart"),
        id: z.string(),
        title: z.string(),
        data: z.array(z.record(z.union([z.string(), z.number()]))),
        xKey: z.string(),
        yKey: z.string(),
        color: z.string().optional(),
      }),
      z.object({
        type: z.literal("bar_chart"),
        id: z.string(),
        title: z.string(),
        data: z.array(z.record(z.union([z.string(), z.number()]))),
        xKey: z.string(),
        yKey: z.string(),
        color: z.string().optional(),
      }),
      z.object({
        type: z.literal("pie_chart"),
        id: z.string(),
        title: z.string(),
        data: z.array(z.object({ name: z.string(), value: z.number() })),
        colors: z.array(z.string()).optional(),
      }),
      z.object({
        type: z.literal("area_chart"),
        id: z.string(),
        title: z.string(),
        data: z.array(z.record(z.union([z.string(), z.number()]))),
        xKey: z.string(),
        yKey: z.string(),
        color: z.string().optional(),
      }),
      z.object({
        type: z.literal("data_table"),
        id: z.string(),
        title: z.string(),
        columns: z.array(z.object({ key: z.string(), label: z.string() })),
        rows: z.array(z.record(z.union([z.string(), z.number()]))),
      }),
    ])
  ).describe("Array of dashboard widgets with realistic sample data"),
});

export type DashboardGeneration = z.infer<typeof DashboardGenerationSchema>;
