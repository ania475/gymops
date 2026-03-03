import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { mockKPIs } from "@/data/mockData";
import { AtRiskMembersCard } from "./AtRiskMembersCard";
import { RetentionChartsGrid } from "./RetentionChartsGrid";
import { RetentionMetricsGrid } from "./RetentionMetricsGrid";
import { RetentionPageHeader } from "./RetentionPageHeader";
import { RetentionUpgradeGate } from "./RetentionUpgradeGate";
import { RevenueChartCard } from "./RevenueChartCard";

export default function RetentionPage() {
  const { gym } = useAuth();
  const currentKPI = mockKPIs[0];
  const previousKPI = mockKPIs[1];

  const hasAccess = gym?.plan === "growth" || gym?.plan === "pro";

  if (!hasAccess) {
    return <RetentionUpgradeGate />;
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <RetentionPageHeader />
        <RetentionMetricsGrid
          currentKPI={currentKPI}
          previousKPI={previousKPI}
        />
        <RetentionChartsGrid />
        <RevenueChartCard />
        <AtRiskMembersCard />
      </div>
    </DashboardLayout>
  );
}
