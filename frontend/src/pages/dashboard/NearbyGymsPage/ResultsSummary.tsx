type ResultsSummaryProps = {
  count: number;
  radius: number;
};

export function ResultsSummary({ count, radius }: ResultsSummaryProps) {
  return (
    <p className="text-sm text-muted-foreground text-center">
      Showing {count} gym{count !== 1 ? "s" : ""} within {radius} km
    </p>
  );
}
