import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GymPayment } from "../types";

type Props = {
  payments: GymPayment[];
  memberNames: Record<string, string>;
};

export function RecentPaymentsCardPresentational({ payments, memberNames }: Props) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-semibold">Recent Payments</h2>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/dashboard/gym/payments">View All</Link>
        </Button>
      </div>

      <div className="space-y-4">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  payment.type === "membership_renewal" ? "bg-success/20" : "bg-warning/20",
                )}
              >
                <CreditCard
                  className={cn(
                    "w-5 h-5",
                    payment.type === "membership_renewal" ? "text-success" : "text-warning",
                  )}
                />
              </div>
              <div>
                <p className="font-medium text-sm">{memberNames[payment.userId] || "Unknown"}</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {payment.type.replace("_", " ")}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-success">+${payment.amount}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(payment.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
