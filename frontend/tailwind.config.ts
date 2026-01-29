import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                background: "#FFFFFF",
                backgroundSecondary: "#F9FAFB",
                surface: "#FFFFFF",
                primary: "#6366F1",
                primaryHover: "#4F46E5",
                success: "#10B981",
                warning: "#F59E0B",
                neutral: "#6B7280",
                sidebarFrom: "#1F2937",
                sidebarTo: "#111827",
                border: "#E5E7EB",
                textPrimary: "#111827",
                textSecondary: "#6B7280",
                statusGood: "#10B981",
                statusWarning: "#F59E0B",
                statusNeutral: "#6B7280",
            },
            fontFamily: {
                sans: ["'Inter'", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "sans-serif"],
            },
            borderRadius: {
                xl: "1rem",
                "2xl": "1.25rem",
            },
            boxShadow: {
                card: "0 1px 3px rgba(0, 0, 0, 0.05)",
                cardHover: "0 12px 24px rgba(0, 0, 0, 0.1)",
                dropdown: "0 10px 25px rgba(0, 0, 0, 0.1)",
            },
            letterSpacing: {
                tighter: "-0.5px",
                wider: "0.5px",
            },
        },
    },
    plugins: [],
};

export default config;
