import { useEffect } from "react";
import { hexToHslString, hslStringToHex } from "@/utils/colorUtils";

export interface ThemeConfig {
  background: string;
  foreground: string;
  sidebarPrimary: string;
  primary: string;
  accent: string;
  card: string;
}

// Default values matching the CSS variables defined in index.css :root
const CSS_VARIABLE_DEFAULTS: Record<keyof ThemeConfig, string> = {
  background: "210 20% 98%",
  foreground: "220 20% 10%",
  sidebarPrimary: "215 75% 14%",
  primary: "215 75% 14%",
  accent: "174 100% 39%",
  card: "0 0% 100%",
};

const CSS_VARIABLE_NAMES: Record<keyof ThemeConfig, string> = {
  background: "--background",
  foreground: "--foreground",
  sidebarPrimary: "--sidebar-primary",
  primary: "--primary",
  accent: "--accent",
  card: "--card",
};

function storageKey(userId: string) {
  return `gymops_theme_${userId}`;
}

function applyTheme(config: Partial<ThemeConfig>) {
  const root = document.documentElement;
  (Object.keys(config) as (keyof ThemeConfig)[]).forEach((key) => {
    const hex = config[key];
    if (hex) {
      root.style.setProperty(CSS_VARIABLE_NAMES[key], hexToHslString(hex));
      // Keep sidebar-foreground readable on dark sidebar
      if (key === "sidebarPrimary") {
        root.style.setProperty("--sidebar-foreground", "0 0% 98%");
        root.style.setProperty("--sidebar-accent", hexToHslString(hex));
        root.style.setProperty("--sidebar-accent-foreground", "0 0% 100%");
        root.style.setProperty("--sidebar-border", hexToHslString(hex));
      }
    }
  });
}

function clearTheme() {
  const root = document.documentElement;
  (Object.keys(CSS_VARIABLE_NAMES) as (keyof ThemeConfig)[]).forEach((key) => {
    root.style.removeProperty(CSS_VARIABLE_NAMES[key]);
  });
  root.style.removeProperty("--sidebar-foreground");
  root.style.removeProperty("--sidebar-accent");
  root.style.removeProperty("--sidebar-accent-foreground");
  root.style.removeProperty("--sidebar-border");
}

export function getDefaultHex(): ThemeConfig {
  const entries = (Object.keys(CSS_VARIABLE_DEFAULTS) as (keyof ThemeConfig)[]).map(
    (key) => [key, hslStringToHex(CSS_VARIABLE_DEFAULTS[key])] as const,
  );
  return Object.fromEntries(entries) as unknown as ThemeConfig;
}

export function loadSavedTheme(userId: string): Partial<ThemeConfig> | null {
  try {
    const raw = localStorage.getItem(storageKey(userId));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveTheme(userId: string, config: Partial<ThemeConfig>) {
  localStorage.setItem(storageKey(userId), JSON.stringify(config));
}

export function resetSavedTheme(userId: string) {
  localStorage.removeItem(storageKey(userId));
  clearTheme();
}

export function useThemeLoader(userId: string | undefined) {
  useEffect(() => {
    if (!userId) return;
    const saved = loadSavedTheme(userId);
    if (saved) applyTheme(saved);
  }, [userId]);
}

export function applyAndSave(
  current: Partial<ThemeConfig>,
  key: keyof ThemeConfig,
  hex: string,
): Partial<ThemeConfig> {
  const updated = { ...current, [key]: hex };
  applyTheme({ [key]: hex });
  return updated;
}

export { applyTheme };
