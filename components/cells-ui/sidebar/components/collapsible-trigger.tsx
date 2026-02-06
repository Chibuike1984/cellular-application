"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import type { SidebarItem } from "../types/type";
import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import { CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface Props extends SidebarItem {
  subItem: string[];
}

function CellsCollapsibleTrigger({ icon: Icon, name, subItem }: Props) {
  const { open } = useSidebar();
  const pathname = usePathname();
  const subLinkPath = pathname.split("/")[2];

  const isSubLinkActive = subItem.some((link) => link.includes(subLinkPath));

  return (
    <CollapsibleTrigger asChild>
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <SidebarMenuButton
          className={cn(
            "group-hover/menu-item:bg-sidebar-accent group-hover/menu-item:text-sidebar-accent-foreground group-data-[state=open]/collapsible:bg-neutral-black group-data-[state=open]/collapsible:text-white",
            isSubLinkActive ? "bg-neutral-black text-white" : "",
          )}
          tooltip={name}
        >
          <motion.div whileHover={{ scale: 1.1 }}>
            <Icon />
          </motion.div>
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={cn(open ? "md:block" : "md:hidden")}
          >
            {name}
          </motion.span>
          <motion.div
            className="ml-auto"
            animate={{
              rotate: 0,
            }}
            transition={{ type: "spring", stiffness: 300 }}
            variants={{
              open: { rotate: 180 },
              closed: { rotate: 0 },
            }}
          >
            <ChevronDown
              strokeWidth={1}
              className={cn(
                "ml-auto transition-transform duration-500 group-data-[state=open]/collapsible:rotate-180",
                open ? "md:block" : "md:hidden",
              )}
            />
          </motion.div>
        </SidebarMenuButton>
      </motion.div>
    </CollapsibleTrigger>
  );
}

export { CellsCollapsibleTrigger };
