"use client";

import { useState } from "react";

import { API_BASE, parseJsonResponse } from "@/lib/api";

type LoginResponse = {
  access_token?: string;
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleLogin = async () => {
    setMessage("");
    setIsError(false);

    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await parseJsonResponse<LoginResponse>(response);

      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        window.location.href = "/dashboard";
        return;
      }

      setIsError(true);
      setMessage("Login failed");
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
        <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>

        <div className="space-y-4">
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
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />

          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Login
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