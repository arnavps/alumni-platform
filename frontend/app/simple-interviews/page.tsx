"use client";

import { useState, useEffect } from "react";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { BookOpenIcon, ClockIcon, TargetIcon, UsersIcon } from "lucide-react";
import { STUDENT_MOCK_DATA, ALUMNI_MOCK_DATA, FACULTY_MOCK_DATA } from "../../lib/mock-data";

export default function SimpleInterviewPage() {
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
                    Interview Experiences - NEW VERSION
                </h1>
                <p className="mt-3 text-lg text-slate-600">
                    {userRole === "STUDENT" && "NEW: Interview Preparation Analytics"}
                    {userRole === "ALUMNI" && "NEW: Knowledge Contribution Insights"}
                    {userRole === "FACULTY" && "NEW: Content Ecosystem Analytics"}
                </p>
            </header>

            {/* Role-specific content */}
            {userRole === "STUDENT" && (
                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="p-6">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">NEW: Preparation Progress</h2>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Domains Covered</span>
                                    <span className="font-medium">3/5</span>
                                </div>
                                <div className="h-2 bg-slate-200 rounded-full">
                                    <div className="h-2 bg-blue-500 rounded-full" style={{ width: "60%" }}></div>
                                </div>
                                <div className="text-xs text-slate-500 mt-2">
                                    <div>✓ DSA & System Design</div>
                                    <div>✓ Technical Interviews</div>
                                    <div>○ HR/Behavioral (0/3 viewed)</div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Companies Researched</span>
                                    <span className="font-medium">7/12</span>
                                </div>
                                <div className="h-2 bg-slate-200 rounded-full">
                                    <div className="h-2 bg-green-500 rounded-full" style={{ width: "58%" }}></div>
                                </div>
                                <p className="text-xs text-slate-500 mt-1">Top: Google, Microsoft, Amazon</p>
                            </div>
                            <div className="pt-3 border-t border-slate-200">
                                <p className="text-xs text-slate-500">
                                    💡 NEW Insight: Students who viewed ≥10 experiences had 40% higher referral success
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {userRole === "ALUMNI" && (
                <Card className="p-6">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">NEW: Content Impact Metrics</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-slate-900">12</div>
                            <div className="text-sm text-slate-600">Insights Shared</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-slate-900">1,247</div>
                            <div className="text-sm text-slate-600">Total Views</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-slate-900">89%</div>
                            <div className="text-sm text-slate-600">Helpfulness Rating</div>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-200">
                        <p className="text-xs text-slate-500">
                            💡 NEW Insight: Your Atlassian interview insight is in the top 10% of viewed content
                        </p>
                    </div>
                </Card>
            )}

            {userRole === "FACULTY" && (
                <Card className="p-6">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">NEW: Knowledge Base Health</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span>Content Freshness</span>
                                <span className="font-medium">65%</span>
                            </div>
                            <div className="h-2 bg-slate-200 rounded-full">
                                <div className="h-2 bg-amber-500 rounded-full" style={{ width: "65%" }}></div>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">35% of experiences older than 2 years</p>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span>Domain Coverage</span>
                                <span className="font-medium">78%</span>
                            </div>
                            <div className="h-2 bg-slate-200 rounded-full">
                                <div className="h-2 bg-green-500 rounded-full" style={{ width: "78%" }}></div>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">Missing: Data Science, Product roles</p>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-200 space-y-2">
                        <p className="text-xs text-slate-500">
                            ⚠️ NEW Alert: High student interest, low alumni contribution in Data Science roles
                        </p>
                        <p className="text-xs text-slate-500">
                            💡 NEW Recommendation: Reach out to recent DS alumni for contributions
                        </p>
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