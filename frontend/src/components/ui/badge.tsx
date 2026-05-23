import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "accent" | "success" | "warning" | "outline";

const variants: Record<BadgeVariant, string> = {
  default: "bg-white/10 text-zinc-300 border-white/10",
  accent:
    "bg-indigo-500/15 text-indigo-300 border-indigo-500/30 shadow-[0_0_20px_-4px_rgba(99,102,241,0.4)]",
  success: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  warning: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  outline: "bg-transparent text-zinc-400 border-white/15",
};

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
