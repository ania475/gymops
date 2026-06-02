import type { Video } from "../types";
import { RecentVideosCardPresentational } from "./RecentVideosCardPresentationalComponent";

type Props = {
  videos: Video[];
};

export function RecentVideosCardContainer(props: Props) {
  return <RecentVideosCardPresentational {...props} />;
}
