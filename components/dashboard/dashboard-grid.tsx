"use client";

import type { Widget } from "@/types/dashboard";
import { MetricCard } from "@/components/widgets/metric-card";
import { LineChartWidgetComponent } from "@/components/widgets/line-chart-widget";
import { BarChartWidgetComponent } from "@/components/widgets/bar-chart-widget";
import { PieChartWidgetComponent } from "@/components/widgets/pie-chart-widget";
import { AreaChartWidgetComponent } from "@/components/widgets/area-chart-widget";
import { DataTableWidgetComponent } from "@/components/widgets/data-table-widget";

interface DashboardGridProps {
  widgets: Widget[];
}

function WidgetRenderer({ widget }: { widget: Widget }) {
  switch (widget.type) {
    case "metric":
      return <MetricCard widget={widget} />;
    case "line_chart":
      return <LineChartWidgetComponent widget={widget} />;
    case "bar_chart":
      return <BarChartWidgetComponent widget={widget} />;
    case "pie_chart":
      return <PieChartWidgetComponent widget={widget} />;
    case "area_chart":
      return <AreaChartWidgetComponent widget={widget} />;
    case "data_table":
      return <DataTableWidgetComponent widget={widget} />;
    default:
      return null;
  }
}

export function DashboardGrid({ widgets }: DashboardGridProps) {
  if (!widgets || widgets.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-white/10 text-slate-500">
        No widgets yet. Generate a dashboard to get started.
      </div>
    );
  }

  const metrics = widgets.filter((w) => w.type === "metric");
  const charts = widgets.filter((w) => w.type !== "metric");

  return (
    <div className="space-y-6">
      {metrics.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((widget) => (
            <WidgetRenderer key={widget.id} widget={widget} />
          ))}
        </div>
      )}
      {charts.length > 0 && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {charts.map((widget) => (
            <div
              key={widget.id}
              className={widget.type === "data_table" ? "lg:col-span-2" : ""}
            >
              <WidgetRenderer widget={widget} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
