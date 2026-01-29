"use client";

import { useState, useEffect } from "react";
import { STUDENT_MOCK_DATA, ALUMNI_MOCK_DATA, FACULTY_MOCK_DATA } from "../../lib/mock-data";

export default function TestDataPage() {
    const [userRole, setUserRole] = useState("STUDENT");
    const [mockData, setMockData] = useState<any>(null);
    const [localStorageData, setLocalStorageData] = useState<any>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            // Get localStorage data
            const currentUser = localStorage.getItem("currentUser");
            setLocalStorageData(currentUser ? JSON.parse(currentUser) : null);

            // Get mock data based on role
            const mockUserStr = localStorage.getItem("currentUser");
            let data = STUDENT_MOCK_DATA;
            let role = "STUDENT";

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
        <div className="p-8 space-y-6">
            <h1 className="text-3xl font-bold">Test Data Verification</h1>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h2 className="font-bold text-lg mb-2">Local Storage Data</h2>
                <pre className="text-sm bg-white p-2 rounded">
                    {JSON.stringify(localStorageData, null, 2)}
                </pre>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h2 className="font-bold text-lg mb-2">Current Role Detected</h2>
                <p className="text-lg font-mono bg-white p-2 rounded">{userRole}</p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h2 className="font-bold text-lg mb-2">Mock Data Loaded</h2>
                {mockData && (
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold">Metrics Keys:</h3>
                            <pre className="text-sm bg-white p-2 rounded">
                                {JSON.stringify(Object.keys(mockData.metrics || {}), null, 2)}
                            </pre>
                        </div>
                        <div>
                            <h3 className="font-semibold">Sample Data:</h3>
                            <pre className="text-sm bg-white p-2 rounded max-h-40 overflow-auto">
                                {JSON.stringify(mockData, null, 2)}
                            </pre>
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h2 className="font-bold text-lg mb-2">Test Actions</h2>
                <div className="space-y-2">
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
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Set Student Role
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
                        className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600"
                    >
                        Set Alumni Role
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
                        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                    >
                        Set Faculty Role
                    </button>
                    <button
                        onClick={() => {
                            localStorage.removeItem("currentUser");
                            window.location.reload();
                        }}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Clear Role
                    </button>
                </div>
            </div>
        </div>
    );
}