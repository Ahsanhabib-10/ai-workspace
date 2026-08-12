"use client";

import { useEffect, useRef } from "react";
import MessageBubble from "../MessageBubble";

interface Source {
  documentId: string;
  fileName: string;
  chunkIndex: number;
  score: number;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
}

interface MessagesProps {
  messages: Message[];
  isTyping: boolean;
}

export default function Messages({
  messages,
  isTyping,
}: MessagesProps) {
  const bottomRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  return (
    <div className="flex h-full flex-col overflow-y-auto px-10 py-10">
      <div className="space-y-10">

        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className="space-y-4"
          >
            <MessageBubble
              role={message.role}
              message={message.content}
            />

            {message.role === "assistant" &&
              message.sources &&
              message.sources.length > 0 && (
                <div className="ml-12 max-w-2xl">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Sources
                  </p>

                  <div className="space-y-2">
                    {message.sources.map(
                      (source, sourceIndex) => (
                        <div
                          key={`${source.documentId}-${source.chunkIndex}-${sourceIndex}`}
                          className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition hover:border-cyan-400/20 hover:bg-white/[0.05]"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium text-slate-200">
                                {source.fileName}
                              </p>

                              <p className="mt-1 text-xs text-slate-500">
                                Document chunk{" "}
                                {source.chunkIndex + 1}
                              </p>
                            </div>

                            <span className="shrink-0 rounded-full bg-cyan-400/10 px-2.5 py-1 text-xs font-medium text-cyan-300">
                              {Math.round(
                                source.score * 100
                              )}
                                % match
                            </span>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
          </div>
        ))}

        {isTyping && (
          <MessageBubble
            role="assistant"
            message="Typing..."
          />
        )}

        <div ref={bottomRef} />

      </div>
    </div>
  );
}