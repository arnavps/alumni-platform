"use client";

import { useState, useEffect } from "react";
import { Card } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { TrendingUpIcon, UsersIcon, TargetIcon, BarChartIcon, BookOpenIcon, ClockIcon } from "lucide-react";
import { STUDENT_MOCK_DATA, ALUMNI_MOCK_DATA, FACULTY_MOCK_DATA } from "../../../lib/mock-data";

export default function AnalyticsPage() {
    const [userRole, setUserRole] = useState("STUDENT");
    const [mockData, setMockData] = useState<any>(STUDENT_MOCK_DATA);
    const [loading, setLoading] = useState(true);

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
                        Analytics
                    </h1>
                    <p className="mt-3 text-lg text-slate-600">
                        Loading analytics data...
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
                    Analytics
                </h1>
                <p className="mt-3 text-lg text-slate-600">
                    {userRole === "STUDENT" && "Am I progressing toward opportunities and readiness?"}
                    {userRole === "ALUMNI" && "Is my contribution impactful and efficient?"}
                    {userRole === "FACULTY" && "Is the ecosystem healthy, fair, and effective?"}
                </p>
            </header>

            {/* Role-specific Analytics */}
            {userRole === "STUDENT" && (
                <section className="grid gap-6 md:grid-cols-3">
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
                </section>
            )}

            {userRole === "ALUMNI" && (
                <section className="grid gap-6 md:grid-cols-3">
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
                </section>
            )}

            {userRole === "FACULTY" && (
                <section className="grid gap-6 md:grid-cols-3">
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
                            <BookOpenIcon className="h-5 w-5 text-amber-500" />
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
                </section>
            )}

            {/* Detailed Analytics Section */}
            <section className="grid gap-6 md:grid-cols-2">
                <Card className="p-6">
                    <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-slate-600">
                        {userRole === "STUDENT" && "Opportunity Funnel"}
                        {userRole === "ALUMNI" && "Weekly Impact"}
                        {userRole === "FACULTY" && "Moderation Queue"}
                    </h3>
                    <div className="space-y-4">
                        {userRole === "STUDENT" && (
                            <>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Applications Submitted</span>
                                    <Badge tone="neutral">12</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Referrals Received</span>
                                    <Badge tone="success">5</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Interviews Scheduled</span>
                                    <Badge tone="warning">3</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Offers Received</span>
                                    <Badge tone="success">1</Badge>
                                </div>
                            </>
                        )}

                        {userRole === "ALUMNI" && (
                            <>
                                <div className="flex justify-between text-sm">
                                    <span>Mentorship Hours</span>
                                    <span className="font-medium">6h</span>
                                </div>
                                <div className="h-2 bg-slate-200 rounded-full">
                                    <div className="h-2 bg-blue-500 rounded-full" style={{ width: "60%" }}></div>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Referrals Processed</span>
                                    <span className="font-medium">4</span>
                                </div>
                                <div className="h-2 bg-slate-200 rounded-full">
                                    <div className="h-2 bg-green-500 rounded-full" style={{ width: "40%" }}></div>
                                </div>
                            </>
                        )}

                        {userRole === "FACULTY" && (
                            <>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Pending Verifications</span>
                                    <Badge tone="warning">5</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Content Review</span>
                                    <Badge tone="neutral">2</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Reported Issues</span>
                                    <Badge tone="danger">1</Badge>
                                </div>
                            </>
                        )}
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-slate-600">
                        {userRole === "STUDENT" && "Weekly Activity"}
                        {userRole === "ALUMNI" && "Domain Focus"}
                        {userRole === "FACULTY" && "Growth Metrics"}
                    </h3>
                    <div className="space-y-4">
                        {userRole === "STUDENT" && (
                            <>
                                <div className="flex justify-between text-sm">
                                    <span>Interview Prep</span>
                                    <span className="font-medium">8h</span>
                                </div>
                                <div className="h-2 bg-slate-200 rounded-full">
                                    <div className="h-2 bg-blue-500 rounded-full" style={{ width: "80%" }}></div>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Mentorship Sessions</span>
                                    <span className="font-medium">3h</span>
                                </div>
                                <div className="h-2 bg-slate-200 rounded-full">
                                    <div className="h-2 bg-green-500 rounded-full" style={{ width: "30%" }}></div>
                                </div>
                            </>
                        )}

                        {userRole === "ALUMNI" && (
                            <>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Software Engineering</span>
                                    <Badge tone="success">High</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Data Science</span>
                                    <Badge tone="warning">Medium</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Product Management</span>
                                    <Badge tone="neutral">Low</Badge>
                                </div>
                            </>
                        )}

                        {userRole === "FACULTY" && (
                            <>
                                <div className="flex justify-between text-sm">
                                    <span>New Alumni Registered</span>
                                    <span className="font-medium">+24</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Active Students</span>
                                    <span className="font-medium">612</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Monthly Engagement</span>
                                    <span className="font-medium">↑ 12%</span>
                                </div>
                            </>
                        )}
                    </div>
                </Card>
            </section>

            {/* Insights Section */}
            <section>
                <Card className="p-6">
                    <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-slate-600">
                        Key Insights
                    </h3>
                    <div className="space-y-3">
                        {userRole === "STUDENT" && (
                            <div className="flex items-start gap-2">
                                <TrendingUpIcon className="h-4 w-4 text-green-500 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-slate-900">Students with 2+ mentors receive 1.8× more referrals</p>
                                    <p className="text-xs text-slate-600">Your response rate improved this month</p>
                                </div>
                            </div>
                        )}

                        {userRole === "ALUMNI" && (
                            <>
                                <div className="flex items-start gap-2">
                                    <TrendingUpIcon className="h-4 w-4 text-green-500 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">Your referrals have a 45% interview conversion rate</p>
                                        <p className="text-xs text-slate-600">Students from CS dept engage the most</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <TargetIcon className="h-4 w-4 text-blue-500 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">Your Atlassian interview insight is in the top 10% of viewed content</p>
                                        <p className="text-xs text-slate-600">Students preparing for backend roles engage most with your content</p>
                                    </div>
                                </div>
                            </>
                        )}

                        {userRole === "FACULTY" && (
                            <>
                                <div className="flex items-start gap-2">
                                    <TrendingUpIcon className="h-4 w-4 text-amber-500 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">⚠️ Alert: 35% of interview experiences are older than 2 years</p>
                                        <p className="text-xs text-slate-600">High student interest, low alumni contribution in Data Science roles</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <TargetIcon className="h-4 w-4 text-blue-500 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">💡 Recommendation: Reach out to recent DS alumni for contributions</p>
                                        <p className="text-xs text-slate-600">Encourage alumni from underrepresented domains to contribute</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </Card>
            </section>
        </div>
    );
}