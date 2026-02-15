import { useState, useEffect, useCallback } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Search,
  List,
  Map as MapIcon,
  Filter,
  Star,
  Navigation,
  Phone,
  Globe,
  Heart,
  ChevronDown,
  X,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

// Mock gym data for Nearby Gyms feature
const mockNearbyGyms = [
  {
    id: "gym-1",
    name: "Iron Fist MMA Academy",
    address: "123 Fighter Way, Los Angeles, CA",
    distance: 0.8,
    disciplines: ["MMA", "Boxing", "Muay Thai", "BJJ"],
    rating: 4.8,
    reviewCount: 127,
    isGymOpsPartner: true,
    isOpen: true,
    phone: "(555) 123-4567",
    website: "https://ironfistmma.com",
    latitude: 34.0522,
    longitude: -118.2437,
    logo: null,
  },
  {
    id: "gym-2",
    name: "Apex Boxing Club",
    address: "456 Champion Ave, Los Angeles, CA",
    distance: 1.2,
    disciplines: ["Boxing", "Kickboxing"],
    rating: 4.6,
    reviewCount: 89,
    isGymOpsPartner: true,
    isOpen: true,
    phone: "(555) 234-5678",
    website: "https://apexboxing.com",
    latitude: 34.0548,
    longitude: -118.2501,
    logo: null,
  },
  {
    id: "gym-3",
    name: "Warrior BJJ",
    address: "789 Grappler St, Los Angeles, CA",
    distance: 2.4,
    disciplines: ["BJJ", "Wrestling", "Judo"],
    rating: 4.9,
    reviewCount: 203,
    isGymOpsPartner: false,
    isOpen: false,
    phone: "(555) 345-6789",
    website: null,
    latitude: 34.0611,
    longitude: -118.238,
    logo: null,
  },
  {
    id: "gym-4",
    name: "Elite Muay Thai",
    address: "321 Strike Lane, Los Angeles, CA",
    distance: 3.1,
    disciplines: ["Muay Thai", "Kickboxing"],
    rating: 4.5,
    reviewCount: 64,
    isGymOpsPartner: true,
    isOpen: true,
    phone: "(555) 456-7890",
    website: "https://elitemuaythai.com",
    latitude: 34.0412,
    longitude: -118.2615,
    logo: null,
  },
  {
    id: "gym-5",
    name: "Champion Wrestling Academy",
    address: "654 Takedown Blvd, Los Angeles, CA",
    distance: 4.8,
    disciplines: ["Wrestling", "MMA"],
    rating: 4.7,
    reviewCount: 156,
    isGymOpsPartner: false,
    isOpen: true,
    phone: "(555) 567-8901",
    website: "https://championwrestling.com",
    latitude: 34.0688,
    longitude: -118.2295,
    logo: null,
  },
];

const disciplines = [
  "MMA",
  "Boxing",
  "Muay Thai",
  "BJJ",
  "Wrestling",
  "Kickboxing",
  "Judo",
];
const radiusOptions = [2, 5, 10, 25, 50];

