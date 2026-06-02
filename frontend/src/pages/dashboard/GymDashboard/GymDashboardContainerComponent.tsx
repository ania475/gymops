import { useAuth } from "@/contexts/AuthContext";
import { mockMembers, mockPayments } from "@/data/mockData";
import { GymDashboardPresentational } from "./GymDashboardPresentationalComponent";

export default function GymDashboardContainer() {
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
  const memberNames = Object.fromEntries(mockMembers.map((m) => [m.id, m.name]));

  return (
    <GymDashboardPresentational
      gymName={gym?.name}
      upcomingRenewals={upcomingRenewals}
      recentPayments={recentPayments}
      memberNames={memberNames}
    />
  );
}
