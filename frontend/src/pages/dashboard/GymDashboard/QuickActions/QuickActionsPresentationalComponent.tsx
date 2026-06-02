import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Mail, TrendingUp, Users } from "lucide-react";

export function QuickActionsPresentational() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Button variant="outline" className="h-auto py-6 flex-col gap-2" asChild>
        <Link to="/dashboard/gym/members">
          <Users className="w-6 h-6 text-accent" />
          <span>Add New Member</span>
        </Link>
      </Button>
      <Button variant="outline" className="h-auto py-6 flex-col gap-2" asChild>
        <Link to="/dashboard/gym/emails">
          <Mail className="w-6 h-6 text-accent" />
          <span>Send Campaign</span>
        </Link>
      </Button>
      <Button variant="outline" className="h-auto py-6 flex-col gap-2" asChild>
        <Link to="/dashboard/gym/retention">
          <TrendingUp className="w-6 h-6 text-accent" />
          <span>View Analytics</span>
        </Link>
      </Button>
    </div>
  );
}
