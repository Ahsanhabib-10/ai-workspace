import { Button } from "@/components/ui/button";

export default function AIContent() {
  return (
    <div>

      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
        AI Workspace
      </p>

      <h2 className="mt-5 text-4xl font-black text-white md:text-6xl">
        Ask AI.
        <br />
        Get Instant Answers.
      </h2>

      <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
        Search your documents, generate summaries,
        explain difficult concepts and let AI
        understand everything you upload.
      </p>

      <Button className="mt-10">
        Try AI Workspace
      </Button>

    </div>
  );
}