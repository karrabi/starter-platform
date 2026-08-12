import { ReactNode } from "react";

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { DashboardGuard } from "@/components/auth/dashboard-guard";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <DashboardGuard>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />

        <div className="flex flex-1 flex-col">
          <Header />

          <main className="flex-1 p-8">{children}</main>
        </div>
      </div>
    </DashboardGuard>
  );
}
