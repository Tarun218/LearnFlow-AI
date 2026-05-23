"use client";

import { motion } from "framer-motion";

import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  label?: string;
  title?: string;
  description?: string;
  animate?: boolean;
};

export function Section({
  id,
  children,
  className,
  containerClassName,
  label,
  title,
  description,
  animate = true,
}: SectionProps) {
  const showHeader = label || title || description;

  return (
    <section
      id={id}
      className={cn("section-padding scroll-mt-24", className)}
    >
      <div className={cn("section-container", containerClassName)}>
        {showHeader &&
          (animate ? (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              className="mb-12 text-center md:mb-16"
            >
              {label && (
                <p className="text-sm font-medium uppercase tracking-widest text-violet-400">
                  {label}
                </p>
              )}
              {title && (
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  {title}
                </h2>
              )}
              {description && (
                <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
                  {description}
                </p>
              )}
            </motion.div>
          ) : (
            <div className="mb-12 text-center md:mb-16">
              {label && (
                <p className="text-sm font-medium uppercase tracking-widest text-violet-400">
                  {label}
                </p>
              )}
              {title && (
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  {title}
                </h2>
              )}
              {description && (
                <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
                  {description}
                </p>
              )}
            </div>
          ))}
        {children}
      </div>
    </section>
  );
}
