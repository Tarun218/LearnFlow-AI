"use client";

import { useRouter } from "next/navigation";
import { BookOpen, LogOut, Menu } from "lucide-react";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";

type DashboardHeaderProps = {
  onMenuClick?: () => void;
};

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/login");
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[var(--lf-border)] bg-[var(--lf-bg)]/90 px-4 py-4 backdrop-blur-xl sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-xl p-2 text-[var(--lf-fg-muted)] hover:bg-[var(--lf-surface-hover)] lg:hidden"
          aria-label="Open documents"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--lf-accent)] to-[var(--lf-accent-secondary)]">
            <BookOpen className="h-4 w-4 text-white" />
          </span>
          <div>
            <h1 className="text-lg font-semibold leading-tight">Study Desk</h1>
            <p className="text-xs text-[var(--lf-fg-subtle)]">LearnFlow AI</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={handleLogout}
          className="text-[var(--lf-fg-muted)]"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Log out</span>
        </Button>
      </div>
    </header>
  );
}
