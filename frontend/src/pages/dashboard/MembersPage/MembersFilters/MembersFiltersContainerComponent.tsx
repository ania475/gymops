import { MembersFiltersPresentational } from "./MembersFiltersPresentationalComponent";

type Props = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
};

export function MembersFiltersContainer(props: Props) {
  return <MembersFiltersPresentational {...props} />;
}
