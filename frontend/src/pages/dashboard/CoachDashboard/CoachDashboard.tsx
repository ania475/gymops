import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { mockVideos } from "@/data/mockData";
import { COACH_STATS, UPCOMING_SESSIONS, WEEKDAYS } from "./constants";
import { CoachDashboardHeader } from "./CoachDashboardHeader";
import { CoachStatsGrid } from "./CoachStatsGrid";
import { MyVideosCard } from "./MyVideosCard";
import { UpcomingSessionsCard } from "./UpcomingSessionsCard";
import { WeeklyAvailabilityCard } from "./WeeklyAvailabilityCard";

export default function CoachDashboard() {
  const recentVideos = mockVideos.slice(0, 2);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <CoachDashboardHeader />
        <CoachStatsGrid stats={COACH_STATS} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UpcomingSessionsCard sessions={UPCOMING_SESSIONS} />
          <MyVideosCard videos={recentVideos} />
        </div>
        <WeeklyAvailabilityCard weekdays={WEEKDAYS} />
      </div>
    </DashboardLayout>
  );
}
