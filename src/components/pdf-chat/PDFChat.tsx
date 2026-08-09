"use client";

import { useEffect, useRef, useState } from "react";
import {
  FileText,
  Send,
  Sparkles,
  User,
  Loader2,
} from "lucide-react";

import PDFUpload from "./PDFUpload";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function PDFChat() {
  const [pdfText, setPdfText] = useState("");
  const [fileName, setFileName] = useState("");
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Reference for the latest Nexora AI response
  const latestAssistantRef =
    useRef<HTMLDivElement>(null);

  // Scroll to the beginning of the latest AI response
  useEffect(() => {
    if (messages.length === 0) return;

    const lastMessage =
      messages[messages.length - 1];

    if (lastMessage.role === "assistant") {
      setTimeout(() => {
        latestAssistantRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 50);
    }
  }, [messages]);

  const handleTextExtracted = (
    text: string,
    name: string
  ) => {
    setPdfText(text);
    setFileName(name);
    setMessages([]);
  };

  const handleAsk = async () => {
    if (
      !question.trim() ||
      !pdfText ||
      isLoading
    ) {
      return;
    }

    const userQuestion = question.trim();

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
        "/api/pdf-chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pdfText,
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
        },
      ]);
    } catch (error) {
      console.error(
        "PDF chat error:",
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
    <div className="space-y-6">

      {/* Upload */}
      {!pdfText ? (
        <PDFUpload
          onTextExtracted={
            handleTextExtracted
          }
        />
      ) : (
        <>
          {/* Uploaded PDF */}
          <div className="flex items-center justify-between rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.04] px-5 py-4">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10">
                <FileText
                  size={20}
                  className="text-cyan-300"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  {fileName}
                </p>

                <p className="text-xs text-slate-500">
                  Document loaded
                </p>
              </div>

            </div>

            <button
              type="button"
              onClick={() => {
                setPdfText("");
                setFileName("");
                setMessages([]);
              }}
              className="rounded-xl border border-white/10 px-4 py-2 text-xs text-slate-400 transition hover:bg-white/10 hover:text-white"
            >
              Change PDF
            </button>

          </div>

          {/* Messages */}
          <div className="min-h-[420px] rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 lg:p-8">

            {messages.length === 0 ? (
              <div className="flex min-h-[360px] flex-col items-center justify-center text-center">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
                  <Sparkles
                    size={28}
                    className="text-cyan-300"
                  />
                </div>

                <h2 className="mt-6 text-2xl font-bold text-white">
                  Chat with your PDF
                </h2>

                <p className="mt-3 max-w-lg text-sm leading-7 text-slate-500">
                  Ask Nexora anything about
                  the document. Your questions
                  will be answered using the
                  uploaded PDF.
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-3">

                  {[
                    "Summarize this document",
                    "What are the key points?",
                    "Explain this document simply",
                  ].map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() =>
                        setQuestion(prompt)
                      }
                      className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-slate-400 transition hover:border-cyan-400/30 hover:bg-cyan-400/5 hover:text-white"
                    >
                      {prompt}
                    </button>
                  ))}

                </div>

              </div>
            ) : (
              <div className="max-h-[520px] space-y-8 overflow-y-auto pr-2">

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
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                            assistant
                              ? "bg-cyan-400/10 text-cyan-300"
                              : "bg-violet-400/10 text-violet-300"
                          }`}
                        >
                          {assistant ? (
                            <Sparkles
                              size={18}
                            />
                          ) : (
                            <User
                              size={18}
                            />
                          )}
                        </div>

                        {/* Message */}
                        <div className="flex-1">

                          <p className="text-sm font-semibold text-white">
                            {assistant
                              ? "Nexora AI"
                              : "You"}
                          </p>

                          <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-400">
                            {message.content}
                          </p>

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

                    Nexora is reading the
                    document...

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
                onChange={(e) =>
                  setQuestion(
                    e.target.value
                  )
                }
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    !e.shiftKey
                  ) {
                    e.preventDefault();
                    handleAsk();
                  }
                }}
                rows={2}
                placeholder="Ask something about your PDF..."
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
              Press Enter to ask · Shift +
              Enter for a new line
            </p>

          </div>
        </>
      )}

    </div>
  );
}