export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <header>
                <h2 className="text-2xl font-semibold text-slate-900">Overview</h2>
                <p className="text-sm text-slate-500">
                    High-level view of alumni engagement, opportunities, and interactions.
                </p>
            </header>
            <section className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-surface p-4 shadow-card">
                    <p className="text-xs font-medium text-slate-500">Active Opportunities</p>
                    <p className="mt-2 text-3xl font-semibold text-slate-900">--</p>
                    <span className="mt-1 inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                        Good
                    </span>
                </div>
                <div className="rounded-2xl bg-surface p-4 shadow-card">
                    <p className="text-xs font-medium text-slate-500">Student–Alumni Interactions</p>
                    <p className="mt-2 text-3xl font-semibold text-slate-900">--</p>
                    <span className="mt-1 inline-flex rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                        Warning
                    </span>
                </div>
                <div className="rounded-2xl bg-surface p-4 shadow-card">
                    <p className="text-xs font-medium text-slate-500">Referral Success Ratio</p>
                    <p className="mt-2 text-3xl font-semibold text-slate-900">--</p>
                    <span className="mt-1 inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                        Neutral
                    </span>
                </div>
            </section>
        </div>
    );
}
