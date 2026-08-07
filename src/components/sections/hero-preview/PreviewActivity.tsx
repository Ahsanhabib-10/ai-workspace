import {
  CheckCircle2,
  BrainCircuit,
  FileText,
} from "lucide-react";

const activities = [
  {
    icon: FileText,
    title: "Lecture Notes.pdf",
    status: "Uploaded",
  },
  {
    icon: BrainCircuit,
    title: "AI Summary Generated",
    status: "Completed",
  },
  {
    icon: CheckCircle2,
    title: "Knowledge Base Updated",
    status: "Synced",
  },
];

export default function PreviewActivity() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

      <h3 className="text-sm font-semibold text-white">
        Recent Activity
      </h3>

      <div className="mt-5 space-y-4">

        {activities.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">

                <div className="rounded-lg bg-cyan-500/10 p-2">
                  <Icon
                    size={16}
                    className="text-cyan-300"
                  />
                </div>

                <div>

                  <p className="text-sm text-white">
                    {item.title}
                  </p>

                  <p className="text-xs text-slate-400">
                    {item.status}
                  </p>

                </div>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}