import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-white/10 bg-[#030712]/80 px-8 backdrop-blur-xl">

      <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3">

        <Search
          size={18}
          className="text-slate-400"
        />

        <input
          placeholder="Search anything..."
          className="bg-transparent text-sm outline-none placeholder:text-slate-500"
        />

      </div>

      <div className="flex items-center gap-5">

        <Bell className="text-slate-300" />

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 font-bold">
          A
        </div>

      </div>

    </header>
  );
}