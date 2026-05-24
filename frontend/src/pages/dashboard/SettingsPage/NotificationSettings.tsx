import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bell } from "lucide-react";
import { toast } from "sonner";

interface NotifConfig {
  newMemberSignup: boolean;
  renewalReminder: boolean;
  paymentReceived: boolean;
  weeklySummary: boolean;
  memberCancellation: boolean;
  lowAttendanceAlert: boolean;
}

const DEFAULT_CONFIG: NotifConfig = {
  newMemberSignup: true,
  renewalReminder: true,
  paymentReceived: true,
  weeklySummary: true,
  memberCancellation: false,
  lowAttendanceAlert: false,
};

const CONTROLS: {
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
    description:
      "A weekly digest of new members, revenue, and retention stats",
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

function storageKey(userId: string) {
  return `gymops_notifs_${userId}`;
}

export default function NotificationSettings() {
  const { user } = useAuth();

  const [config, setConfig] = useState<NotifConfig>(() => {
    if (!user?.id) return DEFAULT_CONFIG;
    try {
      const raw = localStorage.getItem(storageKey(user.id));
      return raw ? { ...DEFAULT_CONFIG, ...JSON.parse(raw) } : DEFAULT_CONFIG;
    } catch {
      return DEFAULT_CONFIG;
    }
  });

  useEffect(() => {
    if (!user?.id) return;
    try {
      const raw = localStorage.getItem(storageKey(user.id));
      if (raw) setConfig({ ...DEFAULT_CONFIG, ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
  }, [user?.id]);

  function toggle(key: keyof NotifConfig) {
    setConfig((p) => ({ ...p, [key]: !p[key] }));
  }

  function handleSave() {
    if (!user?.id) return;
    localStorage.setItem(storageKey(user.id), JSON.stringify(config));
    toast.success("Notification preferences saved");
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-accent" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Choose which events trigger email notifications for your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-1">
          {CONTROLS.map(({ key, label, description }, i) => (
            <div key={key}>
              {i > 0 && <Separator className="my-3" />}
              <div className="flex items-center justify-between py-1">
                <div className="space-y-0.5">
                  <Label
                    htmlFor={`notif-${key}`}
                    className="text-sm font-medium cursor-pointer"
                  >
                    {label}
                  </Label>
                  <p className="text-xs text-muted-foreground">{description}</p>
                </div>
                <Switch
                  id={`notif-${key}`}
                  checked={config[key]}
                  onCheckedChange={() => toggle(key)}
                />
              </div>
            </div>
          ))}
          <div className="flex justify-end pt-4">
            <Button onClick={handleSave}>Save Preferences</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
