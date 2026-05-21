"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";

export default function Home() {

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/")
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
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