"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, RefreshCw, X } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { useDocumentStore } from "@/store/documentStore";
import { cn } from "@/lib/utils";

type DocumentSidebarProps = {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
};

export default function DocumentSidebar({
  mobileOpen = false,
  onMobileClose,
}: DocumentSidebarProps) {
  const {
    documents,
    activeDocument,
    loading,
    error,
    setActiveDocument,
    fetchDocuments,
  } = useDocumentStore();

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const content = (
    <>
      <div className="flex items-center justify-between border-b border-[var(--lf-border)] p-4">
        <div>
          <h2 className="font-semibold text-[var(--lf-fg)]">My Materials</h2>
          <p className="text-xs text-[var(--lf-fg-muted)]">
            {documents.length} notebooks
          </p>
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => fetchDocuments()}
            disabled={loading}
            className="rounded-lg p-2 text-[var(--lf-fg-muted)] hover:bg-[var(--lf-surface-hover)] disabled:opacity-50"
            aria-label="Refresh documents"
          >
            <RefreshCw
              className={cn("h-4 w-4", loading && "animate-spin")}
            />
          </button>
          {onMobileClose && (
            <button
              type="button"
              onClick={onMobileClose}
              className="rounded-lg p-2 text-zinc-400 hover:bg-white/5 lg:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {error && (
        <p className="mx-4 mt-3 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
          {error}
        </p>
      )}

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {loading && documents.length === 0 && (
          <div className="space-y-2 p-2">
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
          </div>
        )}

        {!loading && documents.length === 0 && (
          <div className="rounded-xl border border-dashed border-[var(--lf-border)] bg-[var(--lf-bg-muted)] p-6 text-center">
            <FileText className="mx-auto h-8 w-8 text-[var(--lf-accent)]" />
            <p className="mt-3 text-sm text-[var(--lf-fg-muted)]">
              No documents yet. Upload a PDF to begin.
            </p>
          </div>
        )}

        {documents.map((doc) => (
          <motion.button
            key={doc}
            type="button"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => {
              setActiveDocument(doc);
              onMobileClose?.();
            }}
            className={cn(
              "flex w-full items-start gap-3 rounded-xl border p-3 text-left text-sm transition",
              activeDocument === doc
                ? "border-[var(--lf-accent)]/50 bg-[var(--lf-lavender)] text-[var(--lf-fg)] shadow-[var(--lf-shadow-md)]"
                : "border-[var(--lf-border)] bg-[var(--lf-surface)] text-[var(--lf-fg-muted)] hover:border-[var(--lf-accent)]/30 hover:bg-[var(--lf-surface-hover)]"
            )}
          >
            <FileText className="mt-0.5 h-4 w-4 shrink-0 text-[var(--lf-accent)]" />
            <span className="break-all leading-snug">{doc}</span>
          </motion.button>
        ))}
      </div>

      {activeDocument && (
        <div className="border-t border-[var(--lf-border)] p-4">
          <p className="text-xs text-[var(--lf-fg-subtle)]">📌 Active</p>
          <p className="mt-1 text-sm font-medium break-all text-[var(--lf-accent)]">
            {activeDocument}
          </p>
        </div>
      )}
    </>
  );

  return (
    <>
      <aside className="hidden w-[300px] shrink-0 flex-col border-r border-[var(--lf-border)] bg-[var(--lf-bg-elevated)]/80 lg:flex">
        {content}
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={onMobileClose}
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed left-0 top-0 z-50 flex h-full w-[300px] flex-col border-r border-[var(--lf-border)] bg-[var(--lf-bg)] lg:hidden"
            >
              {content}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
