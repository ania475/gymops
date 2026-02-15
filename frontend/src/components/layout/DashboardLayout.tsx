import { type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { GymOpsLogo } from "@/components/ui/GymOpsLogo";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Mail,
  TrendingUp,
  Video,
  Settings,
  LogOut,
  Menu,
  X,
  Calendar,
  FileVideo,
  Dumbbell,
  User,
  MapPin,
} from "lucide-react";
import { useState } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  planRequired?: "growth" | "pro";
}

const gymNavItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard/gym", icon: LayoutDashboard },
  { label: "Members", href: "/dashboard/gym/members", icon: Users },
  { label: "Payments", href: "/dashboard/gym/payments", icon: CreditCard },
  { label: "Email Automation", href: "/dashboard/gym/emails", icon: Mail },
  {
    label: "Retention & KPIs",
    href: "/dashboard/gym/retention",
    icon: TrendingUp,
    planRequired: "growth",
  },
  {
    label: "Content Library",
    href: "/dashboard/gym/content",
    icon: Video,
    planRequired: "pro",
  },
  {
    label: "Location & Listing",
    href: "/dashboard/gym/location",
    icon: MapPin,
  },
  { label: "Settings", href: "/dashboard/gym/settings", icon: Settings },
];

const memberNavItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard/member", icon: LayoutDashboard },
  {
    label: "Membership",
    href: "/dashboard/member/membership",
    icon: CreditCard,
  },
  { label: "Videos", href: "/dashboard/member/videos", icon: Video },
  {
    label: "Competitions",
    href: "/dashboard/member/competitions",
    icon: FileVideo,
  },
  { label: "Book a Coach", href: "/dashboard/member/coaches", icon: Dumbbell },
  {
    label: "Nearby Gyms",
    href: "/dashboard/member/nearby-gyms",
    icon: MapPin,
    planRequired: "pro",
  },
  { label: "Profile", href: "/dashboard/member/profile", icon: User },
];

const coachNavItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard/coach", icon: LayoutDashboard },
  { label: "My Profile", href: "/dashboard/coach/profile", icon: User },
  {
    label: "Availability",
    href: "/dashboard/coach/availability",
    icon: Calendar,
  },
  { label: "Bookings", href: "/dashboard/coach/bookings", icon: Users },
  { label: "My Videos", href: "/dashboard/coach/videos", icon: Video },
  { label: "Earnings", href: "/dashboard/coach/earnings", icon: CreditCard },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, gym, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getNavItems = () => {
    if (user?.role === "gym_manager" || user?.role === "gym_admin") {
      return gymNavItems;
    } else if (user?.role === "coach") {
      return coachNavItems;
    } else {
      return memberNavItems;
    }
  };

  const navItems = getNavItems();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const canAccessRoute = (item: NavItem) => {
    if (!item.planRequired) return true;
    if (!gym) return false;

    const planOrder = { starter: 0, growth: 1, pro: 2 };
    const requiredLevel = planOrder[item.planRequired];
    const currentLevel = planOrder[gym.plan];

    return currentLevel >= requiredLevel;
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 z-50 bg-sidebar border-r border-sidebar-border">
        {/* Logo */}
        <div className="p-4 border-b border-sidebar-border">
          <Link to="/">
            <GymOpsLogo size="md" variant="white" />
          </Link>
        </div>

        {/* Gym Info */}
        {gym && (
          <div className="p-4 border-b border-sidebar-border">
            <p className="text-sm font-medium truncate text-sidebar-foreground">
              {gym.name}
            </p>
            <p className="text-xs text-sidebar-foreground/60 capitalize">
              {gym.plan} Plan
            </p>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            const hasAccess = canAccessRoute(item);

            return (
              <Link
                key={item.href}
                to={hasAccess ? item.href : "#"}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : hasAccess
                      ? "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/40 cursor-not-allowed",
                )}
                onClick={(e) => !hasAccess && e.preventDefault()}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
                {item.planRequired && !hasAccess && (
                  <span className="ml-auto text-xs bg-warning/20 text-warning px-2 py-0.5 rounded-full uppercase">
                    {item.planRequired}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User & Logout */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center">
              <span className="text-sm font-medium text-sidebar-accent-foreground">
                {user?.name?.charAt(0) || "U"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-sidebar-foreground">
                {user?.name}
              </p>
              <p className="text-xs text-sidebar-foreground/60 truncate">
                {user?.email}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </Button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 w-72 bg-sidebar border-r border-sidebar-border animate-fade-in">
            {/* Mobile sidebar content - same as desktop */}
            <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
              <GymOpsLogo size="md" variant="white" />
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-sidebar-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {gym && (
              <div className="p-4 border-b border-sidebar-border">
                <p className="text-sm font-medium truncate text-sidebar-foreground">
                  {gym.name}
                </p>
                <p className="text-xs text-sidebar-foreground/60 capitalize">
                  {gym.plan} Plan
                </p>
              </div>
            )}

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                const hasAccess = canAccessRoute(item);

                return (
                  <Link
                    key={item.href}
                    to={hasAccess ? item.href : "#"}
                    onClick={() => {
                      if (!hasAccess) return;
                      setSidebarOpen(false);
                    }}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : hasAccess
                          ? "text-sidebar-foreground hover:bg-sidebar-accent"
                          : "text-sidebar-foreground/40 cursor-not-allowed",
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                    {item.planRequired && !hasAccess && (
                      <span className="ml-auto text-xs bg-warning/20 text-warning px-2 py-0.5 rounded-full uppercase">
                        {item.planRequired}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-sidebar-border">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" />
                Log Out
              </Button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
          <div className="flex items-center justify-between p-4">
            <button onClick={() => setSidebarOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <GymOpsLogo size="sm" />
            <div className="w-6" /> {/* Spacer */}
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
