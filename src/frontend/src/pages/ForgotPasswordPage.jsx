import { Link } from "@tanstack/react-router";
import Button from "../components/ui/Button";

export default function ForgotPasswordPage() {
  return (
    <div
      className="min-h-screen bg-background flex flex-col items-center justify-center px-4"
      data-ocid="forgot_password.page"
    >
      <Link
        to="/"
        className="mb-8 text-2xl font-display font-bold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
      >
        Tastee
      </Link>

      <div className="w-full max-w-sm bg-card border border-border rounded-2xl shadow-card p-6 animate-scale-in text-center">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl mx-auto mb-4">
          🔑
        </div>
        <h1 className="text-xl font-display font-bold text-foreground mb-2">
          Reset your password
        </h1>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          Password reset is handled through Internet Identity. Please log in
          with your Internet Identity to regain access.
        </p>

        <Link to="/login" data-ocid="forgot_password.back_to_login_button">
          <Button variant="primary" size="lg" className="w-full">
            Back to login
          </Button>
        </Link>

        <p className="text-xs text-muted-foreground mt-4">
          Need help?{" "}
          <a
            href="https://caffeine.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
}
