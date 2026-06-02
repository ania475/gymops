import { DashboardLayout } from "@/components/layout/DashboardLayout";
import type { GymPayment, MemberWithPlan } from "./types";
import { GymDashboardHeaderContainer } from "./GymDashboardHeader/GymDashboardHeaderContainerComponent";
import { QuickActionsContainer } from "./QuickActions/QuickActionsContainerComponent";
import { RecentPaymentsCardContainer } from "./RecentPaymentsCard/RecentPaymentsCardContainerComponent";
import { StatsGridContainer } from "./StatsGrid/StatsGridContainerComponent";
import { UpcomingRenewalsCardContainer } from "./UpcomingRenewalsCard/UpcomingRenewalsCardContainerComponent";

type Props = {
  gymName: string | undefined;
  upcomingRenewals: MemberWithPlan[];
  recentPayments: GymPayment[];
  memberNames: Record<string, string>;
};

export function GymDashboardPresentational({
  gymName,
  upcomingRenewals,
  recentPayments,
  memberNames,
}: Props) {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <GymDashboardHeaderContainer gymName={gymName} />
        <StatsGridContainer />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UpcomingRenewalsCardContainer renewals={upcomingRenewals} />
          <RecentPaymentsCardContainer payments={recentPayments} memberNames={memberNames} />
        </div>
        <QuickActionsContainer />
      </div>
    </DashboardLayout>
  );
}
