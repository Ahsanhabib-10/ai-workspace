interface HistoryItemProps {
  title: string;
  active?: boolean;
  onClick?: () => void;
}

export default function HistoryItem({
  title,
  active = false,
  onClick,
}: HistoryItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full
        rounded-xl
        px-4
        py-3
        text-left
        text-sm
        transition
        ${
          active
            ? "bg-cyan-500/15 text-cyan-300"
            : "text-slate-300 hover:bg-white/10 hover:text-white"
        }
      `}
    >
      {title}
    </button>
  );
}