import { b as useNavigate, u as useAuth, a as useToast, r as reactExports, j as jsxRuntimeExports } from "./index-d7ywnqEL.js";
import { e as apiRunDecision } from "./backend-DOZwMnB5.js";
import { S as SkeletonCard } from "./SkeletonCard-DCJFYSJ8.js";
import { u as useSession } from "./useSession-BwHK9XhP.js";
import "./formatters-DO6xeKaZ.js";
const LOADING_MESSAGES = [
  "Analysing your taste preferences...",
  "Checking today's popular picks...",
  "Running the Tastee Decision Engine...",
  "Almost there, finding your matches..."
];
function LoadingDecisionPage() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { saveSession } = useSession();
  const { error } = useToast();
  reactExports.useEffect(() => {
    const budget = localStorage.getItem("tastee_pending_budget");
    const mood = localStorage.getItem("tastee_pending_mood") ?? "general";
    async function runDecision() {
      try {
        const result = await apiRunDecision(
          token,
          budget ? Number.parseInt(budget, 10) : void 0,
          mood
        );
        saveSession(result);
        localStorage.removeItem("tastee_pending_budget");
        localStorage.removeItem("tastee_pending_mood");
        navigate({ to: "/results" });
      } catch {
        error("Failed to get recommendations. Please try again.");
        navigate({ to: "/decide" });
      }
    }
    const t = setTimeout(runDecision, 600);
    return () => clearTimeout(t);
  }, [token, navigate, saveSession, error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background flex flex-col pt-14",
      "data-ocid": "loading_decision.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed top-0 left-0 right-0 z-40 h-14 bg-card border-b border-border flex items-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-display font-bold text-primary", children: "Tastee" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 max-w-lg mx-auto w-full px-4 pt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl mx-auto mb-4 animate-scale-in", children: "🧠" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold text-foreground", children: "Finding your perfect dish" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-sm text-muted-foreground mt-1 animate-pulse",
                "data-ocid": "loading_decision.loading_state",
                children: LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, {}, i)) })
        ] })
      ]
    }
  );
}
export {
  LoadingDecisionPage as default
};
