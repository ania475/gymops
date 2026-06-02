import { MembersSummaryPresentational } from "./MembersSummaryPresentationalComponent";

type Props = {
  filteredCount: number;
  totalCount: number;
};

export function MembersSummaryContainer(props: Props) {
  return <MembersSummaryPresentational {...props} />;
}
