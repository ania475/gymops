import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Props = {
  onAddMember: () => void;
};

export function MembersPageHeaderPresentational({ onAddMember }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="font-display text-3xl font-bold mb-2">Members</h1>
        <p className="text-muted-foreground">
          Manage your academy's roster and memberships.
        </p>
      </div>
      <Button variant="default" onClick={onAddMember}>
        <Plus className="w-4 h-4 mr-2" />
        Add Member
      </Button>
    </div>
  );
}
