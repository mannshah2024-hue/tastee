import { u as useAuth, a as useToast, b as useNavigate, r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-d7ywnqEL.js";
import { a as apiLogin } from "./backend-DOZwMnB5.js";
import { B as Button } from "./Button-4FHpzcs0.js";
import { I as Input } from "./Input-CyKLfxbi.js";
import { h as haptic, a as hapticError } from "./haptic-CYM0GZhD.js";
function LoginPage() {
  const { setToken, setUser } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [emailErr, setEmailErr] = reactExports.useState("");
  const [passwordErr, setPasswordErr] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background flex flex-col items-center justify-center px-4",
      "data-ocid": "login.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/",
            className: "mb-8 text-2xl font-display font-bold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg",
            "data-ocid": "login.logo_link",
            children: "Tastee"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm bg-card border border-border rounded-2xl shadow-card p-6 animate-scale-in", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold text-foreground mb-1", children: "Welcome back" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Sign in to get your food recommendations" }),
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
                    label: "Email",
                    type: "email",
                    placeholder: "you@example.com",
                    value: email,
                    onChange: (e) => setEmail(e.target.value),
                    onBlur: () => {
                      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                        setEmailErr("Enter a valid email address");
                      } else setEmailErr("");
                    },
                    error: emailErr,
                    autoComplete: "email",
                    id: "login-email",
                    "data-ocid": "login.email_input"
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
                    autoComplete: "current-password",
                    id: "login-password",
                    "data-ocid": "login.password_input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end -mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/forgot-password",
                    "data-ocid": "login.forgot_password_link",
                    className: "text-xs text-primary hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded",
                    children: "Forgot password?"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    variant: "primary",
                    size: "lg",
                    loading,
                    className: "w-full mt-1",
                    "data-ocid": "login.submit_button",
                    children: loading ? "Signing in..." : "Sign in"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground mt-5", children: [
            "Don't have an account?",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/signup",
                "data-ocid": "login.signup_link",
                className: "text-primary font-medium hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded",
                children: "Sign up"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  LoginPage as default
};
