import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  AlertTriangle,
  Download,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { mockKPIs } from "@/data/mockData";
import { cn } from "@/lib/utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const retentionData = [
  { month: "Sep", rate: 95.2, members: 65 },
  { month: "Oct", rate: 97.1, members: 69 },
  { month: "Nov", rate: 94.7, members: 75 },
  { month: "Dec", rate: 96.3, members: 80 },
  { month: "Jan", rate: 94.3, members: 87 },
];

const churnReasons = [
  { name: "Financial", value: 35, color: "#F5A524" },
  { name: "Moved Away", value: 25, color: "#00C2B8" },
  { name: "Injury", value: 20, color: "#0B1F3B" },
  { name: "Time", value: 15, color: "#16A34A" },
  { name: "Other", value: 5, color: "#9E9E9E" },
];

const revenueData = [
  { month: "Sep", revenue: 8500 },
  { month: "Oct", revenue: 9800 },
  { month: "Nov", revenue: 10500 },
  { month: "Dec", revenue: 11200 },
  { month: "Jan", revenue: 12450 },
];

export default function RetentionPage() {
  const { gym } = useAuth();
  const currentKPI = mockKPIs[0];
  const previousKPI = mockKPIs[1];

  const retentionChange = currentKPI.retentionRate - previousKPI.retentionRate;
  const revenueChange =
    ((currentKPI.revenue - previousKPI.revenue) / previousKPI.revenue) * 100;

  // Plan gating check
  const hasAccess = gym?.plan === "growth" || gym?.plan === "pro";

  if (!hasAccess) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="w-20 h-20 rounded-2xl bg-warning/20 flex items-center justify-center mb-6">
            <TrendingUp className="w-10 h-10 text-warning" />
          </div>
          <h1 className="font-display text-3xl font-bold mb-4">
            Unlock Retention Analytics
          </h1>
          <p className="text-muted-foreground max-w-md mb-8">
            Upgrade to the Growth plan to access retention dashboards, KPI
            tracking, churn analysis, and CSV exports.
          </p>
          <Button
            className="bg-highlight hover:bg-highlight/90 text-highlight-foreground"
            size="lg"
          >
            Upgrade to Growth
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold mb-2">
              Retention & KPIs
            </h1>
            <p className="text-muted-foreground">
              Track member retention, analyze churn, and monitor your academy's
              health.
            </p>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-xl border border-border bg-card">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <div
                className={cn(
                  "flex items-center gap-1 text-sm font-medium",
                  retentionChange >= 0 ? "text-success" : "text-destructive",
                )}
              >
                {retentionChange >= 0 ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                {Math.abs(retentionChange).toFixed(1)}%
              </div>
            </div>
            <p className="text-3xl font-display font-bold mb-1">
              {currentKPI.retentionRate}%
            </p>
            <p className="text-sm text-muted-foreground">Retention Rate</p>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-success" />
              </div>
              <div className="flex items-center gap-1 text-sm font-medium text-success">
                <ArrowUpRight className="w-4 h-4" />+{currentKPI.newMembers}
              </div>
            </div>
            <p className="text-3xl font-display font-bold mb-1">
              {currentKPI.totalMembers}
            </p>
            <p className="text-sm text-muted-foreground">Total Members</p>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-destructive" />
              </div>
              <div className="flex items-center gap-1 text-sm font-medium text-destructive">
                <ArrowDownRight className="w-4 h-4" />-
                {currentKPI.churnedMembers}
              </div>
            </div>
            <p className="text-3xl font-display font-bold mb-1">
              {currentKPI.churnedMembers}
            </p>
            <p className="text-sm text-muted-foreground">Churned This Month</p>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-warning/20 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-warning" />
              </div>
              <div
                className={cn(
                  "flex items-center gap-1 text-sm font-medium",
                  revenueChange >= 0 ? "text-success" : "text-destructive",
                )}
              >
                {revenueChange >= 0 ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                {Math.abs(revenueChange).toFixed(1)}%
              </div>
            </div>
            <p className="text-3xl font-display font-bold mb-1">
              ${currentKPI.revenue.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Monthly Revenue</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Retention Trend */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-display text-xl font-semibold mb-6">
              Retention Trend
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={retentionData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="month"
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis
                    domain={[90, 100]}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="hsl(var(--accent))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--accent))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Churn Reasons */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-display text-xl font-semibold mb-6">
              Churn Reasons
            </h2>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={churnReasons}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {churnReasons.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {churnReasons.map((reason) => (
                <div key={reason.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: reason.color }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {reason.name} ({reason.value}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-display text-xl font-semibold mb-6">
            Monthly Revenue
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [
                    `$${value.toLocaleString()}`,
                    "Revenue",
                  ]}
                />
                <Bar
                  dataKey="revenue"
                  fill="hsl(var(--accent))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* At Risk Members */}
        <div className="rounded-xl border border-warning/50 bg-warning/5 p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-warning/20 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-warning" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold mb-2">
                3 Members at Risk
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                These members haven't attended classes in over 2 weeks and have
                renewals coming up. Consider reaching out to prevent churn.
              </p>
              <Button variant="outline" size="sm">
                View At-Risk Members
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
