import {
  Copy,
  RotateCcw,
  User,
  Sparkles,
} from "lucide-react";

import TypingIndicator from "./conversation/TypingIndicator";

interface MessageBubbleProps {
  role: "user" | "assistant";
  message: string;
}

export default function MessageBubble({
  role,
  message,
}: MessageBubbleProps) {
  const assistant = role === "assistant";
  const typing = assistant && message === "Typing...";

  return (
    <div className="mx-auto w-full max-w-5xl">

      <div className="flex items-start gap-4">

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
            assistant
              ? "bg-cyan-500/15 text-cyan-300"
              : "bg-violet-500/15 text-violet-300"
          }`}
        >
          {assistant ? (
            <Sparkles size={20} />
          ) : (
            <User size={20} />
          )}
        </div>

        <div className="flex-1">

          <p className="font-semibold text-white">
            {assistant ? "Nexora AI" : "You"}
          </p>

          {typing ? (
            <TypingIndicator />
          ) : (
            <p className="mt-3 whitespace-pre-wrap leading-8 text-slate-300">
              {message}
            </p>
          )}

          {assistant && !typing && (
            <div className="mt-5 flex gap-3">

<button
  onClick={() => navigator.clipboard.writeText(message)}
  className="rounded-lg border border-white/10 p-2 transition hover:bg-white/10"
>
  <Copy size={16} />
</button>

              <button className="rounded-lg border border-white/10 p-2 transition hover:bg-white/10">
                <RotateCcw size={16} />
              </button>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}