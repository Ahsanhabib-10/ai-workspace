"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  return (
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">

      <div className="text-center">

        <h2 className="text-3xl font-bold text-white">
          Welcome Back
        </h2>

        <p className="mt-3 text-slate-400">
          Sign in to continue to Nexora AI
        </p>

      </div>

      <form className="mt-8 space-y-5">

        <div>

          <label className="mb-2 block text-sm text-slate-300">
            Email
          </label>

          <input
            type="email"
            placeholder="ahsan@example.com"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm text-slate-300">
            Password
          </label>

          <input
            type="password"
            placeholder="••••••••"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          />

        </div>

        <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600">
          Sign In
        </Button>

      </form>

      <p className="mt-8 text-center text-sm text-slate-400">
        Don't have an account?{" "}
        <Link
          href="/signup"
          className="text-cyan-300 hover:text-cyan-200"
        >
          Sign Up
        </Link>
      </p>

    </div>
  );
}