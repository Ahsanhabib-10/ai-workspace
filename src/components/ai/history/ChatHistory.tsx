"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import HistoryItem from "./HistoryItem";

interface Chat {
  id: string;
  title: string;
}

interface ChatHistoryProps {
  activeChatId: string | null;
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
}

export default function ChatHistory({
  activeChatId,
  onNewChat,
  onSelectChat,
}: ChatHistoryProps) {
  const [chats, setChats] =
    useState<Chat[]>([]);

  const [loading, setLoading] =
    useState(true);

  const loadChats = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/chats",
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
            "Failed to load chats."
        );
      }

      setChats(data.chats ?? []);
    } catch (error) {
      console.error(
        "Chat history error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChats();
  }, []);

  return (
    <div className="flex h-full min-h-0 flex-col">

      {/* New Chat */}

      <div className="p-4">
        <button
          type="button"
          onClick={onNewChat}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-cyan-500
            py-3
            font-semibold
            text-white
            transition
            hover:bg-cyan-400
          "
        >
          <Plus size={18} />

          New Chat
        </button>
      </div>

      {/* Chat List */}

      <div className="flex-1 space-y-2 overflow-y-auto px-4 pb-6">

        {loading ? (
          <p className="px-2 py-4 text-sm text-slate-500">
            Loading chats...
          </p>
        ) : chats.length === 0 ? (
          <p className="px-2 py-4 text-sm text-slate-500">
            No conversations yet.
          </p>
        ) : (
          chats.map((chat) => (
            <HistoryItem
              key={chat.id}
              title={chat.title}
              active={
                chat.id === activeChatId
              }
              onClick={() =>
                onSelectChat(chat.id)
              }
            />
          ))
        )}

      </div>
    </div>
  );
}