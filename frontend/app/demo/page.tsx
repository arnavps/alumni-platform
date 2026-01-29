"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { GraduationCapIcon, UserIcon, BuildingIcon, ArrowLeftIcon } from "lucide-react";

interface MockUserData {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: "STUDENT" | "ALUMNI" | "FACULTY";
    avatar?: string;
    department?: string;
    company?: string;
    graduationYear?: number;
    program?: string;
}

const DEMO_USERS: Record<string, MockUserData> = {
    student: {
        id: "demo-student-1",
        firstName: "Sample",
        lastName: "Student",
        email: "student@demo.edu",
        role: "STUDENT",
        program: "Computer Science",
        graduationYear: 2025,
    },
    alumni: {
        id: "demo-alumni-1",
        firstName: "Sample",
        lastName: "Alumni",
        email: "alumni@demo.edu",
        role: "ALUMNI",
        company: "TechCorp Solutions",
        graduationYear: 2020,
    },
    faculty: {
        id: "demo-faculty-1",
        firstName: "Sample",
        lastName: "Faculty",
        email: "faculty@demo.edu",
        role: "FACULTY",
        department: "Computer Science Department",
    },
};

export default function DemoLoginPage() {
    const router = useRouter();

    const handleDemoLogin = (role: keyof typeof DEMO_USERS) => {
        const userData = DEMO_USERS[role];

        // Store mock user data in localStorage
        localStorage.setItem("accessToken", "demo-token");
        localStorage.setItem("currentUser", JSON.stringify(userData));

        // Redirect to dashboard
        router.push("/dashboard");
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#1E3A5F] via-[#0F172A] to-[#0F172A]">
            {/* Particles Background */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-20 left-10 h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
                <div className="absolute top-40 right-20 h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400 animation-delay-200" />
                <div className="absolute bottom-40 left-1/4 h-2 w-2 animate-pulse rounded-full bg-cyan-300 animation-delay-500" />
                <div className="absolute top-60 right-1/3 h-1 w-1 animate-pulse rounded-full bg-blue-300 animation-delay-700" />
            </div>

            {/* Back to Home Link */}
            <Link
                href="/"
                className="absolute top-8 left-8 flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
                <ArrowLeftIcon className="h-4 w-4" />
                Back to home
            </Link>

            <main className="auth-card relative w-full max-w-md p-8">
                <div className="mb-8 text-center">
                    <Link href="/" className="mb-4 inline-flex">
                        <Image
                            src="/Logo.png"
                            alt="Alumni Platform Logo"
                            width={48}
                            height={48}
                            className="rounded-xl"
                        />
                    </Link>
                    <h1 className="text-2xl font-bold text-slate-900">Demo Access</h1>
                    <p className="mt-2 text-sm text-slate-600">
                        Experience the platform as different user roles
                    </p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={() => handleDemoLogin("student")}
                        className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 p-4 font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/40"
                    >
                        <GraduationCapIcon className="h-5 w-5" />
                        <span>Student Demo</span>
                    </button>

                    <button
                        onClick={() => handleDemoLogin("alumni")}
                        className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 p-4 font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/40"
                    >
                        <UserIcon className="h-5 w-5" />
                        <span>Alumni Demo</span>
                    </button>

                    <button
                        onClick={() => handleDemoLogin("faculty")}
                        className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 p-4 font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/40"
                    >
                        <BuildingIcon className="h-5 w-5" />
                        <span>Faculty Demo</span>
                    </button>
                </div>

                <div className="mt-6 rounded-lg bg-blue-50 border border-blue-200 p-3">
                    <p className="text-sm text-blue-700 text-center">
                        Demo access — no signup required
                    </p>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-sm text-slate-600">
                        Or continue with{" "}
                        <Link
                            href="/login"
                            className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                        >
                            regular login
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    );
}