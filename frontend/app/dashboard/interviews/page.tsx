"use client";

import { useState, useEffect } from "react";
import { Card } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { BookOpenIcon, ClockIcon, TargetIcon, UsersIcon, TrendingUpIcon } from "lucide-react";
import { STUDENT_MOCK_DATA, ALUMNI_MOCK_DATA, FACULTY_MOCK_DATA } from "../../../lib/mock-data";

export default function InterviewExperiencesPage() {
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
                        Interview Experiences
                    </h1>
                    <p className="mt-3 text-lg text-slate-600">
                        Loading interview data...
                    </p>
                </header>
                <div className="grid gap-6 md:grid-cols-2">
                    {[1, 2].map((i) => (
                        <Card key={i} className="h-64 animate-pulse bg-slate-100" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold leading-none tracking-tight text-slate-900">
                    Interview Experiences
                </h1>
                <p className="mt-3 text-lg text-slate-600">
                    {userRole === "STUDENT" && "Am I using this content effectively to prepare?"}
                    {userRole === "ALUMNI" && "Is my shared knowledge helping students?"}
                    {userRole === "FACULTY" && "Is this content current, balanced, and useful?"}
                </p>
            </header>

            <div className="grid gap-8 md:grid-cols-2">
                {/* Main Analytics Section */}
                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">
                        {userRole === "STUDENT" && "Interview Preparation Analytics"}
                        {userRole === "ALUMNI" && "Knowledge Contribution Insights"}
                        {userRole === "FACULTY" && "Content Ecosystem Analytics"}
                    </h2>

                    {userRole === "STUDENT" && (
                        <Card className="p-6">
                            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                <TargetIcon className="h-5 w-5 text-blue-500" />
                                Preparation Progress
                            </h3>
                            <div className="space-y-5">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="font-medium">Interview Prep Coverage</span>
                                        <span className="font-bold text-blue-600">75%</span>
                                    </div>
                                    <div className="h-3 bg-slate-200 rounded-full mb-3">
                                        <div className="h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style={{ width: "75%" }}></div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 text-xs">
                                        <div className="flex items-center">
                                            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                            <span>DSA & System Design (Complete)</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                            <span>Technical Interviews (Complete)</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                                            <span>HR/Behavioral (0/3 viewed)</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                                            <span>Product Sense (0/2 viewed)</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="font-medium">Companies Researched</span>
                                        <span className="font-bold text-green-600">7/12</span>
                                    </div>
                                    <div className="h-3 bg-slate-200 rounded-full">
                                        <div className="h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: "58%" }}></div>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-2">Top: Google, Microsoft, Amazon, Meta, Apple</p>
                                </div>

                                <div className="pt-4 border-t border-slate-200">
                                    <div className="flex items-start gap-2">
                                        <TrendingUpIcon className="h-4 w-4 text-green-500 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">Key Insight</p>
                                            <p className="text-xs text-slate-600">Students who viewed ≥10 experiences had 40% higher referral success rates</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )}

                    {userRole === "ALUMNI" && (
                        <Card className="p-6">
                            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                <UsersIcon className="h-5 w-5 text-cyan-500" />
                                Content Impact Metrics
                            </h3>
                            <div className="space-y-5">
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div className="bg-blue-50 rounded-lg p-3">
                                        <div className="text-2xl font-bold text-blue-600">12</div>
                                        <div className="text-xs text-slate-600">Insights Shared</div>
                                    </div>
                                    <div className="bg-green-50 rounded-lg p-3">
                                        <div className="text-2xl font-bold text-green-600">1,247</div>
                                        <div className="text-xs text-slate-600">Total Views</div>
                                    </div>
                                    <div className="bg-amber-50 rounded-lg p-3">
                                        <div className="text-2xl font-bold text-amber-600">89%</div>
                                        <div className="text-xs text-slate-600">Helpfulness Rating</div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-200">
                                    <div className="flex items-start gap-2">
                                        <TrendingUpIcon className="h-4 w-4 text-green-500 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">Performance Insight</p>
                                            <p className="text-xs text-slate-600">Your Atlassian interview insight is in the top 10% of viewed content</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <div className="flex items-start gap-2">
                                        <TargetIcon className="h-4 w-4 text-blue-500 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">Engagement Insight</p>
                                            <p className="text-xs text-slate-600">Students preparing for backend roles engage most with your content</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )}

                    {userRole === "FACULTY" && (
                        <Card className="p-6">
                            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                <BookOpenIcon className="h-5 w-5 text-purple-500" />
                                Knowledge Base Health
                            </h3>
                            <div className="space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="font-medium">Content Freshness</span>
                                            <span className="font-bold text-amber-600">65%</span>
                                        </div>
                                        <div className="h-3 bg-slate-200 rounded-full">
                                            <div className="h-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" style={{ width: "65%" }}></div>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-1">35% older than 2 years</p>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="font-medium">Domain Coverage</span>
                                            <span className="font-bold text-green-600">78%</span>
                                        </div>
                                        <div className="h-3 bg-slate-200 rounded-full">
                                            <div className="h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: "78%" }}></div>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-1">Missing: Data Science, Product</p>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-200 space-y-3">
                                    <div className="flex items-start gap-2">
                                        <TrendingUpIcon className="h-4 w-4 text-amber-500 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">⚠️ Alert</p>
                                            <p className="text-xs text-slate-600">High student interest, low alumni contribution in Data Science roles</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <TargetIcon className="h-4 w-4 text-blue-500 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">💡 Recommendation</p>
                                            <p className="text-xs text-slate-600">Reach out to recent DS alumni for contributions</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )}
                </section>

                {/* Recent Experiences Section */}
                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Recent Activity</h2>
                    <Card className="p-6">
                        <h3 className="font-semibold text-slate-900 mb-4">Knowledge Asset Activity</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-sm">New interview experience added</p>
                                    <p className="text-xs text-slate-500">2 hours ago</p>
                                </div>
                                <Badge tone="success" className="text-xs">Fresh</Badge>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-sm">Content updated for relevance</p>
                                    <p className="text-xs text-slate-500">1 day ago</p>
                                </div>
                                <Badge tone="neutral" className="text-xs">Updated</Badge>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-sm">High engagement insight</p>
                                    <p className="text-xs text-slate-500">3 days ago</p>
                                </div>
                                <Badge tone="warning" className="text-xs">Popular</Badge>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-200">
                            <p className="text-xs text-slate-500">
                                {userRole === "STUDENT" && "💡 Tip: Complete your HR interview preparation to reach 90% readiness"}
                                {userRole === "ALUMNI" && "💡 Tip: Share insights about emerging tech trends to increase engagement"}
                                {userRole === "FACULTY" && "💡 Tip: Encourage alumni from underrepresented domains to contribute"}
                            </p>
                        </div>
                    </Card>
                </section>
            </div>
        </div>
    );
}