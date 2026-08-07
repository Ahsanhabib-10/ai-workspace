import {
  BrainCircuit,
  Database,
  LayoutDashboard,
  FileText,
  BarChart3,
  Sparkles,
} from "lucide-react";

import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: BrainCircuit,
    title: "AI Assistant",
    description:
      "Ask questions, generate ideas and interact with your own AI workspace.",
  },
  {
    icon: Database,
    title: "Knowledge Base",
    description:
      "Upload PDFs, notes and documents to build your intelligent second brain.",
  },
  {
    icon: LayoutDashboard,
    title: "Smart Dashboard",
    description:
      "Manage projects, files and productivity from one modern interface.",
  },
  {
    icon: FileText,
    title: "Resume Builder",
    description:
      "Generate professional resumes and improve them with AI feedback.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description:
      "Track usage, AI activity and workspace insights in real time.",
  },
  {
    icon: Sparkles,
    title: "Automation",
    description:
      "Save time with intelligent workflows and AI-powered productivity.",
  },
];

export default function FeatureGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      {features.map((feature) => (
        <FeatureCard
          key={feature.title}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}

    </div>
  );
}