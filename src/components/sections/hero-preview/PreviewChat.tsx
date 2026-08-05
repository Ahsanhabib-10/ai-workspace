export default function PreviewChat() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

      <div className="rounded-xl bg-blue-500/10 p-4">

        <p className="text-xs text-slate-400">
          You
        </p>

        <p className="mt-2 text-white">
          Explain Neural Networks.
        </p>

      </div>

      <div className="mt-5 rounded-xl bg-white/5 p-4">

        <p className="text-xs text-cyan-400">
          Nexora AI
        </p>

        <p className="mt-2 text-sm leading-7 text-slate-300">
          Neural Networks are machine learning models inspired by the
          human brain. They learn patterns from data and are widely used
          in computer vision, NLP and recommendation systems.
        </p>

      </div>

    </div>
  );
}