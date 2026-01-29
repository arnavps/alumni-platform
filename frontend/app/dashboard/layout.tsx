import Link from "next/link";
import { ReactNode } from "react";

const navItems = [
    { href: "/dashboard", label: "Overview" },
    { href: "/dashboard/opportunities", label: "Opportunities" },
    { href: "/dashboard/referrals", label: "Referrals" },
    { href: "/dashboard/mentorship", label: "Mentorship" },
    { href: "/dashboard/interviews", label: "Interview Experiences" },
    { href: "/dashboard/analytics", label: "Analytics" },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen bg-background">
            <aside className="flex h-screen w-64 flex-col border-r border-slate-200 bg-surface px-4 py-6 shadow-sm">
                <div className="mb-8 px-2">
                    <h1 className="text-lg font-semibold text-slate-900">Alumni Platform</h1>
                    <p className="text-xs text-slate-500">Engagement & Networking</p>
                </div>
                <nav className="flex-1 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-primarySoft hover:text-primary"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="mt-auto border-t border-slate-200 pt-4">
                    <button className="w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100">
                        Logout
                    </button>
                </div>
            </aside>
            <main className="flex-1 overflow-y-auto bg-background px-8 py-6">
                {children}
            </main>
        </div>
    );
}
