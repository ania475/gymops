export type GymPayment = {
  id: string;
  userId: string;
  amount: number;
  type: string;
  createdAt: Date;
};

export type MemberWithPlan = {
  id: string;
  name: string;
  plan: { name: string; monthlyPrice: number };
  profile: { nextRenewalDate: Date };
};
