import type { LucideIcon } from "lucide-react";

export type ResolvedStatCard = {
  key: string;
  label: string;
  icon: LucideIcon;
  iconClass: string;
  iconColor: string;
  formattedValue: string;
};

type Props = {
  cards: ResolvedStatCard[];
};

export function CoachStatsGridPresentational({ cards }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
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
                {card.formattedValue}
              </p>
              <p className="text-sm text-muted-foreground">{card.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
