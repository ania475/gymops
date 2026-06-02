import type { MemberWithPlan } from "../types";
import { UpcomingRenewalsCardPresentational } from "./UpcomingRenewalsCardPresentationalComponent";

type Props = {
  renewals: MemberWithPlan[];
};

export function UpcomingRenewalsCardContainer(props: Props) {
  return <UpcomingRenewalsCardPresentational {...props} />;
}
