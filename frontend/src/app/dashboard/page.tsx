"use client";

import { useEffect } from "react";

import UploadBox from "@/components/UploadBox";
import ChatBox from "@/components/ChatBox";
import QuizBox from "@/components/QuizBox";
import FlashcardsBox from "@/components/FlashcardsBox";
import NotesBox from "@/components/NotesBox";
import DocumentSidebar from "@/components/DocumentSidebar";

export default function DashboardPage() {

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {

      window.location.href = "/login";
    }

  }, []);

  return (
    <main className="min-h-screen bg-black text-white flex">

      <DocumentSidebar />

      <div className="flex-1 p-10 overflow-y-auto">

        <h1 className="text-5xl font-bold mb-12">
          LearnFlow AI Workspace
        </h1>

        <div className="flex flex-col gap-10">

          <UploadBox />

          <ChatBox />

          <QuizBox />

          <FlashcardsBox />

          <NotesBox />

        </div>

      </div>

    </main>
  );
}