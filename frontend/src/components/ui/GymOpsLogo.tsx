import { cn } from "@/lib/utils";

interface GymOpsLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
  variant?: "default" | "white" | "dark";
}

const sizeClasses = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-10 h-10",
  xl: "w-14 h-14",
};

const textSizeClasses = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
  xl: "text-3xl",
};

export function GymOpsLogo({
  size = "md",
  showText = true,
  className,
  variant = "default",
}: GymOpsLogoProps) {
  const iconColor =
    variant === "white"
      ? "text-white"
      : variant === "dark"
        ? "text-primary"
        : "text-accent";

  const textColor =
    variant === "white"
      ? "text-white"
      : variant === "dark"
        ? "text-primary"
        : "text-foreground";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* GO Pin Logo - Map pin with G/O monogram */}
      <div className={cn("relative flex-shrink-0", sizeClasses[size])}>
        <svg
          viewBox="0 0 40 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Map Pin Silhouette */}
          <path
            d="M20 0C8.954 0 0 8.954 0 20c0 14 20 28 20 28s20-14 20-28C40 8.954 31.046 0 20 0z"
            className={cn(
              variant === "white"
                ? "fill-white"
                : variant === "dark"
                  ? "fill-primary"
                  : "fill-primary",
            )}
          />

          {/* Inner Circle (target ring / stopwatch dial) */}
          <circle
            cx="20"
            cy="18"
            r="11"
            className={cn(
              variant === "white"
                ? "fill-white/20 stroke-white"
                : variant === "dark"
                  ? "fill-accent/20 stroke-accent"
                  : "fill-accent/20 stroke-accent",
            )}
            strokeWidth="1.5"
          />

          {/* G/O Monogram - G on left, O on right, overlapping */}
          <text
            x="13"
            y="23"
            className={cn(
              "font-display font-bold",
              variant === "white"
                ? "fill-primary"
                : variant === "dark"
                  ? "fill-accent"
                  : "fill-accent",
            )}
            style={{
              fontSize: "14px",
              fontFamily: "Oswald, sans-serif",
              fontWeight: 700,
            }}
          >
            G
          </text>
          <text
            x="22"
            y="23"
            className={cn(
              "font-display font-bold",
              variant === "white"
                ? "fill-primary"
                : variant === "dark"
                  ? "fill-white"
                  : "fill-white",
            )}
            style={{
              fontSize: "14px",
              fontFamily: "Oswald, sans-serif",
              fontWeight: 700,
            }}
          >
            O
          </text>

          {/* Subtle pulse/track line */}
          <path
            d="M11 18 Q14 14 17 18"
            className={cn(
              variant === "white"
                ? "stroke-white/60"
                : variant === "dark"
                  ? "stroke-accent/60"
                  : "stroke-accent/60",
            )}
            fill="none"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {showText && (
        <span
          className={cn(
            "font-display font-bold tracking-wider",
            textSizeClasses[size],
            textColor,
          )}
        >
          GYMOPS
        </span>
      )}
    </div>
  );
}

// Simple icon-only version for favicon/app icon contexts
export function GymOpsIcon({
  size = "md",
  className,
  variant = "default",
}: Omit<GymOpsLogoProps, "showText">) {
  return (
    <GymOpsLogo
      size={size}
      showText={false}
      className={className}
      variant={variant}
    />
  );
}
