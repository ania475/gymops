import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Heart,
  MapPin,
  Navigation,
  Phone,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { NearbyGym } from "./types";

type GymListViewProps = {
  gyms: NearbyGym[];
  savedGymIds: string[];
  onToggleSave: (gymId: string) => void;
};

function GymCard({
  gym,
  isSaved,
  onToggleSave,
}: {
  gym: NearbyGym;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 hover:border-accent/30 transition-colors">
      <div className="flex items-start gap-4">
        <div className="w-20 h-20 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
          {gym.logo ? (
            <img
              src={gym.logo}
              alt={gym.name}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <MapPin className="w-8 h-8 text-muted-foreground" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-display text-lg font-semibold">
                  {gym.name}
                </h3>
                {gym.isGymOpsPartner && (
                  <Badge className="bg-accent text-accent-foreground text-xs">
                    GymOps Partner
                  </Badge>
                )}
                <span
                  className={cn(
                    "text-xs font-medium px-2 py-0.5 rounded-full",
                    gym.isOpen
                      ? "bg-success/20 text-success"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {gym.isOpen ? "Open" : "Closed"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {gym.address}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggleSave(gym.id)}
            >
              <Heart
                className={cn(
                  "w-5 h-5",
                  isSaved ? "fill-destructive text-destructive" : "text-muted-foreground",
                )}
              />
            </Button>
          </div>

          <div className="flex items-center gap-4 mt-2 text-sm">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-warning text-warning" />
              {gym.rating} ({gym.reviewCount} reviews)
            </span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <Navigation className="w-4 h-4" />
              {gym.distance} km
            </span>
          </div>

          <div className="flex flex-wrap gap-1 mt-3">
            {gym.disciplines.map((d) => (
              <Badge key={d} variant="outline" className="text-xs">
                {d}
              </Badge>
            ))}
          </div>

          <div className="flex gap-2 mt-4">
            {gym.isGymOpsPartner ? (
              <Button
                size="sm"
                className="bg-highlight hover:bg-highlight/90 text-highlight-foreground"
              >
                Join / Request Info
              </Button>
            ) : (
              gym.website && (
                <Button size="sm" variant="outline" asChild>
                  <a
                    href={gym.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Visit Website
                  </a>
                </Button>
              )
            )}
            {gym.phone && (
              <Button size="sm" variant="outline" asChild>
                <a href={`tel:${gym.phone}`}>
                  <Phone className="w-4 h-4 mr-2" />
                  {gym.phone}
                </a>
              </Button>
            )}
            <Button size="sm" variant="ghost">
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function GymListView({
  gyms,
  savedGymIds,
  onToggleSave,
}: GymListViewProps) {
  if (gyms.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-12 text-center">
        <MapPin className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
        <h3 className="font-display text-lg font-semibold mb-2">
          No gyms found
        </h3>
        <p className="text-muted-foreground text-sm">
          Try adjusting your filters or increasing the search radius.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {gyms.map((gym) => (
        <GymCard
          key={gym.id}
          gym={gym}
          isSaved={savedGymIds.includes(gym.id)}
          onToggleSave={onToggleSave}
        />
      ))}
    </div>
  );
}
