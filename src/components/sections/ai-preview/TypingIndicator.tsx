export default function TypingIndicator() {
  return (
    <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">

      <p className="text-sm text-cyan-300">
        Nexora AI
      </p>

      <div className="mt-3 flex gap-2">

        <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" />

        <span
          className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"
          style={{ animationDelay: "0.2s" }}
        />

        <span
          className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"
          style={{ animationDelay: "0.4s" }}
        />

      </div>

    </div>
  );
}