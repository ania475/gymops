import { NearbyGymsFiltersPresentational } from "./NearbyGymsFiltersPresentationalComponent";

type Props = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedRadius: number;
  onRadiusChange: (radius: number) => void;
  selectedDisciplines: string[];
  onDisciplineToggle: (discipline: string) => void;
  onClearDisciplines: () => void;
  partnersOnly: boolean;
  onPartnersOnlyToggle: () => void;
  openNowOnly: boolean;
  onOpenNowOnlyToggle: () => void;
};

export function NearbyGymsFiltersContainer(props: Props) {
  return <NearbyGymsFiltersPresentational {...props} />;
}
