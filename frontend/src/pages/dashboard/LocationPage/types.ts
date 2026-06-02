export interface HoursState {
  [day: string]: { open: string; close: string; closed: boolean };
}

export interface LocationFormState {
  address: string;
  phone: string;
  email: string;
  website: string;
}

export interface ListingFormState {
  isPublicListing: boolean;
  description: string;
  disciplines: string[];
}
