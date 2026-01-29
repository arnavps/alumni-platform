"use client";

import { useState, useEffect } from "react";
import { Card } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { BookOpenIcon, TargetIcon, TrendingUpIcon, FilterIcon, BookmarkIcon, EyeIcon } from "lucide-react";
import { STUDENT_MOCK_DATA } from "../../../lib/mock-data";

export default function InterviewPrepPage() {
    const [mockData, setMockData] = useState<any>(STUDENT_MOCK_DATA);
    const [loading, setLoading] = useState(true);
    const [selectedFilters, setSelectedFilters] = useState({
        company: "",
        role: "",
        domain: "",
        difficulty: ""
    });
    const [bookmarkedItems, setBookmarkedItems] = useState<string[]>([]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const mockUserStr = localStorage.getItem("currentUser");
            let role = "STUDENT";
            
            if (mockUserStr) {
                try {
                    const mockUser = JSON.parse(mockUserStr);
                    role = mockUser.role;
                    
                    // Only allow students to access this page
                    if (role !== "STUDENT") {
                        window.location.href = "/dashboard";
                        return;
                    }
                    
                    setMockData(STUDENT_MOCK_DATA as any);
                } catch (e) {
                    console.error("Error parsing user data:", e);
                }
            }
        }
        setLoading(false);
    }, []);

    const toggleBookmark = (id: string) => {
        setBookmarkedItems(prev => 
            prev.includes(id) 
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    const filteredExperiences = (mockData.interviewExperiences || []).filter((exp: any) => {
        return (
            (!selectedFilters.company || exp.company === selectedFilters.company) &&
            (!selectedFilters.role || exp.role === selectedFilters.role) &&
            (!selectedFilters.domain || exp.domain === selectedFilters.domain) &&
            (!selectedFilters.difficulty || exp.difficulty === selectedFilters.difficulty)
        );
    });

    if (loading) {
        return (
            <div className="space-y-8">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold leading-none tracking-tight text-slate-900">
                        Interview Preparation
                    </h1>
                    <p className="mt-3 text-lg text-slate-600">
                        Loading preparation content...
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
                <h1 className="text-4xl font-bold leading-none tracking-tight text-slate-900">
                    Interview Preparation
                </h1>
                <p className="mt-3 text-lg text-slate-600">
                    Curated interview prep content for your career goals
                </p>
            </header>

            {/* Interview Preparation Focus */}
            <section className="grid gap-6 md:grid-cols-2">
                <Card className="p-6">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <TargetIcon className="h-6 w-6 text-blue-500" />
                        Domain Coverage
                    </h2>
                    <div className="space-y-5">
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-medium">Technical Interview Prep</span>
                                <span className="font-bold text-blue-600">75%</span>
                            </div>
                            <div className="h-3 bg-slate-200 rounded-full mb-3">
                                <div className="h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style={{ width: "75%" }}></div>
                            </div>
                            <div className="grid grid-cols-2 gap-3 text-xs">
                                <div className="flex items-center">
                                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                    <span>DSA & Algorithms (Complete)</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                    <span>System Design (Complete)</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                                    <span>Database Concepts (Partial)</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                                    <span>Networking (Not Started)</span>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-medium">Behavioral Interview Prep</span>
                                <span className="font-bold text-green-600">40%</span>
                            </div>
                            <div className="h-3 bg-slate-200 rounded-full">
                                <div className="h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: "40%" }}></div>
                            </div>
                            <p className="text-xs text-slate-600 mt-2">Focus areas: STAR method, common scenarios</p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <TrendingUpIcon className="h-6 w-6 text-green-500" />
                        Practice Activity
                    </h2>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                            <div>
                                <p className="font-medium text-sm">Coding Problems Solved</p>
                                <p className="text-xs text-slate-600">This week</p>
                            </div>
                            <Badge tone="success" className="text-xs">
                                24 problems
                            </Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div>
                                <p className="font-medium text-sm">Mock Interviews Taken</p>
                                <p className="text-xs text-slate-600">This month</p>
                            </div>
                            <Badge tone="neutral" className="text-xs">
                                3 sessions
                            </Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                            <div>
                                <p className="font-medium text-sm">Concept Reviews</p>
                                <p className="text-xs text-slate-600">Pending topics</p>
                            </div>
                            <Badge tone="warning" className="text-xs">
                                8 topics
                            </Badge>
                        </div>
                        <div className="pt-3 border-t border-slate-200">
                            <p className="text-xs text-slate-500">
                                💡 Tip: Complete 5 more mock interviews to reach interview-ready status
                            </p>
                        </div>
                    </div>
                </Card>
            </section>

            {/* Filters */}
            <section>
                <Card className="p-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <FilterIcon className="h-5 w-5 text-slate-600" />
                        Filter Content
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Company</label>
                            <select 
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                                value={selectedFilters.company}
                                onChange={(e) => setSelectedFilters({...selectedFilters, company: e.target.value})}
                            >
                                <option value="">All Companies</option>
                                <option value="Google">Google</option>
                                <option value="Microsoft">Microsoft</option>
                                <option value="Amazon">Amazon</option>
                                <option value="Meta">Meta</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Role</label>
                            <select 
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                                value={selectedFilters.role}
                                onChange={(e) => setSelectedFilters({...selectedFilters, role: e.target.value})}
                            >
                                <option value="">All Roles</option>
                                <option value="SDE">Software Engineer</option>
                                <option value="SDE-I">SDE-I</option>
                                <option value="Product Manager">Product Manager</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Domain</label>
                            <select 
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                                value={selectedFilters.domain}
                                onChange={(e) => setSelectedFilters({...selectedFilters, domain: e.target.value})}
                            >
                                <option value="">All Domains</option>
                                <option value="DSA">DSA</option>
                                <option value="System Design">System Design</option>
                                <option value="HR">HR/Behavioral</option>
                                <option value="Technical">Technical</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Difficulty</label>
                            <select 
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                                value={selectedFilters.difficulty}
                                onChange={(e) => setSelectedFilters({...selectedFilters, difficulty: e.target.value})}
                            >
                                <option value="">All Levels</option>
                                <option value="EASY">Easy</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="HARD">Hard</option>
                            </select>
                        </div>
                    </div>
                </Card>
            </section>

            {/* Content Library */}
            <section>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">Interview Preparation Library</h2>
                    <div className="text-sm text-slate-600">
                        Showing {filteredExperiences.length} of {(mockData.interviewExperiences || []).length} experiences
                    </div>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                    {filteredExperiences.map((exp: any, idx: number) => (
                        <Card key={idx} className="p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-1">{exp.role} Interview</h3>
                                    <p className="text-sm text-slate-600">{exp.company} • {exp.year} Round</p>
                                </div>
                                <button 
                                    onClick={() => toggleBookmark(exp.id)}
                                    className={`p-2 rounded-full ${bookmarkedItems.includes(exp.id) ? 'text-blue-500 bg-blue-50' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    <BookmarkIcon className="h-4 w-4" />
                                </button>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                                <Badge tone="neutral" className="text-xs">
                                    {exp.domain}
                                </Badge>
                                <Badge tone={
                                    exp.difficulty === "HARD" ? "danger" :
                                    exp.difficulty === "MEDIUM" ? "warning" : "success"
                                } className="text-xs">
                                    {exp.difficulty}
                                </Badge>
                                <Badge tone="success" className="text-xs">
                                    {(exp.questions || []).length} questions
                                </Badge>
                            </div>
                            
                            <p className="text-sm text-slate-700 mb-4 line-clamp-2">
                                {(exp.questions && exp.questions[0] && exp.questions[0].question) || "No details available"}
                            </p>
                            
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-xs text-slate-500">
                                    <span className="flex items-center gap-1">
                                        <EyeIcon className="h-3 w-3" />
                                        {Math.floor(Math.random() * 500) + 100} views
                                    </span>
                                    <span>•</span>
                                    <span>{exp.year} experience</span>
                                </div>
                                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                    View Details →
                                </button>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Preparation Checklist */}
            <section>
                <Card className="p-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <BookOpenIcon className="h-5 w-5 text-purple-500" />
                        Preparation Checklist
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-medium text-slate-900 mb-3">Technical Skills</h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                                    <span className="text-sm">Data Structures & Algorithms</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                                    <span className="text-sm">System Design</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="inline-block w-3 h-3 bg-amber-500 rounded-full"></span>
                                    <span className="text-sm">Database Design</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="inline-block w-3 h-3 bg-red-500 rounded-full"></span>
                                    <span className="text-sm">Networking Concepts</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-medium text-slate-900 mb-3">Behavioral Prep</h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                                    <span className="text-sm">STAR Method Practice</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="inline-block w-3 h-3 bg-amber-500 rounded-full"></span>
                                    <span className="text-sm">Common Interview Questions</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="inline-block w-3 h-3 bg-red-500 rounded-full"></span>
                                    <span className="text-sm">Salary Negotiation</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </section>
        </div>
    );
}