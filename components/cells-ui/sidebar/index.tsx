"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import type { ComponentProps } from "react";

import { NavMain } from "./components/nav-main";
import { SideBarHeader } from "./components/sidebar-header";

function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const isMobile = useIsMobile();
  return (
    <Sidebar
      side={isMobile ? "right" : "left"}
      variant="sidebar"
      collapsible="icon"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SideBarHeader />
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain />
      </SidebarContent>
    </Sidebar>
  );
}

export { AppSidebar };
