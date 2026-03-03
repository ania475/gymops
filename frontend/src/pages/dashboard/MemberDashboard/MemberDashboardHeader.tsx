type MemberDashboardHeaderProps = {
  userName?: string;
  gymName?: string;
};

export function MemberDashboardHeader({
  userName,
  gymName,
}: MemberDashboardHeaderProps) {
  const firstName = userName?.split(" ")[0] || "there";
  return (
    <div>
      <h1 className="font-display text-3xl font-bold mb-2">
        Welcome back, {firstName}!
      </h1>
      <p className="text-muted-foreground">
        Here's your training overview at {gymName || "the academy"}.
      </p>
    </div>
  );
}
