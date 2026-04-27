"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { LayoutDashboard, Plus, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboards", icon: LayoutDashboard },
];

interface DashboardShellProps {
  children: React.ReactNode;
  onNew?: () => void;
}

export function DashboardShell({ children, onNew }: DashboardShellProps) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-bold text-white">DashGen</span>
            </Link>
            <nav className="flex items-center gap-1">
              {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                    pathname === href || pathname.startsWith(href + "/")
                      ? "bg-white/10 text-white"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            {onNew && (
              <button
                onClick={onNew}
                className="flex items-center gap-1.5 rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-violet-500"
              >
                <Plus className="h-4 w-4" />
                New Dashboard
              </button>
            )}
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl flex-1 p-4 sm:p-6">
        {children}
      </main>
    </div>
  );
}
