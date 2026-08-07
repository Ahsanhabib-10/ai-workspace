import {
  LayoutDashboard,
  BrainCircuit,
  Files,
  MessageSquare,
  BarChart3,
  Settings,
} from "lucide-react";

const menu = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    active: true,
  },
  {
    icon: BrainCircuit,
    label: "AI Assistant",
  },
  {
    icon: Files,
    label: "Knowledge",
  },
  {
    icon: MessageSquare,
    label: "Chat",
  },
  {
    icon: BarChart3,
    label: "Analytics",
  },
  {
    icon: Settings,
    label: "Settings",
  },
];

export default function PreviewSidebar() {
  return (
    <aside className="flex h-full w-56 flex-col border-r border-white/10 bg-white/5 p-4">

      <div className="mb-8 flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-white font-bold">
          N
        </div>

        <div>
          <p className="font-semibold text-white">
            Nexora
          </p>

          <p className="text-xs text-slate-400">
            AI Workspace
          </p>
        </div>

      </div>

      <div className="space-y-2">

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition-all duration-300 hover:translate-x-1 ${
                item.active
                  ? "bg-blue-500/15 text-white"
                  : "text-slate-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={18} />

              {item.label}
            </button>
          );
        })}

      </div>

    </aside>
  );
}