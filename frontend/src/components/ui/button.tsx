"use client";

import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

import { springSnappy } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "sticky";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--lf-accent)] text-white hover:bg-[var(--lf-accent-hover)] shadow-[var(--lf-shadow-md)] border border-[var(--lf-accent)]/20",
  secondary:
    "paper-card bg-[var(--lf-surface)] text-[var(--lf-fg)] hover:bg-[var(--lf-surface-hover)] border-[var(--lf-border)] before:hidden",
  ghost:
    "text-[var(--lf-fg-muted)] hover:text-[var(--lf-fg)] hover:bg-[var(--lf-surface-hover)]",
  danger:
    "bg-red-500/10 text-red-600 dark:text-red-300 border border-red-500/30 hover:bg-red-500/15",
  sticky:
    "bg-[var(--lf-sticky)] text-[var(--lf-fg)] border border-amber-400/30 shadow-[var(--lf-shadow-md)] hover:brightness-105 rotate-[-0.5deg]",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm rounded-xl",
  md: "px-5 py-2.5 text-sm rounded-2xl",
  lg: "px-6 py-3.5 text-base rounded-2xl",
};

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: Variant;
  size?: Size;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => (
    <motion.button
      ref={ref}
      whileHover={{ scale: props.disabled ? 1 : 1.03, y: props.disabled ? 0 : -1 }}
      whileTap={{ scale: props.disabled ? 1 : 0.97 }}
      transition={springSnappy}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lf-accent)]/40 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
);

Button.displayName = "Button";
