import { STAT_CARDS } from "./constants";
import type { ResolvedStatCard } from "./CoachStatsGridPresentationalComponent";
import { CoachStatsGridPresentational } from "./CoachStatsGridPresentationalComponent";

export type CoachStats = {
  totalBookings: number;
  pendingBookings: number;
  totalEarnings: number;
  videosUploaded: number;
};

type Props = {
  stats: CoachStats;
};

export function CoachStatsGridContainer({ stats }: Props) {
  const cards: ResolvedStatCard[] = STAT_CARDS.map((config) => ({
    key: config.key,
    label: config.label,
    icon: config.icon,
    iconClass: config.iconClass,
    iconColor: config.iconColor,
    formattedValue:
      config.key === "totalEarnings"
        ? `$${stats[config.key]}`
        : String(stats[config.key]),
  }));

  return <CoachStatsGridPresentational cards={cards} />;
}
