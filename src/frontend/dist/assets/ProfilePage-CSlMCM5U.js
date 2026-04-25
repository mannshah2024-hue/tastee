import { b as useNavigate, u as useAuth, e as usePreferences, a as useToast, j as jsxRuntimeExports } from "./index-d7ywnqEL.js";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-DM2gf4N0.js";
import { B as Badge } from "./Badge-ByzfGYUf.js";
import { B as Button } from "./Button-4FHpzcs0.js";
import { c as getInitials, f as formatINR } from "./formatters-DO6xeKaZ.js";
import { h as haptic } from "./haptic-CYM0GZhD.js";
function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { preferences } = usePreferences();
  const { success } = useToast();
  function handleLogout() {
    haptic(15);
    logout();
    success("Logged out. See you soon!");
    navigate({ to: "/" });
  }
  if (!user) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthenticatedLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-6 pb-6 animate-fade-in", "data-ocid": "profile.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-display font-bold shadow-lg-soft mb-3", children: getInitials(user.name) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold text-foreground", children: user.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: user.email })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-5 mb-4 shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Taste Profile" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => navigate({ to: "/preferences" }),
            "data-ocid": "profile.edit_preferences_button",
            className: "text-xs font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded",
            children: "Edit →"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Daily budget" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: (preferences == null ? void 0 : preferences.budget) ? formatINR(preferences.budget) : "No limit" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Spice level" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground capitalize", children: (preferences == null ? void 0 : preferences.spiceLevel) ?? "Not set" })
        ] }),
        (preferences == null ? void 0 : preferences.cuisinePreferences) && preferences.cuisinePreferences.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground block mb-2", children: "Favorite cuisines" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: preferences.cuisinePreferences.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "primary", children: c }, c)) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-2xl overflow-hidden shadow-card mb-6", children: [
      {
        label: "My Picks History",
        path: "/history",
        emoji: "📋",
        ocid: "profile.history_link"
      },
      {
        label: "Food Preferences",
        path: "/preferences",
        emoji: "⚙️",
        ocid: "profile.preferences_link"
      },
      {
        label: "Get Recommendations",
        path: "/decide",
        emoji: "🍛",
        ocid: "profile.decide_link"
      }
    ].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => navigate({ to: item.path }),
        "data-ocid": item.ocid,
        className: `w-full flex items-center gap-3 px-5 py-4 hover:bg-secondary/30 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset text-left ${i > 0 ? "border-t border-border" : ""}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl w-8 h-8 flex items-center justify-center bg-primary/10 rounded-xl", children: item.emoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground flex-1", children: item.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "svg",
            {
              className: "w-4 h-4 text-muted-foreground",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              strokeWidth: 2,
              "aria-hidden": "true",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  d: "M9 5l7 7-7 7"
                }
              )
            }
          )
        ]
      },
      item.path
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: "outline",
        size: "lg",
        className: "w-full border-destructive text-destructive hover:bg-red-50",
        onClick: handleLogout,
        "data-ocid": "profile.logout_button",
        children: "Log out"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground mt-6", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      ". Built with love using",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-primary hover:underline",
          children: "caffeine.ai"
        }
      )
    ] })
  ] }) });
}
export {
  ProfilePage as default
};
