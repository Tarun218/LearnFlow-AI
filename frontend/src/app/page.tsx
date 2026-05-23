"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import { Stats } from "@/components/marketing/Stats";
import { ProductPreview } from "@/components/marketing/ProductPreview";
import { BentoGrid } from "@/components/marketing/BentoGrid";
import { Testimonials } from "@/components/marketing/Testimonials";
import { Footer } from "@/components/marketing/Footer";
import { API_BASE } from "@/lib/api";
import { cn } from "@/lib/utils";

export default function Home() {
  const [message, setMessage] = useState("Checking...");
  const [connected, setConnected] = useState<boolean | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/`)
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message ?? "Connected");
        setConnected(true);
      })
      .catch(() => {
        setMessage("Set NEXT_PUBLIC_API_URL on deploy");
        setConnected(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-[var(--lf-bg)] text-[var(--lf-fg)]">
      <Navbar />
      <Hero />
      <Stats />
      <ProductPreview />
      <Features />
      <BentoGrid />
      <Testimonials />

      <section className="px-4 py-12 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <p
            className={cn(
              "inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-medium shadow-[var(--lf-shadow-sm)]",
              connected === true &&
                "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
              connected === false &&
                "border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-300",
              connected === null &&
                "border-[var(--lf-border)] bg-[var(--lf-surface)] text-[var(--lf-fg-subtle)]"
            )}
          >
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                connected === true && "bg-emerald-500",
                connected === false && "bg-amber-500",
                connected === null && "animate-pulse bg-[var(--lf-fg-subtle)]"
              )}
            />
            API: {message}
          </p>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
