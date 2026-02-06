"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  useBreadcrumbs,
  useSetBreadcrumbs,
} from "@/lib/stores/breadcrumb-store";
import { Fragment, useEffect } from "react";

interface BreadcrumbProps {
  items?: string[]; // Optional items prop to override store
  shouldLink?: boolean;
  homeItem?: boolean; // Whether to include home item automatically
}

function CellsBreadcrumb({
  items,
  shouldLink = false,
  homeItem = false,
}: BreadcrumbProps) {
  const breadcrumbs = useBreadcrumbs();
  const setBreadcrumbs = useSetBreadcrumbs();

  // Sync props with store when items prop changes
  useEffect(() => {
    if (items) {
      const breadcrumbItems = items.map((item, index) => {
        const path = `/${
          items
            .slice(0, index + 1)
            .join("/")
            .toLowerCase()
        }`;
        return { label: item, href: path };
      });

      setBreadcrumbs(
        homeItem
          ? [{ label: "Home", href: "/" }, ...breadcrumbItems]
          : breadcrumbItems,
      );
    }
  }, [items, homeItem, setBreadcrumbs]);

  // Use store breadcrumbs if no items prop provided
  const displayItems = items && homeItem
    ? ["Home", ...items]
    : (items ?? breadcrumbs);

  if (displayItems.length === 0) {
    return null;
  }

  const currentPage = displayItems.at(-1);
  const parentItems = displayItems.slice(0, -1);

  return (
    <Breadcrumb>
      <BreadcrumbList className="font-medium text-lg">
        {parentItems.map((item, index) => {
          const isObjectItem = typeof item !== "string";
          const title = isObjectItem ? item.label : item;
          const path = isObjectItem ? item.href : `/${
            displayItems
              .slice(0, index + 1)
              .map((i) =>
                typeof i === "string" ? i.toLowerCase() : i.label.toLowerCase()
              )
              .join("/")
          }`;

          return (
            <Fragment key={isObjectItem ? item.label : item}>
              <BreadcrumbItem>
                {shouldLink
                  ? (
                    <BreadcrumbLink className="text-gray-400" href={path}>
                      {title}
                    </BreadcrumbLink>
                  )
                  : (
                    <BreadcrumbPage className="text-gray-400">
                      {title}
                    </BreadcrumbPage>
                  )}
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </Fragment>
          );
        })}
        <BreadcrumbItem>
          <BreadcrumbPage className="font-bold text-neutral-black">
            {typeof currentPage === "string" ? currentPage : currentPage?.label}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export { CellsBreadcrumb };
