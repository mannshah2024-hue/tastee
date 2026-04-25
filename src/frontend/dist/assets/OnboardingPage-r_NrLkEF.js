import { u as useAuth, e as usePreferences, a as useToast, b as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-d7ywnqEL.js";
import { d as apiUpdatePreferences } from "./backend-DOZwMnB5.js";
import { B as Button } from "./Button-4FHpzcs0.js";
import { h as haptic } from "./haptic-CYM0GZhD.js";
const CUISINES = [
  "North Indian",
  "South Indian",
  "Street Food",
  "Mughlai",
  "Hyderabadi",
  "Chinese"
];
const SPICE_LEVELS = [
  { value: "mild", label: "Mild 🌿", desc: "No heat at all" },
  { value: "medium", label: "Medium 🌶️", desc: "Mild warmth" },
  { value: "hot", label: "Hot 🔥", desc: "Bring the heat" },
  { value: "extra_hot", label: "Extra Hot 💥", desc: "I can handle it" }
];
function OnboardingPage() {
  var _a;
  const { token, user, setUser } = useAuth();
  const { setPreferences } = usePreferences();
  const { success } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = reactExports.useState(1);
  const [spiceLevel, setSpiceLevel] = reactExports.useState(null);
  const [selectedCuisines, setSelectedCuisines] = reactExports.useState([]);
  const [budget, setBudget] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  function toggleCuisine(c) {
    setSelectedCuisines(
      (prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  }
  async function handleFinish() {
    setLoading(true);
    const prefs = {
      budget: budget ? Number.parseInt(budget, 10) : null,
      dietaryRestrictions: [],
      cuisinePreferences: selectedCuisines,
      mealTypes: [],
      spiceLevel,
      notificationsEnabled: false
    };
    try {
      const updated = await apiUpdatePreferences(token, prefs);
      setUser(updated);
      setPreferences(prefs);
      haptic(15);
      success("Preferences saved! Let's find your food!");
      navigate({ to: "/decide" });
    } catch {
      navigate({ to: "/decide" });
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-screen bg-background flex flex-col items-center justify-center px-4",
      "data-ocid": "onboarding.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mb-8", children: [1, 2, 3].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `h-1.5 flex-1 rounded-full transition-smooth ${s <= step ? "bg-primary" : "bg-border"}`
          },
          s
        )) }),
        step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-in", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-4", children: "👋" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-display font-bold text-foreground", children: [
            "Welcome, ",
            (_a = user == null ? void 0 : user.name) == null ? void 0 : _a.split(" ")[0],
            "!"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 mb-8 text-sm", children: "Let's set up your taste profile in 3 quick steps." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground mb-4", children: "How spicy do you like it?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: SPICE_LEVELS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                setSpiceLevel(s.value);
                haptic(8);
              },
              "data-ocid": `onboarding.spice_${s.value}`,
              className: `p-3 rounded-xl border text-left transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95 ${spiceLevel === s.value ? "border-primary bg-primary/10 shadow-card" : "border-border bg-card hover:border-primary/40"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-foreground", children: s.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: s.desc })
              ]
            },
            s.value
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "primary",
              size: "lg",
              className: "w-full mt-6",
              onClick: () => {
                setStep(2);
                haptic(8);
              },
              "data-ocid": "onboarding.step1_next",
              children: "Continue →"
            }
          )
        ] }),
        step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-in", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-foreground mb-2", children: "Favorite cuisines?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Select all that you enjoy" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: CUISINES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                toggleCuisine(c);
                haptic(6);
              },
              "data-ocid": `onboarding.cuisine_${c.toLowerCase().replace(/\s+/g, "_")}`,
              className: `p-3 rounded-xl border text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95 ${selectedCuisines.includes(c) ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-foreground hover:border-primary/40"}`,
              children: [
                selectedCuisines.includes(c) && "✓ ",
                c
              ]
            },
            c
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "secondary",
                size: "md",
                onClick: () => setStep(1),
                className: "flex-1",
                "data-ocid": "onboarding.step2_back",
                children: "← Back"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "primary",
                size: "md",
                onClick: () => {
                  setStep(3);
                  haptic(8);
                },
                className: "flex-1",
                "data-ocid": "onboarding.step2_next",
                children: "Continue →"
              }
            )
          ] })
        ] }),
        step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-in", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-foreground mb-2", children: "Daily food budget?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "We'll show options within your range" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm", children: "₹" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "number",
                placeholder: "500",
                value: budget,
                onChange: (e) => setBudget(e.target.value),
                min: 50,
                max: 5e3,
                id: "onboarding-budget",
                "data-ocid": "onboarding.budget_input",
                className: "w-full h-12 pl-8 pr-4 border border-input rounded-xl bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-smooth"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: "Leave empty to see all options" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "secondary",
                size: "md",
                onClick: () => setStep(2),
                className: "flex-1",
                "data-ocid": "onboarding.step3_back",
                children: "← Back"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "hero",
                size: "md",
                loading,
                onClick: handleFinish,
                className: "flex-1",
                "data-ocid": "onboarding.finish_button",
                children: "Let's eat! 🍛"
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
export {
  OnboardingPage as default
};
