import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import GymDashboard from "./pages/dashboard/GymDashboard/GymDashboard";
import MembersPage from "./pages/dashboard/MembersPage/MembersPage";
import MemberDashboard from "./pages/dashboard/MemberDashboard/MemberDashboard";
import CoachDashboard from "./pages/dashboard/CoachDashboard/CoachDashboard";
import RetentionPage from "./pages/dashboard/RetentionPage/RetentionPage";
import NearbyGymsPage from "./pages/dashboard/NearbyGymsPage/NearbyGymsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Gym Manager Dashboard Routes */}
            <Route path="/dashboard/gym" element={<GymDashboard />} />
            <Route path="/dashboard/gym/members" element={<MembersPage />} />
            <Route path="/dashboard/gym/payments" element={<GymDashboard />} />
            <Route path="/dashboard/gym/emails" element={<GymDashboard />} />
            <Route
              path="/dashboard/gym/retention"
              element={<RetentionPage />}
            />
            <Route path="/dashboard/gym/content" element={<GymDashboard />} />
            <Route path="/dashboard/gym/settings" element={<GymDashboard />} />

            {/* Member Dashboard Routes */}
            <Route path="/dashboard/member" element={<MemberDashboard />} />
            <Route
              path="/dashboard/member/membership"
              element={<MemberDashboard />}
            />
            <Route
              path="/dashboard/member/videos"
              element={<MemberDashboard />}
            />
            <Route
              path="/dashboard/member/competitions"
              element={<MemberDashboard />}
            />
            <Route
              path="/dashboard/member/coaches"
              element={<MemberDashboard />}
            />
            <Route
              path="/dashboard/member/nearby-gyms"
              element={<NearbyGymsPage />}
            />
            <Route
              path="/dashboard/member/profile"
              element={<MemberDashboard />}
            />

            {/* Coach Dashboard Routes */}
            <Route path="/dashboard/coach" element={<CoachDashboard />} />
            <Route
              path="/dashboard/coach/profile"
              element={<CoachDashboard />}
            />
            <Route
              path="/dashboard/coach/availability"
              element={<CoachDashboard />}
            />
            <Route
              path="/dashboard/coach/bookings"
              element={<CoachDashboard />}
            />
            <Route
              path="/dashboard/coach/videos"
              element={<CoachDashboard />}
            />
            <Route
              path="/dashboard/coach/earnings"
              element={<CoachDashboard />}
            />

            {/* Platform Admin Routes */}
            <Route path="/dashboard/admin" element={<GymDashboard />} />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
