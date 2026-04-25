import { d as useParams, r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-d7ywnqEL.js";
import { c as apiGetSharedPick } from "./backend-DOZwMnB5.js";
import { B as Badge } from "./Badge-ByzfGYUf.js";
import { f as formatINR, a as formatDeliveryTime } from "./formatters-DO6xeKaZ.js";
function SharePage() {
  const { shareId } = useParams({ from: "/share/$shareId" });
  const [data, setData] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [err, setErr] = reactExports.useState(null);
  reactExports.useEffect(() => {
    apiGetSharedPick(shareId).then(setData).catch(() => setErr("This shared pick could not be found.")).finally(() => setLoading(false));
  }, [shareId]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background flex flex-col",
      "data-ocid": "share.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "fixed top-0 left-0 right-0 z-40 h-14 bg-card border-b border-border shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-lg mx-auto h-full flex items-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-display font-bold text-primary tracking-tight", children: "Tastee" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 pt-20 pb-8 max-w-lg mx-auto w-full px-4", children: [
          loading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "share.loading_state",
              className: "flex flex-col items-center justify-center h-64 gap-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Loading shared pick..." })
              ]
            }
          ),
          err && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "share.error_state",
              className: "flex flex-col items-center justify-center h-64 gap-4 text-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: "😕" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium", children: err }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "text-sm text-primary hover:underline", children: "← Back to home" })
              ]
            }
          ),
          data && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-slide-up", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Someone shared their Tastee pick with you! 🎉" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground mt-1", children: data.food.name })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl overflow-hidden shadow-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-48 bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-6xl font-display font-bold text-primary", children: data.food.name.charAt(0) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl mt-2", children: "🍽️" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-xl", children: data.food.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-0.5", children: data.food.restaurant }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-3 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: formatINR(data.food.price) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "•" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                    "⏱ ",
                    formatDeliveryTime(data.food.deliveryTime)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "•" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-amber-600 font-medium", children: [
                    "⭐ ",
                    data.food.rating
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-3 leading-relaxed", children: data.food.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mt-3", children: data.food.tags.slice(0, 3).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "muted", children: tag }, tag)) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 p-4 bg-primary/5 rounded-xl border border-primary/10 text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-primary font-medium", children: "Want personalized picks like this?" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/signup",
                      "data-ocid": "share.signup_cta",
                      className: "mt-2 inline-flex h-10 px-6 text-sm font-medium bg-primary text-primary-foreground rounded-lg items-center justify-center hover:bg-primary/90 transition-smooth shadow-card",
                      children: "Try Tastee free →"
                    }
                  )
                ] })
              ] })
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  SharePage as default
};
