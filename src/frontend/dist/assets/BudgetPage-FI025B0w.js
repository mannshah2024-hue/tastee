import { b as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-d7ywnqEL.js";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-DM2gf4N0.js";
import { B as Button } from "./Button-4FHpzcs0.js";
import { h as haptic } from "./haptic-CYM0GZhD.js";
import "./formatters-DO6xeKaZ.js";
const BUDGET_PRESETS = [
  { label: "Under ₹150", value: 150, emoji: "💸" },
  { label: "₹150–₹300", value: 300, emoji: "💰" },
  { label: "₹300–₹500", value: 500, emoji: "💵" },
  { label: "No limit", value: null, emoji: "♾️" }
];
function BudgetPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = reactExports.useState(void 0);
  const [custom, setCustom] = reactExports.useState("");
  function handleContinue() {
    const budget = selected !== void 0 ? selected : custom ? Number.parseInt(custom, 10) : null;
    haptic(10);
    localStorage.setItem(
      "tastee_pending_budget",
      budget !== null ? String(budget) : ""
    );
    navigate({ to: "/loading" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthenticatedLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-6 animate-fade-in", "data-ocid": "budget.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => navigate({ to: "/decide" }),
        className: "flex items-center gap-1.5 text-sm text-muted-foreground mb-6 hover:text-foreground transition-smooth focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded",
        "data-ocid": "budget.back_button",
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Set your budget" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 mb-6", children: "How much do you want to spend today?" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: BUDGET_PRESETS.map((preset) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => {
          setSelected(preset.value);
          setCustom("");
          haptic(8);
        },
        "data-ocid": `budget.preset.${preset.label.toLowerCase().replace(/[^a-z0-9]/g, "_")}`,
        className: `p-4 rounded-xl border text-left transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95 ${selected === preset.value && !custom ? "border-primary bg-primary/10 shadow-card" : "border-border bg-card hover:border-primary/40"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl block mb-1", children: preset.emoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: preset.label })
        ]
      },
      preset.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2 font-medium", children: "Or enter a custom amount:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium", children: "₹" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            placeholder: "Enter amount",
            value: custom,
            onChange: (e) => {
              setCustom(e.target.value);
              setSelected(void 0);
            },
            min: 50,
            max: 5e3,
            id: "budget-custom",
            "data-ocid": "budget.custom_input",
            className: "w-full h-11 pl-8 pr-4 border border-input rounded-xl bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-smooth"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: "hero",
        size: "lg",
        className: "w-full mt-6",
        onClick: handleContinue,
        "data-ocid": "budget.continue_button",
        children: "Find my food 🍛"
      }
    )
  ] }) });
}
export {
  BudgetPage as default
};
