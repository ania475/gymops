import { Calendar, Clock, DollarSign, Video } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type StatCardConfig = {
  key: "totalBookings" | "pendingBookings" | "totalEarnings" | "videosUploaded";
  label: string;
  icon: LucideIcon;
  iconClass: string;
  iconColor: string;
};

export const STAT_CARDS: StatCardConfig[] = [
  {
    key: "totalBookings",
    label: "Total Sessions",
    icon: Calendar,
    iconClass: "bg-accent/20",
    iconColor: "text-accent",
  },
  {
    key: "pendingBookings",
    label: "Pending Requests",
    icon: Clock,
    iconClass: "bg-warning/20",
    iconColor: "text-warning",
  },
  {
    key: "totalEarnings",
    label: "This Month",
    icon: DollarSign,
    iconClass: "bg-success/20",
    iconColor: "text-success",
  },
  {
    key: "videosUploaded",
    label: "Videos Uploaded",
    icon: Video,
    iconClass: "bg-info/20",
    iconColor: "text-info",
  },
];
