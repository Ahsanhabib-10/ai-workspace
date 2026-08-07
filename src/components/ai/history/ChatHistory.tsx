import { Plus } from "lucide-react";
import HistoryItem from "./HistoryItem";

const chats = [
  "Resume Review",
  "Interview Preparation",
  "Explain React Hooks",
  "Summarize AI Notes",
  "Career Roadmap",
];

export default function ChatHistory() {
  return (
    <div
      className="
      flex w-full
      border-r
      border-white/10
      bg-white/5
      lg:flex
      lg:flex-col
      "
    >
      <div className="p-6">

        <button
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

      <div className="flex-1 space-y-2 overflow-y-auto px-4 pb-6">

        {chats.map((chat) => (
          <HistoryItem
            key={chat}
            title={chat}
          />
        ))}

      </div>

    </div>
  );
}