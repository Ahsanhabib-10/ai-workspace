import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <main className="flex min-h-screen bg-[#030712] text-white">

      <Sidebar />

      <div className="flex min-h-screen flex-1 flex-col">

        <Topbar />

        <div className="flex-1 p-8">

          {children}

        </div>

      </div>

    </main>
  );
}