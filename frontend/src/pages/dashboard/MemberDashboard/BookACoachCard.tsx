import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Dumbbell } from "lucide-react";

type Coach = {
  id: string;
  name: string;
  avatarUrl?: string | null;
  coachProfile: { specialties: string[]; sessionPrice?: number };
};

type BookACoachCardProps = {
  coaches: Coach[];
};

export function BookACoachCard({ coaches }: BookACoachCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-semibold">
          Book a Coach
        </h2>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/dashboard/member/coaches">View All</Link>
        </Button>
      </div>

      <div className="space-y-4">
        {coaches.map((coach) => (
          <div
            key={coach.id}
            className="flex items-center justify-between p-4 rounded-lg bg-secondary/50"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary overflow-hidden">
                {coach.avatarUrl ? (
                  <img
                    src={coach.avatarUrl}
                    alt={coach.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Dumbbell className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div>
                <p className="font-medium">{coach.name}</p>
                <p className="text-sm text-muted-foreground">
                  {coach.coachProfile.specialties.slice(0, 2).join(", ")}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-highlight text-highlight hover:bg-highlight/10"
            >
              ${coach.coachProfile.sessionPrice ?? 0}/hr
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
