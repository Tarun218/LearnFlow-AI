"use client";

import { useState, useRef, useEffect } from "react";

import { useDocumentStore }
from "@/store/documentStore";

interface Message {

  role: "user" | "ai";

  text: string;
}

export default function ChatBox() {

  const {
    activeDocument
  } = useDocumentStore();

  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState<Message[]>([]);

  const [loading, setLoading] = useState(false);

  const messagesEndRef =
    useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });

  }, [messages, loading]);

  const handleAsk = async () => {

    if (!question.trim()) return;

    if (!activeDocument) {

      alert("Select a document first");

      return;
    }

    const userMessage: Message = {
      role: "user",
      text: question,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setLoading(true);

    const currentQuestion = question;

    setQuestion("");

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/chat",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            question: currentQuestion,
            document_id: activeDocument,
          }),
        }
      );

      const data = await response.json();

      const aiMessage: Message = {
        role: "ai",
        text: data.answer || data.error,
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);

    } catch (error) {

      console.log(error);

      const errorMessage: Message = {
        role: "ai",
        text: "Chat request failed",
      };

      setMessages((prev) => [
        ...prev,
        errorMessage,
      ]);

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl bg-gray-950 border border-gray-800 rounded-2xl p-6">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-3xl font-bold">
          Chat With PDF
        </h2>

        {activeDocument && (

          <div className="text-sm text-gray-400">

            Active:
            <span className="ml-2 text-white font-semibold">

              {activeDocument}

            </span>

          </div>
        )}

      </div>

      <div className="bg-black border border-gray-800 rounded-xl p-6 h-[550px] overflow-y-auto space-y-6">

        {messages.length === 0 && (

          <div className="h-full flex items-center justify-center">

            <p className="text-gray-500 text-lg">
              Ask questions about your selected PDF...
            </p>

          </div>
        )}

        {messages.map((message, index) => (

          <div
            key={index}
            className={`flex ${
              message.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`max-w-[80%] p-4 rounded-2xl whitespace-pre-wrap leading-relaxed ${
                message.role === "user"
                  ? "bg-white text-black"
                  : "bg-gray-800 text-white"
              }`}
            >
              {message.text}
            </div>

          </div>
        ))}

        {loading && (

          <div className="flex justify-start">

            <div className="bg-gray-800 text-white px-5 py-4 rounded-2xl animate-pulse">

              AI is thinking...

            </div>

          </div>
        )}

        <div ref={messagesEndRef} />

      </div>

      <div className="flex gap-4 mt-6">

        <input
          type="text"
          placeholder="Ask something about the PDF..."
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          onKeyDown={(e) => {

            if (e.key === "Enter") {

              handleAsk();
            }
          }}
          className="flex-1 p-4 rounded-xl bg-black border border-gray-700 text-white outline-none focus:border-white"
        />

        <button
          onClick={handleAsk}
          disabled={loading}
          className="bg-white text-black px-8 rounded-xl font-semibold hover:bg-gray-200 transition disabled:opacity-50"
        >
          Send
        </button>

      </div>

    </div>
  );
}