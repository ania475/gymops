import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type WeeklyAvailabilityCardProps = {
  weekdays: string[];
};

export function WeeklyAvailabilityCard({
  weekdays,
}: WeeklyAvailabilityCardProps) {
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
        {weekdays.map((day, idx) => (
          <div key={day} className="text-center">
            <p className="text-xs text-muted-foreground mb-2">{day}</p>
            <div
              className={cn(
                "h-20 rounded-lg border flex items-center justify-center",
                idx < 5
                  ? "border-success/50 bg-success/10"
                  : "border-border bg-secondary/30",
              )}
            >
              <span
                className={cn(
                  "text-xs",
                  idx < 5 ? "text-success" : "text-muted-foreground",
                )}
              >
                {idx < 5 ? "Available" : "Off"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
