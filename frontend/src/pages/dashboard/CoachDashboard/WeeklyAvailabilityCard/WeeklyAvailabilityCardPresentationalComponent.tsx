import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DayData } from "./utils";

type Props = {
  dayData: DayData[];
};

export function WeeklyAvailabilityCardPresentational({ dayData }: Props) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-semibold">
          This Week's Availability
        </h2>
        <Button variant="ghost" size="sm">
          Edit Schedule
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {dayData.map(({ label, available }) => (
          <div key={label} className="text-center">
            <p className="text-xs text-muted-foreground mb-2">{label}</p>
            <div
              className={cn(
                "h-20 rounded-lg border flex items-center justify-center",
                available
                  ? "border-success/50 bg-success/10"
                  : "border-border bg-secondary/30",
              )}
            >
              <span
                className={cn(
                  "text-xs",
                  available ? "text-success" : "text-muted-foreground",
                )}
              >
                {available ? "Available" : "Off"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
