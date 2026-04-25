import { cn } from "@/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";
import { memo } from "react";
import { haptic } from "../../utils/haptic";

const NAV_ITEMS = [
  {
    path: "/decide",
    label: "Decide",
    ocid: "bottomnav.decide_tab",
    icon: (active) => (
      <svg
        className={cn(
          "w-5 h-5 transition-smooth",
          active ? "text-primary" : "text-muted-foreground",
        )}
        fill={active ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={active ? 0 : 1.8}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
  },
  {
    path: "/history",
    label: "History",
    ocid: "bottomnav.history_tab",
    icon: (active) => (
      <svg
        className={cn(
          "w-5 h-5 transition-smooth",
          active ? "text-primary" : "text-muted-foreground",
        )}
        fill={active ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={active ? 0 : 1.8}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    path: "/profile",
    label: "Profile",
    ocid: "bottomnav.profile_tab",
    icon: (active) => (
      <svg
        className={cn(
          "w-5 h-5 transition-smooth",
          active ? "text-primary" : "text-muted-foreground",
        )}
        fill={active ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={active ? 0 : 1.8}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
];

/**
 * Fixed bottom nav with 3 tabs: Decide, History, Profile.
 */
const BottomNav = memo(function BottomNav() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 h-16 bg-card border-t border-border shadow-[0_-1px_3px_0_rgba(0,0,0,0.08)]"
      aria-label="Main navigation"
      data-ocid="bottomnav"
    >
      <div className="max-w-lg mx-auto h-full flex items-center">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.path || pathname.startsWith(`${item.path}/`);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => haptic(8)}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              data-ocid={item.ocid}
              className={cn(
                "flex-1 flex flex-col items-center justify-center gap-1 py-2 min-h-[44px]",
                "transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
              )}
            >
              {item.icon(isActive)}
              <span
                className={cn(
                  "text-[10px] font-medium leading-none transition-smooth",
                  isActive
                    ? "text-primary font-semibold"
                    : "text-muted-foreground",
                )}
              >
                {item.label}
              </span>
              {isActive && (
                <span
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-primary"
                  aria-hidden="true"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
});

export default BottomNav;
