"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeftIcon } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${API_BASE_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.error ?? "Failed to login");
                return;
            }

            // Store access token for demo purposes; in production, consider more secure storage.
            localStorage.setItem("accessToken", data.accessToken);
            router.push("/dashboard");
        } catch (err) {
            setError("Unexpected error, please try again");
        } finally {
            setLoading(false);
        }
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
                <div className="mb-6 text-center">
                    <Link href="/" className="mb-4 inline-flex">
                        <Image
                            src="/Logo.png"
                            alt="Alumni Platform Logo"
                            width={48}
                            height={48}
                            className="rounded-xl"
                        />
                    </Link>
                    <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
                    <p className="mt-2 text-sm text-slate-600">
                        Log in to access the alumni engagement platform
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-slate-700">Email address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@university.edu"
                            className="mt-2 h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="mt-2 h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                            required
                        />
                    </div>
                    {error && (
                        <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-6 flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </button>
                </form>

                {/* Demo Buttons */}
                <div className="mt-6 space-y-3">
                    <p className="text-center text-sm text-slate-600 mb-3">Or try as a demo user:</p>
                    <button
                        onClick={() => {
                            localStorage.setItem("accessToken", "demo-token");
                            localStorage.setItem("currentUser", JSON.stringify({
                                id: "demo-student-1",
                                firstName: "Sample",
                                lastName: "Student",
                                email: "student@demo.edu",
                                role: "STUDENT",
                                program: "Computer Science",
                                graduationYear: 2025,
                            }));
                            router.push("/dashboard");
                        }}
                        className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 p-4 font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/40"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                            <path d="M22 10v6M19 17a9 9 0 0 1-18 0V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a1 1 0 0 1-1 1" />
                            <circle cx="9" cy="12" r="1" />
                            <circle cx="15" cy="12" r="1" />
                        </svg>
                        <span>Student Demo</span>
                    </button>

                    <button
                        onClick={() => {
                            localStorage.setItem("accessToken", "demo-token");
                            localStorage.setItem("currentUser", JSON.stringify({
                                id: "demo-alumni-1",
                                firstName: "Sample",
                                lastName: "Alumni",
                                email: "alumni@demo.edu",
                                role: "ALUMNI",
                                company: "TechCorp Solutions",
                                graduationYear: 2020,
                            }));
                            router.push("/dashboard");
                        }}
                        className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 p-4 font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/40"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                        <span>Alumni Demo</span>
                    </button>

                    <button
                        onClick={() => {
                            localStorage.setItem("accessToken", "demo-token");
                            localStorage.setItem("currentUser", JSON.stringify({
                                id: "demo-faculty-1",
                                firstName: "Sample",
                                lastName: "Faculty",
                                email: "faculty@demo.edu",
                                role: "FACULTY",
                                department: "Computer Science Department",
                            }));
                            router.push("/dashboard");
                        }}
                        className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 p-4 font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/40"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                            <path d="M22 10v6M19 17a9 9 0 0 1-18 0V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a1 1 0 0 1-1 1" />
                            <path d="M6 12h2v2H6z" />
                        </svg>
                        <span>Faculty Demo</span>
                    </button>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-sm text-slate-600">
                        Don't have an account?{" "}
                        <Link
                            href="/register"
                            className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                        >
                            Create account
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    );
}