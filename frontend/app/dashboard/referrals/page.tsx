"use client";

import { useState, useEffect } from "react";
import { Card } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { UserCheckIcon, ClockIcon, TargetIcon } from "lucide-react";
import { STUDENT_MOCK_DATA, ALUMNI_MOCK_DATA, FACULTY_MOCK_DATA } from "../../../lib/mock-data";

export default function ReferralsPage() {
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
                        Referrals
                    </h1>
                    <p className="mt-3 text-lg text-slate-600">
                        Loading referral data...
                    </p>
                </header>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <Card key={i} className="h-48 animate-pulse bg-slate-100" />
                    ))}
                </div>
            </div>
        );
    }

    // Get referral data based on role
    let referrals = [];
    let pipeline = [];

    if (userRole === "STUDENT") {
        referrals = mockData.referrals || []; // This would come from actual data in real implementation
    } else if (userRole === "ALUMNI") {
        pipeline = mockData.referralPipeline || [];
    } else {
        // Faculty sees analytics
        pipeline = ALUMNI_MOCK_DATA.referralPipeline;
        referrals = []; // Student mock data doesn't have referrals property
    }

    return (
        <div className="space-y-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold leading-none tracking-tight text-slate-900">
                    Referrals
                </h1>
                <p className="mt-3 text-lg text-slate-600">
                    {userRole === "STUDENT" && "Track your referral requests and outcomes."}
                    {userRole === "ALUMNI" && "Manage your referral pipeline and student requests."}
                    {userRole === "FACULTY" && "Platform referral analytics and success metrics."}
                </p>
            </header>

            {userRole === "STUDENT" && (
                <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    <Card className="p-6 text-center">
                        <div className="mb-4">
                            <TargetIcon className="h-12 w-12 text-blue-500 mx-auto" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900">
                            {mockData.metrics?.referralsRequested || 3}
                        </h3>
                        <p className="text-slate-600 mt-2">Referrals Requested</p>
                    </Card>
                    <Card className="p-6 text-center">
                        <div className="mb-4">
                            <UserCheckIcon className="h-12 w-12 text-green-500 mx-auto" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900">
                            {Math.floor((mockData.metrics?.referralsRequested || 3) * 0.42)}
                        </h3>
                        <p className="text-slate-600 mt-2">Successful Referrals</p>
                        <Badge tone="success" className="mt-2">42% Success Rate</Badge>
                    </Card>
                    <Card className="p-6 text-center">
                        <div className="mb-4">
                            <ClockIcon className="h-12 w-12 text-amber-500 mx-auto" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900">2-3 weeks</h3>
                        <p className="text-slate-600 mt-2">Average Response Time</p>
                    </Card>
                </section>
            )}

            {userRole === "ALUMNI" && (
                <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {pipeline.map((referral: any, index: number) => (
                        <Card key={index} className="group flex flex-col transition-all hover:-translate-y-1 hover:shadow-xl">
                            <div className="mb-4 flex items-start justify-between">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                                        {referral.studentName}
                                    </h3>
                                    <p className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                                        <UserCheckIcon className="h-4 w-4" />
                                        {referral.role} at {referral.company}
                                    </p>
                                </div>
                                <Badge tone={
                                    referral.status === "OFFER_RECEIVED" ? "success" :
                                        referral.status === "INTERVIEW_SCHEDULED" ? "warning" :
                                            referral.status === "REFERRED" ? "neutral" : "danger"
                                }>
                                    <span className={`inline-block h-1.5 w-1.5 rounded-full ${referral.status === "OFFER_RECEIVED" ? "bg-emerald-600" :
                                        referral.status === "INTERVIEW_SCHEDULED" ? "bg-amber-600" :
                                            referral.status === "REFERRED" ? "bg-blue-600" : "bg-rose-600"
                                        }`} />
                                    {referral.status.replace('_', ' ')}
                                </Badge>
                            </div>
                            <p className="mb-4 text-sm text-slate-600">
                                <span className="font-medium">Last updated:</span> {referral.lastUpdated}
                                <span className="ml-2 text-xs text-slate-400">• Updated 2 days ago</span>
                            </p>
                            <div className="mt-auto flex gap-3">
                                <Button size="sm" className="flex-1">
                                    {referral.status === "REFERRED" ? "Follow Up" : "View Details"}
                                </Button>
                                {referral.status === "INTERVIEW_SCHEDULED" && (
                                    <Button variant="secondary" size="sm" className="flex-1">
                                        Schedule Call
                                    </Button>
                                )}
                            </div>
                        </Card>
                    ))}
                    {pipeline.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-16">
                            <UserCheckIcon className="h-12 w-12 text-slate-400 opacity-50" />
                            <p className="mt-4 text-sm text-slate-600">
                                No referrals in your pipeline yet. Students will request referrals soon!
                            </p>
                        </div>
                    )}
                </section>
            )}

            {userRole === "FACULTY" && (
                <div className="grid gap-8">
                    <div className="grid gap-6 md:grid-cols-3">
                        <Card className="p-6 text-center">
                            <h3 className="text-3xl font-bold text-slate-900">
                                {FACULTY_MOCK_DATA.metrics.referralSuccessRate}%
                            </h3>
                            <p className="text-slate-600 mt-2">Platform Referral Success Rate</p>
                        </Card>
                        <Card className="p-6 text-center">
                            <h3 className="text-3xl font-bold text-slate-900">
                                {ALUMNI_MOCK_DATA.metrics.referralsGiven}
                            </h3>
                            <p className="text-slate-600 mt-2">Total Referrals Given</p>
                        </Card>
                        <Card className="p-6 text-center">
                            <h3 className="text-3xl font-bold text-slate-900">
                                {pipeline.filter((r: any) => r.status === "OFFER_RECEIVED").length}
                            </h3>
                            <p className="text-slate-600 mt-2">Successful Offers</p>
                        </Card>
                    </div>

                    <Card className="p-6">
                        <h3 className="text-xl font-bold text-slate-900 mb-4">Recent Referral Activity</h3>
                        <div className="space-y-4">
                            {pipeline.slice(0, 5).map((referral: any, index: number) => (
                                <div key={index} className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0">
                                    <div>
                                        <p className="font-medium">{referral.studentName}</p>
                                        <p className="text-sm text-slate-600">
                                            {referral.role} at {referral.company}
                                        </p>
                                    </div>
                                    <Badge tone={
                                        referral.status === "OFFER_RECEIVED" ? "success" :
                                            referral.status === "INTERVIEW_SCHEDULED" ? "warning" : "neutral"
                                    }>
                                        {referral.status.replace('_', ' ')}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}
