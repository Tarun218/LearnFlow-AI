"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export function Spinner({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-2",
    lg: "h-10 w-10 border-2",
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={cn(
        "rounded-full border-[var(--lf-accent)]/30 border-t-[var(--lf-accent)]",
        sizes[size],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
}
