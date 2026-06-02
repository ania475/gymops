import { DashboardLayout } from "@/components/layout/DashboardLayout";
import type { VideoContent } from "@/types";
import type { CoachStats } from "./CoachStatsGrid/CoachStatsGridContainerComponent";
import type { Session } from "./UpcomingSessionsCard/UpcomingSessionsCardPresentationalComponent";
import { CoachDashboardHeaderContainer } from "./CoachDashboardHeader/CoachDashboardHeaderContainerComponent";
import { CoachStatsGridContainer } from "./CoachStatsGrid/CoachStatsGridContainerComponent";
import { MyVideosCardContainer } from "./MyVideosCard/MyVideosCardContainerComponent";
import { UpcomingSessionsCardContainer } from "./UpcomingSessionsCard/UpcomingSessionsCardContainerComponent";
import { UploadVideoModalContainer } from "./UploadVideoModal/UploadVideoModalContainerComponent";
import { WeeklyAvailabilityCardContainer } from "./WeeklyAvailabilityCard/WeeklyAvailabilityCardContainerComponent";

type Props = {
  videos: VideoContent[];
  stats: CoachStats;
  sessions: Session[];
  weekdays: string[];
  uploadOpen: boolean;
  onOpenUpload: () => void;
  onCloseUpload: () => void;
  onUpload: (video: VideoContent) => void;
};

export function CoachDashboardPresentational({
  videos,
  stats,
  sessions,
  weekdays,
  uploadOpen,
  onOpenUpload,
  onCloseUpload,
  onUpload,
}: Props) {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <CoachDashboardHeaderContainer />
        <CoachStatsGridContainer stats={stats} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UpcomingSessionsCardContainer sessions={sessions} />
          <MyVideosCardContainer videos={videos} onOpenUpload={onOpenUpload} />
        </div>
        <WeeklyAvailabilityCardContainer weekdays={weekdays} />
      </div>
      <UploadVideoModalContainer
        open={uploadOpen}
        onClose={onCloseUpload}
        onUpload={onUpload}
      />
    </DashboardLayout>
  );
}
