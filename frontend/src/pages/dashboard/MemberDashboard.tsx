import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  CreditCard,
  Calendar,
  Dumbbell,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { mockVideos, mockCoaches } from "@/data/mockData";

export default function MemberDashboard() {
  const { user, gym } = useAuth();

  // Mock member data
  const membership = {
    plan: "Full Access",
    status: "active",
    nextRenewal: new Date("2024-02-15"),
    monthlyPrice: 150,
  };

  const upcomingClasses = [
    {
      name: "Morning BJJ",
      time: "6:00 AM",
      coach: "Marcus Silva",
      day: "Tomorrow",
    },
    {
      name: "Boxing Fundamentals",
      time: "5:30 PM",
      coach: "Elena Volkov",
      day: "Wed",
    },
    {
      name: "Muay Thai Sparring",
      time: "7:00 PM",
      coach: "Tony Nguyen",
      day: "Thu",
    },
  ];

  const recentVideos = mockVideos.slice(0, 3);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-display text-3xl font-bold mb-2">
            Welcome back, {user?.name?.split(" ")[0]}!
          </h1>
          <p className="text-muted-foreground">
            Here's your training overview at {gym?.name || "the academy"}.
          </p>
        </div>

        {/* Membership Status Card */}
        <div className="rounded-xl border border-border bg-gradient-card p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center",
                  membership.status === "active"
                    ? "bg-success/20"
                    : "bg-warning/20",
                )}
              >
                {membership.status === "active" ? (
                  <CheckCircle className="w-7 h-7 text-success" />
                ) : (
                  <AlertCircle className="w-7 h-7 text-warning" />
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Plan</p>
                <h2 className="font-display text-2xl font-bold">
                  {membership.plan}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Next renewal: {membership.nextRenewal.toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" asChild>
                <Link to="/dashboard/member/membership">View Details</Link>
              </Button>
              <Button
                className="bg-highlight hover:bg-highlight/90 text-highlight-foreground"
                asChild
              >
                <Link to="/dashboard/member/membership">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Renew Now - ${membership.monthlyPrice}
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Classes */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-semibold">
                Upcoming Classes
              </h2>
              <Button variant="ghost" size="sm">
                View Schedule
              </Button>
            </div>

            <div className="space-y-4">
              {upcomingClasses.map((classItem, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium">{classItem.name}</p>
                      <p className="text-sm text-muted-foreground">
                        with {classItem.coach}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-accent">{classItem.day}</p>
                    <p className="text-sm text-muted-foreground">
                      {classItem.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Coaches */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-semibold">
                Book a Coach
              </h2>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard/member/coaches">View All</Link>
              </Button>
            </div>

            <div className="space-y-4">
              {mockCoaches.slice(0, 3).map((coach) => (
                <div
                  key={coach.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary overflow-hidden">
                      {coach.avatarUrl ? (
                        <img
                          src={coach.avatarUrl}
                          alt={coach.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Dumbbell className="w-6 h-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{coach.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {coach.coachProfile.specialties.slice(0, 2).join(", ")}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-highlight text-highlight hover:bg-highlight/10"
                  >
                    ${coach.coachProfile.sessionPrice}/hr
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Videos */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-semibold">
              New Training Videos
            </h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard/member/videos">View Library</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentVideos.map((video) => (
              <div
                key={video.id}
                className="group rounded-xl overflow-hidden border border-border bg-secondary/30 hover:border-accent/50 transition-all"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 text-xs text-foreground">
                    <Clock className="w-3 h-3" />
                    {Math.floor((video.duration || 0) / 60)}min
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-medium text-sm line-clamp-2">
                    {video.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {video.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
