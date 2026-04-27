"use client";

import type { DataTableWidget } from "@/types/dashboard";

interface DataTableWidgetProps {
  widget: DataTableWidget;
}

export function DataTableWidgetComponent({ widget }: DataTableWidgetProps) {
  const { title, columns, rows } = widget;

  return (
    <div className="chart-card rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-xl">
      <h3 className="mb-4 text-sm font-semibold text-slate-200">{title}</h3>
      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="pb-3 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className="border-b border-white/5 transition-colors hover:bg-white/5"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="py-3 pr-4 text-slate-300"
                  >
                    {String(row[col.key] ?? "—")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
