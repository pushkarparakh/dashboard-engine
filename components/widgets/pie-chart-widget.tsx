"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import type { PieChartWidget } from "@/types/dashboard";

interface PieChartWidgetProps {
  widget: PieChartWidget;
}

const DEFAULT_COLORS = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#ec4899"];

export function PieChartWidgetComponent({ widget }: PieChartWidgetProps) {
  const { title, data, colors = DEFAULT_COLORS } = widget;

  return (
    <div className="chart-card rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-xl">
      <h3 className="mb-4 text-sm font-semibold text-slate-200">{title}</h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: "10px",
              color: "#e2e8f0",
              fontSize: "12px",
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: "11px", color: "#94a3b8" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
