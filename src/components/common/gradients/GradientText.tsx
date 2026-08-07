import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
}

export default function GradientText({
  children,
  className,
}: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-500 bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </span>
  );
}