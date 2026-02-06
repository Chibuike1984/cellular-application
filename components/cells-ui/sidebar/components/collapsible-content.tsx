"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { checkActiveLink } from "../utils/link-utils";

import type { KeyboardEvent } from "react";
import type { SidebarItem } from "../types/type";
import { CollapsibleContent } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

interface Props extends Record<"subItem", SidebarItem[]> {}

function CellsCollapsibleContent({ subItem }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <CollapsibleContent className="overflow-hidden transition-all duration-300 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
      <SidebarMenuSub className="py-1">
        {subItem.map((item) => {
          const isSubLinkActive = checkActiveLink({
            pathname,
            href: item.slug,
          });

          const handleKeyDown = (e: KeyboardEvent<HTMLAnchorElement>) => {
            if (e.key === " ") {
              e.preventDefault();
              router.push(item.slug);
            }
          };

          return (
            <SidebarMenuSubItem key={item.name}>
              <SidebarMenuSubButton
                className={cn(
                  isSubLinkActive
                    ? "bg-orange-25 font-bold text-gray-600"
                    : "transition-colors duration-200 hover:bg-gray-100",
                )}
                asChild
              >
                <Link
                  onKeyDown={handleKeyDown}
                  href={item.slug}
                  className="flex items-center gap-2"
                >
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <item.icon className="h-4 w-4" />
                  </motion.div>
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {item.name}
                  </motion.span>
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          );
        })}
      </SidebarMenuSub>
    </CollapsibleContent>
  );
}

export { CellsCollapsibleContent };
