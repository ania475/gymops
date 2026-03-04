import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Gradient Overlay - Navy themed */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-primary/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/10 mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-accent">
              The #1 Platform for Combat Sports Gyms
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in-up text-white">
            RUN YOUR <span className="text-accent">ACADEMY</span>
            <br />
            LIKE A <span className="text-accent">CHAMPION</span>
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Automate memberships, track retention, and deliver world-class
            content to your fighters. GymOps is the all-in-one platform built
            specifically for MMA, boxing, Muay Thai, and BJJ academies.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Button
              variant="outline"
              size="lg"
              className="bg-accent outline-primary hover:text-white hover:bg-accent/10 text-primary"
              asChild
            >
              <Link to="/signup">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 border-white/30 text-primary hover:bg-white/10"
            >
              <Play className="w-5 h-5" />
              Watch Demo
            </Button>
          </div>

          {/* Social Proof */}
          <div
            className="mt-16 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <p className="text-white/60 text-sm mb-4">
              Trusted by leading academies worldwide
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              <span className="font-display text-xl tracking-wider text-white">
                IRON FIST MMA
              </span>
              <span className="font-display text-xl tracking-wider text-white">
                APEX BOXING
              </span>
              <span className="font-display text-xl tracking-wider text-white">
                WARRIOR BJJ
              </span>
              <span className="font-display text-xl tracking-wider text-white">
                STRIKER GYM
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
