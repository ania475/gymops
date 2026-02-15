import React, { createContext, useContext, useState, useCallback } from "react";
import type { User, UserRole, Gym, PlanTier } from "@/types";

interface AuthContextType {
  user: User | null;
  gym: Gym | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  updateGym: (gym: Partial<Gym>) => void;
}

interface SignupData {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  gymName?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data for demo
const mockGym: Gym = {
  id: "gym-1",
  name: "Iron Fist MMA Academy",
  slug: "iron-fist-mma",
  logo: undefined,
  primaryColor: "#0B1F3B",
  secondaryColor: "#00C2B8",
  plan: "growth" as PlanTier,
  address: "123 Fighter Way, Los Angeles, CA 90001",
  phone: "(555) 123-4567",
  email: "info@ironfistmma.com",
  website: "https://ironfistmma.com",
  sports: ["MMA", "Boxing", "Muay Thai", "BJJ"],
  disciplines: ["MMA", "Boxing", "Muay Thai", "BJJ"],
  createdAt: new Date("2023-01-15"),
  latitude: 34.0522,
  longitude: -118.2437,
  isPublicListing: true,
  isGymOpsPartner: true,
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [gym, setGym] = useState<Gym | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(
    async (email: string, _password: string, role: UserRole) => {
      setIsLoading(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockUser: User = {
        id: "user-1",
        email,
        name:
          role === "gym_manager"
            ? "Marcus Rodriguez"
            : role === "coach"
              ? "Sarah Chen"
              : role === "platform_admin"
                ? "GymOps Admin"
                : "Alex Thompson",
        role,
        gymId:
          role !== "platform_admin" && role !== "member"
            ? mockGym.id
            : undefined,
        createdAt: new Date(),
      };

      setUser(mockUser);
      if (role !== "platform_admin") {
        setGym(mockGym);
      }
      setIsLoading(false);
    },
    [],
  );

  const signup = useCallback(async (data: SignupData) => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newUser: User = {
      id: `user-${Date.now()}`,
      email: data.email,
      name: data.name,
      role: data.role,
      gymId: data.role === "gym_manager" ? `gym-${Date.now()}` : undefined,
      createdAt: new Date(),
    };

    if (data.role === "gym_manager" && data.gymName) {
      const newGym: Gym = {
        id: `gym-${Date.now()}`,
        name: data.gymName,
        slug: data.gymName.toLowerCase().replace(/\s+/g, "-"),
        primaryColor: "#0B1F3B",
        secondaryColor: "#00C2B8",
        plan: "starter",
        email: data.email,
        sports: [],
        disciplines: [],
        createdAt: new Date(),
        isPublicListing: false,
        isGymOpsPartner: true,
      };
      setGym(newGym);
    }

    setUser(newUser);
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setGym(null);
  }, []);

  const updateGym = useCallback((updates: Partial<Gym>) => {
    setGym((prev) => (prev ? { ...prev, ...updates } : null));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        gym,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        updateGym,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
