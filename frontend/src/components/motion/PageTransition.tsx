"use client";

import { motion } from "framer-motion";

import { pageTransition, pageTransitionConfig } from "@/lib/motion";

export function PageTransition({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      transition={pageTransitionConfig}
      className={className}
    >
      {children}
    </motion.div>
  );
}
