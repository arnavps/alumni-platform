import { cn } from "../../lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost";
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
    "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary disabled:opacity-60 disabled:cursor-not-allowed";

  const variantClass: Record<ButtonVariant, string> = {
    primary: "bg-primary text-white shadow-sm hover:bg-orange-500",
    secondary:
      "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-sm",
    ghost: "text-slate-600 hover:bg-slate-100",
  };

  const sizeClass: Record<ButtonSize, string> = {
    sm: "h-8 px-3",
    md: "h-10 px-4",
  };

  return (
    <button
      className={cn(base, variantClass[variant], sizeClass[size], className)}
      {...props}
    />
  );
}
