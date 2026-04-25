import { f as useRouterState, r as reactExports, j as jsxRuntimeExports, L as Link, c as cn, u as useAuth, b as useNavigate } from "./index-d7ywnqEL.js";
import { h as haptic } from "./haptic-CYM0GZhD.js";
import { c as getInitials } from "./formatters-DO6xeKaZ.js";
function useLocation(opts) {
  return useRouterState({
    select: (state) => state.location
  });
}
const NAV_ITEMS = [
  {
    path: "/decide",
    label: "Decide",
    ocid: "bottomnav.decide_tab",
    icon: (active) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "svg",
      {
        className: cn(
          "w-5 h-5 transition-smooth",
          active ? "text-primary" : "text-muted-foreground"
        ),
        fill: active ? "currentColor" : "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: active ? 0 : 1.8,
        "aria-hidden": "true",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          }
        )
      }
    )
  },
  {
    path: "/history",
    label: "History",
    ocid: "bottomnav.history_tab",
    icon: (active) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "svg",
      {
        className: cn(
          "w-5 h-5 transition-smooth",
          active ? "text-primary" : "text-muted-foreground"
        ),
        fill: active ? "currentColor" : "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: active ? 0 : 1.8,
        "aria-hidden": "true",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          }
        )
      }
    )
  },
  {
    path: "/profile",
    label: "Profile",
    ocid: "bottomnav.profile_tab",
    icon: (active) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "svg",
      {
        className: cn(
          "w-5 h-5 transition-smooth",
          active ? "text-primary" : "text-muted-foreground"
        ),
        fill: active ? "currentColor" : "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: active ? 0 : 1.8,
        "aria-hidden": "true",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          }
        )
      }
    )
  }
];
const BottomNav = reactExports.memo(function BottomNav2() {
  const location = useLocation();
  const pathname = location.pathname;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "nav",
    {
      className: "fixed bottom-0 left-0 right-0 z-40 h-16 bg-card border-t border-border shadow-[0_-1px_3px_0_rgba(0,0,0,0.08)]",
      "aria-label": "Main navigation",
      "data-ocid": "bottomnav",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-lg mx-auto h-full flex items-center", children: NAV_ITEMS.map((item) => {
        const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: item.path,
            onClick: () => haptic(8),
            "aria-label": item.label,
            "aria-current": isActive ? "page" : void 0,
            "data-ocid": item.ocid,
            className: cn(
              "flex-1 flex flex-col items-center justify-center gap-1 py-2 min-h-[44px]",
              "transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
            ),
            children: [
              item.icon(isActive),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: cn(
                    "text-[10px] font-medium leading-none transition-smooth",
                    isActive ? "text-primary font-semibold" : "text-muted-foreground"
                  ),
                  children: item.label
                }
              ),
              isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-primary",
                  "aria-hidden": "true"
                }
              )
            ]
          },
          item.path
        );
      }) })
    }
  );
});
const Header = reactExports.memo(function Header2() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "header",
    {
      className: "fixed top-0 left-0 right-0 z-40 h-14 bg-card border-b border-border shadow-card",
      "data-ocid": "header",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto h-full flex items-center justify-between px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: isAuthenticated ? "/decide" : "/",
            className: "flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg",
            "data-ocid": "header.link",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-display font-bold text-primary tracking-tight", children: "Tastee" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "inline-block w-1.5 h-1.5 rounded-full bg-primary mt-0.5",
                  "aria-hidden": "true"
                }
              )
            ]
          }
        ),
        isAuthenticated && user ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => navigate({ to: "/profile" }),
            "aria-label": `${user.name}'s profile`,
            "data-ocid": "header.profile_button",
            className: "w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-display font-semibold shadow-card hover:shadow-elevated transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-95",
            children: getInitials(user.name)
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9", "aria-hidden": "true" })
      ] })
    }
  );
});
function AuthenticatedLayout({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "main",
      {
        className: "flex-1 pt-14 pb-16 max-w-lg mx-auto w-full",
        id: "main-content",
        children
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BottomNav, {})
  ] });
}
export {
  AuthenticatedLayout as A
};
