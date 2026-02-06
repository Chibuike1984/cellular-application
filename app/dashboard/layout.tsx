import { AppSidebar } from "@/components/cells-ui/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="relative bg-inherit">
        <div className="min-h-screen">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
