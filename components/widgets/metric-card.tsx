"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MetricWidget } from "@/types/dashboard";

interface MetricCardProps {
  widget: MetricWidget;
}

const ICON_MAP: Record<string, string> = {
  revenue: "💰",
  users: "👥",
  orders: "📦",
  growth: "📈",
  conversion: "🎯",
  churn: "📉",
  traffic: "🌐",
  time: "⏱️",
};

export function MetricCard({ widget }: MetricCardProps) {
  const { title, value, change, trend, icon, unit } = widget;

  const TrendIcon =
    trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;

  const trendColor =
    trend === "up"
      ? "text-emerald-400"
      : trend === "down"
        ? "text-rose-400"
        : "text-slate-400";

  const emoji = icon ? ICON_MAP[icon] ?? "📊" : "📊";

  return (
    <div className="metric-card group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-xl transition-all duration-300 hover:border-violet-500/30 hover:shadow-violet-500/10 hover:shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <span className="text-2xl">{emoji}</span>
        </div>
        <div className="mt-3 flex items-end gap-2">
          <p className="text-3xl font-bold tracking-tight text-white">
            {value}
            {unit && <span className="ml-1 text-lg text-slate-400">{unit}</span>}
          </p>
        </div>
        {change && (
          <div className={cn("mt-2 flex items-center gap-1.5 text-sm font-medium", trendColor)}>
            <TrendIcon className="h-4 w-4" />
            <span>{change}</span>
            <span className="text-slate-500">vs last period</span>
          </div>
        )}
      </div>
    </div>
  );
}
