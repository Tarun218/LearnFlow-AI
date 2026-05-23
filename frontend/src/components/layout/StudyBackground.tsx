"use client";

import { motion } from "framer-motion";
import { BookOpen, Highlighter, Pencil, StickyNote } from "lucide-react";

export function StudyBackground({ subtle = false }: { subtle?: boolean }) {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden transition-colors duration-500">
      <div className="absolute inset-0 notebook-bg opacity-80" />
      <div className="absolute inset-0 study-mesh" />

      <motion.div
        className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-[var(--lf-accent)]/10 blur-[100px]"
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-16 top-1/3 h-64 w-64 rounded-full bg-[var(--lf-accent-secondary)]/10 blur-[90px]"
        animate={{ x: [0, -25, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {!subtle && (
        <>
          <FloatingIcon
            icon={BookOpen}
            className="left-[8%] top-[18%] text-[var(--lf-accent)]/40"
            delay={0}
          />
          <FloatingIcon
            icon={Pencil}
            className="right-[12%] top-[22%] text-[var(--lf-teal)]/50 dark:text-teal-400/40"
            delay={0.5}
          />
          <FloatingIcon
            icon={StickyNote}
            className="left-[15%] bottom-[25%] text-amber-500/40"
            delay={1}
          />
          <FloatingIcon
            icon={Highlighter}
            className="right-[10%] bottom-[30%] text-[var(--lf-accent-secondary)]/40"
            delay={1.5}
          />
          <span className="absolute right-[20%] top-[15%] text-2xl opacity-30 animate-float">
            📚
          </span>
          <span className="absolute left-[22%] top-[28%] text-xl opacity-25 animate-float [animation-delay:1s]">
            ✏️
          </span>
          <span className="absolute right-[28%] bottom-[20%] text-2xl opacity-25 animate-float [animation-delay:2s]">
            📝
          </span>
        </>
      )}
    </div>
  );
}

function FloatingIcon({
  icon: Icon,
  className,
  delay,
}: {
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
  delay: number;
}) {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
      transition={{
        duration: 5 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <Icon className="h-8 w-8 sm:h-10 sm:w-10" />
    </motion.div>
  );
}
