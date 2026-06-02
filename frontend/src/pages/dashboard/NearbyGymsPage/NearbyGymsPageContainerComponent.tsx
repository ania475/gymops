import { useCallback, useEffect, useState } from "react";
import { MOCK_NEARBY_GYMS } from "./constants";
import type { NearbyGym } from "./types";
import { NearbyGymsPagePresentational } from "./NearbyGymsPagePresentationalComponent";

export default function NearbyGymsPageContainer() {
  const [viewMode, setViewMode] = useState<"map" | "list">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRadius, setSelectedRadius] = useState(10);
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([]);
  const [partnersOnly, setPartnersOnly] = useState(false);
  const [openNowOnly, setOpenNowOnly] = useState(false);
  const [savedGyms, setSavedGyms] = useState<string[]>([]);
  const [selectedGym, setSelectedGym] = useState<NearbyGym | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
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
        setLocationError("Unable to get your location. Please enter it manually.");
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }, []);

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  const filteredGyms = MOCK_NEARBY_GYMS.filter((gym) => {
    if (searchQuery && !gym.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (gym.distance > selectedRadius) return false;
    if (selectedDisciplines.length > 0 && !gym.disciplines.some((d) => selectedDisciplines.includes(d))) return false;
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
      prev.includes(discipline) ? prev.filter((d) => d !== discipline) : [...prev, discipline],
    );
  };

  const clearAllFilters = () => {
    setSelectedDisciplines([]);
    setPartnersOnly(false);
    setOpenNowOnly(false);
  };

  return (
    <NearbyGymsPagePresentational
      viewMode={viewMode}
      onViewModeChange={setViewMode}
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
      onClearAllFilters={clearAllFilters}
      filteredGyms={filteredGyms}
      savedGyms={savedGyms}
      onToggleSaveGym={toggleSaveGym}
      selectedGym={selectedGym}
      onSelectGym={setSelectedGym}
      isLocating={isLocating}
      locationError={locationError}
      onRetryLocation={requestLocation}
    />
  );
}
