import type { Gym } from "@/types";
import { DAY_KEYS } from "./constants";
import type { HoursState } from "./types";

export function buildDefaultHours(existing?: Gym["openingHours"]): HoursState {
  return Object.fromEntries(
    DAY_KEYS.map((day) => {
      const saved = existing?.[day];
      if (saved === null)
        return [day, { open: "06:00", close: "22:00", closed: true }];
      if (saved)
        return [day, { open: saved.open, close: saved.close, closed: false }];
      const isWeekend = day === "saturday" || day === "sunday";
      return [
        day,
        { open: isWeekend ? "08:00" : "06:00", close: "22:00", closed: false },
      ];
    }),
  );
}
