"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { AreaChartWidget } from "@/types/dashboard";

interface AreaChartWidgetProps {
  widget: AreaChartWidget;
}

export function AreaChartWidgetComponent({ widget }: AreaChartWidgetProps) {
  const { title, data, xKey, yKey, color = "#10b981" } = widget;
  const gradientId = `gradient-${widget.id}`;

  return (
    <div className="chart-card rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-xl">
      <h3 className="mb-4 text-sm font-semibold text-slate-200">{title}</h3>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data as Record<string, string | number>[]}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
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
          />
          <Area
            type="monotone"
            dataKey={yKey}
            stroke={color}
            strokeWidth={2.5}
            fill={`url(#${gradientId})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
