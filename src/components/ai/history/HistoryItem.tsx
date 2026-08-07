interface HistoryItemProps {
  title: string;
}

export default function HistoryItem({
  title,
}: HistoryItemProps) {
  return (
    <button
      className="
      w-full
      rounded-xl
      px-4
      py-3
      text-left
      text-sm
      text-slate-300
      transition
      hover:bg-white/10
      hover:text-white
      "
    >
      {title}
    </button>
  );
}