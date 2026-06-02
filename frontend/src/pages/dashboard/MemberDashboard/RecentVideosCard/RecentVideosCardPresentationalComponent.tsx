import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import type { Video } from "../types";

type Props = {
  videos: Video[];
};

export function RecentVideosCardPresentational({ videos }: Props) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-semibold">New Training Videos</h2>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/dashboard/member/videos">View Library</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="group rounded-xl overflow-hidden border border-border bg-secondary/30 hover:border-accent/50 transition-all"
          >
            <div className="aspect-video relative overflow-hidden">
              <img
                src={video.thumbnailUrl ?? ""}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-2 left-2 flex items-center gap-1 text-xs text-foreground">
                <Clock className="w-3 h-3" />
                {Math.floor((video.duration || 0) / 60)}min
              </div>
            </div>
            <div className="p-4">
              <p className="font-medium text-sm line-clamp-2">{video.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{video.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
