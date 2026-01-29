"use client";

import { useState, useEffect } from "react";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { UsersIcon, TargetIcon, TrendingUpIcon } from "lucide-react";
import { STUDENT_MOCK_DATA, ALUMNI_MOCK_DATA, FACULTY_MOCK_DATA } from "../../lib/mock-data";

export default function SimpleDashboardPage() {
    const [userRole, setUserRole] = useState("STUDENT");
    const [mockData, setMockData] = useState<any>(STUDENT_MOCK_DATA);

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
    }, []);

    return (
        <div className="p-8 space-y-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold leading-none tracking-tight text-slate-900">
                    Dashboard - NEW VERSION
                </h1>
                <p className="mt-3 text-lg text-slate-600">
                    {userRole === "STUDENT" && "NEW: Career Readiness Progress"}
                    {userRole === "ALUMNI" && "NEW: Mentorship Impact & Referral Performance"}
                    {userRole === "FACULTY" && "NEW: Platform Health & Governance"}
                </p>
            </header>

            {/* Role-specific analytics */}
            {userRole === "STUDENT" && (
                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="p-6">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">NEW: Career Readiness Progress</h2>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Mentorship Readiness</span>
                                    <span className="font-medium">60%</span>
                                </div>
                                <div className="h-2 bg-slate-200 rounded-full">
                                    <div className="h-2 bg-blue-500 rounded-full" style={{ width: "60%" }}></div>
                                </div>
                                <p className="text-xs text-slate-500 mt-1">2/3 recommended mentors connected</p>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Interview Prep Coverage</span>
                                    <span className="font-medium">75%</span>
                                </div>
                                <div className="h-2 bg-slate-200 rounded-full">
                                    <div className="h-2 bg-green-500 rounded-full" style={{ width: "75%" }}></div>
                                </div>
                                <p className="text-xs text-slate-500 mt-1">Missing: HR interviews, Behavioral prep</p>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Profile Strength</span>
                                    <span className="font-medium">82%</span>
                                </div>
                                <div className="h-2 bg-slate-200 rounded-full">
                                    <div className="h-2 bg-amber-500 rounded-full" style={{ width: "82%" }}></div>
                                </div>
                                <p className="text-xs text-slate-500 mt-1">Add portfolio projects to reach 90%+</p>
                            </div>
                            <div className="pt-3 border-t border-slate-200">
                                <p className="text-xs text-slate-500">
                                    💡 NEW Insight: Students with 2+ mentors receive 1.8× more referrals
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {userRole === "ALUMNI" && (
                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="p-6">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">NEW: Mentorship Impact</h2>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Students Mentored</p>
                                    <p className="text-sm text-slate-500">This quarter</p>
                                </div>
                                <Badge tone="success" className="text-lg">12</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Active Mentorships</p>
                                    <p className="text-sm text-slate-500">Currently engaged</p>
                                </div>
                                <Badge tone="neutral">3</Badge>
                            </div>
                            <div className="pt-3 border-t border-slate-200">
                                <p className="text-xs text-slate-500">
                                    💡 NEW Impact: Your mentorship has helped 3 students secure internships
                                </p>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-6">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">NEW: Referral Performance</h2>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Referral Success Rate</span>
                                    <span className="font-medium">42%</span>
                                </div>
                                <div className="h-2 bg-slate-200 rounded-full">
                                    <div className="h-2 bg-green-500 rounded-full" style={{ width: "42%" }}></div>
                                </div>
                                <p className="text-xs text-slate-500 mt-1">Industry average: 35%</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Interview Conversions</p>
                                    <p className="text-sm text-slate-500">From your referrals</p>
                                </div>
                                <Badge tone="warning">45%</Badge>
                            </div>
                            <div className="pt-3 border-t border-slate-200">
                                <p className="text-xs text-slate-500">
                                    💡 NEW Insight: Your referrals have a 45% interview conversion rate
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {userRole === "FACULTY" && (
                <Card className="p-6">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">NEW: Platform Health Dashboard</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <span className="font-medium">System Status</span>
                                <Badge tone="success">Operational</Badge>
                            </div>
                            <div className="flex items-center justify-between mb-3">
                                <span className="font-medium">Pending Verifications</span>
                                <Badge tone="warning">5</Badge>
                            </div>
                            <div className="flex items-center justify-between mb-3">
                                <span className="font-medium">Content Moderation</span>
                                <span>2 issues</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-medium">Active Users</span>
                                <span>612 students</span>
                            </div>
                        </div>
                        <div>
                            <div className="pt-3 border-t border-slate-200 space-y-2">
                                <p className="text-xs text-slate-500">
                                    ⚠️ NEW Alert: 35% of interview experiences are older than 2 years
                                </p>
                                <p className="text-xs text-slate-500">
                                    💡 NEW Recommendation: Encourage alumni to update content
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>
            )}

            {/* Test controls */}
            <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-bold mb-3">Test Controls:</h3>
                <div className="flex gap-2 flex-wrap">
                    <button
                        onClick={() => {
                            localStorage.setItem("currentUser", JSON.stringify({
                                id: "demo-student-1",
                                firstName: "Test",
                                lastName: "Student",
                                email: "student@test.edu",
                                role: "STUDENT"
                            }));
                            window.location.reload();
                        }}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                    >
                        Student View
                    </button>
                    <button
                        onClick={() => {
                            localStorage.setItem("currentUser", JSON.stringify({
                                id: "demo-alumni-1",
                                firstName: "Test",
                                lastName: "Alumni",
                                email: "alumni@test.edu",
                                role: "ALUMNI"
                            }));
                            window.location.reload();
                        }}
                        className="bg-cyan-500 text-white px-3 py-1 rounded text-sm hover:bg-cyan-600"
                    >
                        Alumni View
                    </button>
                    <button
                        onClick={() => {
                            localStorage.setItem("currentUser", JSON.stringify({
                                id: "demo-faculty-1",
                                firstName: "Test",
                                lastName: "Faculty",
                                email: "faculty@test.edu",
                                role: "FACULTY"
                            }));
                            window.location.reload();
                        }}
                        className="bg-purple-500 text-white px-3 py-1 rounded text-sm hover:bg-purple-600"
                    >
                        Faculty View
                    </button>
                </div>
            </div>
        </div>
    );
}