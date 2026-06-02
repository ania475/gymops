import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { KPIRecord } from "@/types";

type Props = {
  currentKPI: KPIRecord;
  previousKPI: KPIRecord;
};

export function RetentionMetricsGridPresentational({ currentKPI, previousKPI }: Props) {
  const retentionChange = currentKPI.retentionRate - previousKPI.retentionRate;
  const revenueChange =
    ((currentKPI.revenue - previousKPI.revenue) / previousKPI.revenue) * 100;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="p-6 rounded-xl border border-border bg-card">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-accent" />
          </div>
          <div
            className={cn(
              "flex items-center gap-1 text-sm font-medium",
              retentionChange >= 0 ? "text-success" : "text-destructive",
            )}
          >
            {retentionChange >= 0 ? (
              <ArrowUpRight className="w-4 h-4" />
            ) : (
              <ArrowDownRight className="w-4 h-4" />
            )}
            {Math.abs(retentionChange).toFixed(1)}%
          </div>
        </div>
        <p className="text-3xl font-display font-bold mb-1">{currentKPI.retentionRate}%</p>
        <p className="text-sm text-muted-foreground">Retention Rate</p>
      </div>

      <div className="p-6 rounded-xl border border-border bg-card">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
            <Users className="w-6 h-6 text-success" />
          </div>
          <div className="flex items-center gap-1 text-sm font-medium text-success">
            <ArrowUpRight className="w-4 h-4" />+{currentKPI.newMembers}
          </div>
        </div>
        <p className="text-3xl font-display font-bold mb-1">{currentKPI.totalMembers}</p>
        <p className="text-sm text-muted-foreground">Total Members</p>
      </div>

      <div className="p-6 rounded-xl border border-border bg-card">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center">
            <TrendingDown className="w-6 h-6 text-destructive" />
          </div>
          <div className="flex items-center gap-1 text-sm font-medium text-destructive">
            <ArrowDownRight className="w-4 h-4" />-{currentKPI.churnedMembers}
          </div>
        </div>
        <p className="text-3xl font-display font-bold mb-1">{currentKPI.churnedMembers}</p>
        <p className="text-sm text-muted-foreground">Churned This Month</p>
      </div>

      <div className="p-6 rounded-xl border border-border bg-card">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-warning/20 flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-warning" />
          </div>
          <div
            className={cn(
              "flex items-center gap-1 text-sm font-medium",
              revenueChange >= 0 ? "text-success" : "text-destructive",
            )}
          >
            {revenueChange >= 0 ? (
              <ArrowUpRight className="w-4 h-4" />
            ) : (
              <ArrowDownRight className="w-4 h-4" />
            )}
            {Math.abs(revenueChange).toFixed(1)}%
          </div>
        </div>
        <p className="text-3xl font-display font-bold mb-1">
          ${currentKPI.revenue.toLocaleString()}
        </p>
        <p className="text-sm text-muted-foreground">Monthly Revenue</p>
      </div>
    </div>
  );
}
