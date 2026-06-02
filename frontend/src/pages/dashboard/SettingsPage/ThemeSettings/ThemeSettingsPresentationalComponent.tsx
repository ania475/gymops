import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Paintbrush, RotateCcw } from "lucide-react";
import type { ThemeConfig } from "@/hooks/useTheme";
import { THEME_CONTROLS } from "../constants";

type Props = {
  colors: ThemeConfig;
  onColorChange: (key: keyof ThemeConfig, hex: string) => void;
  onSave: () => void;
  onReset: () => void;
};

export function ThemeSettingsPresentational({
  colors,
  onColorChange,
  onSave,
  onReset,
}: Props) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Paintbrush className="w-5 h-5 text-accent" />
            Dashboard Theme
          </CardTitle>
          <CardDescription>
            Customise your dashboard to match your gym's brand. Changes apply
            live as you pick colours.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {THEME_CONTROLS.map(({ key, label, description }) => (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor={`color-${key}`} className="font-medium">
                      {label}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-md border border-border shadow-sm"
                      style={{ backgroundColor: colors[key] }}
                    />
                    <input
                      id={`color-${key}`}
                      type="color"
                      value={colors[key]}
                      onChange={(e) => onColorChange(key, e.target.value)}
                      className="w-8 h-8 rounded cursor-pointer border-0 p-0 bg-transparent"
                      style={{ appearance: "none" }}
                    />
                  </div>
                </div>
                <div
                  className="h-2 rounded-full"
                  style={{
                    backgroundColor: colors[key],
                    border: "1px solid hsl(var(--border))",
                  }}
                />
              </div>
            ))}
          </div>

          <Separator />

          <div className="space-y-2">
            <Label className="text-sm font-medium">Preview</Label>
            <div
              className="rounded-lg p-4 space-y-2 border"
              style={{
                backgroundColor: colors.background,
                borderColor: "hsl(var(--border))",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-32 h-16 rounded-md flex items-center justify-center text-xs font-medium"
                  style={{ backgroundColor: colors.sidebarPrimary, color: "#ffffff" }}
                >
                  Sidebar
                </div>
                <div className="flex-1 space-y-2">
                  <div
                    className="rounded p-2 text-xs"
                    style={{
                      backgroundColor: colors.card,
                      color: colors.foreground,
                      border: "1px solid hsl(var(--border))",
                    }}
                  >
                    Card background ·{" "}
                    <span style={{ color: colors.foreground }}>
                      Text colour
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <div
                      className="rounded px-3 py-1 text-xs font-medium"
                      style={{ backgroundColor: colors.primary, color: "#ffffff" }}
                    >
                      Primary Button
                    </div>
                    <div
                      className="rounded px-3 py-1 text-xs font-medium"
                      style={{ backgroundColor: colors.accent, color: "#ffffff" }}
                    >
                      Accent Badge
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <Button variant="outline" onClick={onReset} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Reset to Defaults
            </Button>
            <Button onClick={onSave}>Save Theme</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
