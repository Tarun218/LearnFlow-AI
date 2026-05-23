import { cn } from "@/lib/utils";

type AlertProps = {
  children: React.ReactNode;
  variant?: "error" | "success" | "info";
  className?: string;
};

const styles = {
  error:
    "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300",
  success:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300",
  info: "border-[var(--lf-accent)]/30 bg-[var(--lf-lavender)] text-[var(--lf-fg)]",
};

export function Alert({ children, variant = "info", className }: AlertProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border px-4 py-3 text-sm font-medium",
        styles[variant],
        className
      )}
    >
      {children}
    </div>
  );
}
