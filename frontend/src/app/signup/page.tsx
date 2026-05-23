"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { AuthShell } from "@/components/auth/AuthShell";
import { API_BASE, parseJsonResponse } from "@/lib/api";
import { Alert, Button, Input, Label } from "@/components/ui";

type SignupResponse = {
  message?: string;
};

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setMessage("");
    setIsError(false);
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await parseJsonResponse<SignupResponse>(response);
      setMessage(data.message ?? "Account created");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
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
      title="Create your account"
      subtitle="Start learning smarter in under a minute"
    >
      <div className="space-y-4">
        <div>
          <Label>Username</Label>
          <Input
            type="text"
            placeholder="yourname"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

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
            placeholder="Min. 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !loading && handleSignup()}
          />
        </div>

        <Button
          type="button"
          onClick={handleSignup}
          disabled={loading}
          className="w-full"
          size="lg"
        >
          {loading ? "Creating account..." : "Create account"}
        </Button>

        {message && (
          <Alert variant={isError ? "error" : "success"}>{message}</Alert>
        )}

        <p className="text-center text-sm text-[var(--lf-fg-muted)]">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="text-[var(--lf-accent)] hover:underline transition"
          >
            Sign in
          </button>
        </p>
      </div>
    </AuthShell>
  );
}
