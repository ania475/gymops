import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Video,
  DollarSign,
  Clock,
  CheckCircle,
  Plus,
} from "lucide-react";
import { mockVideos } from "@/data/mockData";
import { cn } from "@/lib/utils";

export default function CoachDashboard() {
  // Mock coach stats
  const stats = {
    totalBookings: 24,
    pendingBookings: 3,
    totalEarnings: 2150,
    videosUploaded: 8,
  };

  const upcomingSessions = [
    {
      id: 1,
      memberName: "Alex Thompson",
      date: "Today",
      time: "2:00 PM - 3:00 PM",
      type: "Private Session",
      status: "confirmed",
    },
    {
      id: 2,
      memberName: "Sarah Chen",
      date: "Tomorrow",
      time: "10:00 AM - 11:00 AM",
      type: "BJJ Fundamentals",
      status: "pending",
    },
    {
      id: 3,
      memberName: "Mike Rodriguez",
      date: "Wed, Jan 31",
      time: "4:00 PM - 5:00 PM",
      type: "Competition Prep",
      status: "confirmed",
    },
  ];

  const recentVideos = mockVideos.slice(0, 2);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold mb-2">
              Coach Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your sessions, availability, and content.
            </p>
          </div>
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Plus className="w-4 h-4 mr-2" />
            Add Availability
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold">
                  {stats.totalBookings}
                </p>
                <p className="text-sm text-muted-foreground">Total Sessions</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-warning/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold">
                  {stats.pendingBookings}
                </p>
                <p className="text-sm text-muted-foreground">
                  Pending Requests
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold">
                  ${stats.totalEarnings}
                </p>
                <p className="text-sm text-muted-foreground">This Month</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-info/20 flex items-center justify-center">
                <Video className="w-6 h-6 text-info" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold">
                  {stats.videosUploaded}
                </p>
                <p className="text-sm text-muted-foreground">Videos Uploaded</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Sessions */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-semibold">
                Upcoming Sessions
              </h2>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/50"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-lg flex items-center justify-center",
                        session.status === "confirmed"
                          ? "bg-success/20"
                          : "bg-warning/20",
                      )}
                    >
                      {session.status === "confirmed" ? (
                        <CheckCircle className="w-6 h-6 text-success" />
                      ) : (
                        <Clock className="w-6 h-6 text-warning" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{session.memberName}</p>
                      <p className="text-sm text-muted-foreground">
                        {session.type}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-accent">{session.date}</p>
                    <p className="text-sm text-muted-foreground">
                      {session.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {upcomingSessions.some((s) => s.status === "pending") && (
              <div className="mt-4 pt-4 border-t border-border flex gap-2">
                <Button
                  className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                  size="sm"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Accept All
                </Button>
              </div>
            )}
          </div>

          {/* My Videos */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-semibold">My Videos</h2>
              <Button variant="ghost" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </div>

            <div className="space-y-4">
              {recentVideos.map((video) => (
                <div
                  key={video.id}
                  className="flex gap-4 p-4 rounded-lg bg-secondary/50"
                >
                  <div className="w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm line-clamp-1">
                      {video.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {video.category}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-muted-foreground">
                        {Math.floor((video.duration || 0) / 60)} min
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground capitalize">
                        {video.visibility}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-4">
              <Video className="w-4 h-4 mr-2" />
              Upload New Video
            </Button>
          </div>
        </div>

        {/* Weekly Availability Overview */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-semibold">
              This Week's Availability
            </h2>
            <Button variant="ghost" size="sm">
              Edit Schedule
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
              (day, idx) => (
                <div key={day} className="text-center">
                  <p className="text-xs text-muted-foreground mb-2">{day}</p>
                  <div
                    className={cn(
                      "h-20 rounded-lg border flex items-center justify-center",
                      idx < 5
                        ? "border-success/50 bg-success/10"
                        : "border-border bg-secondary/30",
                    )}
                  >
                    <span
                      className={cn(
                        "text-xs",
                        idx < 5 ? "text-success" : "text-muted-foreground",
                      )}
                    >
                      {idx < 5 ? "Available" : "Off"}
                    </span>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
