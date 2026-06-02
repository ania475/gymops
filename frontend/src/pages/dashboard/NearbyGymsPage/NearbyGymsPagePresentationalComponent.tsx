import { DashboardLayout } from "@/components/layout/DashboardLayout";
import type { NearbyGym } from "./types";
import { ActiveFiltersBarContainer } from "./ActiveFiltersBar/ActiveFiltersBarContainerComponent";
import { GymListViewContainer } from "./GymListView/GymListViewContainerComponent";
import { LocationErrorBannerContainer } from "./LocationErrorBanner/LocationErrorBannerContainerComponent";
import { MapViewContainer } from "./MapView/MapViewContainerComponent";
import { NearbyGymsFiltersContainer } from "./NearbyGymsFilters/NearbyGymsFiltersContainerComponent";
import { NearbyGymsPageHeaderContainer } from "./NearbyGymsPageHeader/NearbyGymsPageHeaderContainerComponent";
import { ResultsSummaryContainer } from "./ResultsSummary/ResultsSummaryContainerComponent";

type Props = {
  viewMode: "map" | "list";
  onViewModeChange: (mode: "map" | "list") => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedRadius: number;
  onRadiusChange: (radius: number) => void;
  selectedDisciplines: string[];
  onDisciplineToggle: (discipline: string) => void;
  onClearDisciplines: () => void;
  partnersOnly: boolean;
  onPartnersOnlyToggle: () => void;
  openNowOnly: boolean;
  onOpenNowOnlyToggle: () => void;
  onClearAllFilters: () => void;
  filteredGyms: NearbyGym[];
  savedGyms: string[];
  onToggleSaveGym: (gymId: string) => void;
  selectedGym: NearbyGym | null;
  onSelectGym: (gym: NearbyGym) => void;
  isLocating: boolean;
  locationError: string | null;
  onRetryLocation: () => void;
};

export function NearbyGymsPagePresentational({
  viewMode,
  onViewModeChange,
  searchQuery,
  onSearchChange,
  selectedRadius,
  onRadiusChange,
  selectedDisciplines,
  onDisciplineToggle,
  onClearDisciplines,
  partnersOnly,
  onPartnersOnlyToggle,
  openNowOnly,
  onOpenNowOnlyToggle,
  onClearAllFilters,
  filteredGyms,
  savedGyms,
  onToggleSaveGym,
  selectedGym,
  onSelectGym,
  isLocating,
  locationError,
  onRetryLocation,
}: Props) {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <NearbyGymsPageHeaderContainer
          viewMode={viewMode}
          onViewModeChange={onViewModeChange}
        />

        {locationError && (
          <LocationErrorBannerContainer
            message={locationError}
            onRetry={onRetryLocation}
          />
        )}

        <NearbyGymsFiltersContainer
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          selectedRadius={selectedRadius}
          onRadiusChange={onRadiusChange}
          selectedDisciplines={selectedDisciplines}
          onDisciplineToggle={onDisciplineToggle}
          onClearDisciplines={onClearDisciplines}
          partnersOnly={partnersOnly}
          onPartnersOnlyToggle={onPartnersOnlyToggle}
          openNowOnly={openNowOnly}
          onOpenNowOnlyToggle={onOpenNowOnlyToggle}
        />

        <ActiveFiltersBarContainer
          selectedDisciplines={selectedDisciplines}
          onRemoveDiscipline={onDisciplineToggle}
          partnersOnly={partnersOnly}
          onClearPartnersOnly={() => onPartnersOnlyToggle()}
          openNowOnly={openNowOnly}
          onClearOpenNowOnly={() => onOpenNowOnlyToggle()}
          onClearAll={onClearAllFilters}
        />

        {viewMode === "map" ? (
          <MapViewContainer
            gyms={filteredGyms}
            selectedGym={selectedGym}
            onSelectGym={onSelectGym}
            savedGymIds={savedGyms}
            onToggleSave={onToggleSaveGym}
            isLocating={isLocating}
          />
        ) : (
          <GymListViewContainer
            gyms={filteredGyms}
            savedGymIds={savedGyms}
            onToggleSave={onToggleSaveGym}
          />
        )}

        <ResultsSummaryContainer count={filteredGyms.length} radius={selectedRadius} />
      </div>
    </DashboardLayout>
  );
}
