"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Layers, Loader2, RotateCcw } from "lucide-react";

import { API_BASE, parseJsonResponse } from "@/lib/api";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type FlashcardsResponse = {
  flashcards?: string;
};

function FlashcardItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={() => setFlipped((f) => !f)}
      className="group h-44 w-full [perspective:1000px] sm:h-48"
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        className="relative h-full w-full [transform-style:preserve-3d]"
      >
        <div
          className={cn(
            "absolute inset-0 flex flex-col rounded-2xl border-2 border-[var(--lf-border)] bg-[var(--lf-sticky)] p-5 text-left shadow-[var(--lf-shadow-paper)] [backface-visibility:hidden]",
            !flipped && "rotate-[-0.5deg]"
          )}
        >
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800/70 dark:text-amber-200/70">
            Question
          </span>
          <p className="mt-2 flex-1 font-semibold text-[var(--lf-fg)] line-clamp-4">
            {question}
          </p>
          <span className="text-xs text-[var(--lf-fg-subtle)]">Tap to flip</span>
        </div>
        <div
          className="absolute inset-0 flex flex-col rounded-2xl border-2 border-[var(--lf-accent)]/30 bg-[var(--lf-surface)] p-5 text-left shadow-[var(--lf-shadow-md)] [backface-visibility:hidden] [transform:rotateY(180deg)]"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--lf-accent)]">
            ✓ Answer
          </span>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--lf-fg-muted)] line-clamp-5">
            {answer}
          </p>
        </div>
      </motion.div>
    </motion.button>
  );
}

export default function FlashcardsBox() {
  const [flashcards, setFlashcards] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateFlashcards = async () => {
    setLoading(true);
    setError("");
    setFlashcards("");

    try {
      const response = await fetch(`${API_BASE}/generate-flashcards`, {
        method: "POST",
      });

      const data = await parseJsonResponse<FlashcardsResponse>(response);
      setFlashcards(data.flashcards ?? "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
    } finally {
      setLoading(false);
    }
  };

  const cards = flashcards
    .split("Q:")
    .filter((card) => card.trim())
    .map((card) => {
      const parts = card.split("A:");
      return { q: parts[0]?.trim(), a: parts[1]?.trim() };
    });

  return (
    <Panel className="overflow-hidden p-0">
      <div className="flex flex-col gap-4 border-b border-[var(--lf-border)] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--lf-teal)]/30 text-teal-700 dark:text-teal-300">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[var(--lf-fg)]">
              Flashcards
            </h2>
            <p className="text-sm text-[var(--lf-fg-muted)]">
              Tap cards to flip — active recall mode
            </p>
          </div>
        </div>
        <Button
          type="button"
          onClick={generateFlashcards}
          disabled={loading}
          variant="sticky"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Shuffling...
            </>
          ) : (
            <>
              {/* <RotateCcw className="h-4 w-4" /> */}
              Generate deck
            </>
          )}
        </Button>
      </div>

      <div className="p-6">
        {error && (
          <Alert variant="error" className="mb-6">
            {error}
          </Alert>
        )}

        {loading && (
          <div className="grid gap-4 sm:grid-cols-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-44 rounded-2xl border border-[var(--lf-border)] shimmer sm:h-48"
              />
            ))}
          </div>
        )}

        {cards.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            {cards.map((card, index) => (
              <FlashcardItem
                key={index}
                question={card.q ?? ""}
                answer={card.a ?? ""}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </Panel>
  );
}
