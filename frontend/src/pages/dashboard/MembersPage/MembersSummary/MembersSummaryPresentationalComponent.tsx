type Props = {
  filteredCount: number;
  totalCount: number;
};

export function MembersSummaryPresentational({ filteredCount, totalCount }: Props) {
  return (
    <div className="flex items-center justify-between text-sm text-muted-foreground">
      <p>
        Showing {filteredCount} of {totalCount} members
      </p>
    </div>
  );
}
