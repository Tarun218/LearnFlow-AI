"use client";

import { Quote } from "lucide-react";

import { Card } from "@/components/ui/card";

const testimonials = [
  {
    quote:
      "LearnFlow turned my lecture PDFs into quizzes I could actually use before exams.",
    author: "Priya S.",
    role: "Computer Science Student",
  },
  {
    quote:
      "The chat feels like Perplexity, but it only uses my uploaded materials. Game changer.",
    author: "Marcus T.",
    role: "MBA Candidate",
  },
  {
    quote:
      "Clean UI, fast uploads, and the notes generator saves me hours every week.",
    author: "Elena R.",
    role: "Research Analyst",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-[var(--lf-accent)]">
            Testimonials
          </p>
          <h2 className="mt-3 text-3xl font-bold">Loved by learners</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Card key={t.author} delay={i * 0.08} hover>
              <Quote className="mb-4 h-8 w-8 text-indigo-500/40" />
              <p className="text-sm text-zinc-300 leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 border-t border-white/[0.06] pt-4">
                <p className="font-medium text-white">{t.author}</p>
                <p className="text-xs text-[var(--lf-fg-muted)]">{t.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
