"use client";

import {
  Copy,
  Check,
  RotateCcw,
  User,
  Sparkles,
} from "lucide-react";

import { useState } from "react";

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
  const typing =
    assistant && message === "Typing...";

  const [copied, setCopied] =
    useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        message
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(
        "Copy error:",
        error
      );
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="flex items-start gap-4">

        {/* Avatar */}

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

        {/* Message Content */}

        <div className="min-w-0 flex-1">

          {/* Name */}

          <p className="font-semibold text-white">
            {assistant
              ? "Nexora AI"
              : "You"}
          </p>

          {/* Message */}

          {typing ? (
            <div className="mt-3">
              <TypingIndicator />
            </div>
          ) : (
            <div
              className={`mt-3 whitespace-pre-wrap leading-8 ${
                assistant
                  ? "text-slate-300"
                  : "text-slate-200"
              }`}
            >
              {message}
            </div>
          )}

          {/* AI Actions */}

          {assistant && !typing && (
            <div className="mt-5 flex items-center gap-3">

              {/* Copy */}

              <button
                type="button"
                onClick={handleCopy}
                aria-label={
                  copied
                    ? "Copied"
                    : "Copy response"
                }
                className="
                  rounded-lg
                  border
                  border-white/10
                  p-2
                  text-slate-400
                  transition
                  hover:bg-white/10
                  hover:text-white
                "
              >
                {copied ? (
                  <Check size={16} />
                ) : (
                  <Copy size={16} />
                )}
              </button>

              {/* Regenerate */}

              <button
                type="button"
                disabled
                aria-label="Regenerate response"
                title="Regenerate will be added next"
                className="
                  cursor-not-allowed
                  rounded-lg
                  border
                  border-white/10
                  p-2
                  text-slate-600
                  opacity-60
                "
              >
                <RotateCcw size={16} />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}