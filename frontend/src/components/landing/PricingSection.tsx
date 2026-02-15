import { Check, X, Zap, TrendingUp, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface PricingPlan {
  name: string;
  tier: "starter" | "growth" | "pro";
  tagline: string;
  monthlyPrice: number;
  yearlyPrice: number;
  icon: React.ReactNode;
  popular?: boolean;
  features: {
    name: string;
    included: boolean;
    highlight?: boolean;
  }[];
}

const plans: PricingPlan[] = [
  {
    name: "Starter",
    tier: "starter",
    tagline: "Membership Automation",
    monthlyPrice: 49,
    yearlyPrice: 470,
    icon: <Zap className="w-6 h-6" />,
    features: [
      { name: "Member management (up to 100)", included: true },
      { name: "Monthly renewal automation", included: true },
      { name: "Stripe payment processing", included: true },
      { name: "Email reminders & notifications", included: true },
      { name: "Custom email templates", included: true },
      { name: "White-label branding", included: true },
      { name: "2 staff accounts", included: true },
      { name: "Retention & KPI dashboard", included: false },
      { name: "CSV export & reports", included: false },
      { name: "Member portal access", included: false },
      { name: "Video content library", included: false },
      { name: "Coach booking system", included: false },
    ],
  },
  {
    name: "Growth",
    tier: "growth",
    tagline: "Retention + KPI Tracking",
    monthlyPrice: 99,
    yearlyPrice: 950,
    icon: <TrendingUp className="w-6 h-6" />,
    popular: true,
    features: [
      { name: "Member management (up to 500)", included: true },
      { name: "Monthly renewal automation", included: true },
      { name: "Stripe payment processing", included: true },
      { name: "Email reminders & notifications", included: true },
      { name: "Custom email templates", included: true },
      { name: "White-label branding", included: true },
      { name: "5 staff accounts", included: true },
      { name: "Retention & KPI dashboard", included: true, highlight: true },
      { name: "CSV export & reports", included: true, highlight: true },
      { name: "Member portal access", included: false },
      { name: "Video content library", included: false },
      { name: "Coach booking system", included: false },
    ],
  },
  {
    name: "Pro",
    tier: "pro",
    tagline: "Complete Member Experience",
    monthlyPrice: 199,
    yearlyPrice: 1910,
    icon: <Crown className="w-6 h-6" />,
    features: [
      { name: "Unlimited members", included: true },
      { name: "Monthly renewal automation", included: true },
      { name: "Stripe payment processing", included: true },
      { name: "Email reminders & notifications", included: true },
      { name: "Custom email templates", included: true },
      { name: "White-label branding", included: true },
      { name: "20 staff accounts", included: true },
      { name: "Retention & KPI dashboard", included: true },
      { name: "CSV export & reports", included: true },
      { name: "Member portal access", included: true, highlight: true },
      { name: "Video content library", included: true, highlight: true },
      { name: "Coach booking system", included: true, highlight: true },
    ],
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-gradient-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            CHOOSE YOUR <span className="text-accent">CORNER</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Whether you're running a local boxing club or a multi-location MMA
            academy, we have a plan that fits your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.tier}
              className={cn(
                "relative rounded-2xl border bg-card p-6 transition-all duration-300 hover:scale-105",
                plan.popular
                  ? "border-accent shadow-glow"
                  : "border-border hover:border-accent/50",
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-accent px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-accent-foreground">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                    plan.popular
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary text-foreground",
                  )}
                >
                  {plan.icon}
                </div>
                <h3 className="font-display text-2xl font-bold">{plan.name}</h3>
                <p className="text-muted-foreground text-sm">{plan.tagline}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-display font-bold">
                    ${plan.monthlyPrice}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  or ${plan.yearlyPrice}/year (save 20%)
                </p>
              </div>

              <Button
                variant={plan.popular ? "default" : "outline"}
                className={cn(
                  "w-full mb-6",
                  plan.popular &&
                    "bg-accent hover:bg-accent/90 text-accent-foreground",
                )}
                asChild
              >
                <Link to="/signup">
                  {plan.popular ? "Start Free Trial" : "Get Started"}
                </Link>
              </Button>

              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check
                        className={cn(
                          "w-5 h-5 flex-shrink-0 mt-0.5",
                          feature.highlight ? "text-warning" : "text-success",
                        )}
                      />
                    ) : (
                      <X className="w-5 h-5 text-muted-foreground/50 flex-shrink-0 mt-0.5" />
                    )}
                    <span
                      className={cn(
                        "text-sm",
                        feature.included
                          ? feature.highlight
                            ? "text-warning font-medium"
                            : "text-foreground"
                          : "text-muted-foreground/50",
                      )}
                    >
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
