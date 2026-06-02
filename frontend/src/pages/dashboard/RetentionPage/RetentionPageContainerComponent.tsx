import { useAuth } from "@/contexts/AuthContext";
import { mockKPIs } from "@/data/mockData";
import { RetentionPagePresentational } from "./RetentionPagePresentationalComponent";

export default function RetentionPageContainer() {
  const { gym } = useAuth();
  const currentKPI = mockKPIs[0];
  const previousKPI = mockKPIs[1];

  const hasAccess = gym?.plan === "growth" || gym?.plan === "pro";

  return (
    <RetentionPagePresentational
      hasAccess={hasAccess}
      currentKPI={currentKPI}
      previousKPI={previousKPI}
    />
  );
}
