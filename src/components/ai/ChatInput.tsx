"use client";

import { useState } from "react";
import {
  Paperclip,
  Mic,
  Send,
  ChevronDown,
} from "lucide-react";

interface ChatInputProps {
  onSend: (text: string) => void;
}

export default function ChatInput({
  onSend,
}: ChatInputProps) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;

    onSend(text);
    setText("");
  };

  return (
    <div className="border-t border-white/10 bg-[#030712]/70 p-5 backdrop-blur-xl">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-4">

        <textarea
          rows={1}
          value={text}
          placeholder="Ask Nexora anything..."
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          className="w-full resize-none bg-transparent text-white outline-none placeholder:text-slate-500"
        />

        <div className="mt-4 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <button
              type="button"
              className="rounded-xl p-2 transition hover:bg-white/10"
            >
              <Paperclip size={18} />
            </button>

            <button
              type="button"
              className="rounded-xl p-2 transition hover:bg-white/10"
            >
              <Mic size={18} />
            </button>

          </div>

          <div className="flex items-center gap-3">

            <button
              type="button"
              className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm hover:bg-white/10"
            >
              GPT-5
              <ChevronDown size={16} />
            </button>

            <button
              type="button"
              onClick={handleSend}
              className="rounded-xl bg-cyan-500 p-3 text-white transition hover:bg-cyan-400"
            >
              <Send size={18} />
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}