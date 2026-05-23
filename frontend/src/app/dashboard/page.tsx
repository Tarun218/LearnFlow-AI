"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import {
  DashboardTabs,
  type TabId,
} from "@/components/dashboard/DashboardTabs";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import DocumentSidebar from "@/components/DocumentSidebar";
import { StudyBackground } from "@/components/layout/StudyBackground";
import { Spinner } from "@/components/ui/spinner";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("upload");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    setReady(true);
  }, [router]);

  if (!ready) {
    return (
      <div className="relative min-h-screen bg-[var(--lf-bg)]">
        <StudyBackground subtle />
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
          <Spinner size="lg" />
          <p className="text-sm text-[var(--lf-fg-muted)]">
            Opening your study desk...
          </p>
          <div className="w-full max-w-md space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen bg-[var(--lf-bg)] text-[var(--lf-fg)]">
      <StudyBackground subtle />

      <DocumentSidebar
        mobileOpen={sidebarOpen}
        onMobileClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-h-screen flex-1 flex-col">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-5xl"
          >
            <p className="mb-1 text-sm font-medium text-[var(--lf-accent)]">
              📚 Your study hub
            </p>
            <h2 className="mb-2 text-2xl font-bold sm:text-3xl">
              What are we learning today?
            </h2>
            <p className="mb-8 text-sm text-[var(--lf-fg-muted)]">
              Upload materials, chat, and generate notes — all in one notebook.
            </p>

            <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
