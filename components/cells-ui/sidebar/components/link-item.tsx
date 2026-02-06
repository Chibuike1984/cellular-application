"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { KeyboardEvent } from "react";
import type { SidebarConfig } from "../types/type";
import { checkActiveLink } from "../utils/link-utils";
import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

function LinkItem({ item }: Record<"item", SidebarConfig>) {
  const pathname = usePathname();
  const { open } = useSidebar();
  const router = useRouter();

  const name = item.name.toLowerCase();
  const isDashboard = name === "dashboard";
  const isSettingsPage = name === "settings";

  const isActive = item.slug && checkActiveLink({
    pathname,
    href: item.slug,
    exact: item.exact,
  });

  const handleKeyDown = (e: KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === " " && item.slug) {
      e.preventDefault();
      router.push(item.slug);
    }
  };

  const Icon = item.icon;
  const iconFill = isDashboard && !isActive ? "" : "currentColor";

  return (
    <SidebarMenuButton
      className={cn(isActive && "bg-neutral-black font-bold text-white")}
      tooltip={item.name}
      asChild
    >
      <Link
        href={item.slug || ""}
        aria-current={isActive ? "page" : undefined}
        prefetch={!isSettingsPage}
        onKeyDown={handleKeyDown}
      >
        <motion.div whileHover={{ scale: 1.1 }}>
          <Icon fill={iconFill} />
        </motion.div>
        <motion.span
          initial={{ x: 0 }}
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className={cn(open ? "md:block" : "md:hidden")}
        >
          {item.name}
        </motion.span>
      </Link>
    </SidebarMenuButton>
  );
}

export { LinkItem };
