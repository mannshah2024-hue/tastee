import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { apiSignup } from "../api/backend";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { haptic, hapticError } from "../utils/haptic";

export default function SignupPage() {
  const { setToken, setUser } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [loading, setLoading] = useState(false);

  function validate() {
    let valid = true;
    if (!name.trim() || name.trim().length < 2) {
      setNameErr("Enter your full name (at least 2 characters)");
      valid = false;
    } else setNameErr("");
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
      const result = await apiSignup(name.trim(), email, password);
      setToken(result.token);
      setUser(result.user);
      haptic(15);
      success(`Welcome to Tastee, ${result.user.name}!`);
      navigate({ to: "/onboarding" });
    } catch {
      hapticError();
      error("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen bg-background flex flex-col items-center justify-center px-4"
      data-ocid="signup.page"
    >
      <Link
        to="/"
        className="mb-8 text-2xl font-display font-bold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
        data-ocid="signup.logo_link"
      >
        Tastee
      </Link>

      <div className="w-full max-w-sm bg-card border border-border rounded-2xl shadow-card p-6 animate-scale-in">
        <h1 className="text-xl font-display font-bold text-foreground mb-1">
          Create your account
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          Start getting personalized food picks
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          noValidate
        >
          <Input
            label="Full name"
            type="text"
            placeholder="Arjun Sharma"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => {
              if (!name.trim() || name.trim().length < 2)
                setNameErr("Enter your full name");
              else setNameErr("");
            }}
            error={nameErr}
            autoComplete="name"
            id="signup-name"
            data-ocid="signup.name_input"
          />
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => {
              if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                setEmailErr("Enter a valid email");
              else setEmailErr("");
            }}
            error={emailErr}
            autoComplete="email"
            id="signup-email"
            data-ocid="signup.email_input"
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
            autoComplete="new-password"
            id="signup-password"
            data-ocid="signup.password_input"
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            className="w-full mt-1"
            data-ocid="signup.submit_button"
          >
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            data-ocid="signup.login_link"
            className="text-primary font-medium hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
