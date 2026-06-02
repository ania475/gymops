import { DashboardLayout } from "@/components/layout/DashboardLayout";
import type { ClassItem, Coach, Membership, Video } from "./types";
import { BookACoachCardContainer } from "./BookACoachCard/BookACoachCardContainerComponent";
import { MemberDashboardHeaderContainer } from "./MemberDashboardHeader/MemberDashboardHeaderContainerComponent";
import { MembershipStatusCardContainer } from "./MembershipStatusCard/MembershipStatusCardContainerComponent";
import { RecentVideosCardContainer } from "./RecentVideosCard/RecentVideosCardContainerComponent";
import { UpcomingClassesCardContainer } from "./UpcomingClassesCard/UpcomingClassesCardContainerComponent";

type Props = {
  userName: string | undefined;
  gymName: string | undefined;
  membership: Membership;
  upcomingClasses: ClassItem[];
  coaches: Coach[];
  recentVideos: Video[];
};

export function MemberDashboardPresentational({
  userName,
  gymName,
  membership,
  upcomingClasses,
  coaches,
  recentVideos,
}: Props) {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <MemberDashboardHeaderContainer userName={userName} gymName={gymName} />
        <MembershipStatusCardContainer membership={membership} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UpcomingClassesCardContainer classes={upcomingClasses} />
          <BookACoachCardContainer coaches={coaches} />
        </div>
        <RecentVideosCardContainer videos={recentVideos} />
      </div>
    </DashboardLayout>
  );
}
