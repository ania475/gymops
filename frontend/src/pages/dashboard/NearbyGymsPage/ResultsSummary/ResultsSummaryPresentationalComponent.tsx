type Props = {
  count: number;
  radius: number;
};

export function ResultsSummaryPresentational({ count, radius }: Props) {
  return (
    <p className="text-sm text-muted-foreground text-center">
      Showing {count} gym{count !== 1 ? "s" : ""} within {radius} km
    </p>
  );
}
