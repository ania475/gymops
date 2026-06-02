import { useAuth } from "@/contexts/AuthContext";
import { mockCoaches, mockVideos } from "@/data/mockData";
import { MOCK_MEMBERSHIP, UPCOMING_CLASSES } from "./constants";
import { MemberDashboardPresentational } from "./MemberDashboardPresentationalComponent";

export default function MemberDashboardContainer() {
  const { user, gym } = useAuth();
  const recentVideos = mockVideos.slice(0, 3);
  const coaches = mockCoaches.slice(0, 3);

  return (
    <MemberDashboardPresentational
      userName={user?.name}
      gymName={gym?.name}
      membership={MOCK_MEMBERSHIP}
      upcomingClasses={UPCOMING_CLASSES}
      coaches={coaches}
      recentVideos={recentVideos}
    />
  );
}
