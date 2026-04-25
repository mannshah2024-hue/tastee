import { b as useNavigate, j as jsxRuntimeExports } from "./index-d7ywnqEL.js";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-DM2gf4N0.js";
import { B as Button } from "./Button-4FHpzcs0.js";
import { u as useSession } from "./useSession-BwHK9XhP.js";
import { h as haptic } from "./haptic-CYM0GZhD.js";
import "./formatters-DO6xeKaZ.js";
const MOODS = [
  { value: "comfort", label: "Comfort Food", emoji: "🤗" },
  { value: "healthy", label: "Healthy", emoji: "🥗" },
  { value: "spicy", label: "Spicy Craving", emoji: "🌶️" },
  { value: "quick", label: "Quick Bite", emoji: "⚡" },
  { value: "festive", label: "Celebrate", emoji: "🎉" },
  { value: "general", label: "Surprise Me", emoji: "🎲" }
];
function DecidePage() {
  const navigate = useNavigate();
  const { hasResults } = useSession();
  function handleMood(mood) {
    haptic(10);
    localStorage.setItem("tastee_pending_mood", mood);
    navigate({ to: "/budget" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthenticatedLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-6 pb-4 animate-fade-in", "data-ocid": "decide.page", children: [
    hasResults && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => navigate({ to: "/results" }),
        "data-ocid": "decide.restore_results_banner",
        className: "w-full mb-5 px-4 py-3 bg-primary/10 border border-primary/20 rounded-xl text-sm text-primary font-medium flex items-center justify-between hover:bg-primary/15 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "📋 You have today's picks — view results" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: "→" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "What's your vibe today?" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 mb-6", children: "Pick a mood and we'll find the perfect dish for you" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: MOODS.map((mood, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => handleMood(mood.value),
        "data-ocid": `decide.mood.item.${i + 1}`,
        className: "p-4 bg-card border border-border rounded-2xl text-left hover:border-primary/50 hover:shadow-elevated hover:-translate-y-0.5 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95",
        "aria-label": `${mood.label} mood`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl block mb-2", children: mood.emoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-display font-semibold text-foreground", children: mood.label })
        ]
      },
      mood.value
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: "hero",
        size: "lg",
        className: "w-full",
        onClick: () => handleMood("general"),
        "data-ocid": "decide.quick_decide_button",
        children: "🎲 Decide for me now"
      }
    ) })
  ] }) });
}
export {
  DecidePage as default
};
