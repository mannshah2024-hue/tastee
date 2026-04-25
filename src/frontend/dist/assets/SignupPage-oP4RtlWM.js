import { u as useAuth, a as useToast, b as useNavigate, r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-d7ywnqEL.js";
import { b as apiSignup } from "./backend-DOZwMnB5.js";
import { B as Button } from "./Button-4FHpzcs0.js";
import { I as Input } from "./Input-CyKLfxbi.js";
import { h as haptic, a as hapticError } from "./haptic-CYM0GZhD.js";
function SignupPage() {
  const { setToken, setUser } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [nameErr, setNameErr] = reactExports.useState("");
  const [emailErr, setEmailErr] = reactExports.useState("");
  const [passwordErr, setPasswordErr] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background flex flex-col items-center justify-center px-4",
      "data-ocid": "signup.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/",
            className: "mb-8 text-2xl font-display font-bold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg",
            "data-ocid": "signup.logo_link",
            children: "Tastee"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm bg-card border border-border rounded-2xl shadow-card p-6 animate-scale-in", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold text-foreground mb-1", children: "Create your account" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Start getting personalized food picks" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: handleSubmit,
              className: "flex flex-col gap-4",
              noValidate: true,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    label: "Full name",
                    type: "text",
                    placeholder: "Arjun Sharma",
                    value: name,
                    onChange: (e) => setName(e.target.value),
                    onBlur: () => {
                      if (!name.trim() || name.trim().length < 2)
                        setNameErr("Enter your full name");
                      else setNameErr("");
                    },
                    error: nameErr,
                    autoComplete: "name",
                    id: "signup-name",
                    "data-ocid": "signup.name_input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    label: "Email",
                    type: "email",
                    placeholder: "you@example.com",
                    value: email,
                    onChange: (e) => setEmail(e.target.value),
                    onBlur: () => {
                      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                        setEmailErr("Enter a valid email");
                      else setEmailErr("");
                    },
                    error: emailErr,
                    autoComplete: "email",
                    id: "signup-email",
                    "data-ocid": "signup.email_input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    label: "Password",
                    type: "password",
                    placeholder: "••••••••",
                    value: password,
                    onChange: (e) => setPassword(e.target.value),
                    onBlur: () => {
                      if (!password || password.length < 6)
                        setPasswordErr("Password must be at least 6 characters");
                      else setPasswordErr("");
                    },
                    error: passwordErr,
                    autoComplete: "new-password",
                    id: "signup-password",
                    "data-ocid": "signup.password_input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    variant: "primary",
                    size: "lg",
                    loading,
                    className: "w-full mt-1",
                    "data-ocid": "signup.submit_button",
                    children: loading ? "Creating account..." : "Create account"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground mt-5", children: [
            "Already have an account?",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/login",
                "data-ocid": "signup.login_link",
                className: "text-primary font-medium hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded",
                children: "Sign in"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  SignupPage as default
};
