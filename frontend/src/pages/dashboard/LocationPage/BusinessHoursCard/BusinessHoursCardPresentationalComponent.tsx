import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock } from "lucide-react";
import { DAYS, DAY_KEYS, HOURS } from "../constants";
import type { HoursState } from "../types";

type Props = {
  hours: HoursState;
  onHoursChange: (hours: HoursState) => void;
  onSave: () => void;
};

export function BusinessHoursCardPresentational({ hours, onHoursChange, onSave }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-accent" />
          Business Hours
        </CardTitle>
        <CardDescription>
          Set your opening hours for each day of the week.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {DAY_KEYS.map((day, i) => (
          <div
            key={day}
            className="grid grid-cols-[120px_1fr_1fr_auto] items-center gap-3"
          >
            <span className="text-sm font-medium text-foreground">
              {DAYS[i]}
            </span>
            {hours[day].closed ? (
              <span className="col-span-2 text-sm text-muted-foreground italic">
                Closed
              </span>
            ) : (
              <>
                <Select
                  value={hours[day].open}
                  onValueChange={(v) =>
                    onHoursChange({ ...hours, [day]: { ...hours[day], open: v } })
                  }
                >
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {HOURS.map((h) => (
                      <SelectItem key={h} value={h}>
                        {h}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={hours[day].close}
                  onValueChange={(v) =>
                    onHoursChange({ ...hours, [day]: { ...hours[day], close: v } })
                  }
                >
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {HOURS.map((h) => (
                      <SelectItem key={h} value={h}>
                        {h}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </>
            )}
            <Switch
              checked={!hours[day].closed}
              onCheckedChange={(checked) =>
                onHoursChange({
                  ...hours,
                  [day]: { ...hours[day], closed: !checked },
                })
              }
            />
          </div>
        ))}
        <div className="flex justify-end pt-2">
          <Button onClick={onSave}>Save Hours</Button>
        </div>
      </CardContent>
    </Card>
  );
}
