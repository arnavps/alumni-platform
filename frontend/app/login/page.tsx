"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
        <div className="flex min-h-screen items-center justify-center bg-background">
            <main className="auth-card w-full max-w-md p-8">
                <h1 className="text-xl font-semibold text-slate-900">Log in</h1>
                <p className="mt-1 text-sm text-slate-500">
                    Access the alumni engagement & networking platform.
                </p>
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label className="text-xs font-medium text-slate-600">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors duration-200 focus:border-primary focus:ring-primary/30 focus:ring"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-slate-600">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors duration-200 focus:border-primary focus:ring-primary/30 focus:ring"
                            required
                        />
                    </div>
                    {error && <p className="text-xs text-red-600">{error}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-orange-500 disabled:opacity-60"
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </button>
                </form>
            </main>
        </div>
    );
}
