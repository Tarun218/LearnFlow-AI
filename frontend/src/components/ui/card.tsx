"use client";

import { motion } from "framer-motion";

import { easePremium } from "@/lib/motion";
import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
  sticky?: boolean;
};

export function Card({
  children,
  className,
  hover = true,
  delay = 0,
  sticky = false,
}: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: easePremium }}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={cn(
        sticky ? "sticky-note p-6" : "paper-card glow-border p-6",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function Panel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("paper-card p-6 before:opacity-60", className)}>
      {children}
    </div>
  );
}
