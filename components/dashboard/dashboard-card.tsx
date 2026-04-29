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
    <div className="group relative overflow-hidden rounded-[24px] border border-white/5 bg-[#121E2A]/80 p-6 shadow-xl transition-all duration-300 hover:border-teal-500/30 hover:shadow-teal-500/10 hover:shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-600/5 to-teal-400/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/20">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-white">{dashboard.name}</h3>
              <p className="text-xs text-slate-400">{formatDate(dashboard.created_at)}</p>
            </div>
          </div>
          {onDelete && (
            <button
              onClick={() => onDelete(dashboard.id)}
              className="rounded-lg p-1.5 text-slate-500 opacity-0 transition-all hover:bg-rose-500/10 hover:text-rose-400 group-hover:opacity-100"
              aria-label="Delete dashboard"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
        {dashboard.description && (
          <p className="mt-4 text-sm text-slate-400 line-clamp-2">{dashboard.description}</p>
        )}
        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">
            {dashboard.layout?.length ?? 0} widget{(dashboard.layout?.length ?? 0) !== 1 ? "s" : ""}
          </span>
          <Link
            href={`/dashboard/${dashboard.id}`}
            className="flex items-center gap-1.5 rounded-lg bg-teal-500/10 px-3 py-1.5 text-xs font-medium text-teal-400 transition-colors hover:bg-teal-500/20"
          >
            Open
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
