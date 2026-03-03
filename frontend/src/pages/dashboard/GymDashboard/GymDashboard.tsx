import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { mockMembers, mockPayments } from "@/data/mockData";
import { GymDashboardHeader } from "./GymDashboardHeader";
import { QuickActions } from "./QuickActions";
import { RecentPaymentsCard } from "./RecentPaymentsCard";
import { StatsGrid } from "./StatsGrid";
import { UpcomingRenewalsCard } from "./UpcomingRenewalsCard";

export default function GymDashboard() {
  const { gym } = useAuth();

  const upcomingRenewals = mockMembers
    .filter((m) => {
      const renewalDate = new Date(m.profile.nextRenewalDate);
      const today = new Date();
      const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      return renewalDate >= today && renewalDate <= weekFromNow;
    })
    .slice(0, 5);

  const recentPayments = mockPayments.slice(0, 5);
  const memberNames = Object.fromEntries(
    mockMembers.map((m) => [m.id, m.name]),
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <GymDashboardHeader gymName={gym?.name} />
        <StatsGrid />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UpcomingRenewalsCard renewals={upcomingRenewals} />
          <RecentPaymentsCard
            payments={recentPayments}
            memberNames={memberNames}
          />
        </div>
        <QuickActions />
      </div>
    </DashboardLayout>
  );
}
