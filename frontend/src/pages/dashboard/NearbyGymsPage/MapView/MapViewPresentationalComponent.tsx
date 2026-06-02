import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Heart,
  Loader2,
  MapPin,
  Map as MapIcon,
  Phone,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { NearbyGym } from "../types";

type Props = {
  gyms: NearbyGym[];
  selectedGym: NearbyGym | null;
  onSelectGym: (gym: NearbyGym) => void;
  savedGymIds: string[];
  onToggleSave: (gymId: string) => void;
  isLocating: boolean;
};

export function MapViewPresentational({
  gyms,
  selectedGym,
  onSelectGym,
  savedGymIds,
  onToggleSave,
  isLocating,
}: Props) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="aspect-[16/9] lg:aspect-[21/9] bg-secondary flex items-center justify-center relative">
        {isLocating ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
            <p className="text-muted-foreground">Getting your location...</p>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapIcon className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">Interactive map coming soon</p>
              <p className="text-sm text-muted-foreground/70 mt-1">
                Switch to List view to see nearby gyms
              </p>
            </div>
          </div>
        )}

        {gyms.map((gym, idx) => (
          <div
            key={gym.id}
            className={cn(
              "absolute w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110",
              gym.isGymOpsPartner ? "bg-accent" : "bg-muted",
              selectedGym?.id === gym.id && "ring-2 ring-white scale-110",
            )}
            style={{ left: `${20 + idx * 15}%`, top: `${30 + idx * 10}%` }}
            onClick={() => onSelectGym(gym)}
          >
            <MapPin className="w-5 h-5 text-white" />
          </div>
        ))}
      </div>

      {selectedGym && (
        <div className="p-4 border-t border-border">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
              <MapPin className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-semibold">{selectedGym.name}</h3>
                    {selectedGym.isGymOpsPartner && (
                      <Badge className="bg-accent text-accent-foreground text-xs">Partner</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedGym.address}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => onToggleSave(selectedGym.id)}>
                  <Heart
                    className={cn(
                      "w-5 h-5",
                      savedGymIds.includes(selectedGym.id)
                        ? "fill-destructive text-destructive"
                        : "text-muted-foreground",
                    )}
                  />
                </Button>
              </div>
              <div className="flex items-center gap-4 mt-2 text-sm">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-warning text-warning" />
                  {selectedGym.rating} ({selectedGym.reviewCount})
                </span>
                <span className="text-muted-foreground">{selectedGym.distance} km away</span>
                <span
                  className={cn(
                    "text-xs font-medium",
                    selectedGym.isOpen ? "text-success" : "text-muted-foreground",
                  )}
                >
                  {selectedGym.isOpen ? "Open now" : "Closed"}
                </span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedGym.disciplines.map((d) => (
                  <Badge key={d} variant="outline" className="text-xs">{d}</Badge>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                {selectedGym.isGymOpsPartner ? (
                  <Button size="sm" className="bg-highlight hover:bg-highlight/90 text-highlight-foreground">
                    Join / Request Info
                  </Button>
                ) : (
                  selectedGym.website && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={selectedGym.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="w-4 h-4 mr-2" />
                        Visit Website
                      </a>
                    </Button>
                  )
                )}
                {selectedGym.phone && (
                  <Button size="sm" variant="outline" asChild>
                    <a href={`tel:${selectedGym.phone}`}>
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
