import type { Coach } from "../types";
import { BookACoachCardPresentational } from "./BookACoachCardPresentationalComponent";

type Props = {
  coaches: Coach[];
};

export function BookACoachCardContainer(props: Props) {
  return <BookACoachCardPresentational {...props} />;
}
