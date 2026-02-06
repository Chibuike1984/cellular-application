"use client";

import { type KeyboardEvent, useState } from "react";
import { SIDEBAR_CONFIG } from "../config/sidebar-config";
import { CellsCollapsibleContent } from "./collapsible-content";
import { CellsCollapsibleTrigger } from "./collapsible-trigger";
import { LinkItem } from "./link-item";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Collapsible } from "@/components/ui/collapsible";

export function NavMain() {
  const [openCollapsible, setOpenCollapsible] = useState<string | null>(null);

  const handleToggle = (name: string) => {
    setOpenCollapsible(openCollapsible === name ? null : name);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, name: string) => {
    if ([" ", "Enter"].includes(e.key)) {
      e.preventDefault();
      setOpenCollapsible(openCollapsible === name ? null : name);
    }
  };

  return (
    <SidebarGroup>
      <SidebarMenu>
        {SIDEBAR_CONFIG.map((item) => {
          return (
            <Collapsible
              key={item.name}
              asChild
              defaultOpen={false}
              className="group/collapsible"
              open={openCollapsible === item.name}
              onOpenChange={handleToggle.bind(null, item.name)}
              onKeyDown={(e) => handleKeyDown(e, item.name)}
            >
              <SidebarMenuItem>
                {item.items?.length
                  ? (
                    <CellsCollapsibleTrigger
                      subItem={item.items.flatMap((ite) =>
                        ite.name.toLocaleLowerCase().replace(" ", "-")
                      )}
                      name={item.name}
                      icon={item.icon}
                      slug={item.slug || ""}
                    />
                  )
                  : <LinkItem item={item} />}
                {item.items?.length && (
                  <CellsCollapsibleContent subItem={item.items} />
                )}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
