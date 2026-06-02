import { LocationErrorBannerPresentational } from "./LocationErrorBannerPresentationalComponent";

type Props = {
  message: string;
  onRetry: () => void;
};

export function LocationErrorBannerContainer(props: Props) {
  return <LocationErrorBannerPresentational {...props} />;
}
