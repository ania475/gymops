import { Navbar, Footer } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import {
  FeaturesSection,
  HowItWorksSection,
  SportsSection,
} from "@/components/landing/FeaturesSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { CTASection } from "@/components/landing/CTASection";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <SportsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
