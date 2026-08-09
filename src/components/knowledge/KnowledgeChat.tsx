"use client";

import { useEffect, useRef, useState } from "react";
import {
  FileText,
  Loader2,
  Send,
  Sparkles,
  User,
} from "lucide-react";

interface Source {
  fileName: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
}

export default function KnowledgeChat() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Used to scroll to the beginning of the latest AI response
  const latestAssistantRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isLoading && messages.length > 0) {
      const lastMessage =
        messages[messages.length - 1];

      if (lastMessage.role === "assistant") {
        latestAssistantRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, [messages, isLoading]);

  const handleAsk = async () => {
    const userQuestion = question.trim();

    if (!userQuestion || isLoading) {
      return;
    }

    setQuestion("");

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userQuestion,
      },
    ]);

    setIsLoading(true);

    try {
      const response = await fetch(
        "/api/knowledge-chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: userQuestion,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to generate answer."
        );
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer,
          sources: data.sources || [],
        },
      ]);
    } catch (error) {
      console.error(
        "Knowledge chat error:",
        error
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "Something went wrong.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-center gap-3">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
          <Sparkles
            size={20}
            className="text-cyan-300"
          />
        </div>

        <div>
          <h2 className="text-lg font-bold text-white">
            Ask your knowledge
          </h2>

          <p className="text-xs text-slate-500">
            Nexora answers using your
            uploaded documents.
          </p>
        </div>

      </div>

      {/* Messages */}
      <div className="min-h-[320px] max-h-[520px] overflow-y-auto rounded-[2rem] border border-white/10 bg-white/[0.02] p-6">

        {messages.length === 0 ? (
          <div className="flex min-h-[270px] flex-col items-center justify-center text-center">

            <Sparkles
              size={30}
              className="text-cyan-300"
            />

            <h3 className="mt-5 text-xl font-bold text-white">
              Ask Nexora
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              Ask anything about the
              documents stored in your
              Knowledge Base.
            </p>

          </div>
        ) : (
          <div className="space-y-7">

            {messages.map(
              (message, index) => {
                const assistant =
                  message.role ===
                  "assistant";

                const isLatestAssistant =
                  assistant &&
                  index ===
                    messages.length - 1;

                return (
                  <div
                    key={index}
                    ref={
                      isLatestAssistant
                        ? latestAssistantRef
                        : null
                    }
                    className="flex items-start gap-4"
                  >

                    {/* Avatar */}
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                        assistant
                          ? "bg-cyan-400/10 text-cyan-300"
                          : "bg-violet-400/10 text-violet-300"
                      }`}
                    >
                      {assistant ? (
                        <Sparkles size={17} />
                      ) : (
                        <User size={17} />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">

                      {/* Name */}
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        {assistant
                          ? "Nexora AI"
                          : "You"}
                      </p>

                      {/* Message */}
                      <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-300">
                        {message.content}
                      </p>

                      {/* Sources */}
                      {assistant &&
                        message.sources &&
                        message.sources.length >
                          0 && (
                          <div className="mt-5">

                            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                              Sources
                            </p>

                            <div className="space-y-2">

                              {message.sources.map(
                                (
                                  source,
                                  sourceIndex
                                ) => (
                                  <div
                                    key={`${source.fileName}-${sourceIndex}`}
                                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] px-3 py-2.5"
                                  >

                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-cyan-400/10 bg-cyan-400/5">
                                      <FileText
                                        size={15}
                                        className="text-cyan-300"
                                      />
                                    </div>

                                    <div className="min-w-0">
                                      <p className="truncate text-xs font-medium text-slate-300">
                                        {source.fileName}
                                      </p>

                                      <p className="mt-0.5 text-[10px] text-slate-600">
                                        Knowledge document
                                      </p>
                                    </div>

                                  </div>
                                )
                              )}

                            </div>
                          </div>
                        )}

                    </div>

                  </div>
                );
              }
            )}

            {/* Loading */}
            {isLoading && (
              <div className="flex items-center gap-3 text-sm text-cyan-300">

                <Loader2
                  size={18}
                  className="animate-spin"
                />

                Nexora is thinking...

              </div>
            )}

          </div>
        )}

      </div>

      {/* Input */}
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-4">

        <div className="flex items-end gap-3">

          <textarea
            value={question}
            onChange={(event) =>
              setQuestion(
                event.target.value
              )
            }
            onKeyDown={(event) => {
              if (
                event.key === "Enter" &&
                !event.shiftKey
              ) {
                event.preventDefault();
                handleAsk();
              }
            }}
            rows={2}
            placeholder="Ask something about your knowledge..."
            className="min-h-[52px] flex-1 resize-none bg-transparent px-2 py-2 text-sm text-white outline-none placeholder:text-slate-600"
          />

          <button
            type="button"
            onClick={handleAsk}
            disabled={
              !question.trim() ||
              isLoading
            }
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500 text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isLoading ? (
              <Loader2
                size={18}
                className="animate-spin"
              />
            ) : (
              <Send size={18} />
            )}
          </button>

        </div>

        <p className="mt-2 px-2 text-xs text-slate-600">
          Press Enter to ask · Shift + Enter
          for a new line
        </p>

      </div>

    </div>
  );
}