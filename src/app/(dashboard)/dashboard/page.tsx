import { redirect } from "next/navigation";
import { auth } from "@/auth";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import OverviewCards from "@/components/dashboard/OverviewCards";
import RecentActivity from "@/components/dashboard/RecentActivity";
import QuickActions from "@/components/dashboard/QuickActions";

export default async function DashboardPage() {
  const session = await auth();

  // User is not logged in
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <p className="text-sm text-slate-500">
          Welcome back
        </p>

        <h1 className="mt-1 text-3xl font-bold text-white">
          {session.user.name || "User"}
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          {session.user.email}
        </p>
      </div>

      <OverviewCards />

      <div className="mt-8 grid gap-8 xl:grid-cols-2">
        <RecentActivity />
        <QuickActions />
      </div>
    </DashboardLayout>
  );
}