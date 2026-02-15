import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Update this page (the content is just a fallback if you fail to update the page)

const Index = () => {
  // Redirect to landing page
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold font-display">
          Welcome to GymOps
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          The #1 Platform for Combat Sports Gyms
        </p>
        <Button variant="default" asChild>
          <Link to="/">View Landing Page</Link>
        </Button>
      </div>
    </div>
  );
};

export default Index;
