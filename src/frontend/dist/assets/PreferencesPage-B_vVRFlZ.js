import { u as useAuth, e as usePreferences, a as useToast, b as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-d7ywnqEL.js";
import { d as apiUpdatePreferences } from "./backend-DOZwMnB5.js";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-DM2gf4N0.js";
import { B as Button } from "./Button-4FHpzcs0.js";
import { h as haptic } from "./haptic-CYM0GZhD.js";
import "./formatters-DO6xeKaZ.js";
const CUISINES = [
  "North Indian",
  "South Indian",
  "Street Food",
  "Mughlai",
  "Hyderabadi",
  "Chinese"
];
const SPICE_LEVELS = [
  { value: "mild", label: "Mild 🌿" },
  { value: "medium", label: "Medium 🌶️" },
  { value: "hot", label: "Hot 🔥" },
  { value: "extra_hot", label: "Extra Hot 💥" }
];
const MEAL_TYPES = [
  { value: "breakfast", label: "🌅 Breakfast" },
  { value: "lunch", label: "☀️ Lunch" },
  { value: "dinner", label: "🌙 Dinner" },
  { value: "snack", label: "🍿 Snack" }
];
function PreferencesPage() {
  const { token, setUser } = useAuth();
  const { preferences, setPreferences } = usePreferences();
  const { success, error } = useToast();
  const navigate = useNavigate();
  const [spiceLevel, setSpiceLevel] = reactExports.useState((preferences == null ? void 0 : preferences.spiceLevel) ?? null);
  const [cuisines, setCuisines] = reactExports.useState(
    (preferences == null ? void 0 : preferences.cuisinePreferences) ?? []
  );
  const [mealTypes, setMealTypes] = reactExports.useState((preferences == null ? void 0 : preferences.mealTypes) ?? []);
  const [budget, setBudget] = reactExports.useState(
    (preferences == null ? void 0 : preferences.budget) ? String(preferences.budget) : ""
  );
  const [notifications, setNotifications] = reactExports.useState(
    (preferences == null ? void 0 : preferences.notificationsEnabled) ?? false
  );
  const [loading, setLoading] = reactExports.useState(false);
  function toggleArr(arr, setter, val) {
    setter(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
    haptic(6);
  }
  async function handleSave() {
    setLoading(true);
    const prefs = {
      budget: budget ? Number.parseInt(budget, 10) : null,
      dietaryRestrictions: [],
      cuisinePreferences: cuisines,
      mealTypes,
      spiceLevel,
      notificationsEnabled: notifications
    };
    try {
      const updated = await apiUpdatePreferences(token, prefs);
      setUser(updated);
      setPreferences(prefs);
      haptic(15);
      success("Preferences saved!");
      navigate({ to: "/profile" });
    } catch {
      error("Could not save preferences.");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthenticatedLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "px-4 pt-6 pb-6 animate-fade-in",
      "data-ocid": "preferences.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => navigate({ to: "/profile" }),
            className: "flex items-center gap-1.5 text-sm text-muted-foreground mb-5 hover:text-foreground transition-smooth focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded",
            "data-ocid": "preferences.back_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "svg",
                {
                  className: "w-4 h-4",
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
                      d: "M15 19l-7-7 7-7"
                    }
                  )
                }
              ),
              "Back"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground mb-6", children: "Preferences" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground mb-3", children: "Daily Budget" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium", children: "₹" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "number",
                placeholder: "No limit",
                value: budget,
                onChange: (e) => setBudget(e.target.value),
                min: 50,
                max: 5e3,
                id: "prefs-budget",
                "data-ocid": "preferences.budget_input",
                className: "w-full h-11 pl-8 pr-4 border border-input rounded-xl bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-smooth"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground mb-3", children: "Spice Level" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: SPICE_LEVELS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                setSpiceLevel(s.value);
                haptic(6);
              },
              "data-ocid": `preferences.spice_${s.value}`,
              className: `h-10 rounded-xl border text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95 ${spiceLevel === s.value ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-foreground hover:border-primary/40"}`,
              children: s.label
            },
            s.value
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground mb-3", children: "Favorite Cuisines" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: CUISINES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => toggleArr(cuisines, setCuisines, c),
              "data-ocid": `preferences.cuisine_${c.toLowerCase().replace(/\s+/g, "_")}`,
              className: `h-10 rounded-xl border text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95 ${cuisines.includes(c) ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-foreground hover:border-primary/40"}`,
              children: [
                cuisines.includes(c) && "✓ ",
                c
              ]
            },
            c
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground mb-3", children: "Meal Types" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: MEAL_TYPES.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => toggleArr(mealTypes, setMealTypes, m.value),
              "data-ocid": `preferences.meal_${m.value}`,
              className: `h-10 rounded-xl border text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95 ${mealTypes.includes(m.value) ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-foreground hover:border-primary/40"}`,
              children: m.label
            },
            m.value
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 bg-card border border-border rounded-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Meal-time reminders" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Get nudged at breakfast, lunch & dinner" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              role: "switch",
              "aria-checked": notifications,
              onClick: () => {
                setNotifications(!notifications);
                haptic(8);
              },
              "data-ocid": "preferences.notifications_switch",
              className: `relative inline-flex h-6 w-11 rounded-full transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${notifications ? "bg-primary" : "bg-border"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `inline-block h-5 w-5 transform rounded-full bg-background shadow-xs transition-transform duration-200 mt-0.5 ${notifications ? "translate-x-5" : "translate-x-0.5"}`,
                  "aria-hidden": "true"
                }
              )
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "primary",
            size: "lg",
            loading,
            className: "w-full",
            onClick: handleSave,
            "data-ocid": "preferences.save_button",
            children: "Save preferences"
          }
        )
      ]
    }
  ) });
}
export {
  PreferencesPage as default
};
