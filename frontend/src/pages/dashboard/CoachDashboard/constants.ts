import type { Session } from "./UpcomingSessionsCard/UpcomingSessionsCardPresentationalComponent";
import type { CoachStats } from "./CoachStatsGrid/CoachStatsGridContainerComponent";

export const COACH_STATS: CoachStats = {
  totalBookings: 24,
  pendingBookings: 3,
  totalEarnings: 2150,
  videosUploaded: 8,
};

export const UPCOMING_SESSIONS: Session[] = [
  {
    id: 1,
    memberName: "Alex Thompson",
    date: "Today",
    time: "2:00 PM - 3:00 PM",
    type: "Private Session",
    status: "confirmed",
  },
  {
    id: 2,
    memberName: "Sarah Chen",
    date: "Tomorrow",
    time: "10:00 AM - 11:00 AM",
    type: "BJJ Fundamentals",
    status: "pending",
  },
  {
    id: 3,
    memberName: "Mike Rodriguez",
    date: "Wed, Jan 31",
    time: "4:00 PM - 5:00 PM",
    type: "Competition Prep",
    status: "confirmed",
  },
];

export const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
