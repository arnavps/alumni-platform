"use client";

import { useState, useEffect } from "react";
import { Card } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { UserCircleIcon, CalendarIcon, ClockIcon, MessageSquareIcon } from "lucide-react";
import { STUDENT_MOCK_DATA, ALUMNI_MOCK_DATA, FACULTY_MOCK_DATA } from "../../../lib/mock-data";

export default function MentorshipPage() {
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
                        Mentorship
                    </h1>
                    <p className="mt-3 text-lg text-slate-600">
                        Loading mentorship data...
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

    // Get mentorship data based on role
    let mentorships = [];
    let requests = [];

    if (userRole === "STUDENT") {
        mentorships = mockData.mentorships || [];
    } else if (userRole === "ALUMNI") {
        requests = mockData.mentorshipRequests || [];
    } else {
        // Faculty sees analytics
        mentorships = STUDENT_MOCK_DATA.mentorships;
        requests = ALUMNI_MOCK_DATA.mentorshipRequests;
    }

    return (
        <div className="space-y-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold leading-none tracking-tight text-slate-900">
                    Mentorship
                </h1>
                <p className="mt-3 text-lg text-slate-600">
                    {userRole === "STUDENT" && "Your active mentorship relationships and progress."}
                    {userRole === "ALUMNI" && "Manage mentorship requests from students."}
                    {userRole === "FACULTY" && "Platform mentorship analytics and oversight."}
                </p>
            </header>

            {userRole === "STUDENT" && (
                <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {mentorships.map((mentorship: any, index: number) => (
                        <Card key={index} className="group flex flex-col transition-all hover:-translate-y-1 hover:shadow-xl">
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                                    {mentorship.mentorName}
                                </h3>
                                <p className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                                    <UserCircleIcon className="h-4 w-4" />
                                    {mentorship.currentRole} at {mentorship.currentCompany}
                                    <Badge tone="success" className="ml-2 text-xs">
                                        ✓ Verified
                                    </Badge>
                                </p>
                                <p className="mt-1 text-sm text-slate-600">
                                    Graduated: {mentorship.graduationYear}
                                </p>
                            </div>
                            <div className="mb-4">
                                <Badge tone={mentorship.status === "ACTIVE" ? "success" : "warning"}>
                                    <CalendarIcon className="h-3 w-3" />
                                    {mentorship.status.replace('_', ' ')}
                                </Badge>
                                {mentorship.nextSession && (
                                    <p className="mt-2 text-sm text-slate-600">
                                        <ClockIcon className="h-4 w-4 inline mr-1" />
                                        Next: {mentorship.nextSession}
                                    </p>
                                )}
                                <p className="mt-1 text-sm text-slate-600">
                                    Topic: {mentorship.topic}
                                </p>
                                <p className="mt-1 text-sm text-slate-600">
                                    Messages: {mentorship.messages}
                                </p>
                            </div>
                            <div className="mt-auto">
                                <Button size="sm" className="w-full">
                                    {mentorship.status === "ACTIVE" ? "Schedule Session" : "View Details"}
                                </Button>
                            </div>
                        </Card>
                    ))}
                    {mentorships.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-16">
                            <UserCircleIcon className="h-12 w-12 text-slate-400 opacity-50" />
                            <p className="mt-4 text-sm text-slate-600">
                                No active mentorships yet. Request mentorship from verified alumni to accelerate your career growth!
                            </p>
                            <div className="mt-4 text-xs text-slate-500">
                                Tip: Complete your profile and specify your interests to get better mentorship matches
                            </div>
                        </div>
                    )}
                </section>
            )}

            {userRole === "ALUMNI" && (
                <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {requests.map((request: any, index: number) => (
                        <Card key={index} className="group flex flex-col transition-all hover:-translate-y-1 hover:shadow-xl">
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                                    {request.studentName}
                                </h3>
                                <p className="mt-1 text-sm text-slate-600">
                                    {request.degree}, Class of {request.graduationYear}
                                </p>
                                <p className="mt-1 text-sm text-slate-600">
                                    Topic: {request.topic}
                                </p>
                            </div>
                            <div className="mb-4">
                                <p className="text-sm text-slate-600 line-clamp-2">
                                    <MessageSquareIcon className="h-4 w-4 inline mr-1" />
                                    {request.messagePreview}
                                </p>
                                <div className="mt-2">
                                    <Badge tone={request.status === "ACCEPTED" ? "success" : request.status === "PENDING" ? "warning" : "danger"}>
                                        {request.status.replace('_', ' ')}
                                    </Badge>
                                </div>
                                <p className="mt-2 text-sm text-slate-600">
                                    <ClockIcon className="h-4 w-4 inline mr-1" />
                                    Requested: {request.requestedDate}
                                </p>
                                <p className="mt-1 text-sm text-slate-600">
                                    Response time: {request.responseTime}
                                </p>
                            </div>
                            <div className="mt-auto flex gap-2">
                                {request.status === "PENDING" && (
                                    <>
                                        <Button size="sm" className="flex-1">
                                            Accept
                                        </Button>
                                        <Button variant="secondary" size="sm" className="flex-1">
                                            Decline
                                        </Button>
                                    </>
                                )}
                                {request.status !== "PENDING" && (
                                    <Button variant="secondary" size="sm" className="w-full">
                                        View Details
                                    </Button>
                                )}
                            </div>
                        </Card>
                    ))}
                    {requests.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-16">
                            <UserCircleIcon className="h-12 w-12 text-slate-400 opacity-50" />
                            <p className="mt-4 text-sm text-slate-600">
                                No mentorship requests yet. Students will reach out soon as they discover your profile!
                            </p>
                            <div className="mt-4 text-xs text-slate-500">
                                Tip: Keep your profile updated with your expertise areas to attract relevant requests
                            </div>
                        </div>
                    )}
                </section>
            )}

            {userRole === "FACULTY" && (
                <div className="grid gap-8 md:grid-cols-2">
                    <Card className="p-6">
                        <h3 className="text-xl font-bold text-slate-900 mb-4">Student Mentorships</h3>
                        <div className="space-y-4">
                            {mentorships.slice(0, 3).map((mentorship: any, index: number) => (
                                <div key={index} className="border-b border-slate-100 pb-3 last:border-0">
                                    <p className="font-medium">{mentorship.mentorName}</p>
                                    <p className="text-sm text-slate-600">
                                        Mentee: {mentorship.mentorName.split(' ')[0]} • Status: {mentorship.status}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </Card>
                    <Card className="p-6">
                        <h3 className="text-xl font-bold text-slate-900 mb-4">Mentorship Requests</h3>
                        <div className="space-y-4">
                            {requests.slice(0, 3).map((request: any, index: number) => (
                                <div key={index} className="border-b border-slate-100 pb-3 last:border-0">
                                    <p className="font-medium">{request.studentName}</p>
                                    <p className="text-sm text-slate-600">
                                        Topic: {request.topic} • Status: {request.status}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}