export default function NearbyGymsPage() {
  const [viewMode, setViewMode] = useState<"map" | "list">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRadius, setSelectedRadius] = useState(10);
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([]);
  const [partnersOnly, setPartnersOnly] = useState(false);
  const [openNowOnly, setOpenNowOnly] = useState(false);
  const [savedGyms, setSavedGyms] = useState<string[]>([]);
  const [selectedGym, setSelectedGym] = useState<
    (typeof mockNearbyGyms)[0] | null
  >(null);
  const [isLocating, setIsLocating] = useState(false);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Request geolocation
  const requestLocation = useCallback(() => {
    setIsLocating(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLocating(false);
      },
      (error) => {
        setLocationError(
          "Unable to get your location. Please enter it manually.",
        );
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }, []);

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  // Filter gyms
  const filteredGyms = mockNearbyGyms.filter((gym) => {
    if (
      searchQuery &&
      !gym.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    if (gym.distance > selectedRadius) {
      return false;
    }
    if (
      selectedDisciplines.length > 0 &&
      !gym.disciplines.some((d) => selectedDisciplines.includes(d))
    ) {
      return false;
    }
    if (partnersOnly && !gym.isGymOpsPartner) {
      return false;
    }
    if (openNowOnly && !gym.isOpen) {
      return false;
    }
    return true;
  });

  const toggleSaveGym = (gymId: string) => {
    setSavedGyms((prev) =>
      prev.includes(gymId)
        ? prev.filter((id) => id !== gymId)
        : [...prev, gymId],
    );
  };

  const toggleDiscipline = (discipline: string) => {
    setSelectedDisciplines((prev) =>
      prev.includes(discipline)
        ? prev.filter((d) => d !== discipline)
        : [...prev, discipline],
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
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
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4 mr-2" />
              List
            </Button>
            <Button
              variant={viewMode === "map" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("map")}
            >
              <MapIcon className="w-4 h-4 mr-2" />
              Map
            </Button>
          </div>
        </div>

        {/* Location Status */}
        {locationError && (
          <div className="p-4 rounded-lg bg-warning/10 border border-warning/30 flex items-center gap-3">
            <MapPin className="w-5 h-5 text-warning" />
            <div className="flex-1">
              <p className="text-sm text-warning font-medium">
                {locationError}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Enter your city or postcode below to search gyms in your area.
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={requestLocation}>
              Try Again
            </Button>
          </div>
        )}

        {/* Search & Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search gyms or enter location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {/* Radius Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Navigation className="w-4 h-4 mr-2" />
                  {selectedRadius} km
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {radiusOptions.map((radius) => (
                  <DropdownMenuItem
                    key={radius}
                    onClick={() => setSelectedRadius(radius)}
                  >
                    {radius} km
                    {selectedRadius === radius && (
                      <CheckCircle2 className="w-4 h-4 ml-auto text-accent" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Discipline Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Disciplines
                  {selectedDisciplines.length > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {selectedDisciplines.length}
                    </Badge>
                  )}
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {disciplines.map((discipline) => (
                  <DropdownMenuCheckboxItem
                    key={discipline}
                    checked={selectedDisciplines.includes(discipline)}
                    onCheckedChange={() => toggleDiscipline(discipline)}
                  >
                    {discipline}
                  </DropdownMenuCheckboxItem>
                ))}
                {selectedDisciplines.length > 0 && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => setSelectedDisciplines([])}
                    >
                      Clear all
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Partner Toggle */}
            <Button
              variant={partnersOnly ? "default" : "outline"}
              size="sm"
              onClick={() => setPartnersOnly(!partnersOnly)}
            >
              GymOps Partner
            </Button>

            {/* Open Now Toggle */}
            <Button
              variant={openNowOnly ? "default" : "outline"}
              size="sm"
              onClick={() => setOpenNowOnly(!openNowOnly)}
            >
              Open Now
            </Button>
          </div>
        </div>

        {/* Active Filters */}
        {(selectedDisciplines.length > 0 || partnersOnly || openNowOnly) && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Active filters:
            </span>
            {selectedDisciplines.map((d) => (
              <Badge key={d} variant="secondary" className="gap-1">
                {d}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => toggleDiscipline(d)}
                />
              </Badge>
            ))}
            {partnersOnly && (
              <Badge variant="secondary" className="gap-1">
                GymOps Partner
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => setPartnersOnly(false)}
                />
              </Badge>
            )}
            {openNowOnly && (
              <Badge variant="secondary" className="gap-1">
                Open Now
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => setOpenNowOnly(false)}
                />
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedDisciplines([]);
                setPartnersOnly(false);
                setOpenNowOnly(false);
              }}
            >
              Clear all
            </Button>
          </div>
        )}

        {/* Content */}
        {viewMode === "map" ? (
          /* Map View */
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="aspect-[16/9] lg:aspect-[21/9] bg-secondary flex items-center justify-center relative">
              {isLocating ? (
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="w-8 h-8 animate-spin text-accent" />
                  <p className="text-muted-foreground">
                    Getting your location...
                  </p>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapIcon className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Interactive map coming soon
                    </p>
                    <p className="text-sm text-muted-foreground/70 mt-1">
                      Switch to List view to see nearby gyms
                    </p>
                  </div>
                </div>
              )}

              {/* Mock gym pins */}
              {filteredGyms.map((gym, idx) => (
                <div
                  key={gym.id}
                  className={cn(
                    "absolute w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110",
                    gym.isGymOpsPartner ? "bg-accent" : "bg-muted",
                    selectedGym?.id === gym.id && "ring-2 ring-white scale-110",
                  )}
                  style={{
                    left: `${20 + idx * 15}%`,
                    top: `${30 + idx * 10}%`,
                  }}
                  onClick={() => setSelectedGym(gym)}
                >
                  <MapPin className="w-5 h-5 text-white" />
                </div>
              ))}
            </div>

            {/* Selected Gym Card */}
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
                          <h3 className="font-display font-semibold">
                            {selectedGym.name}
                          </h3>
                          {selectedGym.isGymOpsPartner && (
                            <Badge className="bg-accent text-accent-foreground text-xs">
                              Partner
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {selectedGym.address}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleSaveGym(selectedGym.id)}
                      >
                        <Heart
                          className={cn(
                            "w-5 h-5",
                            savedGyms.includes(selectedGym.id)
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
                      <span className="text-muted-foreground">
                        {selectedGym.distance} km away
                      </span>
                      <span
                        className={cn(
                          "text-xs font-medium",
                          selectedGym.isOpen
                            ? "text-success"
                            : "text-muted-foreground",
                        )}
                      >
                        {selectedGym.isOpen ? "Open now" : "Closed"}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {selectedGym.disciplines.map((d) => (
                        <Badge key={d} variant="outline" className="text-xs">
                          {d}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-4">
                      {selectedGym.isGymOpsPartner ? (
                        <Button
                          size="sm"
                          className="bg-highlight hover:bg-highlight/90 text-highlight-foreground"
                        >
                          Join / Request Info
                        </Button>
                      ) : (
                        selectedGym.website && (
                          <Button size="sm" variant="outline" asChild>
                            <a
                              href={selectedGym.website}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
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
        ) : (
          /* List View */
          <div className="space-y-4">
            {filteredGyms.length === 0 ? (
              <div className="rounded-xl border border-border bg-card p-12 text-center">
                <MapPin className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="font-display text-lg font-semibold mb-2">
                  No gyms found
                </h3>
                <p className="text-muted-foreground text-sm">
                  Try adjusting your filters or increasing the search radius.
                </p>
              </div>
            ) : (
              filteredGyms.map((gym) => (
                <div
                  key={gym.id}
                  className="rounded-xl border border-border bg-card p-4 hover:border-accent/30 transition-colors"
                >
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
                          onClick={() => toggleSaveGym(gym.id)}
                        >
                          <Heart
                            className={cn(
                              "w-5 h-5",
                              savedGyms.includes(gym.id)
                                ? "fill-destructive text-destructive"
                                : "text-muted-foreground",
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
              ))
            )}
          </div>
        )}

        {/* Results Count */}
        <p className="text-sm text-muted-foreground text-center">
          Showing {filteredGyms.length} gym
          {filteredGyms.length !== 1 ? "s" : ""} within {selectedRadius} km
        </p>
      </div>
    </DashboardLayout>
  );
}
