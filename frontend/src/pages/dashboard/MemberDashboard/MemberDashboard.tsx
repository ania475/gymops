import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { mockVideos, mockCoaches } from "@/data/mockData";
import { BookACoachCard } from "./BookACoachCard";
import { MOCK_MEMBERSHIP, UPCOMING_CLASSES } from "./constants";
import { MemberDashboardHeader } from "./MemberDashboardHeader";
import { MembershipStatusCard } from "./MembershipStatusCard";
import { RecentVideosCard } from "./RecentVideosCard";
import { UpcomingClassesCard } from "./UpcomingClassesCard";

export default function MemberDashboard() {
  const { user, gym } = useAuth();
  const recentVideos = mockVideos.slice(0, 3);
  const coaches = mockCoaches.slice(0, 3);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <MemberDashboardHeader userName={user?.name} gymName={gym?.name} />

        <MembershipStatusCard membership={MOCK_MEMBERSHIP} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UpcomingClassesCard classes={UPCOMING_CLASSES} />
          <BookACoachCard coaches={coaches} />
        </div>

        <RecentVideosCard videos={recentVideos} />
      </div>
    </DashboardLayout>
  );
}
