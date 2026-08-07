const cards = [
  {
    title: "AI Chats",
    value: "1,284",
  },
  {
    title: "Knowledge Files",
    value: "326",
  },
  {
    title: "Projects",
    value: "18",
  },
  {
    title: "Tasks Completed",
    value: "92%",
  },
];

export default function OverviewCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-cyan-500/40"
        >
          <p className="text-sm text-slate-400">
            {card.title}
          </p>

          <h2 className="mt-4 text-4xl font-bold text-white">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}