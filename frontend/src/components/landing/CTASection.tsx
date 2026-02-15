import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { GymOpsIcon } from "@/components/ui/GymOpsLogo";

export function CTASection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-accent/10 blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary mb-8 shadow-glow animate-pulse-glow">
            <GymOpsIcon size="xl" variant="white" />
          </div>

          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            READY TO <span className="text-accent">LEVEL UP</span>
            <br />
            YOUR ACADEMY?
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Join hundreds of combat sports gyms already using GymOps to automate
            their operations, retain more members, and build a stronger
            community.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="default"
              size="lg"
              className="bg-highlight hover:bg-highlight/90 text-highlight-foreground"
              asChild
            >
              <Link to="/signup">
                Start Your Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground">
              No credit card required • 14-day free trial
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
