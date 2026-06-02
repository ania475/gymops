import { GymDashboardHeaderPresentational } from "./GymDashboardHeaderPresentationalComponent";

type Props = {
  gymName?: string;
};

export function GymDashboardHeaderContainer(props: Props) {
  return <GymDashboardHeaderPresentational {...props} />;
}
