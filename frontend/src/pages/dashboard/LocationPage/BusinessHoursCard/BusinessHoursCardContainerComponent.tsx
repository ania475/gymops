import type { HoursState } from "../types";
import { BusinessHoursCardPresentational } from "./BusinessHoursCardPresentationalComponent";

type Props = {
  hours: HoursState;
  onHoursChange: (hours: HoursState) => void;
  onSave: () => void;
};

export function BusinessHoursCardContainer(props: Props) {
  return <BusinessHoursCardPresentational {...props} />;
}
