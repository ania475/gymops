import type { NearbyGym } from "../types";
import { MapViewPresentational } from "./MapViewPresentationalComponent";

type Props = {
  gyms: NearbyGym[];
  selectedGym: NearbyGym | null;
  onSelectGym: (gym: NearbyGym) => void;
  savedGymIds: string[];
  onToggleSave: (gymId: string) => void;
  isLocating: boolean;
};

export function MapViewContainer(props: Props) {
  return <MapViewPresentational {...props} />;
}
