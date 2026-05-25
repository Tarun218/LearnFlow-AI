"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";

import { API_BASE, parseJsonResponse } from "@/lib/api";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/card";

type QuizResponse = {
  quiz?: string;
};

export default function QuizBox() {
  const [quiz, setQuiz] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateQuiz = async () => {
    setLoading(true);
    setError("");
    setQuiz("");

    try {
      const response = await fetch(`${API_BASE}/generate-quiz`, {
        method: "POST",
      });

      const data = await parseJsonResponse<QuizResponse>(response);
      setQuiz(data.quiz ?? "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Panel className="overflow-hidden p-0">
      <div className="flex flex-col gap-4 border-b border-[var(--lf-border)] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--lf-highlight-soft)] text-amber-700 dark:text-amber-300">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[var(--lf-fg)]">
              Quiz time
            </h2>
            <p className="text-sm text-[var(--lf-fg-muted)]">
              Multiple-choice practice from your PDF
            </p>
          </div>
        </div>
        <Button
          type="button"
          onClick={generateQuiz}
          disabled={loading}
          variant="secondary"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Quiz"
          )}
        </Button>
      </div>

      <div className="p-6">
        {error && <Alert variant="error" className="mb-6">{error}</Alert>}

        {!quiz && !loading && !error && (
          <p className="text-center text-sm text-[var(--lf-fg-muted)] py-12">
            Generate a quiz from your latest uploaded document.
          </p>
        )}

        {loading && (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="h-20 rounded-xl bg-[var(--lf-bg-muted)] shimmer"
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </div>
        )}

        {quiz && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="notebook-bg rounded-xl border border-[var(--lf-border)] bg-[var(--lf-surface)] p-6 text-sm text-[var(--lf-fg)] whitespace-pre-wrap leading-relaxed max-h-[min(600px,55vh)] overflow-y-auto shadow-[var(--lf-shadow-sm)]"
          >
            {quiz}
          </motion.div>
        )}
      </div>
    </Panel>
  );
}
