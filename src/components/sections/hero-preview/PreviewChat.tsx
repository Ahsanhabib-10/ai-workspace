export default function PreviewChat() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

      <div className="rounded-xl bg-blue-500/10 p-4">

        <p className="text-xs text-slate-400">
          You
        </p>

        <p className="mt-2 text-white">
          Summarize my AI lecture notes.
        </p>

      </div>

      <div className="mt-5 rounded-xl border border-cyan-500/10 bg-gradient-to-br from-cyan-500/5 to-transparent p-4">

        <p className="text-xs text-cyan-400">
          Nexora AI
        </p>

        <p className="mt-2 text-sm leading-7 text-slate-300">
          I analyzed your uploaded notes and created a concise summary with key concepts, examples, and important exam questions.
        </p>

      </div>

    </div>
  );
}