import {
  Users,
  Mail,
  CreditCard,
  TrendingUp,
  Video,
  Calendar,
  Palette,
  BarChart3,
  UserCheck,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Users,
    title: "Member Management",
    description:
      "Track your entire roster with membership types, renewal dates, and status at a glance.",
    color: "text-accent",
  },
  {
    icon: Mail,
    title: "Automated Emails",
    description:
      "Send renewal reminders, promo campaigns, and notifications without lifting a finger.",
    color: "text-info",
  },
  {
    icon: CreditCard,
    title: "Stripe Payments",
    description:
      "Accept monthly renewals directly through GymOps. Receipts sent automatically.",
    color: "text-success",
  },
  {
    icon: TrendingUp,
    title: "Retention Dashboard",
    description:
      "Visualize churn points, retention rates, and expiring memberships month-over-month.",
    color: "text-warning",
  },
  {
    icon: Video,
    title: "Content Library",
    description:
      "Upload instructional videos and competition recordings for your members to access anytime.",
    color: "text-accent",
  },
  {
    icon: Calendar,
    title: "Coach Booking",
    description:
      "Let members book private sessions with coaches. Availability, payments, and confirmations handled.",
    color: "text-warning",
  },
  {
    icon: MapPin,
    title: "Nearby Gyms",
    description:
      "Help members discover gyms near them with our interactive map and gym directory.",
    color: "text-info",
  },
  {
    icon: Palette,
    title: "White-Label Branding",
    description:
      "Your logo, your colors. Every member sees your academy's brand, not ours.",
    color: "text-accent",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            EVERYTHING YOUR <span className="text-accent">ACADEMY</span> NEEDS
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From membership automation to competition content, GymOps gives
            combat sports gyms the tools to run a world-class operation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group p-6 rounded-xl border border-border bg-card hover:border-accent/50 transition-all duration-300 hover:shadow-glow"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="mb-4">
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-accent transition-all duration-300">
                  <feature.icon
                    className={cn(
                      "w-6 h-6",
                      feature.color,
                      "group-hover:text-accent-foreground transition-colors",
                    )}
                  />
                </div>
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    number: "01",
    title: "Create Your Academy",
    description:
      "Sign up, upload your logo, choose your colors, and invite your staff. Takes less than 5 minutes.",
    icon: MapPin,
  },
  {
    number: "02",
    title: "Set Up Memberships",
    description:
      "Create membership plans with pricing and perks. Import existing members or add them manually.",
    icon: UserCheck,
  },
  {
    number: "03",
    title: "Automate & Grow",
    description:
      "Email automations kick in. Members renew directly. You focus on training champions.",
    icon: BarChart3,
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            FROM SIGNUP TO <span className="text-accent">KNOCKOUT</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get your academy running on GymOps in three simple steps. No
            complicated setup, no hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              {/* Connector line */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-accent/50 to-transparent" />
              )}

              <div className="text-center">
                <div className="relative inline-flex mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center shadow-glow">
                    <step.icon className="w-10 h-10 text-accent" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-highlight text-highlight-foreground font-display font-bold text-sm flex items-center justify-center">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const sports = [
  "MMA",
  "Boxing",
  "Muay Thai",
  "Brazilian Jiu-Jitsu",
  "Wrestling",
  "Kickboxing",
  "Judo",
  "Karate",
];

export function SportsSection() {
  return (
    <section className="py-16 bg-background border-y border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-muted-foreground text-sm uppercase tracking-wider font-display">
            Built for Combat Sports
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {sports.map((sport, idx) => (
            <span
              key={idx}
              className="px-6 py-2 rounded-full border border-border bg-secondary text-foreground font-display text-sm tracking-wider hover:border-accent/50 hover:shadow-glow transition-all duration-300 cursor-default"
            >
              {sport}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
