import type { ClassItem } from "../types";
import { UpcomingClassesCardPresentational } from "./UpcomingClassesCardPresentationalComponent";

type Props = {
  classes: ClassItem[];
};

export function UpcomingClassesCardContainer(props: Props) {
  return <UpcomingClassesCardPresentational {...props} />;
}
