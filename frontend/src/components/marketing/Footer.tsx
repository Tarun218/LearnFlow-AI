"use client";

import { useRouter } from "next/navigation";
import { BookOpen } from "lucide-react";

export function Footer() {
  const router = useRouter();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--lf-border)] bg-[var(--lf-bg-muted)] px-4 py-12 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="flex items-center gap-2 font-semibold text-[var(--lf-fg)]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--lf-accent)] to-[var(--lf-accent-secondary)]">
            <BookOpen className="h-4 w-4 text-white" />
          </span>
          LearnFlow AI
        </button>

        <p className="text-sm text-[var(--lf-fg-muted)]">
          © {year} LearnFlow AI · Made for students 
        </p>

        <div className="flex gap-6 text-sm text-[var(--lf-fg-muted)]">
          <button
            type="button"
            className="hover:text-[var(--lf-accent)] transition"
            onClick={() => router.push("/login")}
          >
            Log in
          </button>
          <button
            type="button"
            className="hover:text-[var(--lf-accent)] transition"
            onClick={() => router.push("/signup")}
          >
            Sign up
          </button>
        </div>
      </div>
    </footer>
  );
}
