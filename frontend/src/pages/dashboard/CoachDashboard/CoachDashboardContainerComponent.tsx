import { useState } from "react";
import { mockVideos } from "@/data/mockData";
import type { VideoContent } from "@/types";
import { COACH_STATS, UPCOMING_SESSIONS, WEEKDAYS } from "./constants";
import { CoachDashboardPresentational } from "./CoachDashboardPresentationalComponent";

export default function CoachDashboardContainer() {
  const [videos, setVideos] = useState<VideoContent[]>(mockVideos);
  const [uploadOpen, setUploadOpen] = useState(false);

  function handleUpload(video: VideoContent) {
    setVideos((prev) => [video, ...prev]);
  }

  return (
    <CoachDashboardPresentational
      videos={videos}
      stats={COACH_STATS}
      sessions={UPCOMING_SESSIONS}
      weekdays={WEEKDAYS}
      uploadOpen={uploadOpen}
      onOpenUpload={() => setUploadOpen(true)}
      onCloseUpload={() => setUploadOpen(false)}
      onUpload={handleUpload}
    />
  );
}
