import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import {
  type ThemeConfig,
  getDefaultHex,
  loadSavedTheme,
  saveTheme,
  resetSavedTheme,
  applyTheme,
} from "@/hooks/useTheme";
import { ThemeSettingsPresentational } from "./ThemeSettingsPresentationalComponent";

export function ThemeSettingsContainer() {
  const { user, updateGym } = useAuth();
  const defaults = getDefaultHex();

  const [colors, setColors] = useState<ThemeConfig>(() => {
    if (!user?.id) return defaults;
    const saved = loadSavedTheme(user.id);
    return { ...defaults, ...(saved ?? {}) };
  });

  useEffect(() => {
    if (!user?.id) return;
    const saved = loadSavedTheme(user.id);
    setColors({ ...defaults, ...(saved ?? {}) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  function handleColorChange(key: keyof ThemeConfig, hex: string) {
    setColors((prev) => ({ ...prev, [key]: hex }));
    applyTheme({ [key]: hex });
  }

  function handleSave() {
    if (!user?.id) return;
    saveTheme(user.id, colors);
    updateGym({ primaryColor: colors.primary, secondaryColor: colors.accent });
    toast.success("Theme saved — your colours are applied!");
  }

  function handleReset() {
    if (!user?.id) return;
    resetSavedTheme(user.id);
    setColors(defaults);
    toast.success("Theme reset to defaults");
  }

  return (
    <ThemeSettingsPresentational
      colors={colors}
      onColorChange={handleColorChange}
      onSave={handleSave}
      onReset={handleReset}
    />
  );
}
