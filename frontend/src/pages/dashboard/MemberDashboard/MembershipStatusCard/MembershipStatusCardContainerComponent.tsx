import type { Membership } from "../types";
import { MembershipStatusCardPresentational } from "./MembershipStatusCardPresentationalComponent";

type Props = {
  membership: Membership;
};

export function MembershipStatusCardContainer(props: Props) {
  return <MembershipStatusCardPresentational {...props} />;
}
