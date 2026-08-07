import { Paperclip, Mic, Send, ChevronDown } from "lucide-react";

export default function ChatInput() {
  return (
    <div className="border-t border-white/10 bg-[#030712]/70 p-5 backdrop-blur-xl">

      <div className="rounded-3xl border border-white/10 bg-white/5 p-4">

        <textarea
          rows={1}
          placeholder="Ask Nexora anything..."
          className="w-full resize-none bg-transparent text-white outline-none placeholder:text-slate-500"
        />

        <div className="mt-4 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <button className="rounded-xl p-2 transition hover:bg-white/10">
              <Paperclip size={18} />
            </button>

            <button className="rounded-xl p-2 transition hover:bg-white/10">
              <Mic size={18} />
            </button>

          </div>

          <div className="flex items-center gap-3">

            <button className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm hover:bg-white/10">
              GPT-5

              <ChevronDown size={16} />
            </button>

            <button className="rounded-xl bg-cyan-500 p-3 transition hover:bg-cyan-400">
              <Send size={18} />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}