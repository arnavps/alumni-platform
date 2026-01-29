import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <main className="w-full max-w-xl rounded-2xl bg-surface p-8 shadow-card">
        <h1 className="text-2xl font-semibold text-slate-900">
          Alumni Engagement & Networking Platform
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Connect verified alumni, students, and faculty through structured networking, mentorship, referrals, and analytics.
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            href="/login"
            className="inline-flex flex-1 items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-orange-500"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            Register
          </Link>
        </div>
      </main>
    </div>
  );
}
