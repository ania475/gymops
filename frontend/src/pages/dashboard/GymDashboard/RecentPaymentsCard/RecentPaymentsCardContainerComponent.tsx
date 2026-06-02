import type { GymPayment } from "../types";
import { RecentPaymentsCardPresentational } from "./RecentPaymentsCardPresentationalComponent";

type Props = {
  payments: GymPayment[];
  memberNames: Record<string, string>;
};

export function RecentPaymentsCardContainer(props: Props) {
  return <RecentPaymentsCardPresentational {...props} />;
}
