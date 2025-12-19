import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/dashboard/_components/app-sidebar";
import { DashboardHeader } from "@/app/dashboard/_components/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/40">
        {/* Sidebar */}
        <AppSidebar />

        {/* Right Content */}
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <DashboardHeader />

          {/* Main Content */}
          <main className="flex-1 px-4 py-4 md:px-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
