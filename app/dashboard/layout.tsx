import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/dashboard/_components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <AppSidebar />
            <main className="flex-1 p-4">{children}</main>
        </div>
    </SidebarProvider>
    
  );
}