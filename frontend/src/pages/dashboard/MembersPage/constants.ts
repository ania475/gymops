export const PLAN_OPTIONS = [
  { value: "full-access", label: "Full Access" },
  { value: "bjj-only", label: "BJJ only" },
  { value: "boxing-basics", label: "Boxing Basics" },
] as const;

export const STATUS_COLORS: Record<
  string,
  string
> = {
  active: "bg-success/20 text-success border-success/30",
  pending: "bg-warning/20 text-warning border-warning/30",
  expired: "bg-destructive/20 text-destructive border-destructive/30",
  cancelled: "bg-muted text-muted-foreground border-muted",
};
