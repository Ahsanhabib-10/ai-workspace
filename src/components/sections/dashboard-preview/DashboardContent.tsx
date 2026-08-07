import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const points = [
  "Track AI usage in real time",
  "Manage projects from one place",
  "Organize your knowledge base",
  "Monitor productivity with analytics",
];

export default function DashboardContent() {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
        Dashboard
      </p>

      <h2 className="mt-5 text-4xl font-black text-white md:text-6xl">
        Everything
        <br />
        In One Dashboard.
      </h2>

      <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
        View your AI activity, projects, documents and insights
        from a single intelligent workspace.
      </p>

      <div className="mt-10 space-y-4">
        {points.map((point) => (
          <div key={point} className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-cyan-400" />
            <span className="text-slate-300">{point}</span>
          </div>
        ))}
      </div>

      <Button className="mt-10">
        Explore Dashboard
      </Button>
    </div>
  );
}