"use client";

import { useState } from "react";

import { API_BASE } from "@/lib/api";

export default function NotesBox() {

  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const generateNotes = async () => {

    setLoading(true);

    setError("");

    try {

      const response = await fetch(
        `${API_BASE}/generate-notes`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (data.notes) {

        setNotes(data.notes);

      } else {

        setError(
          data.error || "Notes generation failed"
        );
      }

    } catch (error) {

      console.log(error);

      setError("Request failed");

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl bg-gray-950 border border-gray-800 rounded-2xl p-6">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-3xl font-bold">
          AI Notes Generator
        </h2>

        <button
          onClick={generateNotes}
          disabled={loading}
          className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition disabled:opacity-50"
        >
          {loading
            ? "Generating..."
            : "Generate Notes"}
        </button>

      </div>

      {error && (

        <div className="bg-red-500/10 border border-red-500 text-red-400 p-4 rounded-xl mb-6">

          {error}

        </div>
      )}

      {notes && (

        <div className="bg-black border border-gray-800 rounded-xl p-6 whitespace-pre-wrap text-gray-300 leading-relaxed overflow-y-auto max-h-[700px]">

          {notes}

        </div>
      )}

    </div>
  );
}