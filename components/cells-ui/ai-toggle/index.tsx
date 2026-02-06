"use client";

import { Switch } from "@/components/ui/switch";
import {
  useAiConfigActions,
  useIsAiEnabled,
} from "@/lib/stores/ai-config-store";
import { cn } from "@/lib/utils";

/**
 * AIToggle
 *
 * Toggle switch for enabling/disabling AI Mode across the app.
 * - Visual feedback with color change
 * - Accessible label and state
 * - Smooth transitions
 */
export function AIToggle() {
  const isAiModeEnabled = useIsAiEnabled();
  const { updateConfig } = useAiConfigActions();

  return (
    <div
      className={cn(
        "inline-flex h-9 items-center gap-2 rounded-full border px-3.5 transition-colors",
        isAiModeEnabled
          ? "border-purple-300 bg-purple-100"
          : "border-gray-200 bg-gray-100",
      )}
    >
      <Switch
        checked={isAiModeEnabled}
        onCheckedChange={(value) => {
          updateConfig({ isAiEnabled: value });
        }}
        className={cn(
          "data-[state=checked]:bg-purple-600 data-[state=unchecked]:bg-gray-400",
          "focus-visible:ring-purple-500",
        )}
        aria-label={isAiModeEnabled ? "Disable AI Mode" : "Enable AI Mode"}
      />

      <span
        className={cn(
          "select-none font-medium text-sm transition-colors",
          isAiModeEnabled ? "text-purple-700" : "text-gray-600",
        )}
      >
        AI Mode
      </span>
    </div>
  );
}
