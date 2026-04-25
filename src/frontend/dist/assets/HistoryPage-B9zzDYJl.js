import { u as useAuth, r as reactExports, j as jsxRuntimeExports } from "./index-d7ywnqEL.js";
import { k as apiGetHistory } from "./backend-DOZwMnB5.js";
import { S as SkeletonCard } from "./SkeletonCard-DCJFYSJ8.js";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-DM2gf4N0.js";
import { B as Badge } from "./Badge-ByzfGYUf.js";
import { f as formatINR, b as formatRelativeTime } from "./formatters-DO6xeKaZ.js";
import "./haptic-CYM0GZhD.js";
const FEEDBACK_CONFIG = {
  loved: { emoji: "❤️", label: "Loved", variant: "success" },
  liked: { emoji: "👍", label: "Liked", variant: "primary" },
  disliked: { emoji: "👎", label: "Disliked", variant: "destructive" },
  skipped: { emoji: "⏭️", label: "Skipped", variant: "muted" }
};
function HistoryPage() {
  const { token } = useAuth();
  const [history, setHistory] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    apiGetHistory().then(setHistory).catch(() => setError("Failed to load history")).finally(() => setLoading(false));
  }, [token]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthenticatedLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-6 pb-4 animate-fade-in", "data-ocid": "history.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground mb-1", children: "Your history" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5", children: "All the dishes you've saved" }),
    loading && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex flex-col gap-4",
        "data-ocid": "history.loading_state",
        children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, {}, i))
      }
    ),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "history.error_state", className: "text-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl block mb-3", children: "⚠️" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: error })
    ] }),
    !loading && !error && history.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "history.empty_state",
        className: "flex flex-col items-center justify-center py-16 gap-4 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl", children: "📋" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-bold text-foreground", children: "No history yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: "Save your favorite food picks and they'll appear here for quick re-ordering." })
        ]
      }
    ),
    !loading && history.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: history.map((entry, i) => {
      const fc = FEEDBACK_CONFIG[entry.feedback] ?? FEEDBACK_CONFIG.liked;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-2xl p-4 shadow-card animate-slide-up flex items-center gap-4",
          style: { animationDelay: `${i * 0.05}s` },
          "data-ocid": `history.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-xl font-display font-bold text-primary shrink-0", children: entry.food.name.charAt(0) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground truncate", children: entry.food.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: fc.variant, className: "shrink-0", children: [
                  fc.emoji,
                  " ",
                  fc.label
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate mt-0.5", children: entry.food.restaurant }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground", children: formatINR(entry.food.price) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "·" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatRelativeTime(entry.savedAt) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "⭐ ",
              entry.food.rating
            ] })
          ]
        },
        entry.id
      );
    }) })
  ] }) });
}
export {
  HistoryPage as default
};
