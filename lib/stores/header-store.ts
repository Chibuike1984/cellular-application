import { create } from 'zustand';

interface HeaderState {
  searchHandler: ((query: string) => void) | undefined;
  actions: {
    setSearchHandler: (handler: (query: string) => void) => void;
    resetSearchHandler: () => void;
  };
}

const useHeaderStore = create<HeaderState>((set) => ({
  searchHandler: undefined,
  actions: {
    setSearchHandler: (handler) => set({ searchHandler: handler }),
    resetSearchHandler: () => set({ searchHandler: undefined }),
  },
}));

// Selectors
export const useHeaderActions = () => useHeaderStore((state) => state.actions);
export const useSetSearchHandler = () =>
  useHeaderStore((state) => state.actions.setSearchHandler);
export const useResetSearchHandler = () =>
  useHeaderStore((state) => state.actions.resetSearchHandler);
export const useSearchHandler = () =>
  useHeaderStore((state) => state.searchHandler);
