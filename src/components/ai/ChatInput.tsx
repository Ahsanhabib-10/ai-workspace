import { Send } from "lucide-react";

export default function ChatInput() {
  return (
    <div className="border-t border-white/10 p-6">
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
        <input
          type="text"
          placeholder="Ask Nexora anything..."
          className="flex-1 bg-transparent px-2 text-white outline-none placeholder:text-slate-500"
        />

        <button className="rounded-xl bg-cyan-500 p-3 transition hover:bg-cyan-400">
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}