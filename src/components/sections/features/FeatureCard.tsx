import { LucideIcon } from "lucide-react";
import GlassCard from "@/components/common/glass-card/GlassCard";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
<GlassCard
  className="
    group
    relative
    h-full
    overflow-hidden
    p-8
    transition-all
    duration-500
    hover:-translate-y-2
    hover:border-cyan-500/30
  "
>

  {/* Glow Effect */}

  <div
    className="
      absolute
      -right-16
      -top-16
      h-40
      w-40
      rounded-full
      bg-cyan-500/10
      blur-3xl
      opacity-0
      transition-opacity
      duration-500
      group-hover:opacity-100
    "
  />

  {/* Icon */}

  <div
    className="
      mb-6
      flex
      h-14
      w-14
      items-center
      justify-center
      rounded-2xl
      bg-cyan-500/10
      transition-transform
      duration-500
      group-hover:scale-110
      group-hover:rotate-6
    "
  >

    <Icon
      size={28}
      className="text-cyan-300"
    />

  </div>

  <h3 className="text-2xl font-bold tracking-tight text-white">
    {title}
  </h3>

  <p className="mt-4 leading-7 text-slate-400">
    {description}
  </p>

</GlassCard>
  );
}