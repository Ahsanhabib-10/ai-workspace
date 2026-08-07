import GlassCard from "@/components/common/glass-card/GlassCard";

import StatCard from "./StatCard";
import ActivityList from "./ActivityList";

export default function DashboardMockup() {
  return (
    <GlassCard className="p-8">

      <div className="grid grid-cols-2 gap-4">

        <StatCard
          title="AI Chats"
          value="1,248"
        />

        <StatCard
          title="Projects"
          value="24"
        />

        <StatCard
          title="Knowledge Files"
          value="312"
        />

        <StatCard
          title="Tasks"
          value="89%"
        />

      </div>

      <div className="mt-8">

        <ActivityList />

      </div>

    </GlassCard>
  );
}