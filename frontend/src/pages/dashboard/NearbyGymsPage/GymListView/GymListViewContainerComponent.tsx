import type { NearbyGym } from "../types";
import { GymListViewPresentational } from "./GymListViewPresentationalComponent";

type Props = {
  gyms: NearbyGym[];
  savedGymIds: string[];
  onToggleSave: (gymId: string) => void;
};

export function GymListViewContainer(props: Props) {
  return <GymListViewPresentational {...props} />;
}
