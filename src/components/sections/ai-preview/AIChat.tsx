import GlassCard from "@/components/common/glass-card/GlassCard";
import PromptSuggestions from "./PromptSuggestions";
import TypingIndicator from "./TypingIndicator";

export default function AIChat() {
  return (
    <GlassCard className="relative overflow-hidden p-8">

      <input
        type="text"
        placeholder="Ask Nexora AI anything..."
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
      />
        <div
  className="
    absolute
    right-0
    top-0
    h-52
    w-52
    rounded-full
    bg-cyan-500/10
    blur-3xl
  "
/>

      <PromptSuggestions />

      <div className="mt-8 rounded-2xl border border-cyan-500/10 bg-cyan-500/5 p-5">

        <p className="text-sm text-cyan-300">
          You
        </p>

        <p className="mt-2 text-white">
          Summarize my AI lecture notes.
        </p>

      </div>
        <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">

  <p className="text-sm font-medium text-emerald-300">
    Nexora AI
  </p>

  <p className="mt-3 leading-7 text-slate-200">
    Your lecture has been analyzed successfully.
    I found:
  </p>

  <ul className="mt-4 space-y-2 text-sm text-slate-300">

    <li>• 12 Important Concepts</li>

    <li>• 8 Exam Questions</li>

    <li>• 5 Definitions</li>

    <li>• 3 Practice Examples</li>

  </ul>

</div>

      <TypingIndicator />

<div className="mt-6 flex justify-end">

  <button
    className="
      rounded-xl
      bg-gradient-to-r
      from-cyan-500
      to-blue-600
      px-5
      py-3
      text-sm
      font-semibold
      text-white
      transition-all
      duration-300
      hover:scale-105
    "
  >
    Generate Again
  </button>

</div>

    </GlassCard>
  );
}