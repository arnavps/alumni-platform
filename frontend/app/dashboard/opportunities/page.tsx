"use client";

import { useState, useEffect } from "react";
import { Card } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { BriefcaseIcon, MapPinIcon, GlobeIcon, UserIcon, ClockIcon } from "lucide-react";
import { STUDENT_MOCK_DATA, ALUMNI_MOCK_DATA, FACULTY_MOCK_DATA } from "../../../lib/mock-data";

const opportunityTypes = ["ALL", "INTERNSHIP", "JOB"] as const;
type OpportunityTypeFilter = (typeof opportunityTypes)[number];

export default function OpportunitiesPage() {
    const [userRole, setUserRole] = useState("STUDENT");
    const [mockData, setMockData] = useState<any>(STUDENT_MOCK_DATA);
    const [loading, setLoading] = useState(true);
    const [typeFilter, setTypeFilter] = useState<OpportunityTypeFilter>("ALL");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const mockUserStr = localStorage.getItem("currentUser");
            let role = "STUDENT";
            let data = STUDENT_MOCK_DATA;

            if (mockUserStr) {
                try {
                    const mockUser = JSON.parse(mockUserStr);
                    role = mockUser.role;

                    if (mockUser.role === "STUDENT") {
                        data = STUDENT_MOCK_DATA as any;
                    } else if (mockUser.role === "ALUMNI") {
                        data = ALUMNI_MOCK_DATA as any;
                    } else if (mockUser.role === "FACULTY") {
                        data = FACULTY_MOCK_DATA as any;
                    }
                } catch (e) {
                    console.error("Error parsing user data:", e);
                }
            }

            setUserRole(role);
            setMockData(data);
        }
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="space-y-8">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold leading-none tracking-tight text-slate-900">
                        Opportunities
                    </h1>
                    <p className="mt-3 text-lg text-slate-600">
                        Loading opportunities...
                    </p>
                </header>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <Card key={i} className="h-64 animate-pulse bg-slate-100" />
                    ))}
                </div>
            </div>
        );
    }

    // Get opportunities based on role
    let opportunities = [];
    if (userRole === "STUDENT") {
        opportunities = mockData.opportunities || [];
    } else if (userRole === "ALUMNI") {
        opportunities = mockData.opportunitiesPosted || [];
    } else {
        // Faculty sees all opportunities for analytics
        opportunities = [
            ...STUDENT_MOCK_DATA.opportunities,
            ...ALUMNI_MOCK_DATA.opportunitiesPosted
        ];
    }

    // Apply type filter
    if (typeFilter !== "ALL") {
        opportunities = opportunities.filter((opp: any) =>
            opp.type === typeFilter || (userRole === "ALUMNI" && opp.experienceLevel?.includes(typeFilter))
        );
    }

    return (
        <div className="space-y-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold leading-none tracking-tight text-slate-900">
                    Opportunities
                </h1>
                <p className="mt-3 text-lg text-slate-600">
                    {userRole === "STUDENT" && "Browse internships and jobs posted by verified alumni."}
                    {userRole === "ALUMNI" && "Manage your job postings and referral opportunities."}
                    {userRole === "FACULTY" && "Monitor all opportunities posted across the platform."}
                </p>
            </header>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4">
                    <span className="text-sm font-semibold text-slate-600">Filter by Type</span>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {opportunityTypes.map((type) => (
                            <button
                                key={type}
                                onClick={() => setTypeFilter(type)}
                                className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition-all ${typeFilter === type
                                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md hover:shadow-lg"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                    }`}
                            >
                                {type === "ALL" ? "All" : type.charAt(0) + type.slice(1).toLowerCase()}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {opportunities.map((opportunity: any, index: number) => (
                    <Card key={index} className="group flex flex-col transition-all hover:-translate-y-1 hover:shadow-xl">
                        <div className="mb-4 flex items-start justify-between">
                            <div className="flex-1">
                                <Badge tone="neutral" className="mb-3 text-xs uppercase tracking-wide">
                                    {userRole === "ALUMNI" ? opportunity.experienceLevel || "Mid-Senior" : opportunity.type}
                                </Badge>
                                <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                                    {userRole === "ALUMNI" ? opportunity.title : opportunity.title}
                                </h3>
                                <p className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                                    <BriefcaseIcon className="h-4 w-4" />
                                    {userRole === "ALUMNI" ? opportunity.department : opportunity.company}
                                    <Badge tone="success" className="ml-2 text-xs">
                                        ✓ Institute Verified
                                    </Badge>
                                </p>
                            </div>
                        </div>

                        {userRole === "STUDENT" && (
                            <>
                                <div className="mb-4 flex items-center gap-3 text-sm text-slate-600">
                                    {opportunity.remote ? (
                                        <span className="flex items-center gap-1">
                                            <GlobeIcon className="h-4 w-4" />
                                            Remote friendly
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1">
                                            <MapPinIcon className="h-4 w-4" />
                                            {opportunity.location || "On-site"}
                                        </span>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <p className="text-sm text-slate-600">
                                        <span className="font-medium">Domain:</span> {opportunity.domain}
                                    </p>
                                    <p className="text-sm text-slate-600">
                                        <span className="font-medium">Referrer:</span> {opportunity.alumniReferrer}
                                    </p>
                                    <div className="mt-2">
                                        <Badge tone={opportunity.status === "REFERRED" ? "success" : opportunity.status === "IN_REVIEW" ? "warning" : "neutral"}>
                                            {opportunity.status.replace('_', ' ')}
                                        </Badge>
                                    </div>
                                </div>
                            </>
                        )}

                        {userRole === "ALUMNI" && (
                            <>
                                <div className="mb-4">
                                    <p className="text-sm text-slate-600">
                                        <span className="font-medium">Applications:</span> {opportunity.applicationsReceived}
                                    </p>
                                    <p className="text-sm text-slate-600">
                                        <span className="font-medium">Referral Slots:</span> {opportunity.referralSlotsRemaining}
                                    </p>
                                    <div className="mt-2">
                                        <Badge tone={opportunity.status === "OPEN" ? "success" : "neutral"}>
                                            {opportunity.status}
                                        </Badge>
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="mt-auto flex gap-3">
                            <Button variant="secondary" size="sm" className="flex-1">
                                {userRole === "STUDENT" ? "View details" : "Edit"}
                            </Button>
                            {userRole === "STUDENT" && (
                                <Button size="sm" className="flex-1">
                                    Apply
                                </Button>
                            )}
                            {userRole === "ALUMNI" && (
                                <Button size="sm" className="flex-1">
                                    {opportunity.status === "OPEN" ? "Close" : "Reopen"}
                                </Button>
                            )}
                        </div>
                    </Card>
                ))}
                {opportunities.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-16">
                        <BriefcaseIcon className="h-12 w-12 text-slate-400 opacity-50" />
                        <p className="mt-4 text-sm text-slate-600">
                            {userRole === "STUDENT" && "No opportunities available yet. Check back soon or explore other ways to connect with alumni!"}
                            {userRole === "ALUMNI" && "No opportunities posted yet. Share job openings to help students find their dream roles!"}
                            {userRole === "FACULTY" && "No opportunities posted across the platform. Encourage alumni to contribute job listings."}
                        </p>
                        <div className="mt-4 text-xs text-slate-500">
                            {userRole === "STUDENT" && "Tip: Complete your profile to get personalized recommendations"}
                            {userRole === "ALUMNI" && "Tip: Posting opportunities helps build your professional network"}
                            {userRole === "FACULTY" && "Tip: Reach out to recent alumni to encourage participation"}
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}
