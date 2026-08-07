import { Button } from "@/components/ui/button";

export default function QuickActions() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <h3 className="text-xl font-semibold text-white">
        Quick Actions
      </h3>

      <div className="mt-6 flex flex-wrap gap-4">
        <Button>New Chat</Button>
        <Button variant="outline">Upload PDF</Button>
        <Button variant="outline">Create Resume</Button>
      </div>
    </div>
  );
}