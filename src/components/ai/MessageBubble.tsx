interface MessageBubbleProps {
  role: "user" | "assistant";
  message: string;
}

export default function MessageBubble({
  role,
  message,
}: MessageBubbleProps) {
  return (
    <div
      className={`max-w-2xl rounded-2xl px-5 py-4 ${
        role === "assistant"
          ? "bg-white/5 text-white"
          : "ml-auto bg-cyan-600 text-white"
      }`}
    >
      {message}
    </div>
  );
}