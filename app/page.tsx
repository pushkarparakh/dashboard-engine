import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { ArrowRight, Network, Timer, BarChart2, Users, Wand2, BarChart4, ShieldCheck, Radio } from "lucide-react";
import { Github, Twitter, DiscIcon as Discord } from "lucide-react"; // Footer icons

const STATS = [
  { icon: Timer, value: "< 5s", label: "Average Build Time" },
  { icon: BarChart2, value: "6 Widget Types", label: "Essential Charts & Tables" },
  { icon: Users, value: "Multi-tenant RLS", label: "Isolated Data Security" },
];

const FEATURES = [
  {
    icon: Wand2,
    title: "Conversational View Building",
    desc: "Build complete views simply by describing what metrics and visuals you require.",
  },
  {
    icon: BarChart4,
    title: "Comprehensive Widget Library",
    desc: "Metric cards, line, bar, area, pie charts, and data tables—instantly populated.",
  },
  {
    icon: ShieldCheck,
    title: "Secured Data Isolation",
    desc: "Row-Level Security via Supabase ensures complete data privacy for multi-tenant environments.",
  },
  {
    icon: Radio,
    title: "Live Stream Updates",
    desc: "Watch your dashboard populate in real-time with continuous data updates, ensuring live-view seamlessly.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#06111A] font-sans text-white overflow-hidden selection:bg-teal-500/30">
      {/* Network Node Background Elements */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-teal-900/20 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-teal-800/10 blur-[100px]" />
        
        {/* Simulate the node connections with subtle radial dots */}
        <div className="absolute top-[20%] left-[15%] w-2 h-2 rounded-full bg-teal-400/40 shadow-[0_0_15px_3px_rgba(45,212,191,0.5)]" />
        <div className="absolute top-[35%] left-[25%] w-3 h-3 rounded-full bg-teal-400/60 shadow-[0_0_20px_5px_rgba(45,212,191,0.6)]" />
        <div className="absolute top-[28%] left-[8%] w-1.5 h-1.5 rounded-full bg-teal-400/30 shadow-[0_0_10px_2px_rgba(45,212,191,0.4)]" />
        <div className="absolute top-[45%] left-[18%] w-2 h-2 rounded-full bg-teal-400/40 shadow-[0_0_15px_3px_rgba(45,212,191,0.5)]" />
        
        {/* Lines between nodes simulated with rotated thin divs */}
        <div className="absolute top-[27%] left-[11%] w-[12%] h-[1px] bg-gradient-to-r from-teal-500/0 via-teal-500/20 to-teal-500/0 rotate-12" />
        <div className="absolute top-[31%] left-[20%] w-[8%] h-[1px] bg-gradient-to-r from-teal-500/0 via-teal-500/20 to-teal-500/0 -rotate-45" />
        
        {/* Right side nodes */}
        <div className="absolute top-[30%] right-[20%] w-2.5 h-2.5 rounded-full bg-orange-400/40 shadow-[0_0_15px_3px_rgba(251,146,60,0.5)]" />
        <div className="absolute top-[45%] right-[12%] w-1.5 h-1.5 rounded-full bg-orange-400/30 shadow-[0_0_10px_2px_rgba(251,146,60,0.4)]" />
        <div className="absolute top-[38%] right-[28%] w-2 h-2 rounded-full bg-orange-400/40 shadow-[0_0_15px_3px_rgba(251,146,60,0.5)]" />
        
        <div className="absolute top-[37%] right-[16%] w-[10%] h-[1px] bg-gradient-to-r from-orange-500/0 via-orange-500/20 to-orange-500/0 rotate-[60deg]" />
      </div>

      <header className="relative z-10 w-full pt-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <Network className="h-6 w-6 text-teal-400" />
            <span className="text-xl font-semibold tracking-wide">DashGen</span>
          </div>
          <div>
            <SignedOut>
              <Link
                href="/sign-in"
                className="rounded-full border border-teal-500/30 bg-teal-500/10 px-5 py-2 text-sm font-medium text-teal-300 transition-all hover:bg-teal-500/20 hover:shadow-[0_0_20px_-5px_rgba(20,184,166,0.3)]"
              >
                Launch App
              </Link>
            </SignedOut>
            <SignedIn>
              <Link
                href="/dashboard"
                className="rounded-full border border-teal-500/30 bg-teal-500/10 px-5 py-2 text-sm font-medium text-teal-300 transition-all hover:bg-teal-500/20 hover:shadow-[0_0_20px_-5px_rgba(20,184,166,0.3)]"
              >
                Go to app
              </Link>
            </SignedIn>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1">
        {/* Hero Section */}
        <section className="pt-24 pb-16 text-center">
          <div className="mx-auto max-w-4xl px-6">
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-[64px] leading-tight">
              Your Data, Visualized. <span className="text-slate-200">Instantly.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-slate-300">
              Stop building dashboards manually. Describe what you need and DashGen
              delivers interactive, production-ready analytics views in seconds.
            </p>
            
            <div className="mt-10 flex justify-center">
              <SignedOut>
                <Link
                  href="/sign-up"
                  className="flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-600 to-teal-500 px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_0_30px_-5px_rgba(20,184,166,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_40px_-5px_rgba(20,184,166,0.6)]"
                >
                  Start building for Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </SignedOut>
              <SignedIn>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-600 to-teal-500 px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_0_30px_-5px_rgba(20,184,166,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_40px_-5px_rgba(20,184,166,0.6)]"
                >
                  Create Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </SignedIn>
            </div>
          </div>
        </section>

        {/* Stats Badges */}
        <section className="pb-24">
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-4 sm:flex-row px-6">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex w-full sm:w-auto items-center gap-4 rounded-2xl border border-white/5 bg-[#121E2A]/60 backdrop-blur-md px-6 py-4 shadow-xl"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-800/80 border border-white/5">
                  <Icon className="h-4 w-4 text-teal-400" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-base font-bold text-white">{value}</span>
                  <span className="text-xs font-medium text-slate-400">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Feature & CTA Grid */}
        <section className="pb-24">
          <div className="mx-auto max-w-[1400px] px-6">
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-x-8 gap-y-12">
              
              {/* Left Column (Features) */}
              <div className="lg:col-span-4">
                <h2 className="mb-6 text-[22px] font-semibold text-white">
                  Everything you need for fast, secure analytics.
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {FEATURES.map(({ icon: Icon, title, desc }) => (
                    <div
                      key={title}
                      className="group flex flex-col rounded-[24px] border border-white/5 bg-[#121E2A]/80 p-6 transition-colors hover:bg-[#162432]"
                    >
                      <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800/50 border border-white/5">
                        <Icon className="h-5 w-5 text-slate-300 group-hover:text-teal-400 transition-colors" />
                      </div>
                      <h3 className="mb-3 text-[15px] font-bold leading-snug text-white">
                        {title}
                      </h3>
                      <p className="text-[13px] leading-relaxed text-slate-400">
                        {desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column (CTA) */}
              <div className="lg:col-span-2">
                <h2 className="mb-6 text-[22px] font-semibold text-white pl-2">
                  Unlock the Speed of Insight.
                </h2>
                <div className="flex h-[calc(100%-3.5rem)] flex-col justify-center rounded-[24px] border border-teal-500/20 bg-gradient-to-b from-[#132A3B] to-[#0A1724] p-8 text-center shadow-2xl">
                  <h3 className="mb-6 text-2xl font-bold leading-tight text-white px-4">
                    Unlock the Speed of Insight.
                  </h3>
                  <p className="mb-8 text-sm text-slate-300">
                    Set up your first dashboard in seconds.
                  </p>
                  <SignedOut>
                    <Link
                      href="/sign-up"
                      className="mx-auto block w-full rounded-xl bg-teal-600/90 py-3.5 text-sm font-semibold text-white transition-all hover:bg-teal-500"
                    >
                      Create Your Dashboard
                    </Link>
                  </SignedOut>
                  <SignedIn>
                    <Link
                      href="/dashboard"
                      className="mx-auto block w-full rounded-xl bg-teal-600/90 py-3.5 text-sm font-semibold text-white transition-all hover:bg-teal-500"
                    >
                      Create Your Dashboard
                    </Link>
                  </SignedIn>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/5 bg-[#030910] py-8">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 px-6">
          <Link href="#" className="text-slate-500 hover:text-white transition-colors">
            <span className="sr-only">Instagram</span>
            <Twitter className="h-5 w-5" />
          </Link>
          <Link href="#" className="text-slate-500 hover:text-white transition-colors">
            <span className="sr-only">GitHub</span>
            <Github className="h-5 w-5" />
          </Link>
          <Link href="#" className="text-slate-500 hover:text-white transition-colors">
            <span className="sr-only">Discord</span>
            <Discord className="h-5 w-5" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
