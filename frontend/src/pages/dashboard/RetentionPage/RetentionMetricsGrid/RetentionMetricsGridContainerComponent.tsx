import type { KPIRecord } from "@/types";
import { RetentionMetricsGridPresentational } from "./RetentionMetricsGridPresentationalComponent";

type Props = {
  currentKPI: KPIRecord;
  previousKPI: KPIRecord;
};

export function RetentionMetricsGridContainer(props: Props) {
  return <RetentionMetricsGridPresentational {...props} />;
}
