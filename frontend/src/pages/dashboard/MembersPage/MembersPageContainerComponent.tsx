import { useState } from "react";
import { mockMembers } from "@/data/mockData";
import type { NewMemberFormData } from "./types";
import { MembersPagePresentational } from "./MembersPagePresentationalComponent";

export default function MembersPageContainer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [addMemberOpen, setAddMemberOpen] = useState(false);

  const filteredMembers = mockMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || member.profile.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  function handleAddMemberSubmit(_data: NewMemberFormData) {
    // TODO: wire to API
  }

  return (
    <MembersPagePresentational
      filteredMembers={filteredMembers}
      totalCount={mockMembers.length}
      searchQuery={searchQuery}
      statusFilter={statusFilter}
      addMemberOpen={addMemberOpen}
      onSearchChange={setSearchQuery}
      onStatusFilterChange={setStatusFilter}
      onAddMemberOpen={() => setAddMemberOpen(true)}
      onAddMemberOpenChange={setAddMemberOpen}
      onAddMemberSubmit={handleAddMemberSubmit}
    />
  );
}
