import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Phone, Mail, Globe } from "lucide-react";
import type { LocationFormState } from "../types";

type Props = {
  form: LocationFormState;
  onFormChange: (form: LocationFormState) => void;
  onSave: () => void;
};

export function LocationDetailsCardPresentational({ form, onFormChange, onSave }: Props) {
  return (
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
              value={form.address}
              onChange={(e) => onFormChange({ ...form, address: e.target.value })}
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
                value={form.phone}
                onChange={(e) => onFormChange({ ...form, phone: e.target.value })}
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
                value={form.email}
                onChange={(e) => onFormChange({ ...form, email: e.target.value })}
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
                value={form.website}
                onChange={(e) => onFormChange({ ...form, website: e.target.value })}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end pt-2">
          <Button onClick={onSave}>Save Location</Button>
        </div>
      </CardContent>
    </Card>
  );
}
