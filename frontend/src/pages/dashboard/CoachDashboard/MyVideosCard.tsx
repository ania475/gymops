import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import type { VideoContent } from "@/types";

const MAX_VISIBLE = 3;

type MyVideosCardProps = {
  videos: VideoContent[];
  onOpenUpload: () => void;
};

export function MyVideosCard({ videos, onOpenUpload }: MyVideosCardProps) {
  const visible = videos.slice(0, MAX_VISIBLE);
  const overflow = videos.length - MAX_VISIBLE;

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-semibold">My Videos</h2>
        <Button variant="ghost" size="sm">
          View all
        </Button>
      </div>

      <div className="space-y-4">
        {visible.map((video) => (
          <div
            key={video.id}
            className="flex gap-4 p-4 rounded-lg bg-secondary/50"
          >
            <div className="w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
              {video.thumbnailUrl ? (
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Video className="w-6 h-6 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm line-clamp-1">{video.title}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {video.category}
              </p>
              <div className="flex items-center gap-2 mt-2">
                {video.duration ? (
                  <>
                    <span className="text-xs text-muted-foreground">
                      {Math.floor(video.duration / 60)} min
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                  </>
                ) : null}
                <span className="text-xs text-muted-foreground capitalize">
                  {video.visibility}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {overflow > 0 && (
        <p className="text-xs text-muted-foreground text-center mt-3">
          +{overflow} more video{overflow > 1 ? "s" : ""}
        </p>
      )}

      <Button variant="outline" className="w-full mt-4" onClick={onOpenUpload}>
        <Video className="w-4 h-4 mr-2" />
        Upload New Video
      </Button>
    </div>
  );
}
