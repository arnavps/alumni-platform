"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
        <div className="flex min-h-screen items-center justify-center bg-background">
            <main className="w-full max-w-md rounded-2xl bg-surface p-8 shadow-card">
                <h1 className="text-xl font-semibold text-slate-900">Create an account</h1>
                <p className="mt-1 text-sm text-slate-500">
                    Choose your role and set up your profile to get started.
                </p>
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label className="text-xs font-medium text-slate-600">Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value as any)}
                            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-primary/30 focus:ring"
                        >
                            <option value="STUDENT">Student</option>
                            <option value="ALUMNI">Alumni</option>
                            <option value="FACULTY">Faculty/Admin</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-medium text-slate-600">First name</label>
                            <input
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-primary/30 focus:ring"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-slate-600">Last name</label>
                            <input
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-primary/30 focus:ring"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-medium text-slate-600">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-primary/30 focus:ring"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-slate-600">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-primary/30 focus:ring"
                            required
                        />
                    </div>
                    {error && <p className="text-xs text-red-600">{error}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-600 disabled:opacity-60"
                    >
                        {loading ? "Creating account..." : "Create account"}
                    </button>
                </form>
            </main>
        </div>
    );
}
