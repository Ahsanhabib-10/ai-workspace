import { Search, Sparkles } from "lucide-react";

export default function PreviewSearch() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <Search
            size={18}
            className="text-slate-500"
          />

          <span className="text-sm text-slate-400">
            Search documents, AI chats...
          </span>

        </div>

        <div className="flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-1">

          <Sparkles
            size={14}
            className="text-cyan-300"
          />

          <span className="text-xs text-cyan-300">
            AI Ready
          </span>

        </div>

      </div>

    </div>
  );
}