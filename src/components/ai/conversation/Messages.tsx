"use client";

import { useEffect, useRef } from "react";

import MessageBubble from "../MessageBubble";

interface MessagesProps {
  messages: {
    role: "user" | "assistant";
    content: string;
  }[];
  isTyping: boolean;
}

export default function Messages({
  messages,
  isTyping,
}: MessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  return (
    <div className="flex h-full flex-col overflow-y-auto px-10 py-10">

      <div className="space-y-10">

        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            role={message.role}
            message={message.content}
          />
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