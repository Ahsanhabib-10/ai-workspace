import MessageBubble from "../MessageBubble";

export default function Messages() {
  return (
    <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-8">

      <MessageBubble
        role="assistant"
        message="👋 Welcome back! I'm Nexora AI."
      />

      <MessageBubble
        role="user"
        message="Help me become an AI Engineer."
      />

      <MessageBubble
        role="assistant"
        message="Absolutely! I can help you with roadmaps, coding, interviews, projects and resume building."
      />

    </div>
  );
}