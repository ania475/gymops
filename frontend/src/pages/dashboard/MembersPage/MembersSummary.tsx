type MembersSummaryProps = {
  filteredCount: number;
  totalCount: number;
};

export function MembersSummary({
  filteredCount,
  totalCount,
}: MembersSummaryProps) {
  return (
    <div className="flex items-center justify-between text-sm text-muted-foreground">
      <p>
        Showing {filteredCount} of {totalCount} members
      </p>
    </div>
  );
}
