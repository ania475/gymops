import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AlertCircle, CheckCircle, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

type Membership = {
  plan: string;
  status: string;
  nextRenewal: Date;
  monthlyPrice: number;
};

type MembershipStatusCardProps = {
  membership: Membership;
};

export function MembershipStatusCard({ membership }: MembershipStatusCardProps) {
  return (
    <div className="rounded-xl border border-border bg-gradient-card p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "w-14 h-14 rounded-xl flex items-center justify-center",
              membership.status === "active"
                ? "bg-success/20"
                : "bg-warning/20",
            )}
          >
            {membership.status === "active" ? (
              <CheckCircle className="w-7 h-7 text-success" />
            ) : (
              <AlertCircle className="w-7 h-7 text-warning" />
            )}
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Current Plan</p>
            <h2 className="font-display text-2xl font-bold">
              {membership.plan}
            </h2>
            <p className="text-sm text-muted-foreground">
              Next renewal: {membership.nextRenewal.toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" asChild>
            <Link to="/dashboard/member/membership">View Details</Link>
          </Button>
          <Button
            className="bg-highlight hover:bg-highlight/90 text-highlight-foreground"
            asChild
          >
            <Link to="/dashboard/member/membership">
              <CreditCard className="w-4 h-4 mr-2" />
              Renew Now - ${membership.monthlyPrice}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
