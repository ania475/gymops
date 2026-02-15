import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { GymOpsLogo } from "@/components/ui/GymOpsLogo";
import { ArrowLeft, Building2, User, Dumbbell } from "lucide-react";
import type { UserRole } from "@/types";
import { cn } from "@/lib/utils";

const roles = [
  {
    id: "gym_manager" as UserRole,
    label: "Gym Manager",
    description: "Run your academy with GymOps",
    icon: Building2,
  },
  {
    id: "member" as UserRole,
    label: "Member",
    description: "Access your gym's content",
    icon: User,
  },
  {
    id: "coach" as UserRole,
    label: "Coach",
    description: "Manage sessions & content",
    icon: Dumbbell,
  },
];

const testAccounts = [
  {
    role: "platform_admin" as UserRole,
    label: "Platform Admin",
    email: "admin@gymops.io",
    icon: "🛡️",
    color:
      "bg-destructive/20 border-destructive/40 hover:border-destructive/60",
  },
  {
    role: "gym_manager" as UserRole,
    label: "Gym Manager",
    email: "marcus@ironfistmma.com",
    icon: "🏢",
    color: "bg-primary/20 border-primary/40 hover:border-primary/60",
  },
  {
    role: "member" as UserRole,
    label: "Member",
    email: "alex@member.com",
    icon: "🥊",
    color: "bg-accent/20 border-accent/40 hover:border-accent/60",
  },
  {
    role: "coach" as UserRole,
    label: "Coach",
    email: "sarah@coach.com",
    icon: "🥋",
    color: "bg-warning/20 border-warning/40 hover:border-warning/60",
  },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>("gym_manager");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigateByRole = (role: UserRole) => {
    switch (role) {
      case "platform_admin":
        navigate("/dashboard/admin");
        break;
      case "gym_manager":
      case "gym_admin":
        navigate("/dashboard/gym");
        break;
      case "member":
        navigate("/dashboard/member");
        break;
      case "coach":
        navigate("/dashboard/coach");
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await login(email, password, selectedRole);
      navigateByRole(selectedRole);
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  const handleQuickLogin = async (account: (typeof testAccounts)[0]) => {
    try {
      await login(account.email, "demo1234", account.role);
      navigateByRole(account.role);
    } catch (err) {
      setError("Quick login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      {/* Header */}
      <div className="p-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to home</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <GymOpsLogo size="lg" variant="white" />
            </Link>
            <h1 className="font-display text-3xl font-bold mb-2 text-white">
              Welcome Back
            </h1>
            <p className="text-white/70">Sign in to your account</p>
          </div>

          {/* Role Selection */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {roles.map((role) => (
              <button
                key={role.id}
                type="button"
                onClick={() => setSelectedRole(role.id)}
                className={cn(
                  "p-4 rounded-xl border text-center transition-all duration-200",
                  selectedRole === role.id
                    ? "border-accent bg-accent/20 shadow-glow"
                    : "border-white/20 bg-white/5 hover:border-accent/50",
                )}
              >
                <role.icon
                  className={cn(
                    "w-6 h-6 mx-auto mb-2",
                    selectedRole === role.id ? "text-accent" : "text-white/60",
                  )}
                />
                <span
                  className={cn(
                    "text-xs font-medium block",
                    selectedRole === role.id ? "text-white" : "text-white/60",
                  )}
                >
                  {role.label}
                </span>
              </button>
            ))}
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
              />
            </div>

            {error && <p className="text-destructive text-sm">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Quick Login - Test Accounts */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-white/50 text-xs uppercase tracking-wider text-center mb-4">
              Quick Login — Test Accounts
            </p>
            <div className="grid grid-cols-2 gap-2">
              {testAccounts.map((account) => (
                <button
                  key={account.role}
                  type="button"
                  onClick={() => handleQuickLogin(account)}
                  disabled={isLoading}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2.5 rounded-lg border text-left transition-all duration-200",
                    account.color,
                  )}
                >
                  <span className="text-lg">{account.icon}</span>
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-white block">
                      {account.label}
                    </span>
                    <span className="text-[10px] text-white/50 block truncate">
                      {account.email}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-white/70 text-sm">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-accent hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
