import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { apiLogin } from "../api/backend";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { haptic, hapticError } from "../utils/haptic";

export default function LoginPage() {
  const { setToken, setUser } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [loading, setLoading] = useState(false);

  function validate() {
    let valid = true;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailErr("Enter a valid email address");
      valid = false;
    } else setEmailErr("");
    if (!password || password.length < 6) {
      setPasswordErr("Password must be at least 6 characters");
      valid = false;
    } else setPasswordErr("");
    return valid;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) {
      hapticError();
      return;
    }
    setLoading(true);
    try {
      const result = await apiLogin(email, password);
      setToken(result.token);
      setUser(result.user);
      haptic(15);
      success(`Welcome back, ${result.user.name}!`);
      navigate({ to: "/decide" });
    } catch {
      hapticError();
      error("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen bg-background flex flex-col items-center justify-center px-4"
      data-ocid="login.page"
    >
      {/* Logo */}
      <Link
        to="/"
        className="mb-8 text-2xl font-display font-bold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
        data-ocid="login.logo_link"
      >
        Tastee
      </Link>

      <div className="w-full max-w-sm bg-card border border-border rounded-2xl shadow-card p-6 animate-scale-in">
        <h1 className="text-xl font-display font-bold text-foreground mb-1">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          Sign in to get your food recommendations
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          noValidate
        >
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => {
              if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                setEmailErr("Enter a valid email address");
              } else setEmailErr("");
            }}
            error={emailErr}
            autoComplete="email"
            id="login-email"
            data-ocid="login.email_input"
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => {
              if (!password || password.length < 6)
                setPasswordErr("Password must be at least 6 characters");
              else setPasswordErr("");
            }}
            error={passwordErr}
            autoComplete="current-password"
            id="login-password"
            data-ocid="login.password_input"
          />

          <div className="flex justify-end -mt-1">
            <Link
              to="/forgot-password"
              data-ocid="login.forgot_password_link"
              className="text-xs text-primary hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            className="w-full mt-1"
            data-ocid="login.submit_button"
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-5">
          Don't have an account?{" "}
          <Link
            to="/signup"
            data-ocid="login.signup_link"
            className="text-primary font-medium hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
