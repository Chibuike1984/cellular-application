import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
import type { AiConfig, AiFeatureFlag } from "../types/ai-types";

interface AiConfigState {
  config: AiConfig | null;
}

interface AiConfigActions {
  setConfig: (config: AiConfig) => void;
  updateConfig: (updates: Partial<AiFeatureFlag>) => void;
  clearConfig: () => void;
}

interface AiConfigStore extends AiConfigState {
  actions: AiConfigActions;
}

const useAiConfigStore = createWithEqualityFn<AiConfigStore>()(
  persist(
    immer((set) => ({
      config: {
        enableForecasting: false,
        enableMarketingAutomation: false,
        enableUpselling: false,
        isAiEnabled: false,
        orgId: "",
        id: "",
      },

      actions: {
        setConfig: (config) =>
          set((state) => {
            state.config = config;
          }),

        updateConfig: (updates) =>
          set((state) => {
            if (state.config) {
              state.config = {
                ...state.config,
                ...updates,
              };
            }
          }),

        clearConfig: () =>
          set({
            config: null,
          }),
      },
    })),
    {
      name: "cells-ai-config-store",
      partialize: (state) => ({
        config: state.config,
      }),
      version: 1,
    },
  ),
  shallow,
);

// ==================== Selectors ====================

/** The full AI config object (or null if not loaded) */
export const useAiConfig = (): AiConfig | null =>
  useAiConfigStore((state) => state.config);

/** Individual feature flags */
export const useAiUpsellingEnabled = (): boolean =>
  useAiConfigStore((state) => state.config?.enableUpselling ?? false);

export const useAiForecastingEnabled = (): boolean =>
  useAiConfigStore((state) => state.config?.enableForecasting ?? false);

export const useAiMarketingAutomationEnabled = (): boolean =>
  useAiConfigStore(
    (state) => state.config?.enableMarketingAutomation ?? false,
  );

/** Master AI toggle */
export const useIsAiEnabled = (): boolean =>
  useAiConfigStore((state) => state.config?.isAiEnabled ?? false);

/** AI config actions */
export const useAiConfigActions = (): AiConfigActions =>
  useAiConfigStore((state) => state.actions);

/** Convenience: everything in one hook */
export const useAiConfigAll = () => {
  const config = useAiConfig();
  const upselling = useAiUpsellingEnabled();
  const forecasting = useAiForecastingEnabled();
  const AiEnabled = useIsAiEnabled();
  const marketing = useAiMarketingAutomationEnabled();
  const actions = useAiConfigActions();

  return {
    config,
    enable_upselling: upselling,
    enable_forecasting: forecasting,
    enable_marketing_automation: marketing,
    is_ai_enabled: AiEnabled,
    actions,
  };
};

/** All feature flags respecting the master toggle */
export const useEffectiveAiFeatures = () => {
  const config = useAiConfig();
  const isEnabled = config?.isAiEnabled ?? false;

  return {
    upselling: isEnabled && (config?.enableUpselling ?? false),
    forecasting: isEnabled && (config?.enableForecasting ?? false),
    marketingAutomation: isEnabled &&
      (config?.enableMarketingAutomation ?? false),
  };
};

// ==================== Sync Helper ====================

/**
 * Sync the store with fresh data from Supabase
 * Useful after login, org switch, or when refetching config
 */
export const syncAiConfigStore = (config: AiConfig | null) => {
  const { setConfig, clearConfig } = useAiConfigStore.getState().actions;
  if (config) {
    setConfig(config);
  } else {
    clearConfig();
  }
};
