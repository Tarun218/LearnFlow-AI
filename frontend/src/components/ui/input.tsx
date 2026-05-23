"use client";

import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-2xl border border-[var(--lf-border)] bg-[var(--lf-surface)] px-4 py-3 text-sm text-[var(--lf-fg)] placeholder:text-[var(--lf-fg-subtle)] shadow-[var(--lf-shadow-sm)] transition focus:border-[var(--lf-accent)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--lf-accent)]/20",
        className
      )}
      {...props}
    />
  )
);

Input.displayName = "Input";
