import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Building2, CreditCard, User, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const PLAN_LABELS: Record<string, { label: string; color: string }> = {
  starter: { label: "Starter", color: "bg-muted text-muted-foreground" },
  growth: {
    label: "Growth",
    color: "bg-highlight/20 text-highlight",
  },
  pro: { label: "Pro", color: "bg-accent/20 text-accent" },
};

export default function GeneralSettings() {
  const { gym, user, updateGym } = useAuth();

  const [gymForm, setGymForm] = useState({
    name: gym?.name ?? "",
    email: gym?.email ?? "",
    phone: gym?.phone ?? "",
    website: gym?.website ?? "",
  });

  const [profileForm, setProfileForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
  });

  function handleGymSave() {
    updateGym(gymForm);
    toast.success("Gym information saved");
  }

  const planInfo = PLAN_LABELS[gym?.plan ?? "starter"];

  return (
    <div className="space-y-6">
      {/* Gym Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-accent" />
            Gym Information
          </CardTitle>
          <CardDescription>
            Update your gym's public-facing details.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gym-name">Gym Name</Label>
              <Input
                id="gym-name"
                value={gymForm.name}
                onChange={(e) =>
                  setGymForm((p) => ({ ...p, name: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gym-email">Contact Email</Label>
              <Input
                id="gym-email"
                type="email"
                value={gymForm.email}
                onChange={(e) =>
                  setGymForm((p) => ({ ...p, email: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gym-phone">Phone Number</Label>
              <Input
                id="gym-phone"
                value={gymForm.phone}
                onChange={(e) =>
                  setGymForm((p) => ({ ...p, phone: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gym-website">Website</Label>
              <Input
                id="gym-website"
                value={gymForm.website}
                onChange={(e) =>
                  setGymForm((p) => ({ ...p, website: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <Button onClick={handleGymSave}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>

      {/* Subscription Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-accent" />
            Subscription Plan
          </CardTitle>
          <CardDescription>
            Your current plan and billing overview.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">
                  {planInfo.label} Plan
                </span>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${planInfo.color}`}
                >
                  Active
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {gym?.plan === "starter" &&
                  "Up to 100 members · 2 staff · Core features"}
                {gym?.plan === "growth" &&
                  "Up to 500 members · 5 staff · Retention & KPI tools"}
                {gym?.plan === "pro" &&
                  "Unlimited members · 20 staff · All features"}
              </p>
            </div>
            {gym?.plan !== "pro" && (
              <Button variant="outline" size="sm">
                Upgrade Plan
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Account Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-accent" />
            Your Profile
          </CardTitle>
          <CardDescription>Your personal account details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="profile-name">Full Name</Label>
              <Input
                id="profile-name"
                value={profileForm.name}
                onChange={(e) =>
                  setProfileForm((p) => ({ ...p, name: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-email">Email Address</Label>
              <Input
                id="profile-email"
                type="email"
                value={profileForm.email}
                onChange={(e) =>
                  setProfileForm((p) => ({ ...p, email: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Role</Label>
            <div>
              <Badge variant="secondary" className="capitalize">
                {user?.role?.replace("_", " ")}
              </Badge>
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <Button
              onClick={() => toast.success("Profile updated")}
            >
              Save Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="w-5 h-5" />
            Danger Zone
          </CardTitle>
          <CardDescription>
            Irreversible actions. Proceed with caution.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                Delete Account
              </p>
              <p className="text-xs text-muted-foreground">
                Permanently delete your account and all associated data.
              </p>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <Button variant="destructive" size="sm" disabled>
                    Delete Account
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent>
                Contact support to delete your account.
              </TooltipContent>
            </Tooltip>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
