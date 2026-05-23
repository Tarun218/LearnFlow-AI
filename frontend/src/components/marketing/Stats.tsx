"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "10x", label: "Faster review sessions" },
  { value: "5+", label: "AI tools in one workspace" },
  { value: "24/7", label: "Study assistant availability" },
  { value: "100%", label: "Your PDFs, your context" },
];

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <p className="text-3xl font-bold gradient-text sm:text-4xl">{value}</p>
      <p className="mt-2 text-sm text-[var(--lf-fg-muted)]">{label}</p>
    </motion.div>
  );
}

export function Stats() {
  return (
    <section className="border-y border-white/[0.06] bg-white/[0.02] py-16">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-4 sm:grid-cols-4 sm:px-6">
        {stats.map((stat) => (
          <AnimatedStat key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}
