import { DashboardLayout } from "@/components/layout/DashboardLayout";
import type { MemberWithProfile, NewMemberFormData } from "./types";
import { AddMemberDialogContainer } from "./AddMemberDialog/AddMemberDialogContainerComponent";
import { MembersFiltersContainer } from "./MembersFilters/MembersFiltersContainerComponent";
import { MembersPageHeaderContainer } from "./MembersPageHeader/MembersPageHeaderContainerComponent";
import { MembersSummaryContainer } from "./MembersSummary/MembersSummaryContainerComponent";
import { MembersTableContainer } from "./MembersTable/MembersTableContainerComponent";

type Props = {
  filteredMembers: MemberWithProfile[];
  totalCount: number;
  searchQuery: string;
  statusFilter: string;
  addMemberOpen: boolean;
  onSearchChange: (v: string) => void;
  onStatusFilterChange: (v: string) => void;
  onAddMemberOpen: () => void;
  onAddMemberOpenChange: (open: boolean) => void;
  onAddMemberSubmit: (data: NewMemberFormData) => void;
};

export function MembersPagePresentational({
  filteredMembers,
  totalCount,
  searchQuery,
  statusFilter,
  addMemberOpen,
  onSearchChange,
  onStatusFilterChange,
  onAddMemberOpen,
  onAddMemberOpenChange,
  onAddMemberSubmit,
}: Props) {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <MembersPageHeaderContainer onAddMember={onAddMemberOpen} />
        <AddMemberDialogContainer
          open={addMemberOpen}
          onOpenChange={onAddMemberOpenChange}
          onSubmit={onAddMemberSubmit}
        />
        <MembersFiltersContainer
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          statusFilter={statusFilter}
          onStatusFilterChange={onStatusFilterChange}
        />
        <MembersTableContainer members={filteredMembers} />
        <MembersSummaryContainer
          filteredCount={filteredMembers.length}
          totalCount={totalCount}
        />
      </div>
    </DashboardLayout>
  );
}
