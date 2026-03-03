import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { mockMembers } from "@/data/mockData";
import { AddMemberDialog } from "./AddMemberDialog";
import { MembersFilters } from "./MembersFilters";
import { MembersPageHeader } from "./MembersPageHeader";
import { MembersSummary } from "./MembersSummary";
import { MembersTable } from "./MembersTable";
import type { NewMemberFormData } from "./types";

export default function MembersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [addMemberOpen, setAddMemberOpen] = useState(false);

  //TODO: filter members from API
  const filteredMembers = mockMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || member.profile.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddMemberSubmit = (_data: NewMemberFormData) => {
    // TODO: wire to API / state
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <MembersPageHeader onAddMember={() => setAddMemberOpen(true)} />

        <AddMemberDialog
          open={addMemberOpen}
          onOpenChange={setAddMemberOpen}
          onSubmit={handleAddMemberSubmit}
        />

        <MembersFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />

        <MembersTable members={filteredMembers} />

        <MembersSummary
          filteredCount={filteredMembers.length}
          totalCount={mockMembers.length}
        />
      </div>
    </DashboardLayout>
  );
}
