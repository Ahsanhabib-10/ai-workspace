import EmptyState from "./conversation/EmptyState";
import Messages from "./conversation/Messages";

interface ConversationProps {
  messages: {
    role: "user" | "assistant";
    content: string;
  }[];
  isTyping: boolean;
}

export default function Conversation({
  messages,
  isTyping,
}: ConversationProps) {
  return (
    <div className="flex flex-1 overflow-hidden">
      {messages.length === 0 ? (
        <EmptyState />
      ) : (
        <Messages
          messages={messages}
          isTyping={isTyping}
        />
      )}
    </div>
  );
}