"use client";

import { useState, useEffect, useCallback } from "react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { GenerateDialog } from "@/components/dashboard/generate-dialog";
import type { Dashboard } from "@/types/dashboard";
import { Sparkles } from "lucide-react";

export default function DashboardListPage() {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [showGenerate, setShowGenerate] = useState(false);

  const fetchDashboards = useCallback(async () => {
    const res = await fetch("/api/dashboards");
    const data = await res.json();
    setDashboards(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line
    fetchDashboards();
  }, [fetchDashboards]);

  const handleDelete = async (id: string) => {
    await fetch(`/api/dashboards/${id}`, { method: "DELETE" });
    setDashboards((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <>
      <DashboardShell onNew={() => setShowGenerate(true)}>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">My Dashboards</h1>
          <p className="mt-1 text-sm text-slate-500">
            {dashboards.length} dashboard{dashboards.length !== 1 ? "s" : ""} saved
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 animate-pulse rounded-2xl bg-[#121E2A]/60 border border-white/5" />
            ))}
          </div>
        ) : dashboards.length === 0 ? (
          <div className="flex h-80 flex-col items-center justify-center rounded-[24px] border border-dashed border-teal-500/20 bg-gradient-to-b from-[#121E2A]/40 to-transparent text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-500/10 border border-teal-500/20">
              <Sparkles className="h-8 w-8 text-teal-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">No dashboards yet</h2>
            <p className="mt-2 max-w-sm text-sm text-slate-400">
              Create your first AI-generated dashboard by describing the analytics you need.
            </p>
            <button
              onClick={() => setShowGenerate(true)}
              className="mt-6 flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-teal-500"
            >
              <Sparkles className="h-4 w-4" />
              Generate your first dashboard
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dashboards.map((d) => (
              <DashboardCard key={d.id} dashboard={d} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </DashboardShell>

      {showGenerate && <GenerateDialog onClose={() => { setShowGenerate(false); fetchDashboards(); }} />}
    </>
  );
}
