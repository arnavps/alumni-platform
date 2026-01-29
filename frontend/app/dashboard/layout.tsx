"use client";

import Link from "next/link";
import Image from "next/image";
import { ReactNode, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
    HomeIcon,
    BriefcaseIcon,
    UsersIcon,
    HandshakeIcon,
    MessageSquareIcon,
    BarChart3Icon,
    LogOutIcon,
    MenuIcon,
    XIcon,
} from "lucide-react";

const navItems = [
    { href: "/dashboard", label: "Overview", icon: HomeIcon },
    { href: "/dashboard/opportunities", label: "Opportunities", icon: BriefcaseIcon },
    { href: "/dashboard/referrals", label: "Referrals", icon: UsersIcon },
    { href: "/dashboard/mentorship", label: "Mentorship", icon: HandshakeIcon },
    { href: "/dashboard/interview-prep", label: "Interview Prep", icon: MessageSquareIcon, role: "STUDENT" },
    { href: "/dashboard/interview-insights", label: "Interview Insights", icon: MessageSquareIcon, role: "ALUMNI" },
    { href: "/dashboard/interviews", label: "Interview Experiences", icon: MessageSquareIcon },
    { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3Icon },
];

interface UserProfile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    avatar?: string;
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Check if we have mock user data from demo login
                const mockUserStr = localStorage.getItem("currentUser");
                if (mockUserStr) {
                    const mockUser = JSON.parse(mockUserStr);
                    setUserProfile(mockUser);
                    setLoading(false);
                    return;
                }

                const accessToken = localStorage.getItem("accessToken");
                if (!accessToken) {
                    console.error("No access token found");
                    return;
                }

                const res = await fetch("http://localhost:4000/auth/profile", {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                });

                if (res.ok) {
                    const data = await res.json();
                    setUserProfile(data.user);
                } else {
                    console.error("Failed to fetch user profile");
                }
            } catch (err) {
                console.error("Error fetching user profile:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const renderNav = () => (
        <nav className="mt-8 flex-1 space-y-2">
            {navItems.map((item) => {
                // Role-based visibility
                if (item.role && userProfile?.role !== item.role) return null;
                
                const active = pathname === item.href;
                const Icon = item.icon;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={
                            "flex items-center gap-3 rounded-lg px-4 py-3 text-[15px] font-medium transition-all duration-150" +
                            (active
                                ? " bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-white border-l-4 border-blue-500"
                                : " text-slate-200 hover:bg-slate-700/50 hover:text-white")
                        }
                        onClick={() => setSidebarOpen(false)}
                    >
                        <Icon className="h-5 w-5" />
                        {item.label}
                    </Link>
                );
            })}
        </nav>
    );

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("currentUser");
        // Clear any other stored auth data
        sessionStorage.clear();
        // Redirect to login page
        router.push("/login");
    };

    const getUserInitials = (firstName: string, lastName: string) => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    };

    const renderUserProfile = () => {
        if (loading) {
            return (
                <div className="rounded-xl bg-white/5 p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                            ...
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-white">Loading...</p>
                            <p className="text-xs font-medium text-gray-400">User</p>
                        </div>
                    </div>
                </div>
            );
        }

        if (userProfile) {
            const initials = getUserInitials(userProfile.firstName, userProfile.lastName);
            return (
                <div className="rounded-xl bg-white/5 p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-sm font-semibold text-white">
                            {initials}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-white">{userProfile.firstName} {userProfile.lastName}</p>
                            <p className="text-xs font-medium text-gray-400 capitalize">{userProfile.role.toLowerCase()}</p>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="rounded-xl bg-white/5 p-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                        ?
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-white">Guest User</p>
                        <p className="text-xs font-medium text-gray-400">No Role</p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex min-h-screen bg-white">
            {/* Sidebar for desktop - permanently fixed */}
            <aside className="hidden h-screen w-[280px] flex-col bg-gradient-to-b from-slate-800 to-slate-900 px-6 py-8 md:flex fixed left-0 top-0 z-30">
                <Link href="/" className="mb-6 flex items-center gap-3">
                    <Image
                        src="/Logo.png"
                        alt="Alumni Platform Logo"
                        width={40}
                        height={40}
                        className="rounded-lg"
                    />
                    <div>
                        <h1 className="text-lg font-bold text-white">Alumni Platform</h1>
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Engagement &amp; Networking</p>
                    </div>
                </Link>
                {renderNav()}
                <div className="mt-auto space-y-4 border-t border-white/10 pt-4">
                    {renderUserProfile()}
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-[15px] font-medium text-slate-200 transition-all duration-150 hover:bg-slate-700/50 hover:text-white"
                    >
                        <LogOutIcon className="h-5 w-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main content area - only this scrolls on desktop */}
            <div className="flex flex-1 flex-col md:ml-[280px]">
                {/* Top bar on mobile */}
                <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 md:hidden">
                    <button
                        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <MenuIcon className="h-5 w-5" />
                    </button>
                    <span className="text-sm font-semibold text-slate-900">Alumni Platform</span>
                    <div className="w-9" />
                </header>
                <main className="flex-1 overflow-y-auto bg-white px-4 py-6 md:px-8 md:py-8">
                    <div className="mx-auto max-w-7xl">{children}</div>
                </main>
            </div>

            {/* Sidebar overlay for mobile - unchanged */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 flex md:hidden">
                    <div className="h-full w-[280px] bg-gradient-to-b from-slate-800 to-slate-900 px-6 py-8 shadow-dropdown">
                        <div className="mb-6 flex items-center justify-between">
                            <Link href="/" className="flex items-center gap-3">
                                <Image
                                    src="/Logo.png"
                                    alt="Alumni Platform Logo"
                                    width={32}
                                    height={32}
                                    className="rounded-lg"
                                />
                                <div>
                                    <h1 className="text-lg font-bold text-white">Alumni Platform</h1>
                                    <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Engagement &amp; Networking</p>
                                </div>
                            </Link>
                            <button
                                className="rounded-full p-2 text-gray-100 hover:bg-white/10 hover:text-white"
                                onClick={() => setSidebarOpen(false)}
                            >
                                <XIcon className="h-5 w-5" />
                            </button>
                        </div>
                        {renderNav()}
                        <div className="mt-auto space-y-4 border-t border-white/10 pt-4">
                            {renderUserProfile()}
                            <button
                                onClick={handleLogout}
                                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-[15px] font-medium text-slate-200 transition-all duration-150 hover:bg-slate-700/50 hover:text-white"
                            >
                                <LogOutIcon className="h-5 w-5" />
                                Logout
                            </button>
                        </div>
                    </div>
                    <div
                        className="flex-1 bg-black/30 backdrop-blur-sm"
                        onClick={() => setSidebarOpen(false)}
                    />
                </div>
            )}
        </div>
    );
}