import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export function AtRiskMembersCard() {
  return (
    <div className="rounded-xl border border-warning/50 bg-warning/5 p-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-warning/20 flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-6 h-6 text-warning" />
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold mb-2">
            3 Members at Risk
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            These members haven't attended classes in over 2 weeks and have
            renewals coming up. Consider reaching out to prevent churn.
          </p>
          <Button variant="outline" size="sm">
            View At-Risk Members
          </Button>
        </div>
      </div>
    </div>
  );
}
