export type Membership = {
  plan: string;
  status: string;
  nextRenewal: Date;
  monthlyPrice: number;
};

export type Coach = {
  id: string;
  name: string;
  avatarUrl?: string | null;
  coachProfile: { specialties: string[]; sessionPrice?: number };
};

export type Video = {
  id: string;
  title: string;
  category: string;
  thumbnailUrl?: string;
  duration?: number;
};

export type ClassItem = {
  name: string;
  time: string;
  coach: string;
  day: string;
};
