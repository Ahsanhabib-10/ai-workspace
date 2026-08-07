import EmptyState from "./conversation/EmptyState";
import Messages from "./conversation/Messages";

export default function Conversation() {
  const hasMessages = false;

  return (
    <div className="flex flex-1 overflow-hidden">
      {hasMessages ? <Messages /> : <EmptyState />}
    </div>
  );
}