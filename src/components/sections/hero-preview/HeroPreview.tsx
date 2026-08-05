import GlassCard from "@/components/common/glass-card/GlassCard";

import PreviewSidebar from "./PreviewSidebar";
import PreviewSearch from "./PreviewSearch";
import PreviewChat from "./PreviewChat";
import PreviewStats from "./PreviewStats";

export default function HeroPreview() {
  return (
    <GlassCard className="overflow-hidden p-0">

      <div className="flex h-[560px]">

        <PreviewSidebar />

        <div className="flex flex-1 flex-col p-6">

          <PreviewSearch />

          <div className="mt-6">
            <PreviewStats />
          </div>

          <div className="mt-6 flex-1">
            <PreviewChat />
          </div>

        </div>

      </div>

    </GlassCard>
  );
}