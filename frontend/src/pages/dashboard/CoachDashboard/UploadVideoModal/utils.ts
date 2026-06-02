import type { VideoContent } from "@/types";
import type { Visibility } from "./constants";

export function createVideoContent(
  title: string,
  category: string,
  visibility: Visibility,
  file: File,
): VideoContent {
  return {
    id: crypto.randomUUID(),
    gymId: "gym-1",
    coachId: "coach-1",
    title: title.trim(),
    category,
    visibility,
    videoUrl: URL.createObjectURL(file),
    duration: 0,
    createdAt: new Date(),
  };
}
