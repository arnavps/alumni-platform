import { cn } from "../../lib/cn";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    tone?: "neutral" | "success" | "warning" | "danger";
}

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
    const toneClasses: Record<string, string> = {
        neutral: "bg-gray-100 text-gray-700",
        success: "bg-emerald-100 text-emerald-800",
        warning: "bg-amber-100 text-amber-800",
        danger: "bg-rose-100 text-rose-800",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[13px] font-semibold",
                toneClasses[tone],
                className
            )}
            {...props}
        />
    );
}
