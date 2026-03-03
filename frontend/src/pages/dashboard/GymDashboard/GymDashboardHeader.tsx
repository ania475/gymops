type GymDashboardHeaderProps = {
  gymName?: string;
};

export function GymDashboardHeader({ gymName }: GymDashboardHeaderProps) {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-muted-foreground">
        Welcome back! Here's what's happening at{" "}
        {gymName || "your academy"}.
      </p>
    </div>
  );
}
