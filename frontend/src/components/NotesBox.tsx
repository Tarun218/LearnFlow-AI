"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, NotebookPen } from "lucide-react";

import { API_BASE, parseJsonResponse } from "@/lib/api";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/card";

type NotesResponse = {
  notes?: string;
};

export default function NotesBox() {
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateNotes = async () => {
    setLoading(true);
    setError("");
    setNotes("");

    try {
      const response = await fetch(`${API_BASE}/generate-notes`, {
        method: "POST",
      });

      const data = await parseJsonResponse<NotesResponse>(response);
      setNotes(data.notes ?? "");
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
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--lf-lavender)] text-[var(--lf-accent-secondary)]">
            <NotebookPen className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[var(--lf-fg)]">
              📝 AI Notes
            </h2>
            <p className="text-sm text-[var(--lf-fg-muted)]">
              Structured study notes from your material
            </p>
          </div>
        </div>
        <Button
          type="button"
          onClick={generateNotes}
          disabled={loading}
          variant="secondary"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Notes"
          )}
        </Button>
      </div>

      <div className="p-6">
        {error && <Alert variant="error" className="mb-6">{error}</Alert>}

        {!notes && !loading && !error && (
          <p className="text-center text-sm text-[var(--lf-fg-muted)] py-12">
            Click generate to create notes from your latest uploaded PDF.
          </p>
        )}

        {loading && (
          <div className="space-y-3 py-4">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="h-4 rounded-lg bg-[var(--lf-bg-muted)]"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </div>
        )}

        {notes && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="notebook-bg rounded-xl border border-[var(--lf-border)] bg-[var(--lf-surface)] p-6 text-sm text-[var(--lf-fg)] whitespace-pre-wrap leading-relaxed max-h-[min(600px,55vh)] overflow-y-auto shadow-[var(--lf-shadow-sm)]"
          >
            {notes}
          </motion.div>
        )}
      </div>
    </Panel>
  );
}
