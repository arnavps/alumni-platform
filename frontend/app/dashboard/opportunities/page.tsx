"use client";

import { useEffect, useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

type Opportunity = {
    id: string;
    title: string;
    company: string | null;
    domain: string | null;
    type: string;
    location: string | null;
    remote: boolean;
};

export default function OpportunitiesPage() {
    const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/opportunities`);
                const data = await res.json();
                setOpportunities(data.opportunities ?? []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-semibold text-slate-900">Opportunities</h2>
                    <p className="text-sm text-slate-500">
                        Browse jobs, internships, mentorships, and events posted by verified alumni and faculty.
                    </p>
                </div>
            </header>
            {loading ? (
                <p className="text-sm text-slate-500">Loading opportunities...</p>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {opportunities.map((opportunity) => (
                        <div key={opportunity.id} className="flex flex-col rounded-2xl bg-surface p-4 shadow-card">
                            <span className="inline-flex w-fit rounded-full bg-primarySoft px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-wide text-primary">
                                {opportunity.type}
                            </span>
                            <h3 className="mt-2 text-sm font-semibold text-slate-900">{opportunity.title}</h3>
                            <p className="text-xs text-slate-500">
                                {opportunity.company ?? "Company not specified"}
                            </p>
                            <p className="mt-2 text-xs text-slate-500">
                                {opportunity.domain ?? "General"}
                            </p>
                        </div>
                    ))}
                    {opportunities.length === 0 && (
                        <p className="col-span-full text-sm text-slate-500">
                            No opportunities available yet. Encourage alumni to post openings.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
