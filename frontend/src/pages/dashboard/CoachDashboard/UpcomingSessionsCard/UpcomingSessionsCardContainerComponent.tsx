import type { Session } from "./UpcomingSessionsCardPresentationalComponent";
import { UpcomingSessionsCardPresentational } from "./UpcomingSessionsCardPresentationalComponent";

type Props = {
  sessions: Session[];
};

export function UpcomingSessionsCardContainer({ sessions }: Props) {
  const hasPending = sessions.some((s) => s.status === "pending");
  return (
    <UpcomingSessionsCardPresentational sessions={sessions} hasPending={hasPending} />
  );
}
