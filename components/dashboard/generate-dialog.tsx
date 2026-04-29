"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardGenerationSchema, type DashboardGeneration } from "@/lib/ai/schema";
import { DashboardGrid } from "@/components/dashboard/dashboard-grid";
import { Sparkles, X, Save, Loader2 } from "lucide-react";
import type { Widget } from "@/types/dashboard";

interface GenerateDialogProps {
  onClose: () => void;
}

const EXAMPLE_PROMPTS = [
  "Monthly sales performance with revenue KPI, bar chart by region, and top products table",
  "E-commerce dashboard with conversion rate, traffic area chart, and order status breakdown pie chart",
  "SaaS metrics dashboard with MRR growth line chart, churn rate, and subscription tier distribution",
];

export function GenerateDialog({ onClose }: GenerateDialogProps) {
  const [prompt, setPrompt] = useState("");
  const [saving, setSaving] = useState(false);
  const [object, setObject] = useState<DashboardGeneration | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setError(null);
    setObject(null);
    
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Failed to generate: ${res.status}`);
      }
      
      const data = await res.json();
      setObject(data);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!object?.widgets) return;
    setSaving(true);
    try {
      const res = await fetch("/api/dashboards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: object.name ?? "New Dashboard",
          description: object.description ?? "",
          layout: object.widgets,
        }),
      });
      const data = await res.json();
      if (data.id) {
        router.push(`/dashboard/${data.id}`);
        onClose();
      }
    } finally {
      setSaving(false);
    }
  };

  const previewWidgets = (object?.widgets ?? []) as Widget[];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-teal-500/20 bg-[#0A1724] shadow-2xl shadow-teal-500/10">
        <div className="flex items-center justify-between border-b border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500/20">
              <Sparkles className="h-5 w-5 text-teal-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Generate Dashboard</h2>
              <p className="text-xs text-slate-500">Describe the analytics view you need</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              placeholder="e.g. Monthly revenue dashboard with KPIs, bar chart, and conversion funnel..."
              className="flex-1 rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20"
            />
            <button
              onClick={handleGenerate}
              disabled={isLoading || !prompt.trim()}
              className="flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              Generate
            </button>
          </div>

          {!object && !isLoading && (
            <div className="mt-6">
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-600">
                Try these examples
              </p>
              <div className="flex flex-col gap-2">
                {EXAMPLE_PROMPTS.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPrompt(p)}
                    className="rounded-xl border border-white/5 bg-slate-900/30 px-4 py-3 text-left text-sm text-slate-400 transition-all hover:border-teal-500/30 hover:text-slate-200"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-400">
              {error.message}
            </div>
          )}

          {(isLoading || previewWidgets.length > 0) && (
            <div className="mt-6">
              {object?.name && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-white">{object.name}</h3>
                  {object.description && (
                    <p className="text-sm text-slate-400">{object.description}</p>
                  )}
                </div>
              )}
              {isLoading && previewWidgets.length === 0 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-32 animate-pulse rounded-2xl bg-slate-800/60" />
                  ))}
                </div>
              )}
              <DashboardGrid widgets={previewWidgets} />
            </div>
          )}
        </div>

        {previewWidgets.length > 0 && (
          <div className="flex items-center justify-end gap-3 border-t border-white/10 p-6">
            <button
              onClick={onClose}
              className="rounded-xl px-5 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:text-white"
            >
              Discard
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-teal-500 disabled:opacity-50"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
