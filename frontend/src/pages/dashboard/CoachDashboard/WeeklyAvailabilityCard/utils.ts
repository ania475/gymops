export type DayData = {
  label: string;
  available: boolean;
};

export function buildDayData(weekdays: string[]): DayData[] {
  return weekdays.map((label, idx) => ({ label, available: idx < 5 }));
}
