import { Sparkles } from "lucide-react";

const actions = [
  "Build Resume",
  "Explain Code",
  "Interview Prep",
  "Analyze PDF",
];

export default function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">

      <div className="rounded-3xl border border-cyan-500/20 bg-cyan-500/10 p-6">
        <Sparkles
          size={40}
          className="text-cyan-300"
        />
      </div>

      <h2 className="mt-8 text-5xl font-black text-white">
        Nexora AI
      </h2>

      <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">
        Your intelligent career assistant.
        Ask questions, analyze documents,
        prepare interviews and build your future.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        {actions.map((action) => (
          <button
            key={action}
            className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm text-slate-300 transition hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-white"
          >
            {action}
          </button>
        ))}
      </div>

    </div>
  );
}