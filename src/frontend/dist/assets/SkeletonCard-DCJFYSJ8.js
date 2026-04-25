import { r as reactExports, j as jsxRuntimeExports, c as cn } from "./index-d7ywnqEL.js";
const SkeletonCard = reactExports.memo(function SkeletonCard2({ className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "bg-card rounded-2xl border border-border overflow-hidden shadow-card",
        className
      ),
      "aria-hidden": "true",
      role: "presentation",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-44 bg-secondary animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 bg-secondary rounded-lg animate-pulse w-3/4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-secondary rounded-lg animate-pulse w-1/2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-secondary rounded-lg animate-pulse w-16" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-secondary rounded-lg animate-pulse w-16" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-secondary rounded-lg animate-pulse w-20" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-secondary rounded animate-pulse w-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-secondary rounded animate-pulse w-4/5" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 bg-primary/5 rounded-xl animate-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 bg-secondary rounded-full animate-pulse w-14" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 bg-secondary rounded-full animate-pulse w-16" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 bg-secondary rounded-full animate-pulse w-12" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 bg-secondary rounded-lg animate-pulse w-full" })
        ] })
      ]
    }
  );
});
export {
  SkeletonCard as S
};
