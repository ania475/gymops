import { buildDayData } from "./utils";
import { WeeklyAvailabilityCardPresentational } from "./WeeklyAvailabilityCardPresentationalComponent";

type Props = {
  weekdays: string[];
};

export function WeeklyAvailabilityCardContainer({ weekdays }: Props) {
  const dayData = buildDayData(weekdays);
  return <WeeklyAvailabilityCardPresentational dayData={dayData} />;
}
