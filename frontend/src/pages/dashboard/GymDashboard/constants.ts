import {
  Users,
  DollarSign,
  TrendingUp,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export const DASHBOARD_STATS = [
  {
    label: "Total Members",
    value: "87",
    change: "+12%",
    trend: "up" as const,
    icon: Users,
  },
  {
    label: "Monthly Revenue",
    value: "$12,450",
    change: "+8.5%",
    trend: "up" as const,
    icon: DollarSign,
  },
  {
    label: "Retention Rate",
    value: "94.3%",
    change: "-2.0%",
    trend: "down" as const,
    icon: TrendingUp,
  },
  {
    label: "Renewals Due",
    value: "8",
    change: "This week",
    trend: "neutral" as const,
    icon: AlertCircle,
  },
];

export const TREND_ICONS = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  neutral: null,
};
