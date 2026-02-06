import type { JSX, ReactNode } from "react";
import type { IconProps } from "@/features/assets/type";

interface SidebarItem {
  name: string;
  slug: string;
  icon: (opt: IconProps) => JSX.Element | ReactNode;
}

interface SidebarConfig extends Omit<SidebarItem, 'slug'> {
  exact?: boolean;
  slug?: string;
  items?: SidebarItem[];
}

interface LinkItemProp extends SidebarItem {
  isActive: boolean;
  href: string;
}

export type { LinkItemProp, SidebarConfig, SidebarItem };
