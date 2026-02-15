import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { GymOpsLogo } from "@/components/ui/GymOpsLogo";
import { ArrowLeft, Building2, User, Dumbbell, ArrowRight } from "lucide-react";
import type { UserRole } from "@/types";
import { cn } from "@/lib/utils";

const roles = [
  {
    id: "gym_manager" as UserRole,
    label: "Gym Manager",
    description: "I want to run my academy with GymOps",
    icon: Building2,
  },
  {
    id: "member" as UserRole,
    label: "Member",
    description: "My gym uses GymOps and I want to join",
    icon: User,
  },
  {
    id: "coach" as UserRole,
    label: "Coach",
    description: "I teach and want to manage my sessions",
    icon: Dumbbell,
  },
];

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuth();
  const [step, setStep] = useState<"role" | "details">("role");
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gymName: "",
    gymCode: "",
  });
  const [error, setError] = useState("");

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep("details");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all required fields");
      return;
    }

    if (selectedRole === "gym_manager" && !formData.gymName) {
      setError("Please enter your gym name");
      return;
    }

    try {
      await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: selectedRole!,
        gymName: formData.gymName,
      });

      if (selectedRole === "gym_manager") {
        navigate("/dashboard/gym");
      } else if (selectedRole === "member") {
        navigate("/dashboard/member");
      } else if (selectedRole === "coach") {
        navigate("/dashboard/coach");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      {/* Header */}
      <div className="p-4">
        {step === "details" ? (
          <button
            onClick={() => setStep("role")}
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Change role</span>
          </button>
        ) : (
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to home</span>
          </Link>
        )}
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
              {step === "role" ? "Join GymOps" : "Create Your Account"}
            </h1>
            <p className="text-white/70">
              {step === "role"
                ? "Select how you want to use GymOps"
                : `Signing up as ${roles.find((r) => r.id === selectedRole)?.label}`}
            </p>
          </div>

          {step === "role" ? (
            /* Role Selection */
            <div className="space-y-4">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => handleRoleSelect(role.id)}
                  className="w-full p-6 rounded-xl border border-white/20 bg-white/5 hover:border-accent/50 hover:shadow-glow transition-all duration-200 text-left group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-accent transition-all duration-300">
                      <role.icon className="w-7 h-7 text-white/60 group-hover:text-accent-foreground transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-semibold mb-1 text-white">
                        {role.label}
                      </h3>
                      <p className="text-white/60 text-sm">
                        {role.description}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-accent transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            /* Registration Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Smith"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
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
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                />
              </div>

              {selectedRole === "gym_manager" && (
                <div className="space-y-2">
                  <Label htmlFor="gymName" className="text-white">
                    Academy Name
                  </Label>
                  <Input
                    id="gymName"
                    type="text"
                    placeholder="Iron Fist MMA"
                    value={formData.gymName}
                    onChange={(e) =>
                      setFormData({ ...formData, gymName: e.target.value })
                    }
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  />
                </div>
              )}

              {selectedRole === "member" && (
                <div className="space-y-2">
                  <Label htmlFor="gymCode" className="text-white">
                    Gym Invite Code (optional)
                  </Label>
                  <Input
                    id="gymCode"
                    type="text"
                    placeholder="ABC123"
                    value={formData.gymCode}
                    onChange={(e) =>
                      setFormData({ ...formData, gymCode: e.target.value })
                    }
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  />
                  <p className="text-xs text-white/50">
                    Ask your gym manager for this code
                  </p>
                </div>
              )}

              {error && <p className="text-destructive text-sm">{error}</p>}

              <Button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>

              <p className="text-xs text-white/50 text-center">
                By signing up, you agree to our Terms of Service and Privacy
                Policy.
              </p>
            </form>
          )}

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-white/70 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-accent hover:underline font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
