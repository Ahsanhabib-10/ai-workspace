const activities = [
  "Resume analyzed by AI",
  "New PDF added to Knowledge Base",
  "Interview session completed",
  "Project roadmap generated",
];

export default function RecentActivity() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <h3 className="text-xl font-semibold text-white">
        Recent Activity
      </h3>

      <div className="mt-6 space-y-4">
        {activities.map((activity) => (
          <div
            key={activity}
            className="flex items-center gap-3"
          >
            <div className="h-2 w-2 rounded-full bg-cyan-400" />

            <p className="text-slate-300">
              {activity}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}