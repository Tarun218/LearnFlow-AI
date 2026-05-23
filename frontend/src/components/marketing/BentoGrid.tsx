"use client";

import { motion } from "framer-motion";

import { Panel } from "@/components/ui/card";

export function BentoGrid() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Built for deep work
          </h2>
          <p className="mt-3 text-[var(--lf-fg-muted)]">
            A bento-style layout that mirrors how you actually study.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-6 md:grid-rows-2 md:h-[420px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-4 md:row-span-2"
          >
            <Panel className="flex h-full min-h-[200px] flex-col justify-end p-8 bg-gradient-to-br from-indigo-950/50 to-transparent">
              <p className="text-xs uppercase tracking-widest text-[var(--lf-accent)]">
                Workspace
              </p>
              <h3 className="mt-2 text-2xl font-semibold">
                One dashboard. Every tool.
              </h3>
              <p className="mt-2 max-w-md text-sm text-[var(--lf-fg-muted)]">
                Upload, chat, notes, flashcards, and quizzes — tabbed and
                distraction-free.
              </p>
            </Panel>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2"
          >
            <Panel className="flex h-full min-h-[120px] flex-col justify-center p-6">
              <p className="text-3xl font-bold gradient-text">RAG</p>
              <p className="mt-1 text-sm text-[var(--lf-fg-muted)]">
                Context-aware answers from your PDFs
              </p>
            </Panel>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="md:col-span-2"
          >
            <Panel className="flex h-full min-h-[120px] flex-col justify-center p-6">
              <p className="text-3xl font-bold gradient-text">Fast</p>
              <p className="mt-1 text-sm text-[var(--lf-fg-muted)]">
                Optimized for smooth interactions
              </p>
            </Panel>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
