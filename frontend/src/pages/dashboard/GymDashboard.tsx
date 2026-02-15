import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Users,
  DollarSign,
  TrendingUp,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Mail,
  CreditCard,
} from "lucide-react";
import { mockMembers, mockPayments } from "@/data/mockData";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const stats = [
  {
    label: "Total Members",
    value: "87",
    change: "+12%",
    trend: "up",
    icon: Users,
  },
  {
    label: "Monthly Revenue",
    value: "$12,450",
    change: "+8.5%",
    trend: "up",
    icon: DollarSign,
  },
  {
    label: "Retention Rate",
    value: "94.3%",
    change: "-2.0%",
    trend: "down",
    icon: TrendingUp,
  },
  {
    label: "Renewals Due",
    value: "8",
    change: "This week",
    trend: "neutral",
    icon: AlertCircle,
  },
];

export default function GymDashboard() {
  const { gym } = useAuth();

  const upcomingRenewals = mockMembers
    .filter((m) => {
      const renewalDate = new Date(m.profile.nextRenewalDate);
      const today = new Date();
      const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      return renewalDate >= today && renewalDate <= weekFromNow;
    })
    .slice(0, 5);

  const recentPayments = mockPayments.slice(0, 5);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-display text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening at{" "}
            {gym?.name || "your academy"}.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl border border-border bg-card hover:border-accent/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-accent" />
                </div>
                <div
                  className={cn(
                    "flex items-center gap-1 text-sm font-medium",
                    stat.trend === "up"
                      ? "text-success"
                      : stat.trend === "down"
                        ? "text-destructive"
                        : "text-muted-foreground",
                  )}
                >
                  {stat.trend === "up" && <ArrowUpRight className="w-4 h-4" />}
                  {stat.trend === "down" && (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <p className="text-2xl font-display font-bold mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Renewals */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-semibold">
                Upcoming Renewals
              </h2>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard/gym/members">View All</Link>
              </Button>
            </div>

            <div className="space-y-4">
              {upcomingRenewals.length > 0 ? (
                upcomingRenewals.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                        <span className="text-sm font-medium text-accent">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{member.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {member.plan.name}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        ${member.plan.monthlyPrice}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(
                          member.profile.nextRenewalDate,
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-sm text-center py-4">
                  No renewals due this week
                </p>
              )}
            </div>
          </div>

          {/* Recent Payments */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-semibold">
                Recent Payments
              </h2>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard/gym/payments">View All</Link>
              </Button>
            </div>

            <div className="space-y-4">
              {recentPayments.map((payment) => {
                const member = mockMembers.find((m) => m.id === payment.userId);
                return (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center",
                          payment.type === "membership_renewal"
                            ? "bg-success/20"
                            : "bg-warning/20",
                        )}
                      >
                        <CreditCard
                          className={cn(
                            "w-5 h-5",
                            payment.type === "membership_renewal"
                              ? "text-success"
                              : "text-warning",
                          )}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-sm">
                          {member?.name || "Unknown"}
                        </p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {payment.type.replace("_", " ")}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-success">
                        +${payment.amount}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="h-auto py-6 flex-col gap-2"
            asChild
          >
            <Link to="/dashboard/gym/members">
              <Users className="w-6 h-6 text-accent" />
              <span>Add New Member</span>
            </Link>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-6 flex-col gap-2"
            asChild
          >
            <Link to="/dashboard/gym/emails">
              <Mail className="w-6 h-6 text-accent" />
              <span>Send Campaign</span>
            </Link>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-6 flex-col gap-2"
            asChild
          >
            <Link to="/dashboard/gym/retention">
              <TrendingUp className="w-6 h-6 text-accent" />
              <span>View Analytics</span>
            </Link>
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
