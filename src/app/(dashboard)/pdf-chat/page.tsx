"use client";

import PDFChat from "@/components/pdf-chat/PDFChat";

export default function PDFChatPage() {
  return (
    <main className="min-h-full bg-[#030712] px-6 py-8 text-white lg:px-10">
      <div className="mx-auto max-w-7xl">

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] px-8 py-10 lg:px-12">

          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
              Nexora AI
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-tight text-white lg:text-5xl">
              PDF Chat
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400 lg:text-lg">
              Upload a document and have an intelligent
              conversation with its contents.
            </p>
          </div>

        </div>

        <div className="mt-8">
          <PDFChat />
        </div>

      </div>
    </main>
  );
}