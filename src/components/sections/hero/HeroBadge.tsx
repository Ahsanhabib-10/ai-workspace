import { Sparkles } from "lucide-react";

export default function HeroBadge() {
  return (
    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 backdrop-blur-xl">

      <Sparkles
        size={15}
        className="text-cyan-300"
      />

      <span className="text-sm font-medium tracking-wide text-cyan-200">
        AI Powered Workspace
      </span>

    </div>
  );
}