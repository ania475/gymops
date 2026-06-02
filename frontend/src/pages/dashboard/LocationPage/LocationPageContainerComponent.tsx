import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { DAY_KEYS } from "./constants";
import type { HoursState, LocationFormState, ListingFormState } from "./types";
import { buildDefaultHours } from "./utils";
import { LocationPagePresentational } from "./LocationPagePresentationalComponent";

export default function LocationPageContainer() {
  const { gym, updateGym } = useAuth();

  const [locationForm, setLocationForm] = useState<LocationFormState>({
    address: gym?.address ?? "",
    phone: gym?.phone ?? "",
    email: gym?.email ?? "",
    website: gym?.website ?? "",
  });

  const [hours, setHours] = useState<HoursState>(() =>
    buildDefaultHours(gym?.openingHours),
  );

  const [listingForm, setListingForm] = useState<ListingFormState>({
    isPublicListing: gym?.isPublicListing ?? false,
    description: gym?.description ?? "",
    disciplines: gym?.disciplines ?? [],
  });

  function handleLocationSave() {
    updateGym(locationForm);
    toast.success("Location details saved");
  }

  function handleHoursSave() {
    const openingHours: Record<string, { open: string; close: string } | null> =
      {};
    DAY_KEYS.forEach((day) => {
      openingHours[day] = hours[day].closed
        ? null
        : { open: hours[day].open, close: hours[day].close };
    });
    updateGym({ openingHours });
    toast.success("Business hours saved");
  }

  function handleListingSave() {
    updateGym({
      isPublicListing: listingForm.isPublicListing,
      description: listingForm.description,
      disciplines: listingForm.disciplines,
    });
    toast.success("Listing updated");
  }

  function toggleDiscipline(d: string) {
    setListingForm((prev) => ({
      ...prev,
      disciplines: prev.disciplines.includes(d)
        ? prev.disciplines.filter((x) => x !== d)
        : [...prev.disciplines, d],
    }));
  }

  return (
    <LocationPagePresentational
      locationForm={locationForm}
      hours={hours}
      listingForm={listingForm}
      isGymOpsPartner={gym?.isGymOpsPartner ?? false}
      onLocationFormChange={setLocationForm}
      onHoursChange={setHours}
      onListingFormChange={setListingForm}
      onLocationSave={handleLocationSave}
      onHoursSave={handleHoursSave}
      onListingSave={handleListingSave}
      onToggleDiscipline={toggleDiscipline}
    />
  );
}
