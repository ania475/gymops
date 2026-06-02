import type { ThemeConfig } from "@/hooks/useTheme";

export interface NotifConfig {
  newMemberSignup: boolean;
  renewalReminder: boolean;
  paymentReceived: boolean;
  weeklySummary: boolean;
  memberCancellation: boolean;
  lowAttendanceAlert: boolean;
}

export interface ColorControl {
  key: keyof ThemeConfig;
  label: string;
  description: string;
}
