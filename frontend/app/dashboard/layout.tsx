"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/opportunities", label: "Opportunities" },
  { href: "/dashboard/referrals", label: "Referrals" },
  { href: "/dashboard/mentorship", label: "Mentorship" },
  { href: "/dashboard/interviews", label: "Interview Experiences" },
  { href: "/dashboard/analytics", label: "Analytics" },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderNav = () => (
    <nav className="mt-6 flex-1 space-y-1">
      {navItems.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={
              "flex items-center rounded-xl px-3 py-2 text-sm font-medium transition-colors" +
              (active
                ? " bg-primarySoft text-primary"
                : " text-slate-600 hover:bg-slate-100 hover:text-slate-900")
            }
            onClick={() => setSidebarOpen(false)}
          >
            <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-[0.7rem] font-semibold text-slate-500">
              {item.label.charAt(0)}
            </span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar for desktop */}
      <aside className="hidden h-screen w-64 flex-col border-r border-slate-200 bg-surface px-4 py-6 shadow-sm md:flex">
        <div className="px-2">
          <h1 className="text-lg font-semibold text-slate-900">Alumni Platform</h1>
          <p className="text-xs text-slate-500">Engagement &amp; Networking</p>
        </div>
        {renderNav()}
        <div className="mt-auto border-t border-slate-200 pt-4">
          <button className="w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100">
            Logout
          </button>
        </div>
      </aside>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="h-full w-64 bg-surface px-4 py-6 shadow-card">
            <div className="flex items-center justify-between px-2">
              <div>
                <h1 className="text-lg font-semibold text-slate-900">Alumni Platform</h1>
                <p className="text-xs text-slate-500">Engagement &amp; Networking</p>
              </div>
              <button
                className="rounded-full p-2 text-slate-500 hover:bg-slate-100"
                onClick={() => setSidebarOpen(false)}
              >
                ✕
              </button>
            </div>
            {renderNav()}
            <div className="mt-auto border-t border-slate-200 pt-4">
              <button className="w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100">
                Logout
              </button>
            </div>
          </div>
          <div
            className="flex-1 bg-black/10"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Top bar on mobile */}
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-slate-200 bg-surface px-4 py-3 md:hidden">
          <button
            className="rounded-full p-2 text-slate-600 hover:bg-slate-100"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          <span className="text-sm font-medium text-slate-700">Alumni Platform</span>
          <div className="w-8" />
        </header>
        <main className="flex-1 overflow-y-auto bg-background px-4 py-6 md:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
