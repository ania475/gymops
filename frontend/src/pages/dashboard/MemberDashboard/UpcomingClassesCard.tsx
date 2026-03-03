import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

type ClassItem = {
  name: string;
  time: string;
  coach: string;
  day: string;
};

type UpcomingClassesCardProps = {
  classes: ClassItem[];
};

export function UpcomingClassesCard({ classes }: UpcomingClassesCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-semibold">
          Upcoming Classes
        </h2>
        <Button variant="ghost" size="sm">
          View Schedule
        </Button>
      </div>

      <div className="space-y-4">
        {classes.map((classItem, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-4 rounded-lg bg-secondary/50"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="font-medium">{classItem.name}</p>
                <p className="text-sm text-muted-foreground">
                  with {classItem.coach}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-accent">{classItem.day}</p>
              <p className="text-sm text-muted-foreground">{classItem.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
