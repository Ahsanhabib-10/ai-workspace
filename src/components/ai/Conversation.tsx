import MessageBubble from "./MessageBubble";

export default function Conversation() {
  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-6">
      <MessageBubble
        role="assistant"
        message="👋 Hi Ahsan! I'm Nexora AI. How can I help you today?"
      />

      <MessageBubble
        role="user"
        message="Help me prepare for my AI interview."
      />
    </div>
  );
}