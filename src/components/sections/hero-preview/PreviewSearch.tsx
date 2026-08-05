import { Search } from "lucide-react";

export default function PreviewSearch() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">

      <div className="flex items-center gap-3">

        <Search
          size={18}
          className="text-slate-500"
        />

        <span className="text-sm text-slate-400">
          Search anything...
        </span>

      </div>

    </div>
  );
}