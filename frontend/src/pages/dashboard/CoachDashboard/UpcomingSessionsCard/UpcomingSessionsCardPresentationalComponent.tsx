import { Button } from "@/components/ui/button";
import { CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export type Session = {
  id: number;
  memberName: string;
  date: string;
  time: string;
  type: string;
  status: "confirmed" | "pending";
};

type Props = {
  sessions: Session[];
  hasPending: boolean;
};

export function UpcomingSessionsCardPresentational({ sessions, hasPending }: Props) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-semibold">
          Upcoming Sessions
        </h2>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex items-center justify-between p-4 rounded-lg bg-secondary/50"
          >
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center",
                  session.status === "confirmed"
                    ? "bg-success/20"
                    : "bg-warning/20",
                )}
              >
                {session.status === "confirmed" ? (
                  <CheckCircle className="w-6 h-6 text-success" />
                ) : (
                  <Clock className="w-6 h-6 text-warning" />
                )}
              </div>
              <div>
                <p className="font-medium">{session.memberName}</p>
                <p className="text-sm text-muted-foreground">{session.type}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-accent">{session.date}</p>
              <p className="text-sm text-muted-foreground">{session.time}</p>
            </div>
          </div>
        ))}
      </div>

      {hasPending && (
        <div className="mt-4 pt-4 border-t border-border flex gap-2">
          <Button
            className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
            size="sm"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Accept All
          </Button>
        </div>
      )}
    </div>
  );
}
