import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "DashGen — AI-Powered Analytics Dashboards",
  description:
    "Generate custom analytics dashboards using natural language. Powered by AI, built for teams.",
  keywords: ["dashboard", "analytics", "AI", "generative UI", "SaaS"],
  authors: [{ name: "DashGen" }],
  openGraph: {
    title: "DashGen — AI-Powered Analytics Dashboards",
    description: "Generate custom analytics dashboards using natural language.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" className={cn("font-sans", geist.variable)}>
        <body className="bg-slate-950 font-sans antialiased">{children}</body>
      </html>
    </ClerkProvider>
  );
}
