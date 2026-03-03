import { cn } from "@/lib/utils";
import { DASHBOARD_STATS, TREND_ICONS } from "./constants";

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {DASHBOARD_STATS.map((stat, idx) => {
        const TrendIcon = TREND_ICONS[stat.trend];
        return (
          <div
            key={idx}
            className="p-6 rounded-xl border border-border bg-card hover:border-accent/30 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-accent" />
              </div>
              <div
                className={cn(
                  "flex items-center gap-1 text-sm font-medium",
                  stat.trend === "up"
                    ? "text-success"
                    : stat.trend === "down"
                      ? "text-destructive"
                      : "text-muted-foreground",
                )}
              >
                {TrendIcon && <TrendIcon className="w-4 h-4" />}
                {stat.change}
              </div>
            </div>
            <p className="text-2xl font-display font-bold mb-1">
              {stat.value}
            </p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}
