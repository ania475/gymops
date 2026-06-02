import { DashboardLayout } from "@/components/layout/DashboardLayout";
import type { KPIRecord } from "@/types";
import { AtRiskMembersCardContainer } from "./AtRiskMembersCard/AtRiskMembersCardContainerComponent";
import { RetentionChartsGridContainer } from "./RetentionChartsGrid/RetentionChartsGridContainerComponent";
import { RetentionMetricsGridContainer } from "./RetentionMetricsGrid/RetentionMetricsGridContainerComponent";
import { RetentionPageHeaderContainer } from "./RetentionPageHeader/RetentionPageHeaderContainerComponent";
import { RetentionUpgradeGateContainer } from "./RetentionUpgradeGate/RetentionUpgradeGateContainerComponent";
import { RevenueChartCardContainer } from "./RevenueChartCard/RevenueChartCardContainerComponent";

type Props = {
  hasAccess: boolean;
  currentKPI: KPIRecord;
  previousKPI: KPIRecord;
};

export function RetentionPagePresentational({ hasAccess, currentKPI, previousKPI }: Props) {
  if (!hasAccess) {
    return <RetentionUpgradeGateContainer />;
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <RetentionPageHeaderContainer />
        <RetentionMetricsGridContainer currentKPI={currentKPI} previousKPI={previousKPI} />
        <RetentionChartsGridContainer />
        <RevenueChartCardContainer />
        <AtRiskMembersCardContainer />
      </div>
    </DashboardLayout>
  );
}
