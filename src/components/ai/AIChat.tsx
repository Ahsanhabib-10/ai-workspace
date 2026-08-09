
"use client";

import { useState } from "react";

import Conversation from "./Conversation";
import ChatInput from "./ChatInput";
import ChatHistory from "./history/ChatHistory";

import { Menu, X } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function AIChat() {
  const [historyOpen, setHistoryOpen] =
    useState(false);

  const [isTyping, setIsTyping] =
    useState(false);

  const [messages, setMessages] =
    useState<ChatMessage[]>([]);

  const [chatId, setChatId] =
    useState<string | null>(null);

  const handleSend = async (text: string) => {
    const cleanText = text.trim();

    if (!cleanText || isTyping) {
      return;
    }

    // --------------------------------
    // Add user message immediately
    // --------------------------------

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: cleanText,
      },
    ]);

    setIsTyping(true);

    try {
      // --------------------------------
      // Send message + current chatId
      // --------------------------------

      const response = await fetch(
        "/api/ai",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            question: cleanText,
            chatId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to get AI response."
        );
      }

      // --------------------------------
      // Save returned chatId
      // --------------------------------

      if (
        typeof data.chatId === "string"
      ) {
        setChatId(data.chatId);
      }

      // --------------------------------
      // Add AI response
      // --------------------------------

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.answer ??
            "Sorry, I couldn't generate a response.",
        },
      ]);
    } catch (error) {
      console.error(
        "Chat error:",
        error
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "Something went wrong while contacting the AI.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="relative flex h-full min-h-0 flex-1 overflow-hidden">

      {/* --------------------------------
          Chat History Sidebar
      -------------------------------- */}

      {historyOpen && (
        <div className="absolute inset-y-0 left-0 z-20 w-64 border-r border-white/10 bg-[#030712]">
          <ChatHistory />
        </div>
      )}

      {/* --------------------------------
          Main Chat Area
      -------------------------------- */}

      <div className="flex min-h-0 flex-1 flex-col">

        {/* Header */}

        <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-8 py-6">

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Nexora AI
            </p>

            <h1 className="mt-2 text-4xl font-black text-white">
              AI Assistant
            </h1>
          </div>

          <button
            type="button"
            onClick={() =>
              setHistoryOpen(
                (prev) => !prev
              )
            }
            className="rounded-xl border border-white/10 p-3 text-white transition hover:bg-white/10"
          >
            {historyOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>

        </div>

        {/* Conversation */}

        <div className="min-h-0 flex-1 overflow-hidden">
          <Conversation
            messages={messages}
            isTyping={isTyping}
          />
        </div>

        {/* Input */}

        <div className="shrink-0">
          <ChatInput
            onSend={handleSend}
          />
        </div>

      </div>
    </div>
  );
}

