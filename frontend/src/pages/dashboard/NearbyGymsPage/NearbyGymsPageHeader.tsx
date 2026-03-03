import { Button } from "@/components/ui/button";
import { List, Map as MapIcon } from "lucide-react";

type ViewMode = "map" | "list";

type NearbyGymsPageHeaderProps = {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
};

export function NearbyGymsPageHeader({
  viewMode,
  onViewModeChange,
}: NearbyGymsPageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="font-display text-3xl font-bold mb-2">
          Nearby Gyms
        </h1>
        <p className="text-muted-foreground">
          Discover combat sports gyms near you
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant={viewMode === "list" ? "default" : "outline"}
          size="sm"
          onClick={() => onViewModeChange("list")}
        >
          <List className="w-4 h-4 mr-2" />
          List
        </Button>
        <Button
          variant={viewMode === "map" ? "default" : "outline"}
          size="sm"
          onClick={() => onViewModeChange("map")}
        >
          <MapIcon className="w-4 h-4 mr-2" />
          Map
        </Button>
      </div>
    </div>
  );
}
