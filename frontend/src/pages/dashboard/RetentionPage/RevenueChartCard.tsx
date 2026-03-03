import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { REVENUE_DATA } from "./constants";

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
};

export function RevenueChartCard() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="font-display text-xl font-semibold mb-6">
        Monthly Revenue
      </h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={REVENUE_DATA}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
            />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value: number) => [
                `$${value.toLocaleString()}`,
                "Revenue",
              ]}
            />
            <Bar
              dataKey="revenue"
              fill="hsl(var(--accent))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
