import { cn } from "@/lib/utils";

export function Label({
  children,
  htmlFor,
  className,
}: {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("mb-1.5 block text-xs font-medium text-[var(--lf-fg-muted)]", className)}
    >
      {children}
    </label>
  );
}
