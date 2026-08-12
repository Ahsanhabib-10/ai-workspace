"use client";

import { useState } from "react";

import Conversation from "./Conversation";
import ChatInput from "./ChatInput";
import ChatHistory from "./history/ChatHistory";

import { Menu, X } from "lucide-react";

interface Source {
  documentId: string;
  fileName: string;
  chunkIndex: number;
  score: number;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
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

  const [historyRefresh, setHistoryRefresh] =
    useState(0);

  // --------------------------------
  // New Chat
  // --------------------------------

  const handleNewChat = () => {
    setMessages([]);
    setChatId(null);
  };

  // --------------------------------
  // Select existing chat
  // --------------------------------

  const handleSelectChat = async (
    selectedChatId: string
  ) => {
    setChatId(selectedChatId);
    setHistoryOpen(false);
    setIsTyping(true);

    try {
      const response = await fetch(
        `/api/chats/${selectedChatId}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to load chat."
        );
      }

      const loadedMessages =
        data.chat?.messages ?? [];

      setMessages(
        loadedMessages
          .filter(
            (message: {
              role: string;
              content: string;
            }) =>
              message.role === "user" ||
              message.role === "assistant"
          )
          .map(
            (message: {
              role: string;
              content: string;
            }) => ({
              role:
                message.role as
                  | "user"
                  | "assistant",
              content:
                message.content,
            })
          )
      );
    } catch (error) {
      console.error(
        "Load chat error:",
        error
      );

      setMessages([
        {
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "Failed to load this conversation.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // --------------------------------
  // Send message
  // --------------------------------

  const handleSend = async (
    text: string
  ) => {
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
      // Send message
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

      const data =
        await response.json();

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
      // Refresh history
      // --------------------------------

      setHistoryRefresh(
        (prev) => prev + 1
      );

      // --------------------------------
      // Prepare sources
      // --------------------------------

      const sources: Source[] =
        Array.isArray(data.sources)
          ? data.sources
              .filter(
                (source: {
                  documentId?: unknown;
                  fileName?: unknown;
                  chunkIndex?: unknown;
                  score?: unknown;
                }) =>
                  typeof source.documentId ===
                    "string" &&
                  typeof source.fileName ===
                    "string" &&
                  typeof source.chunkIndex ===
                    "number" &&
                  typeof source.score ===
                    "number"
              )
              .map(
                (source: {
                  documentId: string;
                  fileName: string;
                  chunkIndex: number;
                  score: number;
                }) => ({
                  documentId:
                    source.documentId,
                  fileName:
                    source.fileName,
                  chunkIndex:
                    source.chunkIndex,
                  score:
                    source.score,
                })
              )
          : [];

      // --------------------------------
      // Add AI response + sources
      // --------------------------------

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.answer ??
            "Sorry, I couldn't generate a response.",
          sources,
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

          <ChatHistory
            key={historyRefresh}
            activeChatId={chatId}
            onNewChat={handleNewChat}
            onSelectChat={handleSelectChat}
          />

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