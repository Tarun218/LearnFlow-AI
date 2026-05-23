"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import { StudyBackground } from "@/components/layout/StudyBackground";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/FadeIn";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-4 pt-28 pb-20 text-center sm:px-6">
      <StudyBackground />

      <FadeIn className="relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--lf-border)] bg-[var(--lf-surface)] px-4 py-2 text-sm text-[var(--lf-fg-muted)] shadow-[var(--lf-shadow-sm)]"
        >
          <Sparkles className="h-4 w-4 text-[var(--lf-accent)]" />
          Your AI study notebook — open 24/7 📖
        </motion.div>

        <h1 className="text-4xl font-bold tracking-tight text-[var(--lf-fg)] sm:text-6xl lg:text-7xl">
          <span className="gradient-text">Learn smarter</span>
          <br />
          with your{" "}
          <span className="highlight-text">digital study desk</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--lf-fg-muted)] sm:text-lg">
          Upload PDFs, highlight ideas, chat with your materials, and generate
          notes, flashcards, and quizzes — like a beautiful planner meets AI tutor.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            type="button"
            onClick={() => router.push("/signup")}
            className="group min-w-[220px]"
          >
            Open my notebook
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Button>
          <Button
            variant="secondary"
            size="lg"
            type="button"
            onClick={() => {
              document.getElementById("product")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="min-w-[220px]"
          >
            See the workspace 🎒
          </Button>
        </div>
      </FadeIn>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.8 }}
        className="relative z-10 mt-16 w-full max-w-5xl animate-float"
      >
        <div className="paper-card overflow-hidden glow-border">
          <div className="flex items-center gap-2 border-b border-[var(--lf-border)] bg-[var(--lf-bg-muted)] px-4 py-3">
            <span className="text-lg">📓</span>
            <span className="text-sm font-medium text-[var(--lf-fg-muted)]">
              LearnFlow Study Desk
            </span>
          </div>
          <div className="grid gap-3 p-5 sm:grid-cols-3">
            {[
              { emoji: "💬", label: "Chat with PDF", desc: "Ask anything about your notes" },
              { emoji: "📝", label: "AI Notes", desc: "Structured summaries instantly" },
              { emoji: "🃏", label: "Flashcards", desc: "Flip & memorize key concepts" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-[var(--lf-border)] bg-[var(--lf-bg-elevated)] p-4 text-left transition hover:border-[var(--lf-accent)]/30"
              >
                <span className="text-2xl">{item.emoji}</span>
                <p className="mt-2 font-semibold text-[var(--lf-fg)]">{item.label}</p>
                <p className="mt-1 text-xs text-[var(--lf-fg-subtle)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
