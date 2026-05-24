import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
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
import { MapPin, Phone, Mail, Globe, Clock, Eye, X } from "lucide-react";
import { toast } from "sonner";
import type { Gym } from "@/types";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const DAY_KEYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

const HOURS = Array.from({ length: 24 }, (_, i) => {
  const h = i.toString().padStart(2, "0");
  return `${h}:00`;
});

const ALL_DISCIPLINES = [
  "MMA", "Boxing", "Muay Thai", "BJJ", "Wrestling", "Kickboxing",
  "Judo", "Karate", "Taekwondo", "Capoeira", "Sambo", "Grappling",
];

interface HoursState {
  [day: string]: { open: string; close: string; closed: boolean };
}

function buildDefaultHours(existing?: Gym["openingHours"]): HoursState {
  return Object.fromEntries(
    DAY_KEYS.map((day) => {
      const saved = existing?.[day];
      if (saved === null) return [day, { open: "06:00", close: "22:00", closed: true }];
      if (saved) return [day, { open: saved.open, close: saved.close, closed: false }];
      const isWeekend = day === "saturday" || day === "sunday";
      return [day, { open: isWeekend ? "08:00" : "06:00", close: "22:00", closed: false }];
    }),
  );
}

export default function LocationPage() {
  const { gym, updateGym } = useAuth();

  const [locationForm, setLocationForm] = useState({
    address: gym?.address ?? "",
    phone: gym?.phone ?? "",
    email: gym?.email ?? "",
    website: gym?.website ?? "",
  });

  const [hours, setHours] = useState<HoursState>(() =>
    buildDefaultHours(gym?.openingHours),
  );

  const [listingForm, setListingForm] = useState({
    isPublicListing: gym?.isPublicListing ?? false,
    description: gym?.description ?? "",
    disciplines: gym?.disciplines ?? ([] as string[]),
  });

  function handleLocationSave() {
    updateGym(locationForm);
    toast.success("Location details saved");
  }

  function handleHoursSave() {
    const openingHours: Record<string, { open: string; close: string } | null> =
      {};
    DAY_KEYS.forEach((day) => {
      openingHours[day] = hours[day].closed
        ? null
        : { open: hours[day].open, close: hours[day].close };
    });
    updateGym({ openingHours });
    toast.success("Business hours saved");
  }

  function handleListingSave() {
    updateGym({
      isPublicListing: listingForm.isPublicListing,
      description: listingForm.description,
      disciplines: listingForm.disciplines,
    });
    toast.success("Listing updated");
  }

  function toggleDiscipline(d: string) {
    setListingForm((prev) => ({
      ...prev,
      disciplines: prev.disciplines.includes(d)
        ? prev.disciplines.filter((x: string) => x !== d)
        : [...prev.disciplines, d],
    }));
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Location & Listing</h1>
          <p className="text-muted-foreground mt-1">
            Manage your gym's location details and public listing on the GymOps directory.
          </p>
        </div>

        {/* Location Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-accent" />
              Location Details
            </CardTitle>
            <CardDescription>
              Your gym's address and contact information shown to members.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Street Address
                </Label>
                <Input
                  id="address"
                  placeholder="123 Fighter Way, Los Angeles, CA 90001"
                  value={locationForm.address}
                  onChange={(e) =>
                    setLocationForm((p) => ({ ...p, address: e.target.value }))
                  }
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    placeholder="(555) 123-4567"
                    value={locationForm.phone}
                    onChange={(e) =>
                      setLocationForm((p) => ({ ...p, phone: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Contact Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="info@yourgym.com"
                    value={locationForm.email}
                    onChange={(e) =>
                      setLocationForm((p) => ({ ...p, email: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website" className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Website
                  </Label>
                  <Input
                    id="website"
                    placeholder="https://yourgym.com"
                    value={locationForm.website}
                    onChange={(e) =>
                      setLocationForm((p) => ({
                        ...p,
                        website: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <Button onClick={handleLocationSave}>Save Location</Button>
            </div>
          </CardContent>
        </Card>

        {/* Business Hours */}
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
                        setHours((p) => ({
                          ...p,
                          [day]: { ...p[day], open: v },
                        }))
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
                        setHours((p) => ({
                          ...p,
                          [day]: { ...p[day], close: v },
                        }))
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
                    setHours((p) => ({
                      ...p,
                      [day]: { ...p[day], closed: !checked },
                    }))
                  }
                />
              </div>
            ))}
            <div className="flex justify-end pt-2">
              <Button onClick={handleHoursSave}>Save Hours</Button>
            </div>
          </CardContent>
        </Card>

        {/* Public Listing */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-accent" />
                  Public Listing
                </CardTitle>
                <CardDescription className="mt-1">
                  Control how your gym appears in the GymOps member directory.
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {listingForm.isPublicListing ? "Listed" : "Unlisted"}
                </span>
                <Switch
                  checked={listingForm.isPublicListing}
                  onCheckedChange={(v) =>
                    setListingForm((p) => ({ ...p, isPublicListing: v }))
                  }
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Gym Description</Label>
              <Textarea
                id="description"
                placeholder="Tell potential members what makes your gym special — facilities, culture, training philosophy..."
                rows={4}
                value={listingForm.description}
                onChange={(e) =>
                  setListingForm((p) => ({
                    ...p,
                    description: e.target.value,
                  }))
                }
              />
              <p className="text-xs text-muted-foreground">
                {listingForm.description.length}/500 characters
              </p>
            </div>

            <div className="space-y-2">
              <Label>Disciplines Offered</Label>
              <div className="flex flex-wrap gap-2">
                {ALL_DISCIPLINES.map((d) => {
                  const selected = listingForm.disciplines.includes(d);
                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() => toggleDiscipline(d)}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border transition-colors ${
                        selected
                          ? "bg-accent text-accent-foreground border-accent"
                          : "bg-background text-muted-foreground border-border hover:border-accent/60"
                      }`}
                    >
                      {selected && <X className="w-3 h-3" />}
                      {d}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected disciplines preview */}
            {listingForm.disciplines.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  Selected ({listingForm.disciplines.length})
                </p>
                <div className="flex flex-wrap gap-1">
                  {listingForm.disciplines.map((d: string) => (
                    <Badge key={d} variant="secondary" className="text-xs">
                      {d}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <Button onClick={handleListingSave}>Save Listing</Button>
            </div>
          </CardContent>
        </Card>

        {/* GymOps Partner Badge */}
        {gym?.isGymOpsPartner && (
          <Card className="border-accent/30 bg-accent/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    GymOps Partner
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Your gym is featured in the GymOps partner network, giving
                    you priority placement in member searches.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
