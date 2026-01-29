"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "../../../components/layout/page-header";
import { Card } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";

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

const opportunityTypes = ["ALL", "JOB", "INTERNSHIP", "MENTORSHIP", "EVENT"] as const;

type OpportunityTypeFilter = (typeof opportunityTypes)[number];

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<OpportunityTypeFilter>("ALL");
  const [domainFilter, setDomainFilter] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (typeFilter !== "ALL") params.append("type", typeFilter);
        if (domainFilter) params.append("domain", domainFilter);
        if (companyFilter) params.append("company", companyFilter);

        const res = await fetch(`${API_BASE_URL}/opportunities?${params.toString()}`);
        const data = await res.json();
        setOpportunities(data.opportunities ?? []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [typeFilter, domainFilter, companyFilter]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Opportunities"
        subtitle="Browse jobs, internships, mentorships, and events posted by verified alumni and faculty."
      />

      <section className="flex flex-wrap items-end gap-3 rounded-2xl bg-surface p-4 shadow-card">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-600">Type</span>
          <div className="flex flex-wrap gap-1">
            {opportunityTypes.map((type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  typeFilter === type
                    ? "bg-primarySoft text-primary"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {type === "ALL" ? "All" : type.charAt(0) + type.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-1 flex-wrap gap-3">
          <div className="flex-1 min-w-[160px]">
            <label className="text-xs font-medium text-slate-600">Domain</label>
            <input
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value)}
              placeholder="e.g. Backend, Data, Product"
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-primary/30 focus:ring"
            />
          </div>
          <div className="flex-1 min-w-[160px]">
            <label className="text-xs font-medium text-slate-600">Company</label>
            <input
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
              placeholder="e.g. Google, Infosys"
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-primary/30 focus:ring"
            />
          </div>
        </div>
      </section>

      {loading ? (
        <p className="text-sm text-slate-500">Loading opportunities...</p>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {opportunities.map((opportunity) => (
            <Card key={opportunity.id} className="flex flex-col gap-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <Badge tone="neutral" className="mb-2 uppercase tracking-wide text-[0.65rem]">
                    {opportunity.type}
                  </Badge>
                  <h3 className="text-sm font-semibold text-slate-900">{opportunity.title}</h3>
                  <p className="text-xs text-slate-500">
                    {opportunity.company ?? "Company not specified"}
                  </p>
                </div>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                {opportunity.domain ?? "General"}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[0.7rem] text-slate-500">
                  {opportunity.remote ? "Remote friendly" : opportunity.location || "On-site"}
                </span>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm">
                    View details
                  </Button>
                  <Button size="sm">Apply / Request</Button>
                </div>
              </div>
            </Card>
          ))}
          {opportunities.length === 0 && !loading && (
            <p className="col-span-full text-sm text-slate-500">
              No opportunities available yet. Encourage alumni to post openings.
            </p>
          )}
        </section>
      )}
    </div>
  );
}
