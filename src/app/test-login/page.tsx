"use client";

import { useState } from "react";

export default function TestLogin() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const testLogin = async () => {
    setLoading(true);
    setResult("");

    try {
      const response = await fetch(
        "/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "ahsan@test.com",
            password: "123456",
          }),
        }
      );

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
          Login API Test
        </h1>

        <button
          onClick={testLogin}
          disabled={loading}
          className="mt-8 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black disabled:opacity-50"
        >
          {loading
            ? "Checking..."
            : "Test Login"}
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