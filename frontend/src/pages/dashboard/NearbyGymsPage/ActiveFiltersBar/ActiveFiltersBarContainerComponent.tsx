import { ActiveFiltersBarPresentational } from "./ActiveFiltersBarPresentationalComponent";

type Props = {
  selectedDisciplines: string[];
  onRemoveDiscipline: (d: string) => void;
  partnersOnly: boolean;
  onClearPartnersOnly: () => void;
  openNowOnly: boolean;
  onClearOpenNowOnly: () => void;
  onClearAll: () => void;
};

export function ActiveFiltersBarContainer(props: Props) {
  return <ActiveFiltersBarPresentational {...props} />;
}
