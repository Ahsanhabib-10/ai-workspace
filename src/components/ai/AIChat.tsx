"use client";

import { useState } from "react";

import SuggestedPrompts from "./SuggestedPrompts";
import Conversation from "./Conversation";
import ChatInput from "./ChatInput";
import ChatHistory from "./history/ChatHistory";

import { Menu, X } from "lucide-react";

export default function AIChat() {
  const [historyOpen, setHistoryOpen] = useState(false);
  return (
  <div className="relative flex h-[calc(100vh-170px)] overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">

    {historyOpen && (
      <div className="absolute inset-y-0 left-0 z-20 w-64 border-r border-white/10 bg-[#030712]">
        <ChatHistory />
      </div>
    )}

    <div className="flex flex-1 flex-col">

      <div className="flex items-center justify-between border-b border-white/10 p-8">

        <div>

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Nexora AI
          </p>

          <h1 className="mt-2 text-4xl font-black">
            AI Assistant
          </h1>

        </div>

        <button
          onClick={() => setHistoryOpen(!historyOpen)}
          className="rounded-xl border border-white/10 p-3 hover:bg-white/10"
        >
          {historyOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

      </div>

      <SuggestedPrompts />

      <Conversation />

      <ChatInput />

    </div>

  </div>
);
}