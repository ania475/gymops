import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckCircle2, ChevronDown, Filter, Navigation, Search } from "lucide-react";
import { DISCIPLINES, RADIUS_OPTIONS } from "../constants";

type Props = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedRadius: number;
  onRadiusChange: (radius: number) => void;
  selectedDisciplines: string[];
  onDisciplineToggle: (discipline: string) => void;
  onClearDisciplines: () => void;
  partnersOnly: boolean;
  onPartnersOnlyToggle: () => void;
  openNowOnly: boolean;
  onOpenNowOnlyToggle: () => void;
};

export function NearbyGymsFiltersPresentational({
  searchQuery,
  onSearchChange,
  selectedRadius,
  onRadiusChange,
  selectedDisciplines,
  onDisciplineToggle,
  onClearDisciplines,
  partnersOnly,
  onPartnersOnlyToggle,
  openNowOnly,
  onOpenNowOnlyToggle,
}: Props) {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search gyms or enter location..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Navigation className="w-4 h-4 mr-2" />
              {selectedRadius} km
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {RADIUS_OPTIONS.map((radius) => (
              <DropdownMenuItem key={radius} onClick={() => onRadiusChange(radius)}>
                {radius} km
                {selectedRadius === radius && (
                  <CheckCircle2 className="w-4 h-4 ml-auto text-accent" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Disciplines
              {selectedDisciplines.length > 0 && (
                <Badge variant="secondary" className="ml-2">{selectedDisciplines.length}</Badge>
              )}
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {DISCIPLINES.map((discipline) => (
              <DropdownMenuCheckboxItem
                key={discipline}
                checked={selectedDisciplines.includes(discipline)}
                onCheckedChange={() => onDisciplineToggle(discipline)}
              >
                {discipline}
              </DropdownMenuCheckboxItem>
            ))}
            {selectedDisciplines.length > 0 && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onClearDisciplines}>Clear all</DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant={partnersOnly ? "default" : "outline"}
          size="sm"
          onClick={onPartnersOnlyToggle}
        >
          GymOps Partner
        </Button>

        <Button
          variant={openNowOnly ? "default" : "outline"}
          size="sm"
          onClick={onOpenNowOnlyToggle}
        >
          Open Now
        </Button>
      </div>
    </div>
  );
}
