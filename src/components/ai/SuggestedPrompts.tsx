const prompts = [
  "Summarize my PDF",
  "Build my Resume",
  "Prepare Interview",
  "Explain this Code",
];

export default function SuggestedPrompts() {
  return (
    <div className="flex flex-wrap gap-3 border-b border-white/10 p-6">
      {prompts.map((prompt) => (
        <button
          key={prompt}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-white"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}