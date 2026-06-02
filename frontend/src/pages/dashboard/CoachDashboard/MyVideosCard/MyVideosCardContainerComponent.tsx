import type { VideoContent } from "@/types";
import { MAX_VIDEOS_VISIBLE } from "./constants";
import { MyVideosCardPresentational } from "./MyVideosCardPresentationalComponent";

type Props = {
  videos: VideoContent[];
  onOpenUpload: () => void;
};

export function MyVideosCardContainer({ videos, onOpenUpload }: Props) {
  const visible = videos.slice(0, MAX_VIDEOS_VISIBLE);
  const overflow = videos.length - MAX_VIDEOS_VISIBLE;
  return (
    <MyVideosCardPresentational
      visible={visible}
      overflow={overflow}
      onOpenUpload={onOpenUpload}
    />
  );
}
