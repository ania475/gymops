import type { ListingFormState } from "../types";
import { PublicListingCardPresentational } from "./PublicListingCardPresentationalComponent";

type Props = {
  form: ListingFormState;
  onFormChange: (form: ListingFormState) => void;
  onToggleDiscipline: (discipline: string) => void;
  onSave: () => void;
};

export function PublicListingCardContainer(props: Props) {
  return <PublicListingCardPresentational {...props} />;
}
