import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type ActiveFiltersBarProps = {
  selectedDisciplines: string[];
  onRemoveDiscipline: (d: string) => void;
  partnersOnly: boolean;
  onClearPartnersOnly: () => void;
  openNowOnly: boolean;
  onClearOpenNowOnly: () => void;
  onClearAll: () => void;
};

export function ActiveFiltersBar({
  selectedDisciplines,
  onRemoveDiscipline,
  partnersOnly,
  onClearPartnersOnly,
  openNowOnly,
  onClearOpenNowOnly,
  onClearAll,
}: ActiveFiltersBarProps) {
  const hasFilters =
    selectedDisciplines.length > 0 || partnersOnly || openNowOnly;

  if (!hasFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-muted-foreground">Active filters:</span>
      {selectedDisciplines.map((d) => (
        <Badge key={d} variant="secondary" className="gap-1">
          {d}
          <X
            className="w-3 h-3 cursor-pointer"
            onClick={() => onRemoveDiscipline(d)}
          />
        </Badge>
      ))}
      {partnersOnly && (
        <Badge variant="secondary" className="gap-1">
          GymOps Partner
          <X className="w-3 h-3 cursor-pointer" onClick={onClearPartnersOnly} />
        </Badge>
      )}
      {openNowOnly && (
        <Badge variant="secondary" className="gap-1">
          Open Now
          <X className="w-3 h-3 cursor-pointer" onClick={onClearOpenNowOnly} />
        </Badge>
      )}
      <Button variant="ghost" size="sm" onClick={onClearAll}>
        Clear all
      </Button>
    </div>
  );
}
