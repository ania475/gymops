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
import { PLAN_LABELS } from "../constants";

type GymForm = {
  name: string;
  email: string;
  phone: string;
  website: string;
};

type ProfileForm = {
  name: string;
  email: string;
};

type Props = {
  gymForm: GymForm;
  profileForm: ProfileForm;
  planKey: string;
  userRole: string;
  onGymFormChange: (form: GymForm) => void;
  onProfileFormChange: (form: ProfileForm) => void;
  onGymSave: () => void;
  onProfileSave: () => void;
};

export function GeneralSettingsPresentational({
  gymForm,
  profileForm,
  planKey,
  userRole,
  onGymFormChange,
  onProfileFormChange,
  onGymSave,
  onProfileSave,
}: Props) {
  const planInfo = PLAN_LABELS[planKey] ?? PLAN_LABELS.starter;

  return (
    <div className="space-y-6">
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
                  onGymFormChange({ ...gymForm, name: e.target.value })
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
                  onGymFormChange({ ...gymForm, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gym-phone">Phone Number</Label>
              <Input
                id="gym-phone"
                value={gymForm.phone}
                onChange={(e) =>
                  onGymFormChange({ ...gymForm, phone: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gym-website">Website</Label>
              <Input
                id="gym-website"
                value={gymForm.website}
                onChange={(e) =>
                  onGymFormChange({ ...gymForm, website: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <Button onClick={onGymSave}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>

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
                {planKey === "starter" &&
                  "Up to 100 members · 2 staff · Core features"}
                {planKey === "growth" &&
                  "Up to 500 members · 5 staff · Retention & KPI tools"}
                {planKey === "pro" &&
                  "Unlimited members · 20 staff · All features"}
              </p>
            </div>
            {planKey !== "pro" && (
              <Button variant="outline" size="sm">
                Upgrade Plan
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

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
                  onProfileFormChange({ ...profileForm, name: e.target.value })
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
                  onProfileFormChange({
                    ...profileForm,
                    email: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Role</Label>
            <div>
              <Badge variant="secondary" className="capitalize">
                {userRole.replace("_", " ")}
              </Badge>
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <Button onClick={onProfileSave}>Save Profile</Button>
          </div>
        </CardContent>
      </Card>

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
