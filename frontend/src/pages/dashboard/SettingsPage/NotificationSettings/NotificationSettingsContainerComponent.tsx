import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { DEFAULT_NOTIF_CONFIG } from "../constants";
import type { NotifConfig } from "../types";
import { notifStorageKey } from "../utils";
import { NotificationSettingsPresentational } from "./NotificationSettingsPresentationalComponent";

export function NotificationSettingsContainer() {
  const { user } = useAuth();

  const [config, setConfig] = useState<NotifConfig>(() => {
    if (!user?.id) return DEFAULT_NOTIF_CONFIG;
    try {
      const raw = localStorage.getItem(notifStorageKey(user.id));
      return raw
        ? { ...DEFAULT_NOTIF_CONFIG, ...JSON.parse(raw) }
        : DEFAULT_NOTIF_CONFIG;
    } catch {
      return DEFAULT_NOTIF_CONFIG;
    }
  });

  useEffect(() => {
    if (!user?.id) return;
    try {
      const raw = localStorage.getItem(notifStorageKey(user.id));
      if (raw) setConfig({ ...DEFAULT_NOTIF_CONFIG, ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
  }, [user?.id]);

  function toggle(key: keyof NotifConfig) {
    setConfig((p) => ({ ...p, [key]: !p[key] }));
  }

  function handleSave() {
    if (!user?.id) return;
    localStorage.setItem(notifStorageKey(user.id), JSON.stringify(config));
    toast.success("Notification preferences saved");
  }

  return (
    <NotificationSettingsPresentational
      config={config}
      onToggle={toggle}
      onSave={handleSave}
    />
  );
}
