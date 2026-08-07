import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <main className="relative flex min-h-screen overflow-hidden bg-[#030712]">

      {/* Background Glow */}

      <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-[140px]" />

      {/* Left */}

      <section className="hidden flex-1 items-center justify-center lg:flex">

        <div className="max-w-xl">

          <p className="text-cyan-300 uppercase tracking-[0.35em] text-sm font-semibold">
            Nexora AI
          </p>

          <h1 className="mt-6 text-6xl font-black leading-tight text-white">
            Your Intelligent
            <br />
            Second Brain.
          </h1>

          <p className="mt-8 text-lg leading-8 text-slate-400">
            Chat with AI, organize knowledge,
            build resumes and manage your entire
            career from one workspace.
          </p>

        </div>

      </section>

      {/* Right */}

      <section className="relative flex flex-1 items-center justify-center p-8">

        {children}

      </section>

    </main>
  );
}