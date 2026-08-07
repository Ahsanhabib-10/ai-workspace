export default function PreviewStats() {
  return (
    <div className="grid grid-cols-3 gap-4">

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">

        <p className="text-xs text-slate-400">
          Knowledge Files
        </p>

        <h3 className="mt-2 text-2xl font-bold text-white">
          24
        </h3>

      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">

        <p className="text-xs text-slate-400">
          AI Responses
        </p>

        <h3 className="mt-2 text-2xl font-bold text-white">
          132
        </h3>

      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">

        <p className="text-xs text-slate-400">
          Accuracy
        </p>

        <h3 className="mt-2 text-2xl font-bold text-emerald-400">
          12.4 GB
        </h3>

      </div>

    </div>
  );
}