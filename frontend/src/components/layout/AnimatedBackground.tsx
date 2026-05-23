"use client";

import { motion } from "framer-motion";

export function AnimatedBackground({ subtle = false }: { subtle?: boolean }) {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <motion.div
        className="absolute -left-32 top-0 h-[480px] w-[480px] rounded-full bg-indigo-600/20 blur-[120px]"
        animate={{
          x: [0, 40, 0],
          y: [0, 30, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-24 top-1/4 h-[420px] w-[420px] rounded-full bg-violet-600/15 blur-[100px]"
        animate={{
          x: [0, -30, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      {!subtle && (
        <motion.div
          className="absolute bottom-0 left-1/2 h-[360px] w-[600px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[100px]"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      )}
    </div>
  );
}
