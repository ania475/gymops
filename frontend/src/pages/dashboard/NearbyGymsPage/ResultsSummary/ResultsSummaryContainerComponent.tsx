import { ResultsSummaryPresentational } from "./ResultsSummaryPresentationalComponent";

type Props = {
  count: number;
  radius: number;
};

export function ResultsSummaryContainer(props: Props) {
  return <ResultsSummaryPresentational {...props} />;
}
