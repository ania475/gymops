import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function CoachDashboardHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="font-display text-3xl font-bold mb-2">
          Coach Dashboard
        </h1>
        <p className="text-muted-foreground">
          Manage your sessions, availability, and content.
        </p>
      </div>
      <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
        <Plus className="w-4 h-4 mr-2" />
        Add Availability
      </Button>
    </div>
  );
}
