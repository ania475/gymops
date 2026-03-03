import { Calendar, Clock, DollarSign, Video } from "lucide-react";

type CoachStats = {
  totalBookings: number;
  pendingBookings: number;
  totalEarnings: number;
  videosUploaded: number;
};

type CoachStatsGridProps = {
  stats: CoachStats;
};

const STAT_CARDS = [
  {
    key: "totalBookings" as const,
    valueKey: "totalBookings",
    label: "Total Sessions",
    icon: Calendar,
    iconClass: "bg-accent/20",
    iconColor: "text-accent",
  },
  {
    key: "pendingBookings" as const,
    valueKey: "pendingBookings",
    label: "Pending Requests",
    icon: Clock,
    iconClass: "bg-warning/20",
    iconColor: "text-warning",
  },
  {
    key: "totalEarnings" as const,
    valueKey: "totalEarnings",
    label: "This Month",
    icon: DollarSign,
    iconClass: "bg-success/20",
    iconColor: "text-success",
  },
  {
    key: "videosUploaded" as const,
    valueKey: "videosUploaded",
    label: "Videos Uploaded",
    icon: Video,
    iconClass: "bg-info/20",
    iconColor: "text-info",
  },
];

export function CoachStatsGrid({ stats }: CoachStatsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {STAT_CARDS.map((card) => (
        <div
          key={card.key}
          className="p-6 rounded-xl border border-border bg-card"
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.iconClass}`}
            >
              <card.icon className={`w-6 h-6 ${card.iconColor}`} />
            </div>
            <div>
              <p className="text-2xl font-display font-bold">
                {card.key === "totalEarnings"
                  ? `$${stats[card.key]}`
                  : stats[card.key]}
              </p>
              <p className="text-sm text-muted-foreground">{card.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
