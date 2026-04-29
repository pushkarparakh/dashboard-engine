import { z } from "zod";

export const DashboardGenerationSchema = z.object({
  name: z.string().optional().default("Generated Dashboard"),
  description: z.string().optional(),
  widgets: z.array(
    z.discriminatedUnion("type", [
      z.object({
        type: z.literal("metric"),
        id: z.string(),
        title: z.string().optional().default("Metric"),
        value: z.string().optional().default("0"),
        change: z.string().optional(),
        trend: z.string().optional(), // Removed strict enum
        icon: z.string().optional(),
        unit: z.string().optional(),
      }),
      z.object({
        type: z.literal("line_chart"),
        id: z.string(),
        title: z.string().optional().default("Chart"),
        data: z.array(z.record(z.any())).optional().default([]), // More permissive
        xKey: z.string().optional().default("name"),
        yKey: z.string().optional().default("value"),
        color: z.string().optional(),
      }),
      z.object({
        type: z.literal("bar_chart"),
        id: z.string(),
        title: z.string().optional().default("Chart"),
        data: z.array(z.record(z.any())).optional().default([]),
        xKey: z.string().optional().default("name"),
        yKey: z.string().optional().default("value"),
        color: z.string().optional(),
      }),
      z.object({
        type: z.literal("pie_chart"),
        id: z.string(),
        title: z.string().optional().default("Chart"),
        data: z.array(z.object({ name: z.string().optional().default(""), value: z.number().optional().default(0) })).optional().default([]),
        colors: z.array(z.string()).optional(),
      }),
      z.object({
        type: z.literal("area_chart"),
        id: z.string(),
        title: z.string().optional().default("Chart"),
        data: z.array(z.record(z.any())).optional().default([]),
        xKey: z.string().optional().default("name"),
        yKey: z.string().optional().default("value"),
        color: z.string().optional(),
      }),
      z.object({
        type: z.literal("data_table"),
        id: z.string(),
        title: z.string().optional().default("Table"),
        columns: z.array(z.object({ key: z.string().optional().default(""), label: z.string().optional().default("") })).optional().default([]),
        rows: z.array(z.record(z.any())).optional().default([]),
      }),
    ])
  ).optional().default([]).describe("Array of dashboard widgets with realistic sample data"),
});

export type DashboardGeneration = z.infer<typeof DashboardGenerationSchema>;
