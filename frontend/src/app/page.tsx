"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import { API_BASE } from "@/lib/api";

export default function Home() {

  const [message, setMessage] = useState("Checking...");

  useEffect(() => {
    fetch(`${API_BASE}/`)
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message ?? "Connected");
      })
      .catch(() => {
        setMessage("Backend unreachable — set NEXT_PUBLIC_API_URL on deploy");
      });
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white">

      <Navbar />

      <Hero />

      <Features />

      <div className="text-center pb-20">
        <p className="text-green-400 text-lg">
          Backend Status: {message}
        </p>
      </div>

    </main>
  );
}