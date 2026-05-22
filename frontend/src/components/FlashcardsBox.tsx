"use client";

import { useState } from "react";

import { API_BASE } from "@/lib/api";

export default function FlashcardsBox() {

  const [flashcards, setFlashcards] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const generateFlashcards = async () => {

    setLoading(true);

    setError("");

    try {

      const response = await fetch(
        `${API_BASE}/generate-flashcards`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (data.flashcards) {

        setFlashcards(data.flashcards);

      } else {

        setError(
          data.error || "Flashcard generation failed"
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
          AI Flashcards
        </h2>

        <button
          onClick={generateFlashcards}
          disabled={loading}
          className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition disabled:opacity-50"
        >
          {loading
            ? "Generating..."
            : "Generate Flashcards"}
        </button>

      </div>

      {error && (

        <div className="bg-red-500/10 border border-red-500 text-red-400 p-4 rounded-xl mb-6">

          {error}

        </div>
      )}

      {flashcards && (

        <div className="grid gap-6">

          {flashcards
            .split("Q:")
            .filter((card) => card.trim())
            .map((card, index) => {

              const parts = card.split("A:");

              return (

                <div
                  key={index}
                  className="bg-black border border-gray-800 rounded-xl p-6"
                >

                  <h3 className="text-xl font-semibold mb-4 text-white">

                    Q: {parts[0]?.trim()}

                  </h3>

                  <p className="text-gray-300 leading-relaxed">

                    A: {parts[1]?.trim()}

                  </p>

                </div>
              );
            })}
        </div>
      )}

    </div>
  );
}