// Core types

export type UserRole =
  | "platform_admin"
  | "gym_manager"
  | "gym_admin"
  | "coach"
  | "member";

export type PlanTier = "starter" | "growth" | "pro";

export type MembershipStatus = "active" | "pending" | "expired" | "cancelled";

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export type PaymentType = "membership_renewal" | "session";

export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";

export type ContentType = "instructional" | "competition" | "live";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  gymId?: string;
  avatarUrl?: string;
  createdAt: Date;
}

export interface Gym {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  plan: PlanTier;
  address?: string;
  phone?: string;
  email: string;
  website?: string;
  sports: string[];
  disciplines: string[];
  createdAt: Date;
  // Location fields for Nearby Gyms
  latitude?: number;
  longitude?: number;
  isPublicListing: boolean;
  isGymOpsPartner: boolean;
  openingHours?: {
    [key: string]: { open: string; close: string } | null;
  };
  gallery?: string[];
  description?: string;
}

export interface MemberProfile {
  id: string;
  userId: string;
  gymId: string;
  membershipPlanId: string;
  startDate: Date;
  nextRenewalDate: Date;
  status: MembershipStatus;
  emergencyContact?: string;
  emergencyPhone?: string;
}

export interface MembershipPlan {
  id: string;
  gymId: string;
  name: string;
  monthlyPrice: number;
  description: string;
  perks: string[];
  isActive: boolean;
}

export interface Payment {
  id: string;
  userId: string;
  gymId: string;
  amount: number;
  type: PaymentType;
  status: PaymentStatus;
  stripePaymentId?: string;
  stripeInvoiceId?: string;
  createdAt: Date;
}

export interface EmailAutomationRule {
  id: string;
  gymId: string;
  type: "renewal_reminder" | "seasonal_promo" | "welcome" | "renewal_due";
  daysBefore?: number;
  template: string;
  subject: string;
  isActive: boolean;
}

export interface KPIRecord {
  id: string;
  gymId: string;
  month: string;
  totalMembers: number;
  newMembers: number;
  churnedMembers: number;
  retentionRate: number;
  revenue: number;
  notes?: string;
  churnReasons?: Record<string, number>;
}

export interface VideoContent {
  id: string;
  gymId: string;
  coachId?: string;
  title: string;
  description?: string;
  category: string;
  thumbnailUrl?: string;
  videoUrl: string;
  duration?: number;
  visibility: "public" | "members" | "private";
  createdAt: Date;
}

export interface CompetitionContent {
  id: string;
  gymId: string;
  title: string;
  date: Date;
  type: "recording" | "live";
  url: string;
  thumbnailUrl?: string;
  participants?: string[];
  description?: string;
}

export interface CoachProfile {
  id: string;
  userId: string;
  gymId?: string;
  bio: string;
  credentials: string[];
  specialties: string[];
  sessionPrice?: number;
  acceptsPayment: boolean;
  socialLinks?: {
    instagram?: string;
    youtube?: string;
    twitter?: string;
  };
}

export interface CoachAvailability {
  id: string;
  coachId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isRecurring: boolean;
}

export interface Booking {
  id: string;
  memberId: string;
  coachId: string;
  gymId: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  paymentStatus?: PaymentStatus;
  notes?: string;
  createdAt: Date;
}

// Member preferences for Nearby Gyms
export interface MemberPreferences {
  savedGyms: string[];
  defaultSearchRadius: number; // in km
  savedLocation?: {
    latitude: number;
    longitude: number;
    city?: string;
    postcode?: string;
  };
}

// Plan features configuration
export interface PlanFeatures {
  memberManagement: boolean;
  emailAutomation: boolean;
  stripePayments: boolean;
  retentionDashboard: boolean;
  kpiTracking: boolean;
  csvExport: boolean;
  memberAccounts: boolean;
  contentLibrary: boolean;
  competitionContent: boolean;
  coachDirectory: boolean;
  sessionBooking: boolean;
  maxMembers: number | "unlimited";
  maxStaff: number;
}

export const PLAN_FEATURES: Record<PlanTier, PlanFeatures> = {
  starter: {
    memberManagement: true,
    emailAutomation: true,
    stripePayments: true,
    retentionDashboard: false,
    kpiTracking: false,
    csvExport: false,
    memberAccounts: false,
    contentLibrary: false,
    competitionContent: false,
    coachDirectory: false,
    sessionBooking: false,
    maxMembers: 100,
    maxStaff: 2,
  },
  growth: {
    memberManagement: true,
    emailAutomation: true,
    stripePayments: true,
    retentionDashboard: true,
    kpiTracking: true,
    csvExport: true,
    memberAccounts: false,
    contentLibrary: false,
    competitionContent: false,
    coachDirectory: false,
    sessionBooking: false,
    maxMembers: 500,
    maxStaff: 5,
  },
  pro: {
    memberManagement: true,
    emailAutomation: true,
    stripePayments: true,
    retentionDashboard: true,
    kpiTracking: true,
    csvExport: true,
    memberAccounts: true,
    contentLibrary: true,
    competitionContent: true,
    coachDirectory: true,
    sessionBooking: true,
    maxMembers: "unlimited",
    maxStaff: 20,
  },
};

export const PLAN_PRICING: Record<
  PlanTier,
  { monthly: number; yearly: number }
> = {
  starter: { monthly: 49, yearly: 470 },
  growth: { monthly: 99, yearly: 950 },
  pro: { monthly: 199, yearly: 1910 },
};
