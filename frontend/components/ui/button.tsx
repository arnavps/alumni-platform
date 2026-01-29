import { cn } from "../../lib/cn";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
}

export function Button({
    className,
    variant = "primary",
    size = "md",
    ...props
}: ButtonProps) {
    const base =
        "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.02]";

    const variantClass: Record<ButtonVariant, string> = {
        primary: "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md hover:shadow-lg hover:from-blue-700 hover:to-cyan-700",
        secondary:
            "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-sm",
        outline: "border border-blue-600 bg-transparent text-blue-600 hover:bg-blue-50",
        ghost: "text-slate-600 hover:bg-slate-100",
    };

    const sizeClass: Record<ButtonSize, string> = {
        sm: "h-9 px-4",
        md: "h-11 px-6",
    };

    return (
        <button
            className={cn(base, variantClass[variant], sizeClass[size], className)}
            {...props}
        />
    );
}
