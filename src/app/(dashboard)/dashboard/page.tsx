import DashboardLayout from "@/components/dashboard/DashboardLayout";
import OverviewCards from "@/components/dashboard/OverviewCards";
import RecentActivity from "@/components/dashboard/RecentActivity";
import QuickActions from "@/components/dashboard/QuickActions";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <h1 className="mb-8 text-4xl font-bold text-white">
        Welcome Back 👋
      </h1>

      <OverviewCards />

      <div className="mt-8 grid gap-8 xl:grid-cols-2">
        <RecentActivity />
        <QuickActions />
      </div>
    </DashboardLayout>
  );
}