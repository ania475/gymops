export const VIDEO_CATEGORIES = [
  "Strength Training",
  "Cardio",
  "Yoga",
  "HIIT",
  "Mobility",
  "Nutrition",
  "Recovery",
  "Technique",
] as const;

export const VISIBILITY_OPTIONS = ["public", "members", "private"] as const;
export const DEFAULT_VISIBILITY = "members" as const;

export type Visibility = (typeof VISIBILITY_OPTIONS)[number];
