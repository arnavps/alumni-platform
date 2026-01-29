"use client";

import { useState, useEffect } from "react";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { TrendingUpIcon, UsersIcon, TargetIcon, ArrowUpRightIcon } from "lucide-react";
import { STUDENT_MOCK_DATA, ALUMNI_MOCK_DATA, FACULTY_MOCK_DATA } from "../../lib/mock-data";

export default function DashboardPage() {
    const [userRole, setUserRole] = useState("STUDENT");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const mockUserStr = localStorage.getItem("currentUser");
            let role = "STUDENT";

            if (mockUserStr) {
                try {
                    const mockUser = JSON.parse(mockUserStr);
                    role = mockUser.role;
                } catch (e) {
                    console.error("Error parsing user data:", e);
                }
            }

            setUserRole(role);
        }
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="space-y-8">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold leading-none tracking-tight text-slate-900">
                        Overview
                    </h1>
                    <p className="mt-3 text-lg text-slate-600">
                        Loading dashboard...
                    </p>
                </header>
                <div className="grid gap-6 md:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <Card key={i} className="h-48 animate-pulse bg-slate-100" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold leading-none tracking-tight text-slate-900">
                    Overview
                </h1>
                <p className="mt-3 text-lg text-slate-600">
                    {userRole === "STUDENT" && "Am I progressing toward opportunities and readiness?"}
                    {userRole === "ALUMNI" && "Is my contribution impactful and efficient?"}
                    {userRole === "FACULTY" && "Is the ecosystem healthy, fair, and effective?"}
                </p>
            </header>

            {/* Role-specific Success Metrics */}
            <section className="grid gap-6 md:grid-cols-3">
                {userRole === "STUDENT" && (
                    <>
                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-sm font-semibold uppercase tracking-wider text-slate-600">
                                    Career Readiness
                                </p>
                                <TargetIcon className="h-5 w-5 text-blue-500" />
                            </div>
                            <p className="mb-4 text-5xl font-bold leading-none text-slate-900">
                                75%
                            </p>
                            <div className="mb-3">
                                <div className="h-2 bg-slate-200 rounded-full">
                                    <div className="h-2 bg-blue-500 rounded-full" style={{ width: "75%" }}></div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge tone="success">
                                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-600" />
                                    On Track
                                </Badge>
                                <span className="text-sm text-emerald-600 font-medium">
                                    +12% this month
                                </span>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-sm font-semibold uppercase tracking-wider text-slate-600">
                                    Mentorship Progress
                                </p>
                                <UsersIcon className="h-5 w-5 text-green-500" />
                            </div>
                            <p className="mb-4 text-5xl font-bold leading-none text-slate-900">
                                2/3
                            </p>
                            <p className="text-sm text-slate-600 mb-3">
                                Recommended mentors connected
                            </p>
                            <div className="flex items-center gap-2">
                                <Badge tone="warning">
                                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-600" />
                                    In Progress
                                </Badge>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-sm font-semibold uppercase tracking-wider text-slate-600">
                                    Profile Strength
                                </p>
                                <TrendingUpIcon className="h-5 w-5 text-amber-500" />
                            </div>
                            <p className="mb-4 text-5xl font-bold leading-none text-slate-900">
                                82%
                            </p>
                            <p className="text-sm text-slate-600 mb-3">
                                Add portfolio projects to reach 90%+
                            </p>
                            <div className="flex items-center gap-2">
                                <Badge tone="success">
                                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-600" />
                                    Strong
                                </Badge>
                            </div>
                        </Card>
                    </>
                )}

                {userRole === "ALUMNI" && (
                    <>
                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-sm font-semibold uppercase tracking-wider text-slate-600">
                                    Mentorship Impact
                                </p>
                                <UsersIcon className="h-5 w-5 text-blue-500" />
                            </div>
                            <p className="mb-4 text-5xl font-bold leading-none text-slate-900">
                                12
                            </p>
                            <p className="text-sm text-slate-600 mb-3">
                                Students mentored this quarter
                            </p>
                            <div className="flex items-center gap-2">
                                <Badge tone="success">
                                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-600" />
                                    High Impact
                                </Badge>
                                <span className="text-sm text-emerald-600 font-medium">
                                    3 secured internships
                                </span>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-sm font-semibold uppercase tracking-wider text-slate-600">
                                    Referral Success
                                </p>
                                <TargetIcon className="h-5 w-5 text-green-500" />
                            </div>
                            <p className="mb-4 text-5xl font-bold leading-none text-slate-900">
                                42%
                            </p>
                            <p className="text-sm text-slate-600 mb-3">
                                Industry average: 35%
                            </p>
                            <div className="flex items-center gap-2">
                                <Badge tone="success">
                                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-600" />
                                    Above Average
                                </Badge>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-sm font-semibold uppercase tracking-wider text-slate-600">
                                    Interview Conversion
                                </p>
                                <TrendingUpIcon className="h-5 w-5 text-amber-500" />
                            </div>
                            <p className="mb-4 text-5xl font-bold leading-none text-slate-900">
                                45%
                            </p>
                            <p className="text-sm text-slate-600 mb-3">
                                From your referrals
                            </p>
                            <div className="flex items-center gap-2">
                                <Badge tone="warning">
                                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-600" />
                                    Strong Performance
                                </Badge>
                            </div>
                        </Card>
                    </>
                )}

                {userRole === "FACULTY" && (
                    <>
                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-sm font-semibold uppercase tracking-wider text-slate-600">
                                    Platform Health
                                </p>
                                <TargetIcon className="h-5 w-5 text-blue-500" />
                            </div>
                            <p className="mb-4 text-5xl font-bold leading-none text-slate-900">
                                Good
                            </p>
                            <p className="text-sm text-slate-600 mb-3">
                                System operational
                            </p>
                            <div className="flex items-center gap-2">
                                <Badge tone="success">
                                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-600" />
                                    Stable
                                </Badge>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-sm font-semibold uppercase tracking-wider text-slate-600">
                                    Alumni Participation
                                </p>
                                <UsersIcon className="h-5 w-5 text-green-500" />
                            </div>
                            <p className="mb-4 text-5xl font-bold leading-none text-slate-900">
                                64%
                            </p>
                            <p className="text-sm text-slate-600 mb-3">
                                Active engagement rate
                            </p>
                            <div className="flex items-center gap-2">
                                <Badge tone="success">
                                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-600" />
                                    Healthy
                                </Badge>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-sm font-semibold uppercase tracking-wider text-slate-600">
                                    Content Freshness
                                </p>
                                <TrendingUpIcon className="h-5 w-5 text-amber-500" />
                            </div>
                            <p className="mb-4 text-5xl font-bold leading-none text-slate-900">
                                65%
                            </p>
                            <p className="text-sm text-slate-600 mb-3">
                                Recent content ratio
                            </p>
                            <div className="flex items-center gap-2">
                                <Badge tone="warning">
                                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-600" />
                                    Room for Improvement
                                </Badge>
                            </div>
                        </Card>
                    </>
                )}
            </section>

            {/* Quick Actions */}
            <section className="mt-8">
                <h2 className="mb-4 text-xl font-bold text-slate-900">Quick Actions</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {[
                        { label: "View Opportunities", href: "/dashboard/opportunities" },
                        { label: "Manage Referrals", href: "/dashboard/referrals" },
                        { label: "Find Mentors", href: "/dashboard/mentorship" },
                        { label: "Interview Insights", href: "/dashboard/interviews" },
                    ].map((action, idx) => (
                        <a
                            key={idx}
                            href={action.href}
                            className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:border-blue-300"
                        >
                            <span className="font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
                                {action.label}
                            </span>
                            <ArrowUpRightIcon className="h-5 w-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                        </a>
                    ))}
                </div>
            </section>
        </div>
    );
}