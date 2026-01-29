import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                background: "#f5f5f7",
                surface: "#ffffff",
                primary: "#2563eb",
                primarySoft: "#dbeafe",
                accent: "#0f172a",
            },
            borderRadius: {
                xl: "1rem",
                "2xl": "1.25rem",
            },
            boxShadow: {
                card: "0 10px 30px rgba(15, 23, 42, 0.08)",
            },
        },
    },
    plugins: [],
};

export default config;
