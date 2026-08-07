import SuggestedPrompts from "./SuggestedPrompts";
import Conversation from "./Conversation";
import ChatInput from "./ChatInput";

export default function AIChat() {
  return (
    <div className="flex h-[calc(100vh-170px)] flex-col rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">

      <div className="border-b border-white/10 p-8">

        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
          Nexora AI
        </p>

        <h1 className="mt-3 text-4xl font-black text-white">
          AI Assistant
        </h1>

        <p className="mt-3 text-slate-400">
          Ask questions, summarize documents, build resumes and get career guidance.
        </p>

      </div>

      <SuggestedPrompts />

      <Conversation />

      <ChatInput />

    </div>
  );
}