import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

type LocationErrorBannerProps = {
  message: string;
  onRetry: () => void;
};

export function LocationErrorBanner({
  message,
  onRetry,
}: LocationErrorBannerProps) {
  return (
    <div className="p-4 rounded-lg bg-warning/10 border border-warning/30 flex items-center gap-3">
      <MapPin className="w-5 h-5 text-warning" />
      <div className="flex-1">
        <p className="text-sm text-warning font-medium">{message}</p>
        <p className="text-xs text-muted-foreground mt-1">
          Enter your city or postcode below to search gyms in your area.
        </p>
      </div>
      <Button variant="outline" size="sm" onClick={onRetry}>
        Try Again
      </Button>
    </div>
  );
}
