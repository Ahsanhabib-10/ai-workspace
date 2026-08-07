const activities = [
  "Resume improved with AI",
  "Knowledge base updated",
  "Project roadmap generated",
  "Lecture notes summarized",
];

export default function ActivityList() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

      <h3 className="text-lg font-semibold text-white">
        Recent Activity
      </h3>

      <div className="mt-5 space-y-4">

        {activities.map((activity) => (
          <div
            key={activity}
            className="flex items-center gap-3"
          >
            <div className="h-2 w-2 rounded-full bg-cyan-400" />

            <p className="text-sm text-slate-300">
              {activity}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}