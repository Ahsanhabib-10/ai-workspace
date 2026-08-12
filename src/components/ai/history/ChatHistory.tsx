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
  refreshKey?: number;
}

export default function ChatHistory({
  activeChatId,
  onNewChat,
  onSelectChat,
  refreshKey = 0,
}: ChatHistoryProps) {
  const [chats, setChats] = useState<Chat[]>([]);

  const [loading, setLoading] = useState(true);

  // --------------------------------
  // Load Chats
  // --------------------------------

  const loadChats = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/chats", {
        method: "GET",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to load chats."
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

  // --------------------------------
  // Rename Chat
  // --------------------------------

  const handleRenameChat = async (
    chatId: string,
    currentTitle: string
  ) => {
    const newTitle = window.prompt(
      "Rename chat:",
      currentTitle
    );

    if (newTitle === null) {
      return;
    }

    const cleanTitle = newTitle.trim();

    if (!cleanTitle) {
      return;
    }

    try {
      const response = await fetch(
        `/api/chats/${chatId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: cleanTitle,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to rename chat."
        );
      }

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === chatId
            ? {
                ...chat,
                title:
                  data.chat?.title ??
                  cleanTitle,
              }
            : chat
        )
      );
    } catch (error) {
      console.error(
        "Rename chat error:",
        error
      );
    }
  };

  // --------------------------------
  // Delete Chat
  // --------------------------------

  const handleDeleteChat = async (
    chatId: string
  ) => {
    try {
      const response = await fetch(
        `/api/chats/${chatId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to delete chat."
        );
      }

      setChats((prev) =>
        prev.filter(
          (chat) => chat.id !== chatId
        )
      );

      if (chatId === activeChatId) {
        onNewChat();
      }
    } catch (error) {
      console.error(
        "Delete chat error:",
        error
      );
    }
  };

  // --------------------------------
  // Initial Load + Refresh
  // --------------------------------

  useEffect(() => {
    loadChats();
  }, [refreshKey]);

  // --------------------------------
  // UI
  // --------------------------------

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
              onDelete={() =>
                handleDeleteChat(chat.id)
              }
              onRename={() =>
                handleRenameChat(
                  chat.id,
                  chat.title
                )
              }
            />
          ))
        )}

      </div>
    </div>
  );
}