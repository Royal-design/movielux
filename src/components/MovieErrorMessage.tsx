import { ErrorState } from "./ErrorState";
import { Button } from "./ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

export const MovieErrorMessage: React.FC<{ message: string }> = ({
  message,
}) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <ErrorState
        title="Failed to load"
        message={message}
        action={
          <Link to="/">
            <Button variant="outline">
              <Home aria-hidden="true" />
              Back home
            </Button>
          </Link>
        }
      />
    </div>
  );
};
