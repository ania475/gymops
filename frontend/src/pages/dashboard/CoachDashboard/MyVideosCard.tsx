import { Button } from "@/components/ui/button";
import { Plus, Video } from "lucide-react";

type VideoItem = {
  id: string;
  title: string;
  category: string;
  thumbnailUrl?: string;
  duration?: number;
  visibility?: string;
};

type MyVideosCardProps = {
  videos: VideoItem[];
};

export function MyVideosCard({ videos }: MyVideosCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-semibold">My Videos</h2>
        <Button variant="ghost" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Upload
        </Button>
      </div>

      <div className="space-y-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="flex gap-4 p-4 rounded-lg bg-secondary/50"
          >
            <div className="w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={video.thumbnailUrl ?? ""}
                alt={video.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm line-clamp-1">
                {video.title}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {video.category}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-muted-foreground">
                  {Math.floor((video.duration || 0) / 60)} min
                </span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground capitalize">
                  {video.visibility}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button variant="outline" className="w-full mt-4">
        <Video className="w-4 h-4 mr-2" />
        Upload New Video
      </Button>
    </div>
  );
}
