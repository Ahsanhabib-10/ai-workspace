const prompts = [
  "Summarize my notes",
  "Explain Neural Networks",
  "Create Resume",
  "Find AI Project Ideas",
];

export default function PromptSuggestions() {
  return (
    <div className="mt-6 flex flex-wrap gap-3">

      {prompts.map((prompt) => (
        <button
          key={prompt}
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-white"
        >
          {prompt}
        </button>
      ))}

    </div>
  );
}