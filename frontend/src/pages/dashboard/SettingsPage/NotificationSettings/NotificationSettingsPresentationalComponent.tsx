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
import { NOTIFICATION_CONTROLS } from "../constants";
import type { NotifConfig } from "../types";

type Props = {
  config: NotifConfig;
  onToggle: (key: keyof NotifConfig) => void;
  onSave: () => void;
};

export function NotificationSettingsPresentational({
  config,
  onToggle,
  onSave,
}: Props) {
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
          {NOTIFICATION_CONTROLS.map(({ key, label, description }, i) => (
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
                  onCheckedChange={() => onToggle(key)}
                />
              </div>
            </div>
          ))}
          <div className="flex justify-end pt-4">
            <Button onClick={onSave}>Save Preferences</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
