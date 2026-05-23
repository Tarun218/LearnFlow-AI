"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  FileUp,
  Layers,
  MessageSquare,
  NotebookPen,
  Sparkles,
} from "lucide-react";

import ChatBox from "@/components/ChatBox";
import FlashcardsBox from "@/components/FlashcardsBox";
import NotesBox from "@/components/NotesBox";
import QuizBox from "@/components/QuizBox";
import UploadBox from "@/components/UploadBox";
import { tabIndicatorSpring } from "@/lib/motion";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "upload", label: "Upload", icon: FileUp, emoji: "📎" },
  { id: "chat", label: "Chat", icon: MessageSquare, emoji: "💬" },
  { id: "notes", label: "Notes", icon: NotebookPen, emoji: "📝" },
  { id: "flashcards", label: "Cards", icon: Layers, emoji: "🃏" },
  { id: "quiz", label: "Quiz", icon: Sparkles, emoji: "✨" },
] as const;

export type TabId = (typeof tabs)[number]["id"];

type DashboardTabsProps = {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
};

export function DashboardTabs({ activeTab, onTabChange }: DashboardTabsProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2 rounded-2xl border border-[var(--lf-border)] bg-[var(--lf-surface)] p-1.5 shadow-[var(--lf-shadow-sm)]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "relative flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition sm:px-4",
              activeTab === tab.id
                ? "text-white"
                : "text-[var(--lf-fg-muted)] hover:text-[var(--lf-fg)] hover:bg-[var(--lf-surface-hover)]"
            )}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeStudyTab"
                className="absolute inset-0 rounded-xl tab-active-study"
                transition={tabIndicatorSpring}
              />
            )}
            <span className="relative z-10 hidden sm:inline">{tab.emoji}</span>
            <tab.icon className="relative z-10 h-4 w-4" />
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {activeTab === "upload" && <UploadBox />}
          {activeTab === "chat" && <ChatBox />}
          {activeTab === "notes" && <NotesBox />}
          {activeTab === "flashcards" && <FlashcardsBox />}
          {activeTab === "quiz" && <QuizBox />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
