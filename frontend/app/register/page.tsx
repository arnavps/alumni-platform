"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeftIcon } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

export default function RegisterPage() {
    const router = useRouter();
    const [role, setRole] = useState<"ALUMNI" | "STUDENT" | "FACULTY">("STUDENT");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${API_BASE_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, firstName, lastName, role }),
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.error ?? "Failed to register");
                return;
            }

            router.push("/login");
        } catch (err) {
            setError("Unexpected error, please try again");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#1E3A5F] via-[#0F172A] to-[#0F172A] py-12">
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
                    <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
                    <p className="mt-2 text-sm text-slate-600">
                        Join the alumni engagement platform today
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-slate-700">I am a</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value as any)}
                            className="mt-2 h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                        >
                            <option value="STUDENT">Student</option>
                            <option value="ALUMNI">Alumni</option>
                            <option value="FACULTY">Faculty/Admin</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-slate-700">First name</label>
                            <input
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="John"
                                className="mt-2 h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-700">Last name</label>
                            <input
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Doe"
                                className="mt-2 h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                                required
                            />
                        </div>
                    </div>
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
                            placeholder="Create a strong password"
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
                        {loading ? "Creating account..." : "Create account"}
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-sm text-slate-600">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    );
}
