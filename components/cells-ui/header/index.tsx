"use client";

import {
  useBreadcrumbs,
  useLastBreadcrumb,
} from "@/lib/stores/breadcrumb-store";

import { CellsBreadcrumb } from "../breadcrumb/breadcrumb";
import { AIToggle } from "../ai-toggle";
import { cn } from "@/lib/utils";
import {
  SearchField,
  SearchIcon,
  SearchLabel,
  SearchProvider,
} from "../search";
import { useSearchHandler } from "@/lib/stores/header-store";

interface HeadTertiaryProps {
  /** Optional page title (used for search label accessibility) */
  title?: string;
  /** Custom placeholder for the search field */
  searchPlaceholder?: string;
}

/**
 * HeadTertiary
 *
 * Tertiary header used across dashboard pages.
 * Features:
 * - Responsive breadcrumb on left
 * - Search bar + AI toggle on right
 * - Dynamic, accessible search placeholder based on current page
 */
export function TopHeader({ title, searchPlaceholder }: HeadTertiaryProps) {
  const breadcrumbs = useBreadcrumbs();
  const lastBreadcrumb = useLastBreadcrumb();
  const searchHandler = useSearchHandler();

  // Smart placeholder: custom → current page → generic fallback
  const placeholder = searchPlaceholder ||
    (lastBreadcrumb
      ? `Search ${lastBreadcrumb.label.toLowerCase()}`
      : "Search");

  return (
    <header
      className={cn(
        "grid h-20 max-h-fit grid-cols-1 items-center gap-4",
        "md:grid-cols-6 md:px-10", // Larger padding on desktop
      )}
    >
      {/* Breadcrumbs - Left Side */}
      <div className="col-span-1 hidden md:col-span-3 md:block">
        {breadcrumbs.length > 0 && <CellsBreadcrumb />}
      </div>

      {/* Search + AI Toggle - Right Side */}
      <div className="col-span-1 flex items-center justify-end gap-4 md:col-span-3">
        <SearchProvider onSearch={searchHandler}>
          <SearchLabel className="sr-only">
            {title ? `Search ${title}` : "Search"}
          </SearchLabel>

          <div className="relative flex items-center">
            <SearchIcon clickable aria-label={placeholder} />
            <SearchField
              placeholder={placeholder}
              className="pl-10"
              aria-label={placeholder}
            />
          </div>
        </SearchProvider>

        <AIToggle />
      </div>
    </header>
  );
}
