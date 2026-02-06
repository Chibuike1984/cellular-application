"use client";

import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { SidebarToggle } from "@/components/cells-ui/sidebar/components/sidebar-toggle";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const LOGO_IMAGE = {
  src: "/images/cells.png",
  alt: "Cells - Hospitality Management System",
};

function SideBarHeader() {
  const { state } = useSidebar();

  return (
    <SidebarMenuItem
      className={cn(
        "relative mt-1 mb-4 flex h-fit w-full items-center justify-center",
      )}
    >
      <SidebarMenuButton
        className={cn(
          "hover:bg-transparent focus-visible:ring-primary",
          "rounded-none transition-opacity hover:opacity-80",
          "relative h-5 w-17.5",
          state === "collapsed" ? "hidden" : "flex",
        )}
      >
        <Link
          href="/dashboard"
          aria-label="Return to dashboard home"
          prefetch={false}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.currentTarget.click();
            }
          }}
        >
          <Image
            {...LOGO_IMAGE}
            priority
            quality={80}
            fill
            sizes="200px"
            className={cn("object-contain motion-safe:animate-fade-in")}
          />
        </Link>
      </SidebarMenuButton>
      <SidebarToggle />
    </SidebarMenuItem>
  );
}

export { SideBarHeader };
