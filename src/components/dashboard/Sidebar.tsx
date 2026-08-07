import Link from "next/link";
import {
  LayoutDashboard,
  BrainCircuit,
  FileText,
  Database,
  FolderKanban,
  Settings,
} from "lucide-react";

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
    <aside className="hidden w-72 border-r border-white/10 bg-white/5 backdrop-blur-xl lg:block">

      <div className="p-8">

        <h1 className="text-2xl font-black">
          Nexora AI
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Intelligent Workspace
        </p>

      </div>

      <nav className="px-4">

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

    </aside>
  );
}