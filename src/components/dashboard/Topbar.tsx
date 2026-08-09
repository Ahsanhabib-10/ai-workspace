"use client";

import { signOut } from "next-auth/react";
import {
  Bell,
  Search,
  LogOut,
  User,
} from "lucide-react";

export default function Topbar() {
  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/login",
    });
  };

  return (
    <header className="flex items-center justify-between border-b border-white/10 bg-[#030712]/80 px-8 py-4 backdrop-blur-xl">

      {/* Search */}
      <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3">

        <Search
          size={18}
          className="text-slate-400"
        />

        <input
          placeholder="Search anything..."
          className="w-64 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
        />

      </div>

      {/* Right side */}
      <div className="flex items-center gap-5">

        <button
          type="button"
          className="rounded-xl p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
          aria-label="Notifications"
        >
          <Bell size={20} />
        </button>

        {/* User menu */}
        <div className="group relative">

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-black transition hover:scale-105"
            aria-label="User menu"
          >
            A
          </button>

          {/* Dropdown */}
          <div className="invisible absolute right-0 top-14 z-50 w-52 translate-y-2 rounded-2xl border border-white/10 bg-[#0b1220] p-2 opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">

            <div className="mb-2 border-b border-white/10 px-3 py-3">

              <div className="flex items-center gap-2">
                <User
                  size={16}
                  className="text-cyan-300"
                />

                <span className="text-sm font-medium text-white">
                  My Account
                </span>
              </div>

            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 transition hover:bg-red-400/10 hover:text-red-300"
            >
              <LogOut size={17} />

              Sign out
            </button>

          </div>

        </div>

      </div>

    </header>
  );
}