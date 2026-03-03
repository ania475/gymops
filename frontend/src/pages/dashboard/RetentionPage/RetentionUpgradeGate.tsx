import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";

export function RetentionUpgradeGate() {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-20 h-20 rounded-2xl bg-warning/20 flex items-center justify-center mb-6">
          <TrendingUp className="w-10 h-10 text-warning" />
        </div>
        <h1 className="font-display text-3xl font-bold mb-4">
          Unlock Retention Analytics
        </h1>
        <p className="text-muted-foreground max-w-md mb-8">
          Upgrade to the Growth plan to access retention dashboards, KPI
          tracking, churn analysis, and CSV exports.
        </p>
        <Button
          className="bg-highlight hover:bg-highlight/90 text-highlight-foreground"
          size="lg"
        >
          Upgrade to Growth
        </Button>
      </div>
    </DashboardLayout>
  );
}
