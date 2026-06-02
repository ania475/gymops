import { MemberDashboardHeaderPresentational } from "./MemberDashboardHeaderPresentationalComponent";

type Props = {
  userName?: string;
  gymName?: string;
};

export function MemberDashboardHeaderContainer(props: Props) {
  return <MemberDashboardHeaderPresentational {...props} />;
}
