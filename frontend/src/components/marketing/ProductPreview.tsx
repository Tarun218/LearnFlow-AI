"use client";

import { motion } from "framer-motion";
import { FileText, MessageSquare, Sparkles } from "lucide-react";

import { Panel } from "@/components/ui/card";

const steps = [
  {
    icon: FileText,
    title: "Upload your PDF",
    desc: "Drop study materials into your workspace.",
  },
  {
    icon: MessageSquare,
    title: "Chat & explore",
    desc: "Ask questions grounded in your document context.",
  },
  {
    icon: Sparkles,
    title: "Generate study assets",
    desc: "Notes, flashcards, and quizzes in seconds.",
  },
];

export function ProductPreview() {
  return (
    <section id="product" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="text-sm font-medium uppercase tracking-widest text-[var(--lf-accent)]">
            Product
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            From PDF to mastery in minutes
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[var(--lf-fg-muted)]">
            A streamlined flow designed for students, professionals, and lifelong
            learners.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Panel className="h-full p-6 transition hover:border-indigo-500/30">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300">
                  <step.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-[var(--lf-fg-muted)] leading-relaxed">
                  {step.desc}
                </p>
              </Panel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
