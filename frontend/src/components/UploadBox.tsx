"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { FileUp, Upload } from "lucide-react";

import { API_BASE, parseJsonResponse } from "@/lib/api";
import { useDocumentStore } from "@/store/documentStore";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type UploadResponse = {
  message?: string;
  filename?: string;
  text_preview?: string;
  summary?: string;
  error?: string;
};

export default function UploadBox() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [previewText, setPreviewText] = useState("");
  const [summary, setSummary] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const { fetchDocuments, setActiveDocument } = useDocumentStore();

  const handleUpload = async () => {
    if (!file) {
      setIsError(true);
      setMessage("Please select a PDF");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setMessage("");
    setIsError(false);
    setPreviewText("");
    setSummary("");

    try {
      const response = await fetch(`${API_BASE}/upload-pdf`, {
        method: "POST",
        body: formData,
      });

      const data = await parseJsonResponse<UploadResponse>(response);

      setIsError(false);
      setMessage(data.message ?? "Upload complete");
      setPreviewText(data.text_preview ?? "");
      setSummary(data.summary ?? "");

      if (data.filename) {
        setActiveDocument(data.filename);
      }

      await fetchDocuments();
    } catch (error) {
      setIsError(true);
      setMessage(
        error instanceof Error ? error.message : "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped?.type === "application/pdf") {
      setFile(dropped);
    }
  }, []);

  return (
    <Panel className="overflow-hidden p-0">
      <div className="border-b border-[var(--lf-border)] px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--lf-lavender)] text-[var(--lf-accent)]">
            <Upload className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[var(--lf-fg)]">
              📎 Upload PDF
            </h2>
            <p className="text-sm text-[var(--lf-fg-muted)]">
              Add study materials to your workspace
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6 p-6">
        <motion.div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          animate={{
            borderColor: dragOver
              ? "rgba(99, 102, 241, 0.6)"
              : "rgba(255,255,255,0.08)",
          }}
          className={cn(
            "relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-12 transition",
            dragOver && "bg-[var(--lf-lavender)]"
          )}
        >
          <FileUp className="mb-4 h-10 w-10 text-[var(--lf-accent)]" />
          <p className="text-sm text-[var(--lf-fg-muted)]">
            Drag & drop your PDF here, or browse
          </p>
          <input
            type="file"
            accept=".pdf"
            id="pdf-upload"
            className="absolute inset-0 cursor-pointer opacity-0"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setFile(e.target.files[0]);
              }
            }}
          />
          {file && (
            <p className="mt-3 text-sm font-medium text-[var(--lf-accent)]">
              {file.name}
            </p>
          )}
        </motion.div>

        <Button
          type="button"
          onClick={handleUpload}
          disabled={loading}
          className="w-full"
          size="lg"
        >
          {loading ? "Processing..." : "Upload PDF"}
        </Button>

        {message && (
          <Alert variant={isError ? "error" : "success"}>{message}</Alert>
        )}

        {summary && (
          <div>
            <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-[var(--lf-fg-subtle)]">
              AI Summary
            </h3>
            <div className="notebook-bg rounded-xl border border-[var(--lf-border)] bg-[var(--lf-surface)] p-5 text-sm text-[var(--lf-fg)] whitespace-pre-wrap leading-relaxed">
              {summary}
            </div>
          </div>
        )}

        {previewText && (
          <div>
            <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-[var(--lf-fg-subtle)]">
              Text Preview
            </h3>
            <div className="max-h-80 overflow-y-auto notebook-bg rounded-xl border border-[var(--lf-border)] bg-[var(--lf-surface)] p-5 text-sm text-[var(--lf-fg-muted)] whitespace-pre-wrap leading-relaxed">
              {previewText}
            </div>
          </div>
        )}
      </div>
    </Panel>
  );
}
