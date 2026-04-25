import { j as jsxRuntimeExports, L as Link } from "./index-d7ywnqEL.js";
import { B as Button } from "./Button-4FHpzcs0.js";
function ForgotPasswordPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background flex flex-col items-center justify-center px-4",
      "data-ocid": "forgot_password.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/",
            className: "mb-8 text-2xl font-display font-bold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg",
            children: "Tastee"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm bg-card border border-border rounded-2xl shadow-card p-6 animate-scale-in text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl mx-auto mb-4", children: "🔑" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold text-foreground mb-2", children: "Reset your password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6 leading-relaxed", children: "Password reset is handled through Internet Identity. Please log in with your Internet Identity to regain access." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", "data-ocid": "forgot_password.back_to_login_button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "primary", size: "lg", className: "w-full", children: "Back to login" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-4", children: [
            "Need help?",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "https://caffeine.ai",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-primary hover:underline",
                children: "Contact support"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  ForgotPasswordPage as default
};
