import type { LocationFormState } from "../types";
import { LocationDetailsCardPresentational } from "./LocationDetailsCardPresentationalComponent";

type Props = {
  form: LocationFormState;
  onFormChange: (form: LocationFormState) => void;
  onSave: () => void;
};

export function LocationDetailsCardContainer(props: Props) {
  return <LocationDetailsCardPresentational {...props} />;
}
