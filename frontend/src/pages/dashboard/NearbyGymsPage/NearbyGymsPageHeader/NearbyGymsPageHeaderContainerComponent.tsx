import { NearbyGymsPageHeaderPresentational } from "./NearbyGymsPageHeaderPresentationalComponent";

type Props = {
  viewMode: "map" | "list";
  onViewModeChange: (mode: "map" | "list") => void;
};

export function NearbyGymsPageHeaderContainer(props: Props) {
  return <NearbyGymsPageHeaderPresentational {...props} />;
}
