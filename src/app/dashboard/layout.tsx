import Sidebar from "@/components/dashboard/sidebar";
import SidebarMobile from "@/components/dashboard/siderbarmobile";
import { requiredAdmin } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requiredAdmin();
  return (
    <div className="flex h-screen overflow-hidden text-white">
      <Sidebar name={user.name} />
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Sidebar mobile */}
        <SidebarMobile />

        <main className="flex-1 overflow-y-auto bg-app-background">
          <div className="container mx-auto px-4 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
