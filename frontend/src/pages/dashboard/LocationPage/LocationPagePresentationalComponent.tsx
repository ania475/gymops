import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { MapPin } from "lucide-react";
import type { HoursState, LocationFormState, ListingFormState } from "./types";
import { BusinessHoursCardContainer } from "./BusinessHoursCard/BusinessHoursCardContainerComponent";
import { LocationDetailsCardContainer } from "./LocationDetailsCard/LocationDetailsCardContainerComponent";
import { PublicListingCardContainer } from "./PublicListingCard/PublicListingCardContainerComponent";

type Props = {
  locationForm: LocationFormState;
  hours: HoursState;
  listingForm: ListingFormState;
  isGymOpsPartner: boolean;
  onLocationFormChange: (form: LocationFormState) => void;
  onHoursChange: (hours: HoursState) => void;
  onListingFormChange: (form: ListingFormState) => void;
  onLocationSave: () => void;
  onHoursSave: () => void;
  onListingSave: () => void;
  onToggleDiscipline: (discipline: string) => void;
};

export function LocationPagePresentational({
  locationForm,
  hours,
  listingForm,
  isGymOpsPartner,
  onLocationFormChange,
  onHoursChange,
  onListingFormChange,
  onLocationSave,
  onHoursSave,
  onListingSave,
  onToggleDiscipline,
}: Props) {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Location & Listing
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your gym's location details and public listing on the GymOps
            directory.
          </p>
        </div>

        <LocationDetailsCardContainer
          form={locationForm}
          onFormChange={onLocationFormChange}
          onSave={onLocationSave}
        />

        <BusinessHoursCardContainer
          hours={hours}
          onHoursChange={onHoursChange}
          onSave={onHoursSave}
        />

        <PublicListingCardContainer
          form={listingForm}
          onFormChange={onListingFormChange}
          onToggleDiscipline={onToggleDiscipline}
          onSave={onListingSave}
        />

        {isGymOpsPartner && (
          <Card className="border-accent/30 bg-accent/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">GymOps Partner</p>
                  <p className="text-sm text-muted-foreground">
                    Your gym is featured in the GymOps partner network, giving
                    you priority placement in member searches.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
