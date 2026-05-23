"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { AuthShell } from "@/components/auth/AuthShell";
import { API_BASE, parseJsonResponse } from "@/lib/api";
import { Alert, Button, Input, Label } from "@/components/ui";

type LoginResponse = {
  access_token?: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setMessage("");
    setIsError(false);
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await parseJsonResponse<LoginResponse>(response);

      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        router.push("/dashboard");
        return;
      }

      setIsError(true);
      setMessage("Login failed");
    } catch (error) {
      setIsError(true);
      setMessage(
        error instanceof Error ? error.message : "Backend connection failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to continue to your workspace"
    >
      <div className="space-y-4">
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="you@university.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !loading && handleLogin()}
          />
        </div>

        <Button
          type="button"
          onClick={handleLogin}
          disabled={loading}
          className="w-full"
          size="lg"
        >
          {loading ? "Signing in..." : "Sign in"}
        </Button>

        {message && (
          <Alert variant={isError ? "error" : "success"}>{message}</Alert>
        )}

        <p className="text-center text-sm text-[var(--lf-fg-muted)]">
          No account?{" "}
          <button
            type="button"
            onClick={() => router.push("/signup")}
            className="text-[var(--lf-accent)] hover:underline transition"
          >
            Create one
          </button>
        </p>
      </div>
    </AuthShell>
  );
}
