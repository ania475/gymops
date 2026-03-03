export const MOCK_MEMBERSHIP = {
  plan: "Full Access",
  status: "active" as const,
  nextRenewal: new Date("2024-02-15"),
  monthlyPrice: 150,
};

export const UPCOMING_CLASSES = [
  {
    name: "Morning BJJ",
    time: "6:00 AM",
    coach: "Marcus Silva",
    day: "Tomorrow",
  },
  {
    name: "Boxing Fundamentals",
    time: "5:30 PM",
    coach: "Elena Volkov",
    day: "Wed",
  },
  {
    name: "Muay Thai Sparring",
    time: "7:00 PM",
    coach: "Tony Nguyen",
    day: "Thu",
  },
];
