"use client";

import { useState } from "react";

export default function TestSignup() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const testSignup = async () => {
    setLoading(true);
    setResult("");

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Ahsan",
          email: "ahsan@test.com",
          password: "123456",
        }),
      });

      const data = await response.json();

      setResult(
        JSON.stringify(data, null, 2)
      );
    } catch (error) {
      setResult(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#030712] p-10 text-white">
      <div className="mx-auto max-w-xl">
        <h1 className="text-3xl font-bold">
          Signup API Test
        </h1>

        <p className="mt-3 text-slate-400">
          This page is only for testing the signup API.
        </p>

        <button
          onClick={testSignup}
          disabled={loading}
          className="mt-8 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Test Account"}
        </button>

        {result && (
          <pre className="mt-8 overflow-auto rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-cyan-300">
            {result}
          </pre>
        )}
      </div>
    </main>
  );
}