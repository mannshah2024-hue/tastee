import { r as reactExports, j as jsxRuntimeExports, c as cn, b as useNavigate, u as useAuth, a as useToast } from "./index-d7ywnqEL.js";
import { f as apiSavePick, g as apiCreateShareLink, h as apiRefineDecision } from "./backend-DOZwMnB5.js";
import { f as formatINR, a as formatDeliveryTime } from "./formatters-DO6xeKaZ.js";
import { B as Badge } from "./Badge-ByzfGYUf.js";
import { S as SkeletonCard } from "./SkeletonCard-DCJFYSJ8.js";
import { A as AuthenticatedLayout } from "./AuthenticatedLayout-DM2gf4N0.js";
import { B as Button } from "./Button-4FHpzcs0.js";
import { u as useSession } from "./useSession-BwHK9XhP.js";
import { b as hapticSuccess, c as hapticSwipe, h as haptic } from "./haptic-CYM0GZhD.js";
import { m as motion, A as AnimatePresence } from "./proxy-CNOYPx2t.js";
function StarRating({ rating }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center gap-0.5",
      "aria-label": `${rating} out of 5 stars`,
      children: [
        [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "svg",
          {
            className: cn(
              "w-3 h-3",
              star <= Math.round(rating) ? "text-amber-400" : "text-border"
            ),
            fill: "currentColor",
            viewBox: "0 0 20 20",
            "aria-hidden": "true",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" })
          },
          star
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-1 font-medium", children: rating.toFixed(1) })
      ]
    }
  );
}
function FoodImage({ name, imageUrl, className }) {
  var _a;
  const [failed, setFailed] = reactExports.useState(!imageUrl);
  if (failed || !imageUrl) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: cn(
          "flex flex-col items-center justify-center bg-primary/10 text-primary select-none",
          className
        ),
        "aria-hidden": "true",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-display font-bold leading-none", children: ((_a = name == null ? void 0 : name.charAt(0)) == null ? void 0 : _a.toUpperCase()) ?? "?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl mt-1", children: "🍽️" })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      src: imageUrl,
      alt: name,
      onError: () => setFailed(true),
      className: cn("object-cover", className),
      loading: "lazy"
    }
  );
}
const FoodCard = reactExports.memo(function FoodCard2({
  food,
  reason,
  badge,
  onSave,
  onShare,
  selected,
  index = 1,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "article",
    {
      className: cn(
        "bg-card rounded-2xl border overflow-hidden transition-smooth",
        selected ? "border-primary shadow-elevated ring-2 ring-primary/20" : "border-border shadow-card hover:shadow-elevated hover:-translate-y-0.5",
        "animate-slide-up",
        className
      ),
      "aria-label": `${food.name} from ${food.restaurant}`,
      "data-ocid": `food_card.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-44 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FoodImage,
            {
              name: food.name,
              imageUrl: food.imageUrl,
              className: "w-full h-full"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                "absolute top-3 left-3 w-5 h-5 rounded border-2 flex items-center justify-center bg-background",
                food.isVeg ? "border-green-600" : "border-red-600"
              ),
              "aria-label": food.isVeg ? "Vegetarian" : "Non-vegetarian",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: cn(
                    "w-2.5 h-2.5 rounded-sm",
                    food.isVeg ? "bg-green-600" : "bg-red-600"
                  ),
                  "aria-hidden": "true"
                }
              )
            }
          ),
          badge && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "primary", className: "absolute top-3 right-3 text-xs", children: badge })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-lg leading-tight truncate", children: food.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground truncate mt-0.5", children: food.restaurant }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-2.5 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: formatINR(food.price) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "•" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "svg",
                {
                  className: "w-3.5 h-3.5",
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
                      d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    }
                  )
                }
              ),
              formatDeliveryTime(food.deliveryTime)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "•" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: food.rating })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2 line-clamp-2", children: food.description }),
          reason && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 px-3 py-2 rounded-xl bg-primary/5 border border-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-primary font-medium leading-snug", children: [
            "💡 ",
            reason
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mt-3", children: food.tags.slice(0, 3).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "muted", className: "text-[10px]", children: tag }, tag)) }),
          (onSave || onShare) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-4", children: [
            onSave && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => onSave(food),
                "data-ocid": `food_card.save_button.${index}`,
                className: "flex-1 h-9 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center gap-1.5 transition-smooth hover:bg-primary/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "aria-label": `Save ${food.name}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "svg",
                    {
                      className: "w-3.5 h-3.5",
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
                          d: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        }
                      )
                    }
                  ),
                  "Save"
                ]
              }
            ),
            onShare && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => onShare(food),
                "data-ocid": `food_card.share_button.${index}`,
                className: "h-9 w-9 rounded-lg bg-secondary border border-border text-muted-foreground flex items-center justify-center transition-smooth hover:text-foreground hover:bg-secondary/80 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "aria-label": `Share ${food.name}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
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
                        d: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      }
                    )
                  }
                )
              }
            )
          ] })
        ] })
      ]
    }
  );
});
const REFINE_OPTIONS = [
  { value: "veg", label: "🌿 Veg only" },
  { value: "non-veg", label: "🍗 Non-veg only" },
  { value: "budget", label: "💸 Lower budget" },
  { value: "popular", label: "⭐ Most popular" }
];
function PulsingDots() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex gap-1 ml-1", "aria-hidden": "true", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.span,
    {
      className: "inline-block w-1.5 h-1.5 rounded-full bg-purple-500",
      animate: { opacity: [0.3, 1, 0.3] },
      transition: {
        duration: 1.2,
        repeat: Number.POSITIVE_INFINITY,
        delay: i * 0.2
      }
    },
    i
  )) });
}
function ResultsPage() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { results, saveSession } = useSession();
  const { success, error } = useToast();
  const [savedIds, setSavedIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const [refining, setRefining] = reactExports.useState(false);
  const [shareLoading, setShareLoading] = reactExports.useState(null);
  const [activeFilter, setActiveFilter] = reactExports.useState(null);
  if (!results) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthenticatedLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 px-4 pt-16 flex flex-col items-center gap-5",
        "data-ocid": "results.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.span,
            {
              className: "text-6xl",
              animate: { y: [0, -8, 0] },
              transition: {
                duration: 2.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut"
              },
              children: "🍽️"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-foreground text-center", children: "No picks yet!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center max-w-xs", children: "Start by telling us your mood and budget — we'll find the perfect meal for you." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "primary",
              onClick: () => navigate({ to: "/decide" }),
              "data-ocid": "results.decide_cta",
              className: "rounded-full px-8 py-3 shadow-xl active:scale-95 transition-smooth",
              children: "Get recommendations →"
            }
          )
        ]
      }
    ) });
  }
  async function handleSave(food) {
    if (savedIds.has(food.id)) return;
    hapticSuccess();
    setSavedIds((prev) => /* @__PURE__ */ new Set([...prev, food.id]));
    try {
      await apiSavePick(token, food.id);
      success(`${food.name} saved to your history!`);
    } catch {
      error("Failed to save. Please try again.");
      setSavedIds((prev) => {
        const next = new Set(prev);
        next.delete(food.id);
        return next;
      });
    }
  }
  async function handleShare(food) {
    hapticSwipe();
    setShareLoading(food.id);
    try {
      const record = await apiCreateShareLink(token, food.id);
      const url = `${window.location.origin}/share/${record.shareId}`;
      if (navigator.share) {
        await navigator.share({ title: `Try ${food.name} on Tastee!`, url });
      } else {
        await navigator.clipboard.writeText(url);
        success("Share link copied to clipboard!");
      }
    } catch {
      error("Could not create share link.");
    } finally {
      setShareLoading(null);
    }
  }
  async function handleRefine(filter) {
    setActiveFilter(filter);
    setRefining(true);
    haptic(10);
    try {
      const excludeIds = results.items.map((f) => f.id);
      const refined = await apiRefineDecision(token, filter, excludeIds);
      saveSession(refined);
      success("Results refined!");
    } catch {
      error("Could not refine. Try again.");
    } finally {
      setRefining(false);
      setActiveFilter(null);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthenticatedLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50",
      "data-ocid": "results.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-6 pb-10 max-w-lg mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "flex items-center gap-3 mb-1",
            initial: { opacity: 0, y: -16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4, ease: "easeOut" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => navigate({ to: "/decide" }),
                  "data-ocid": "results.back_button",
                  "aria-label": "Go back",
                  className: "flex-shrink-0 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-foreground hover:shadow-lg active:scale-90 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "svg",
                    {
                      className: "w-4 h-4",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor",
                      strokeWidth: 2.5,
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
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground leading-tight", children: "Your Perfect Picks 🍽️" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Based on your taste & mood" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => navigate({ to: "/swipe" }),
                  "data-ocid": "results.swipe_button",
                  className: "flex-shrink-0 text-xs font-medium text-purple-700 border border-purple-200 bg-purple-50 rounded-full px-3 py-1.5 hover:bg-purple-100 active:scale-95 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  children: "Swipe mode ✦"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "aria-live": "polite",
            "aria-atomic": "true",
            className: "h-8 flex items-center mb-3",
            children: refining && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.p,
              {
                className: "text-sm text-purple-600 font-medium flex items-center",
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                children: [
                  "Finding better matches",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(PulsingDots, {})
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: refining ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "flex flex-col gap-5",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, { className: "rounded-2xl shadow-xl" }, i))
          },
          "skeletons"
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "flex flex-col gap-5",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            children: results.items.map((food, i) => {
              var _a, _b, _c, _d;
              const isBestPick = i === 0;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 30 },
                  animate: { opacity: 1, y: 0 },
                  transition: {
                    delay: i * 0.15,
                    duration: 0.45,
                    ease: [0.4, 0, 0.2, 1]
                  },
                  className: isBestPick ? "relative" : void 0,
                  "data-ocid": `results.card_wrapper.${i + 1}`,
                  children: [
                    isBestPick && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "absolute inset-0 rounded-3xl pointer-events-none",
                          style: {
                            boxShadow: "0 0 48px 8px rgba(124, 58, 237, 0.22)",
                            zIndex: 0
                          },
                          "aria-hidden": "true"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-2.5 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.span,
                        {
                          className: "inline-flex items-center gap-1.5 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md",
                          initial: { scale: 0.8, opacity: 0 },
                          animate: { scale: 1, opacity: 1 },
                          transition: {
                            delay: 0.1,
                            type: "spring",
                            stiffness: 280
                          },
                          children: "✨ Best Match for You"
                        }
                      ) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        className: isBestPick ? "relative z-10 rounded-3xl shadow-2xl overflow-hidden" : "rounded-2xl shadow-xl overflow-hidden",
                        whileHover: { y: -4 },
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 20
                        },
                        style: isBestPick ? {
                          transform: "scale(1.02)",
                          transformOrigin: "center"
                        } : void 0,
                        children: isBestPick ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                          motion.div,
                          {
                            animate: { y: [0, -6, 0] },
                            transition: {
                              duration: 3,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "easeInOut"
                            },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              FoodCard,
                              {
                                food,
                                reason: (_a = results.reasons) == null ? void 0 : _a[food.id],
                                badge: savedIds.has(food.id) ? "✓ Saved" : (_b = results.badges) == null ? void 0 : _b[food.id],
                                onSave: !savedIds.has(food.id) ? handleSave : void 0,
                                onShare: shareLoading !== food.id ? handleShare : void 0,
                                index: i + 1,
                                selected: true
                              }
                            )
                          }
                        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                          FoodCard,
                          {
                            food,
                            reason: (_c = results.reasons) == null ? void 0 : _c[food.id],
                            badge: savedIds.has(food.id) ? "✓ Saved" : (_d = results.badges) == null ? void 0 : _d[food.id],
                            onSave: !savedIds.has(food.id) ? handleSave : void 0,
                            onShare: shareLoading !== food.id ? handleShare : void 0,
                            index: i + 1
                          }
                        )
                      }
                    )
                  ]
                },
                food.id
              );
            })
          },
          "cards"
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "mt-8",
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.5, duration: 0.4 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-3", children: "Not quite right? Refine picks:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none",
                  style: { scrollbarWidth: "none" },
                  children: REFINE_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => handleRefine(opt.value),
                      disabled: refining,
                      "data-ocid": `results.refine_${opt.value}`,
                      "aria-pressed": activeFilter === opt.value,
                      className: [
                        "flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-smooth active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none",
                        activeFilter === opt.value ? "bg-purple-600 text-white shadow-md" : "bg-white text-foreground border border-border hover:border-purple-300 hover:text-purple-700 shadow-sm"
                      ].join(" "),
                      children: opt.label
                    },
                    opt.value
                  ))
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "mt-7",
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.65, duration: 0.4 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => navigate({ to: "/decide" }),
                "data-ocid": "results.new_decision_button",
                className: "w-full bg-purple-600 text-white font-semibold rounded-full px-8 py-4 shadow-xl hover:shadow-2xl hover:bg-purple-700 active:scale-95 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                children: "🔄 Try New Options"
              }
            )
          }
        )
      ] })
    }
  ) });
}
export {
  ResultsPage as default
};
