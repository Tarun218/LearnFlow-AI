"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, Send, User } from "lucide-react";

import { API_BASE, parseJsonResponse } from "@/lib/api";
import { useDocumentStore } from "@/store/documentStore";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Panel } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "ai";
  text: string;
}

type ChatResponse = {
  answer?: string;
  error?: string;
};

export default function ChatBox() {
  const { activeDocument } = useDocumentStore();

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [chatError, setChatError] = useState("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleAsk = async () => {
    if (!question.trim()) return;

    if (!activeDocument) {
      setChatError("Select a document from the sidebar first.");
      return;
    }

    setChatError("");

    const userMessage: Message = {
      role: "user",
      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    const currentQuestion = question;
    setQuestion("");

    try {
      const response = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: currentQuestion,
          document_id: activeDocument,
        }),
      });

      const data = await parseJsonResponse<ChatResponse>(response);

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: data.answer ?? "No response from AI" },
      ]);
    } catch (error) {
      const errorText =
        error instanceof Error ? error.message : "Chat request failed";
      setChatError(errorText);
      setMessages((prev) => [...prev, { role: "ai", text: errorText }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Panel className="flex flex-col overflow-hidden p-0">
      <div className="flex items-center justify-between border-b border-[var(--lf-border)] px-6 py-5">
        <div>
          <h2 className="text-xl font-semibold text-[var(--lf-fg)]">
            Chat with PDF
          </h2>
          <p className="text-sm text-[var(--lf-fg-muted)]">
            {activeDocument
              ? `Context: ${activeDocument}`
              : "Select a document to start"}
          </p>
        </div>
      </div>

      {chatError && (
        <div className="px-6 pt-4">
          <Alert variant="error">{chatError}</Alert>
        </div>
      )}

      <div className="flex h-[min(520px,60vh)] flex-col">
        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          {messages.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--lf-lavender)]">
                <Bot className="h-7 w-7 text-[var(--lf-accent)]" />
              </div>
              <p className="text-[var(--lf-fg-muted)]">
                {activeDocument
                  ? "Ask anything about your selected PDF"
                  : "Upload and select a document first"}
              </p>
            </div>
          )}

          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex gap-3",
                message.role === "user" ? "flex-row-reverse" : ""
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                  message.role === "user"
                    ? "bg-[var(--lf-accent)] text-white"
                    : "bg-[var(--lf-lavender)] text-[var(--lf-accent)]"
                )}
              >
                {message.role === "user" ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
              </div>
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap",
                  message.role === "user"
                    ? "chat-bubble-user"
                    : "chat-bubble-ai"
                )}
              >
                {message.text}
              </div>
            </motion.div>
          ))}

          {loading && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--lf-lavender)]">
                <Bot className="h-4 w-4 text-[var(--lf-accent)]" />
              </div>
              <div className="chat-bubble-ai px-4 py-3">
                <span className="inline-flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-2 w-2 rounded-full bg-[var(--lf-accent)]"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-[var(--lf-border)] bg-[var(--lf-bg-muted)]/50 p-4">
          <div className="flex gap-3">
            <Input
              placeholder="Ask about your PDF..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !loading) handleAsk();
              }}
            />
            <Button
              type="button"
              onClick={handleAsk}
              disabled={loading || !activeDocument}
              className="shrink-0 px-5"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Panel>
  );
}
