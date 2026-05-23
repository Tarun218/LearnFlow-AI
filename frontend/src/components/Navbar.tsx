"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, Menu, X } from "lucide-react";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Features", href: "#features" },
    { label: "Product", href: "#product" },
    { label: "Testimonials", href: "#testimonials" },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-[var(--lf-border)] bg-[var(--lf-bg)]/90 backdrop-blur-xl shadow-[var(--lf-shadow-sm)]"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-[var(--lf-fg)]"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--lf-accent)] to-[var(--lf-accent-secondary)] shadow-[var(--lf-shadow-md)]">
            <BookOpen className="h-5 w-5 text-white" />
          </span>
          <span>
            LearnFlow <span className="text-[var(--lf-accent)]">AI</span>
          </span>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--lf-fg-muted)] transition hover:text-[var(--lf-accent)]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={() => router.push("/login")}
          >
            Log in
          </Button>
          <Button size="sm" type="button" onClick={() => router.push("/signup")}>
            Start studying ✨
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="rounded-xl p-2 text-[var(--lf-fg-muted)] hover:bg-[var(--lf-surface-hover)]"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="border-t border-[var(--lf-border)] bg-[var(--lf-bg)]/98 px-4 py-4 backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="py-2 font-medium text-[var(--lf-fg)]"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button
              variant="secondary"
              className="w-full"
              type="button"
              onClick={() => router.push("/login")}
            >
              Log in
            </Button>
            <Button
              className="w-full"
              type="button"
              onClick={() => router.push("/signup")}
            >
              Start studying
            </Button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
