import GlassCard from "@/components/common/glass-card/GlassCard";

import PreviewSidebar from "./PreviewSidebar";
import PreviewSearch from "./PreviewSearch";
import PreviewChat from "./PreviewChat";
import PreviewDocuments from "./PreviewDocuments";
import PreviewStats from "./PreviewStats";
import PreviewActivity from "./PreviewActivity";

export default function HeroPreview() {
  return (
    <GlassCard className="overflow-hidden p-0">

      <div className="flex h-[640px]">

        <PreviewSidebar />

        <div className="flex flex-1 flex-col gap-5 p-6">

          <PreviewSearch />

          <PreviewChat />

          <PreviewDocuments />

          <PreviewActivity />

          <PreviewStats />

        </div>

      </div>

    </GlassCard>
  );
}