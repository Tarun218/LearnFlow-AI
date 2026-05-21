"use client";

import { useState } from "react";

export default function QuizBox() {

  const [quiz, setQuiz] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const generateQuiz = async () => {

    setLoading(true);

    setError("");

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/generate-quiz",
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (data.quiz) {

        setQuiz(data.quiz);

      } else {

        setError(data.error || "Quiz generation failed");
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
          AI Quiz Generator
        </h2>

        <button
          onClick={generateQuiz}
          disabled={loading}
          className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Quiz"}
        </button>

      </div>

      {error && (

        <div className="bg-red-500/10 border border-red-500 text-red-400 p-4 rounded-xl mb-6">

          {error}

        </div>
      )}

      {quiz && (

        <div className="bg-black border border-gray-800 rounded-xl p-6 whitespace-pre-wrap text-gray-300 leading-relaxed overflow-y-auto max-h-[700px]">

          {quiz}

        </div>
      )}

    </div>
  );
}