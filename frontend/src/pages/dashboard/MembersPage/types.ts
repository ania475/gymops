import type { User, MemberProfile, MembershipPlan } from "@/types";

export type MemberWithProfile = User & {
  profile: MemberProfile;
  plan: MembershipPlan;
};

export type NewMemberFormData = {
  name: string;
  email: string;
  planType: string;
  planStartDate: string;
};
