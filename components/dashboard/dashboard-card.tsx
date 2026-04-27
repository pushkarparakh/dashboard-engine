"use client";

import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { LayoutDashboard, Trash2, ExternalLink } from "lucide-react";
import type { Dashboard } from "@/types/dashboard";

interface DashboardCardProps {
  dashboard: Dashboard;
  onDelete?: (id: string) => void;
}

export function DashboardCard({ dashboard, onDelete }: DashboardCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-xl transition-all duration-300 hover:border-violet-500/40 hover:shadow-violet-500/10 hover:shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-cyan-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20 text-violet-400">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-white">{dashboard.name}</h3>
              <p className="text-xs text-slate-500">{formatDate(dashboard.created_at)}</p>
            </div>
          </div>
          {onDelete && (
            <button
              onClick={() => onDelete(dashboard.id)}
              className="rounded-lg p-1.5 text-slate-600 opacity-0 transition-all hover:bg-rose-500/10 hover:text-rose-400 group-hover:opacity-100"
              aria-label="Delete dashboard"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
        {dashboard.description && (
          <p className="mt-3 text-sm text-slate-400 line-clamp-2">{dashboard.description}</p>
        )}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-slate-600">
            {dashboard.layout?.length ?? 0} widget{(dashboard.layout?.length ?? 0) !== 1 ? "s" : ""}
          </span>
          <Link
            href={`/dashboard/${dashboard.id}`}
            className="flex items-center gap-1.5 rounded-lg bg-violet-500/10 px-3 py-1.5 text-xs font-medium text-violet-400 transition-colors hover:bg-violet-500/20"
          >
            Open
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
