import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbState {
  breadcrumbs: BreadcrumbItem[];
}

interface BreadcrumbActions {
  setBreadcrumbs: (items: BreadcrumbItem[]) => void;
  appendBreadcrumb: (item: BreadcrumbItem) => void;
  resetBreadcrumbs: () => void;
  replaceLastBreadcrumb: (item: BreadcrumbItem) => void;
}

const useBreadcrumbStore = createWithEqualityFn<
  BreadcrumbState & BreadcrumbActions
>((set) => ({
  breadcrumbs: [],
  setBreadcrumbs: (items) => set({ breadcrumbs: items }),
  appendBreadcrumb: (item) =>
    set((state) => ({ breadcrumbs: [...state.breadcrumbs, item] })),
  resetBreadcrumbs: () => set({ breadcrumbs: [] }),
  replaceLastBreadcrumb: (item) =>
    set((state) => ({
      breadcrumbs: [...state.breadcrumbs.slice(0, -1), item],
    })),
}));

// State selector
export const useBreadcrumbs = () =>
  useBreadcrumbStore((state) => state.breadcrumbs);

// Actions selector (all actions together)
export const useBreadcrumbActions = () =>
  useBreadcrumbStore(
    (state) => ({
      setBreadcrumbs: state.setBreadcrumbs,
      appendBreadcrumb: state.appendBreadcrumb,
      resetBreadcrumbs: state.resetBreadcrumbs,
      replaceLastBreadcrumb: state.replaceLastBreadcrumb,
    }),
    shallow,
  );

// Individual action selectors
export const useSetBreadcrumbs = () =>
  useBreadcrumbStore((state) => state.setBreadcrumbs);
export const useAppendBreadcrumb = () =>
  useBreadcrumbStore((state) => state.appendBreadcrumb);
export const useResetBreadcrumbs = () =>
  useBreadcrumbStore((state) => state.resetBreadcrumbs);
export const useReplaceLastBreadcrumb = () =>
  useBreadcrumbStore((state) => state.replaceLastBreadcrumb);

// Derived selectors
export const useIsBreadcrumbsEmpty = () =>
  useBreadcrumbStore((state) => state.breadcrumbs.length === 0);

export const useLastBreadcrumb = () =>
  useBreadcrumbStore((state) => state.breadcrumbs.at(-1));

export const useBreadcrumbsCount = () =>
  useBreadcrumbStore((state) => state.breadcrumbs.length);

export const useBreadcrumbsInfo = () =>
  useBreadcrumbStore(
    (state) => ({
      count: state.breadcrumbs.length,
      lastItem: state.breadcrumbs.at(-1),
      isEmpty: state.breadcrumbs.length === 0,
    }),
    shallow,
  );

export default useBreadcrumbStore;
