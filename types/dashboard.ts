import { z } from "zod";

export const MetricWidgetSchema = z.object({
  type: z.literal("metric"),
  id: z.string(),
  title: z.string(),
  value: z.string(),
  change: z.string().optional(),
  trend: z.enum(["up", "down", "neutral"]).optional(),
  icon: z.string().optional(),
  unit: z.string().optional(),
});

export const LineChartWidgetSchema = z.object({
  type: z.literal("line_chart"),
  id: z.string(),
  title: z.string(),
  data: z.array(z.record(z.union([z.string(), z.number()]))),
  xKey: z.string(),
  yKey: z.string(),
  color: z.string().optional(),
});

export const BarChartWidgetSchema = z.object({
  type: z.literal("bar_chart"),
  id: z.string(),
  title: z.string(),
  data: z.array(z.record(z.union([z.string(), z.number()]))),
  xKey: z.string(),
  yKey: z.string(),
  color: z.string().optional(),
});

export const PieChartWidgetSchema = z.object({
  type: z.literal("pie_chart"),
  id: z.string(),
  title: z.string(),
  data: z.array(z.object({ name: z.string(), value: z.number() })),
  colors: z.array(z.string()).optional(),
});

export const AreaChartWidgetSchema = z.object({
  type: z.literal("area_chart"),
  id: z.string(),
  title: z.string(),
  data: z.array(z.record(z.union([z.string(), z.number()]))),
  xKey: z.string(),
  yKey: z.string(),
  color: z.string().optional(),
});

export const DataTableWidgetSchema = z.object({
  type: z.literal("data_table"),
  id: z.string(),
  title: z.string(),
  columns: z.array(z.object({ key: z.string(), label: z.string() })),
  rows: z.array(z.record(z.union([z.string(), z.number(), z.boolean()]))),
});

export const WidgetSchema = z.discriminatedUnion("type", [
  MetricWidgetSchema,
  LineChartWidgetSchema,
  BarChartWidgetSchema,
  PieChartWidgetSchema,
  AreaChartWidgetSchema,
  DataTableWidgetSchema,
]);

export const DashboardLayoutSchema = z.object({
  name: z.string(),
  description: z.string(),
  widgets: z.array(WidgetSchema),
});

export type MetricWidget = z.infer<typeof MetricWidgetSchema>;
export type LineChartWidget = z.infer<typeof LineChartWidgetSchema>;
export type BarChartWidget = z.infer<typeof BarChartWidgetSchema>;
export type PieChartWidget = z.infer<typeof PieChartWidgetSchema>;
export type AreaChartWidget = z.infer<typeof AreaChartWidgetSchema>;
export type DataTableWidget = z.infer<typeof DataTableWidgetSchema>;
export type Widget = z.infer<typeof WidgetSchema>;
export type DashboardLayout = z.infer<typeof DashboardLayoutSchema>;

export interface Dashboard {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  layout: Widget[];
  created_at: string;
  updated_at: string;
}
