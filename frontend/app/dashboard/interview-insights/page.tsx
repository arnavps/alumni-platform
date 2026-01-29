"use client";

import { useState, useEffect } from "react";
import { Card } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { PlusIcon, UsersIcon, EyeIcon, BookmarkIcon, TrendingUpIcon, CalendarIcon } from "lucide-react";
import { ALUMNI_MOCK_DATA } from "../../../lib/mock-data";

export default function InterviewInsightsPage() {
    const [mockData, setMockData] = useState<any>(ALUMNI_MOCK_DATA);
    const [loading, setLoading] = useState(true);
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [formData, setFormData] = useState({
        company: "",
        role: "",
        perspective: "Interviewer",
        interviewStructure: "",
        evaluationCriteria: "",
        commonMistakes: "",
        preparationTips: "",
        validityPeriod: "2026"
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            const mockUserStr = localStorage.getItem("currentUser");
            let role = "ALUMNI";
            
            if (mockUserStr) {
                try {
                    const mockUser = JSON.parse(mockUserStr);
                    role = mockUser.role;
                    
                    // Only allow alumni to access this page
                    if (role !== "ALUMNI") {
                        window.location.href = "/dashboard";
                        return;
                    }
                    
                    setMockData(ALUMNI_MOCK_DATA as any);
                } catch (e) {
                    console.error("Error parsing user data:", e);
                }
            }
        }
        setLoading(false);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would submit to backend
        console.log("Submitting insight:", formData);
        setShowUploadForm(false);
        // Reset form
        setFormData({
            company: "",
            role: "",
            perspective: "Interviewer",
            interviewStructure: "",
            evaluationCriteria: "",
            commonMistakes: "",
            preparationTips: "",
            validityPeriod: "2026"
        });
    };

    if (loading) {
        return (
            <div className="space-y-8">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold leading-none tracking-tight text-slate-900">
                        Interview Insights
                    </h1>
                    <p className="mt-3 text-lg text-slate-600">
                        Loading your insights...
                    </p>
                </header>
                <div className="grid gap-6 md:grid-cols-2">
                    {[1, 2, 3, 4].map((i) => (
                        <Card key={i} className="h-48 animate-pulse bg-slate-100" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <header className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold leading-none tracking-tight text-slate-900">
                            Interview Insights
                        </h1>
                        <p className="mt-3 text-lg text-slate-600">
                            Share your hiring experience and guide the next generation
                        </p>
                    </div>
                    <button 
                        onClick={() => setShowUploadForm(true)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <PlusIcon className="h-4 w-4" />
                        Share Insight
                    </button>
                </div>
            </header>

            {/* Upload Form Modal */}
            {showUploadForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-slate-900">Share Interview Insight</h2>
                                <button 
                                    onClick={() => setShowUploadForm(false)}
                                    className="text-slate-400 hover:text-slate-600"
                                >
                                    ✕
                                </button>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Company *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                                            value={formData.company}
                                            onChange={(e) => setFormData({...formData, company: e.target.value})}
                                            placeholder="e.g., Google, Microsoft"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Role *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                                            value={formData.role}
                                            onChange={(e) => setFormData({...formData, role: e.target.value})}
                                            placeholder="e.g., SDE-II, Product Manager"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Perspective *
                                    </label>
                                    <select
                                        required
                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                                        value={formData.perspective}
                                        onChange={(e) => setFormData({...formData, perspective: e.target.value})}
                                    >
                                        <option value="Interviewer">Interviewer</option>
                                        <option value="Former Candidate">Former Candidate</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Interview Structure *
                                    </label>
                                    <textarea
                                        required
                                        rows={3}
                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                                        value={formData.interviewStructure}
                                        onChange={(e) => setFormData({...formData, interviewStructure: e.target.value})}
                                        placeholder="Describe the interview format, rounds, types of questions asked..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Evaluation Criteria *
                                    </label>
                                    <textarea
                                        required
                                        rows={3}
                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                                        value={formData.evaluationCriteria}
                                        onChange={(e) => setFormData({...formData, evaluationCriteria: e.target.value})}
                                        placeholder="What skills/knowledge areas are evaluated? What weightage?"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Common Mistakes
                                        </label>
                                        <textarea
                                            rows={3}
                                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                                            value={formData.commonMistakes}
                                            onChange={(e) => setFormData({...formData, commonMistakes: e.target.value})}
                                            placeholder="Frequent errors candidates make..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Preparation Tips
                                        </label>
                                        <textarea
                                            rows={3}
                                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                                            value={formData.preparationTips}
                                            onChange={(e) => setFormData({...formData, preparationTips: e.target.value})}
                                            placeholder="How to best prepare for this interview..."
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Validity Period *
                                    </label>
                                    <select
                                        required
                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                                        value={formData.validityPeriod}
                                        onChange={(e) => setFormData({...formData, validityPeriod: e.target.value})}
                                    >
                                        <option value="2024">Relevant till 2024</option>
                                        <option value="2025">Relevant till 2025</option>
                                        <option value="2026">Relevant till 2026</option>
                                        <option value="2027">Relevant till 2027</option>
                                    </select>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Publish Insight
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowUploadForm(false)}
                                        className="flex-1 bg-slate-200 text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Card>
                </div>
            )}

            {/* Content Impact Metrics */}
            <section className="grid gap-6 md:grid-cols-3">
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-slate-900">Total Insights</h3>
                        <UsersIcon className="h-5 w-5 text-blue-500" />
                    </div>
                    <p className="text-3xl font-bold text-slate-900 mb-2">12</p>
                    <p className="text-sm text-slate-600">Shared with the community</p>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-slate-900">Total Views</h3>
                        <EyeIcon className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="text-3xl font-bold text-slate-900 mb-2">1,247</p>
                    <p className="text-sm text-slate-600">Students受益 from your insights</p>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-slate-900">Helpfulness Rating</h3>
                        <TrendingUpIcon className="h-5 w-5 text-amber-500" />
                    </div>
                    <p className="text-3xl font-bold text-slate-900 mb-2">89%</p>
                    <p className="text-sm text-slate-600">Student feedback score</p>
                </Card>
            </section>

            {/* Recent Contributions */}
            <section>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">Your Recent Contributions</h2>
                    <Badge tone="success">Top 10% Contributor</Badge>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                    {mockData.interviewExperiences?.slice(0, 4).map((exp: any, idx: number) => (
                        <Card key={idx} className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-1">
                                        {exp.role} Interview Insight
                                    </h3>
                                    <p className="text-sm text-slate-600">{exp.company} • {exp.year}</p>
                                </div>
                                <Badge 
                                    tone={exp.verificationStatus === "VERIFIED" ? "success" : "warning"}
                                    className="text-xs"
                                >
                                    {exp.verificationStatus}
                                </Badge>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                                <Badge tone="neutral" className="text-xs">{exp.domain}</Badge>
                                <Badge tone="success" className="text-xs">Verified</Badge>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                                <div>
                                    <p className="text-lg font-bold text-slate-900">
                                        {Math.floor(Math.random() * 300) + 100}
                                    </p>
                                    <p className="text-xs text-slate-600">Views</p>
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-slate-900">
                                        {Math.floor(Math.random() * 50) + 20}
                                    </p>
                                    <p className="text-xs text-slate-600">Bookmarks</p>
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-slate-900">
                                        {Math.floor(Math.random() * 20) + 80}%
                                    </p>
                                    <p className="text-xs text-slate-600">Helpful</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between text-xs text-slate-500">
                                <span className="flex items-center gap-1">
                                    <CalendarIcon className="h-3 w-3" />
                                    Published {exp.year}
                                </span>
                                <span>Valid till 2026</span>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Content Freshness Indicator */}
            <section>
                <Card className="p-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">Content Freshness</h2>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span>Recently Updated</span>
                                <span className="font-medium text-green-600">75%</span>
                            </div>
                            <div className="h-2 bg-slate-200 rounded-full">
                                <div className="h-2 bg-green-500 rounded-full" style={{ width: "75%" }}></div>
                            </div>
                            <p className="text-xs text-slate-600 mt-1">4 of your 12 insights are current for 2024 hiring</p>
                        </div>
                        
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span>Needs Refresh</span>
                                <span className="font-medium text-amber-600">25%</span>
                            </div>
                            <div className="h-2 bg-slate-200 rounded-full">
                                <div className="h-2 bg-amber-500 rounded-full" style={{ width: "25%" }}></div>
                            </div>
                            <p className="text-xs text-slate-600 mt-1">3 insights are from 2022-2023 and may need updating</p>
                        </div>
                        
                        <div className="pt-4 border-t border-slate-200">
                            <p className="text-sm text-slate-700">
                                <span className="inline-block h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                                <strong>Tip:</strong> Regularly updating your insights increases engagement by 40%
                            </p>
                        </div>
                    </div>
                </Card>
            </section>

            {/* Engagement Insights */}
            <section>
                <Card className="p-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">Engagement Insights</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-medium text-slate-900 mb-3">Performance Metrics</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span>Your content ranks in the</span>
                                    <span className="font-bold text-blue-600">top 10%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Most engaging insight</span>
                                    <span className="font-bold text-green-600">Google SDE-I</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Least engaging insight</span>
                                    <span className="font-bold text-amber-600">Meta PM</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-medium text-slate-900 mb-3">Growth Suggestions</h3>
                            <div className="space-y-3">
                                <div className="flex items-start gap-2">
                                    <span className="inline-block h-2 w-2 bg-blue-500 rounded-full mt-2"></span>
                                    <p className="text-sm text-slate-700">Students frequently search for Data Science insights - consider sharing your experience</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="inline-block h-2 w-2 bg-green-500 rounded-full mt-2"></span>
                                    <p className="text-sm text-slate-700">Your behavioral interview content gets 2x more bookmarks than technical content</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </section>
        </div>
    );
}