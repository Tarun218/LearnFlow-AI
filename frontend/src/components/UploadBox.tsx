"use client";

import { useState } from "react";

import { API_BASE, parseJsonResponse } from "@/lib/api";

type UploadResponse = {
  message?: string;
  text_preview?: string;
  summary?: string;
};

export default function UploadBox() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [previewText, setPreviewText] = useState("");
  const [summary, setSummary] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

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
    } catch (error) {
      setIsError(true);
      setMessage(
        error instanceof Error ? error.message : "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl bg-gray-950 border border-gray-800 rounded-2xl p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Upload PDF</h2>

      <div className="space-y-4">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setFile(e.target.files[0]);
            }
          }}
          className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700"
        />

        <button
          type="button"
          onClick={handleUpload}
          disabled={loading}
          className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition disabled:opacity-50"
        >
          {loading ? "Processing..." : "Upload PDF"}
        </button>

        {message && (
          <p
            className={`text-center ${
              isError ? "text-red-400" : "text-green-400"
            }`}
          >
            {message}
          </p>
        )}

        {summary && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">AI Summary</h3>
            <div className="bg-black border border-gray-800 rounded-xl p-6 text-gray-300 whitespace-pre-wrap">
              {summary}
            </div>
          </div>
        )}

        {previewText && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">
              Extracted Text Preview
            </h3>
            <div className="bg-black border border-gray-800 rounded-xl p-6 max-h-96 overflow-y-auto text-gray-300 whitespace-pre-wrap">
              {previewText}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
