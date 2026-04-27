"use client";

import { useState, useEffect, useCallback } from "react";
import { use } from "react";
import { useRouter } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardGrid } from "@/components/dashboard/dashboard-grid";
import { GenerateDialog } from "@/components/dashboard/generate-dialog";
import type { Dashboard } from "@/types/dashboard";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, Trash2, Sparkles } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export default function DashboardDetailPage({ params }: Props) {
  const { id } = use(params);
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [showGenerate, setShowGenerate] = useState(false);
  const router = useRouter();

  const fetchDashboard = useCallback(async () => {
    const res = await fetch(`/api/dashboards/${id}`);
    if (!res.ok) { router.push("/dashboard"); return; }
    const data = await res.json();
    setDashboard(data);
    setLoading(false);
  }, [id, router]);

  useEffect(() => {
    // eslint-disable-next-line
    fetchDashboard();
  }, [fetchDashboard]);

  const handleDelete = async () => {
    if (!confirm("Delete this dashboard?")) return;
    await fetch(`/api/dashboards/${id}`, { method: "DELETE" });
    router.push("/dashboard");
  };

  return (
    <>
      <DashboardShell onNew={() => setShowGenerate(true)}>
        <div className="mb-6 flex items-center gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>

        {loading ? (
          <div className="space-y-6">
            <div className="h-12 w-64 animate-pulse rounded-xl bg-slate-800/60" />
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 animate-pulse rounded-2xl bg-slate-800/60" />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="h-64 animate-pulse rounded-2xl bg-slate-800/60" />
              ))}
            </div>
          </div>
        ) : dashboard ? (
          <>
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">{dashboard.name}</h1>
                {dashboard.description && (
                  <p className="mt-1 text-sm text-slate-400">{dashboard.description}</p>
                )}
                <p className="mt-1 text-xs text-slate-600">
                  Created {formatDate(dashboard.created_at)}
                </p>
              </div>
              <button
                onClick={handleDelete}
                className="flex items-center gap-1.5 rounded-xl border border-rose-500/20 px-3 py-2 text-sm text-rose-400 transition-all hover:border-rose-500/40 hover:bg-rose-500/10"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
            <DashboardGrid widgets={dashboard.layout ?? []} />
          </>
        ) : null}

        {!loading && !dashboard && (
          <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-white/10">
            <div className="text-center">
              <p className="text-slate-400">Dashboard not found</p>
              <Link href="/dashboard" className="mt-2 block text-sm text-violet-400 hover:underline">
                Go back
              </Link>
            </div>
          </div>
        )}
      </DashboardShell>

      {showGenerate && (
        <div className="flex items-center gap-2 text-sm">
          <Sparkles className="h-4 w-4 text-violet-400" />
        </div>
      )}
      {showGenerate && <GenerateDialog onClose={() => setShowGenerate(false)} />}
    </>
  );
}
