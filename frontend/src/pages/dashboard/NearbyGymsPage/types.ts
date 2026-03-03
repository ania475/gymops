export type NearbyGym = {
  id: string;
  name: string;
  address: string;
  distance: number;
  disciplines: string[];
  rating: number;
  reviewCount: number;
  isGymOpsPartner: boolean;
  isOpen: boolean;
  phone: string | null;
  website: string | null;
  latitude: number;
  longitude: number;
  logo: string | null;
};
