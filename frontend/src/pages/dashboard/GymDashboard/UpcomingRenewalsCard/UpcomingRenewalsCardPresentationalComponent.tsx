import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import type { MemberWithPlan } from "../types";

type Props = {
  renewals: MemberWithPlan[];
};

export function UpcomingRenewalsCardPresentational({ renewals }: Props) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-semibold">Upcoming Renewals</h2>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/dashboard/gym/members">View All</Link>
        </Button>
      </div>

      <div className="space-y-4">
        {renewals.length > 0 ? (
          renewals.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-sm font-medium text-accent">{member.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-medium text-sm">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.plan.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">${member.plan.monthlyPrice}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(member.profile.nextRenewalDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-sm text-center py-4">
            No renewals due this week
          </p>
        )}
      </div>
    </div>
  );
}
