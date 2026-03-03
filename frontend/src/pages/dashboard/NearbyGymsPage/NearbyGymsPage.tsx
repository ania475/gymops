import { useCallback, useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MOCK_NEARBY_GYMS } from "./constants";
import { ActiveFiltersBar } from "./ActiveFiltersBar";
import { GymListView } from "./GymListView";
import { LocationErrorBanner } from "./LocationErrorBanner";
import { MapView } from "./MapView";
import { NearbyGymsFilters } from "./NearbyGymsFilters";
import { NearbyGymsPageHeader } from "./NearbyGymsPageHeader";
import { ResultsSummary } from "./ResultsSummary";
import type { NearbyGym } from "./types";

export default function NearbyGymsPage() {
  const [viewMode, setViewMode] = useState<"map" | "list">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRadius, setSelectedRadius] = useState(10);
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([]);
  const [partnersOnly, setPartnersOnly] = useState(false);
  const [openNowOnly, setOpenNowOnly] = useState(false);
  const [savedGyms, setSavedGyms] = useState<string[]>([]);
  const [selectedGym, setSelectedGym] = useState<NearbyGym | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [, setUserLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [locationError, setLocationError] = useState<string | null>(null);

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
      () => {
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

  const filteredGyms = MOCK_NEARBY_GYMS.filter((gym) => {
    if (
      searchQuery &&
      !gym.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    if (gym.distance > selectedRadius) return false;
    if (
      selectedDisciplines.length > 0 &&
      !gym.disciplines.some((d) => selectedDisciplines.includes(d))
    ) {
      return false;
    }
    if (partnersOnly && !gym.isGymOpsPartner) return false;
    if (openNowOnly && !gym.isOpen) return false;
    return true;
  });

  const toggleSaveGym = (gymId: string) => {
    setSavedGyms((prev) =>
      prev.includes(gymId) ? prev.filter((id) => id !== gymId) : [...prev, gymId],
    );
  };

  const toggleDiscipline = (discipline: string) => {
    setSelectedDisciplines((prev) =>
      prev.includes(discipline)
        ? prev.filter((d) => d !== discipline)
        : [...prev, discipline],
    );
  };

  const clearAllFilters = () => {
    setSelectedDisciplines([]);
    setPartnersOnly(false);
    setOpenNowOnly(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <NearbyGymsPageHeader
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {locationError && (
          <LocationErrorBanner
            message={locationError}
            onRetry={requestLocation}
          />
        )}

        <NearbyGymsFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedRadius={selectedRadius}
          onRadiusChange={setSelectedRadius}
          selectedDisciplines={selectedDisciplines}
          onDisciplineToggle={toggleDiscipline}
          onClearDisciplines={() => setSelectedDisciplines([])}
          partnersOnly={partnersOnly}
          onPartnersOnlyToggle={() => setPartnersOnly(!partnersOnly)}
          openNowOnly={openNowOnly}
          onOpenNowOnlyToggle={() => setOpenNowOnly(!openNowOnly)}
        />

        <ActiveFiltersBar
          selectedDisciplines={selectedDisciplines}
          onRemoveDiscipline={toggleDiscipline}
          partnersOnly={partnersOnly}
          onClearPartnersOnly={() => setPartnersOnly(false)}
          openNowOnly={openNowOnly}
          onClearOpenNowOnly={() => setOpenNowOnly(false)}
          onClearAll={clearAllFilters}
        />

        {viewMode === "map" ? (
          <MapView
            gyms={filteredGyms}
            selectedGym={selectedGym}
            onSelectGym={setSelectedGym}
            savedGymIds={savedGyms}
            onToggleSave={toggleSaveGym}
            isLocating={isLocating}
          />
        ) : (
          <GymListView
            gyms={filteredGyms}
            savedGymIds={savedGyms}
            onToggleSave={toggleSaveGym}
          />
        )}

        <ResultsSummary count={filteredGyms.length} radius={selectedRadius} />
      </div>
    </DashboardLayout>
  );
}
