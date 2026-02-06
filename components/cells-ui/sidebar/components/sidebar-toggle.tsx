"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { CircleChevronLeft } from "lucide-react";

function SidebarToggle() {
  const { toggleSidebar, state } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "-right-4 absolute z-9999 mt-2 hidden h-5 w-5 text-gray-400 md:block",
        state === "collapsed"
          ? "rotate-180 transition-transform duration-200"
          : "",
      )}
      onClick={toggleSidebar}
    >
      <CircleChevronLeft strokeWidth={1} />
    </Button>
  );
}

export { SidebarToggle };
