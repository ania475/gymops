import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { mockVideos } from "@/data/mockData";
import type { VideoContent } from "@/types";
import { COACH_STATS, UPCOMING_SESSIONS, WEEKDAYS } from "./constants";
import { CoachDashboardHeader } from "./CoachDashboardHeader";
import { CoachStatsGrid } from "./CoachStatsGrid";
import { MyVideosCard } from "./MyVideosCard";
import { UpcomingSessionsCard } from "./UpcomingSessionsCard";
import { UploadVideoModal } from "./UploadVideoModal";
import { WeeklyAvailabilityCard } from "./WeeklyAvailabilityCard";

export default function CoachDashboard() {
  const [videos, setVideos] = useState<VideoContent[]>(mockVideos);
  const [uploadOpen, setUploadOpen] = useState(false);

  function handleUpload(video: VideoContent) {
    setVideos((prev) => [video, ...prev]);
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <CoachDashboardHeader />
        <CoachStatsGrid stats={COACH_STATS} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UpcomingSessionsCard sessions={UPCOMING_SESSIONS} />
          <MyVideosCard
            videos={videos}
            onOpenUpload={() => setUploadOpen(true)}
          />
        </div>
        <WeeklyAvailabilityCard weekdays={WEEKDAYS} />
      </div>
      <UploadVideoModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onUpload={handleUpload}
      />
    </DashboardLayout>
  );
}
