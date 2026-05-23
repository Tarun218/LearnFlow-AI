"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/theme/ThemeProvider";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div
        className={cn(
          "h-9 w-9 rounded-xl border border-[var(--lf-border)] bg-[var(--lf-surface)]",
          className
        )}
        aria-hidden
      />
    );
  }

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--lf-border)] bg-[var(--lf-surface)] text-[var(--lf-fg-muted)] shadow-[var(--lf-shadow-sm)] transition-colors hover:text-[var(--lf-accent)] hover:border-[var(--lf-accent)]/30",
        className
      )}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="flex items-center justify-center"
      >
        {theme === "dark" ? (
          <Sun className="h-4 w-4 text-amber-400" />
        ) : (
          <Moon className="h-4 w-4 text-indigo-500" />
        )}
      </motion.span>
    </motion.button>
  );
}
