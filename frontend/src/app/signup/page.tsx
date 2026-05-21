"use client";

import { useState } from "react";

import { API_BASE, parseJsonResponse } from "@/lib/api";

type SignupResponse = {
  message?: string;
};

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSignup = async () => {
    setMessage("");
    setIsError(false);

    try {
      const response = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await parseJsonResponse<SignupResponse>(response);
      setMessage(data.message ?? "Account created");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (error) {
      setIsError(true);
      setMessage(
        error instanceof Error ? error.message : "Backend connection failed"
      );
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-950 p-8 rounded-2xl border border-gray-800">
        <h1 className="text-3xl font-bold mb-8 text-center">Create Account</h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSignup()}
          />

          <button
            type="button"
            onClick={handleSignup}
            className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Sign Up
          </button>

          {message && (
            <p
              className={`text-center mt-4 ${
                isError ? "text-red-400" : "text-green-400"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
