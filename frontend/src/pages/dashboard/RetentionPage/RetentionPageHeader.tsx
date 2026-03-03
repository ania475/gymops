import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function RetentionPageHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="font-display text-3xl font-bold mb-2">
          Retention & KPIs
        </h1>
        <p className="text-muted-foreground">
          Track member retention, analyze churn, and monitor your academy's
          health.
        </p>
      </div>
      <Button variant="outline">
        <Download className="w-4 h-4 mr-2" />
        Export CSV
      </Button>
    </div>
  );
}
