"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  BrainCircuit,
  FileText,
  Database,
  FolderKanban,
  Settings,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";

const items = [
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: BrainCircuit,
    title: "AI Assistant",
    href: "/ai",
  },
  {
    icon: FileText,
    title: "Resume Builder",
    href: "/resume",
  },
  {
    icon: Database,
    title: "Knowledge Base",
    href: "/knowledge",
  },
  {
    icon: FolderKanban,
    title: "Projects",
    href: "/projects",
  },
  {
    icon: Settings,
    title: "Settings",
    href: "/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="flex min-h-screen w-72 flex-col border-r border-white/10 bg-[#030712]">

      {/* Brand */}
      <div className="p-8">
        <h1 className="text-2xl font-black text-white">
          Nexora AI
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Intelligent Workspace
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="mb-2 flex items-center gap-4 rounded-xl px-5 py-4 text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <Icon size={20} />

              {item.title}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-white/10 p-4">
        <button
          type="button"
          onClick={() =>
            signOut({
              callbackUrl: "/login",
            })
          }
          className="flex w-full items-center gap-4 rounded-xl px-5 py-4 text-slate-400 transition hover:bg-red-400/10 hover:text-red-300"
        >
          <LogOut size={20} />

          <span className="text-sm font-medium">
            Logout
          </span>
        </button>
      </div>

    </aside>
  );
}