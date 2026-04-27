"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { BarChartWidget } from "@/types/dashboard";

interface BarChartWidgetProps {
  widget: BarChartWidget;
}

export function BarChartWidgetComponent({ widget }: BarChartWidgetProps) {
  const { title, data, xKey, yKey, color = "#06b6d4" } = widget;

  return (
    <div className="chart-card rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-xl">
      <h3 className="mb-4 text-sm font-semibold text-slate-200">{title}</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data as Record<string, string | number>[]}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis
            dataKey={xKey}
            tick={{ fill: "#64748b", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#64748b", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={40}
          />
          <Tooltip
            contentStyle={{
              background: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: "10px",
              color: "#e2e8f0",
              fontSize: "12px",
            }}
            cursor={{ fill: "rgba(139,92,246,0.08)" }}
          />
          <Bar
            dataKey={yKey}
            fill={color}
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
