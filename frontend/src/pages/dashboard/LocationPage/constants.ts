export const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const DAY_KEYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const HOURS = Array.from({ length: 24 }, (_, i) => {
  const h = i.toString().padStart(2, "0");
  return `${h}:00`;
});

export const ALL_DISCIPLINES = [
  "MMA",
  "Boxing",
  "Muay Thai",
  "BJJ",
  "Wrestling",
  "Kickboxing",
  "Judo",
  "Karate",
  "Taekwondo",
  "Capoeira",
  "Sambo",
  "Grappling",
];
