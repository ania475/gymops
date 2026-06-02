import type { NotifConfig, ColorControl } from "./types";

export const PLAN_LABELS: Record<string, { label: string; color: string }> = {
  starter: { label: "Starter", color: "bg-muted text-muted-foreground" },
  growth: { label: "Growth", color: "bg-highlight/20 text-highlight" },
  pro: { label: "Pro", color: "bg-accent/20 text-accent" },
};

export const DEFAULT_NOTIF_CONFIG: NotifConfig = {
  newMemberSignup: true,
  renewalReminder: true,
  paymentReceived: true,
  weeklySummary: true,
  memberCancellation: false,
  lowAttendanceAlert: false,
};

export const NOTIFICATION_CONTROLS: {
  key: keyof NotifConfig;
  label: string;
  description: string;
}[] = [
  {
    key: "newMemberSignup",
    label: "New Member Signup",
    description: "Get notified when a new member joins your gym",
  },
  {
    key: "renewalReminder",
    label: "Upcoming Renewal Reminders",
    description: "Alerts for memberships expiring in the next 7 days",
  },
  {
    key: "paymentReceived",
    label: "Payment Received",
    description: "Confirmation when a payment is successfully processed",
  },
  {
    key: "weeklySummary",
    label: "Weekly Summary Email",
    description: "A weekly digest of new members, revenue, and retention stats",
  },
  {
    key: "memberCancellation",
    label: "Member Cancellation",
    description: "Alert when a member cancels their membership",
  },
  {
    key: "lowAttendanceAlert",
    label: "Low Attendance Alert",
    description: "Notify when a member hasn't checked in for 14+ days",
  },
];

export const THEME_CONTROLS: ColorControl[] = [
  {
    key: "background",
    label: "Page Background",
    description: "Main content area background color",
  },
  {
    key: "foreground",
    label: "Text Color",
    description: "Primary text throughout the dashboard",
  },
  {
    key: "card",
    label: "Card Background",
    description: "Background of data cards and panels",
  },
  {
    key: "sidebarPrimary",
    label: "Sidebar Color",
    description: "Navigation sidebar background",
  },
  {
    key: "primary",
    label: "Brand / Primary",
    description: "Buttons and key interactive elements",
  },
  {
    key: "accent",
    label: "Accent Color",
    description: "Highlights, badges, and active states",
  },
];
