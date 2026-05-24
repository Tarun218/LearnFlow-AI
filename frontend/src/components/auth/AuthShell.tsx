"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import { StudyBackground } from "@/components/layout/StudyBackground";
const ThemeToggle = dynamic(
  () => import("@/components/theme/ThemeToggle"),
  { ssr: false }
);
import { FadeIn } from "@/components/motion/FadeIn";
import { Panel } from "@/components/ui/card";

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export function AuthShell({ title, subtitle, children }: AuthShellProps) {
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-16">
      <StudyBackground subtle />

      <div className="absolute right-4 top-4 z-20 sm:right-6 sm:top-6">
        <ThemeToggle />
      </div>

      <FadeIn className="relative z-10 w-full max-w-md">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="mb-8 mx-auto flex items-center justify-center gap-2 text-lg font-bold text-[var(--lf-fg)]"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--lf-accent)] to-[var(--lf-accent-secondary)] shadow-[var(--lf-shadow-md)]">
            <BookOpen className="h-5 w-5 text-white" />
          </span>
          LearnFlow AI
        </button>

        <motion.div
          initial={{ rotate: -1 }}
          animate={{ rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Panel className="p-8">
            <div className="mb-8 text-center">
              <span className="text-3xl">🎓</span>
              <h1 className="mt-3 text-2xl font-bold text-[var(--lf-fg)]">
                {title}
              </h1>
              <p className="mt-2 text-sm text-[var(--lf-fg-muted)]">
                {subtitle}
              </p>
            </div>
            {children}
          </Panel>
        </motion.div>
      </FadeIn>
    </div>
  );
}
