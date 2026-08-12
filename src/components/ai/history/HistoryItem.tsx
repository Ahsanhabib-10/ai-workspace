"use client";

import {
  Pencil,
  Trash2,
} from "lucide-react";

interface HistoryItemProps {
  title: string;
  active?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
  onRename?: () => void;
}

export default function HistoryItem({
  title,
  active = false,
  onClick,
  onDelete,
  onRename,
}: HistoryItemProps) {
  return (
    <div
      className={`
        group
        flex
        w-full
        items-center
        gap-2
        rounded-xl
        transition
        ${
          active
            ? "bg-cyan-500/15"
            : "hover:bg-white/10"
        }
      `}
    >
      {/* Chat title */}

      <button
        type="button"
        onClick={onClick}
        className={`
          min-w-0
          flex-1
          truncate
          px-4
          py-3
          text-left
          text-sm
          transition
          ${
            active
              ? "text-cyan-300"
              : "text-slate-300 group-hover:text-white"
          }
        `}
      >
        {title}
      </button>

      {/* Rename */}
<button
  type="button"
  onClick={(event) => {
    event.preventDefault();
    event.stopPropagation();
    onRename?.();
  }}
  aria-label={`Rename ${title}`}
  className="
    mr-1
    rounded-lg
    p-2
    text-slate-400
    opacity-100
    transition
    hover:bg-cyan-500/10
    hover:text-cyan-300
  "
>
  <Pencil size={16} />
</button>

      {/* Delete */}

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onDelete?.();
        }}
        aria-label={`Delete ${title}`}
        className="
          mr-2
          rounded-lg
          p-2
          text-slate-500
          opacity-0
          transition
          hover:bg-red-500/10
          hover:text-red-400
          group-hover:opacity-100
        "
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}