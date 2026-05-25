"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Layers,
  MessageSquare,
  Sparkles,
  Zap,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Stagger, StaggerItem } from "@/components/motion/FadeIn";

const features = [
  {
    icon: MessageSquare,
    title: "Chat With PDFs",
    description:
      "Upload study materials and ask questions using AI-powered document chat.",
  },
  {
    icon: Zap,
    title: "AI Quiz Generation",
    description:
      "Generate quizzes and practice questions instantly from your notes.",
  },
  {
    icon: Sparkles,
    title: "Smart Summaries",
    description:
      "Get concise AI-generated summaries for faster learning.",
  },
  {
    icon: Layers,
    title: "Flashcards",
    description:
      "Turn dense chapters into digestible Q&A flashcards automatically.",
  },
  {
    icon: Brain,
    title: "Structured Notes",
    description:
      "Export clean, organized notes with definitions and key concepts.",
  },
  {
    icon: MessageSquare,
    title: "Document Library",
    description:
      "Manage multiple PDFs and switch context with one click.",
  },
];

export default function Features() {
  return (
    <section id="features" className="scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="text-sm font-medium uppercase tracking-widest text-[var(--lf-accent)]">
            Features
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[var(--lf-fg)] sm:text-4xl">
            Everything you need to learn smarter
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[var(--lf-fg-muted)]">
            Powerful AI tools in a single, cohesive workspace.
          </p>
        </motion.div>

        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <StaggerItem key={feature.title}>
              <Card delay={index * 0.05} className="h-full">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--lf-lavender)] text-[var(--lf-accent)]">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--lf-fg)]">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--lf-fg-muted)] leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
