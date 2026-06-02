import { Button } from "@/components/ui/button";
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
import { Eye, X } from "lucide-react";
import { ALL_DISCIPLINES } from "../constants";
import type { ListingFormState } from "../types";

type Props = {
  form: ListingFormState;
  onFormChange: (form: ListingFormState) => void;
  onToggleDiscipline: (discipline: string) => void;
  onSave: () => void;
};

export function PublicListingCardPresentational({
  form,
  onFormChange,
  onToggleDiscipline,
  onSave,
}: Props) {
  return (
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
              {form.isPublicListing ? "Listed" : "Unlisted"}
            </span>
            <Switch
              checked={form.isPublicListing}
              onCheckedChange={(v) =>
                onFormChange({ ...form, isPublicListing: v })
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
            value={form.description}
            onChange={(e) =>
              onFormChange({ ...form, description: e.target.value })
            }
          />
          <p className="text-xs text-muted-foreground">
            {form.description.length}/500 characters
          </p>
        </div>

        <div className="space-y-2">
          <Label>Disciplines Offered</Label>
          <div className="flex flex-wrap gap-2">
            {ALL_DISCIPLINES.map((d) => {
              const selected = form.disciplines.includes(d);
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => onToggleDiscipline(d)}
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

        {form.disciplines.length > 0 && (
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
              Selected ({form.disciplines.length})
            </p>
            <div className="flex flex-wrap gap-1">
              {form.disciplines.map((d) => (
                <Badge key={d} variant="secondary" className="text-xs">
                  {d}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end pt-2">
          <Button onClick={onSave}>Save Listing</Button>
        </div>
      </CardContent>
    </Card>
  );
}
