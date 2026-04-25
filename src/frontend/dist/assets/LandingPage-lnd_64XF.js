import { j as jsxRuntimeExports, r as reactExports, L as Link } from "./index-d7ywnqEL.js";
const FLOATING_CARDS = [
  {
    emoji: "🍛",
    name: "Butter Chicken",
    price: "₹280",
    delay: "0s",
    pos: "top-32 left-8 sm:left-16"
  },
  {
    emoji: "🥘",
    name: "Dal Makhani",
    price: "₹180",
    delay: "0.8s",
    pos: "top-48 right-6 sm:right-20"
  },
  {
    emoji: "🫓",
    name: "Pav Bhaji",
    price: "₹120",
    delay: "1.6s",
    pos: "bottom-40 left-4 sm:left-24"
  },
  {
    emoji: "🍚",
    name: "Biryani",
    price: "₹320",
    delay: "0.4s",
    pos: "bottom-52 right-4 sm:right-16"
  }
];
const BADGES = [
  { icon: "🤖", label: "AI-Powered" },
  { icon: "🎯", label: "Personalized" },
  { icon: "⚡", label: "Instant" },
  { icon: "🇮🇳", label: "Indian Food" }
];
const HOW_STEPS = [
  {
    num: "1",
    title: "Tell us your mood",
    desc: "Pick how you feel right now",
    moods: [
      "😊 Happy",
      "😴 Tired",
      "💪 Healthy",
      "🎉 Celebrating",
      "🌶️ Spicy",
      "❄️ Light"
    ]
  },
  {
    num: "2",
    title: "AI picks for you",
    desc: "3 perfect options scored just for you",
    preview: [
      "🍛 Butter Chicken — 96%",
      "🥘 Dal Makhani — 91%",
      "🍚 Biryani — 87%"
    ]
  },
  {
    num: "3",
    title: "Swipe to train",
    desc: "Every swipe teaches the AI your taste",
    actions: true
  }
];
const FEATURES = [
  {
    emoji: "🤖",
    title: "AI Decision Engine",
    desc: "Smart scoring that learns from every choice"
  },
  {
    emoji: "🎯",
    title: "Personalized Picks",
    desc: "Tailored to your taste, mood, and budget"
  },
  {
    emoji: "₹",
    title: "Budget Friendly",
    desc: "Always within your ₹ budget range"
  },
  {
    emoji: "🍽️",
    title: "15+ Indian Dishes",
    desc: "Curated selection of the best Indian cuisine"
  },
  {
    emoji: "📊",
    title: "Swipe Training",
    desc: "The more you swipe, the smarter it gets"
  },
  { emoji: "⚡", title: "Instant Results", desc: "Pick in under 10 seconds" }
];
const TESTIMONIALS = [
  {
    initials: "PS",
    name: "Priya S.",
    quote: "Tastee saved me from ordering the same boring takeout every day. It actually knows what I want!",
    color: "bg-violet-500"
  },
  {
    initials: "RM",
    name: "Rahul M.",
    quote: "The swipe system is addictive — it actually learns what I like! My recommendations get better every day.",
    color: "bg-purple-600"
  },
  {
    initials: "SK",
    name: "Sneha K.",
    quote: "Finally an app that gets Indian food right. The AI suggestions are spot on for my budget too.",
    color: "bg-fuchsia-600"
  }
];
function useReveal() {
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.12 }
    );
    const nodes = el.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    for (const n of nodes) observer.observe(n);
    return () => observer.disconnect();
  }, []);
  return ref;
}
function StickyNav() {
  const navRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const handler = () => {
      if (window.scrollY > 20) {
        el.classList.add("shadow-elevated");
      } else {
        el.classList.remove("shadow-elevated");
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "header",
    {
      ref: navRef,
      className: "fixed top-0 left-0 right-0 z-50 transition-smooth",
      style: {
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(14px)"
      },
      "data-ocid": "landing.nav",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto h-16 flex items-center justify-between px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-display font-bold text-primary tracking-tight select-none", children: "🍴 Tastee" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden sm:flex items-center gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "#how-it-works",
              className: "text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth",
              children: "How it works"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "#features",
              className: "text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth",
              children: "Features"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "#testimonials",
              className: "text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth",
              children: "Reviews"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/login",
              "data-ocid": "landing.login_button",
              className: "h-9 px-5 text-sm font-medium text-foreground border border-border rounded-xl flex items-center hover:border-primary hover:text-primary transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              children: "Login"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/signup",
              "data-ocid": "landing.signup_button",
              className: "h-9 px-5 text-sm font-semibold bg-primary text-primary-foreground rounded-xl flex items-center cta-premium shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              children: "Sign Up →"
            }
          )
        ] })
      ] })
    }
  );
}
function HeroSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      className: "relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16",
      "data-ocid": "landing.hero.section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              background: "radial-gradient(ellipse 80% 60% at 50% 30%, oklch(0.58 0.25 296 / 0.08) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 80% 80%, oklch(0.58 0.25 296 / 0.05) 0%, transparent 60%)"
            },
            "aria-hidden": "true"
          }
        ),
        FLOATING_CARDS.map((card) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `absolute hidden lg:flex items-center gap-2 bg-card border border-border rounded-2xl px-4 py-3 shadow-hero animate-float select-none pointer-events-none ${card.pos}`,
            style: { animationDelay: card.delay },
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: card.emoji }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground leading-tight", children: card.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary font-bold", children: card.price })
              ] })
            ]
          },
          card.name
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-4xl mx-auto text-center px-6 animate-fade-in", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "w-2 h-2 rounded-full bg-primary animate-pulse-subtle inline-block",
                "aria-hidden": "true"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-primary tracking-wide uppercase", children: "AI-Powered Food Decisions" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "h1",
            {
              className: "font-display font-bold leading-[1.05] tracking-tight mb-6",
              style: { fontSize: "clamp(44px, 7vw, 84px)" },
              children: [
                "Stop wondering.",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-primary", children: "Start eating." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed mb-10",
              style: { fontFamily: "var(--font-body)" },
              children: "Tastee learns your taste and picks the perfect Indian meal — every single time. Powered by AI that gets smarter with every swipe."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4 mb-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/signup",
                "data-ocid": "landing.hero_cta",
                className: "w-full sm:w-auto h-14 px-10 text-base font-display font-semibold bg-primary text-primary-foreground rounded-2xl flex items-center justify-center cta-premium shadow-hero focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                children: "Get Started Free →"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "#how-it-works",
                "data-ocid": "landing.hero_secondary_cta",
                className: "w-full sm:w-auto h-14 px-10 text-base font-medium text-primary border-2 border-primary/30 rounded-2xl flex items-center justify-center hover:bg-primary/5 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                children: "See how it works ↓"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4 mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex -space-x-2", children: [
              "bg-violet-500",
              "bg-purple-400",
              "bg-fuchsia-500",
              "bg-indigo-400"
            ].map((color) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-8 h-8 rounded-full ${color} border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-sm`,
                "aria-hidden": "true"
              },
              color
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Join 1,200+ food lovers" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-yellow-400 text-sm", children: "⭐⭐⭐⭐⭐" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "4.9/5" })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex flex-wrap items-center justify-center gap-3",
              "data-ocid": "landing.badge_row",
              children: BADGES.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "inline-flex items-center gap-1.5 bg-card border border-border rounded-full px-4 py-1.5 text-sm font-medium text-foreground shadow-card",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: b.icon }),
                    b.label
                  ]
                },
                b.label
              ))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 mt-16 w-full max-w-3xl mx-auto px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-3xl overflow-hidden shadow-hero border border-border/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/assets/generated/hero-food-illustration.dim_900x700.png",
              alt: "Tastee AI food recommendation interface",
              className: "w-full object-cover",
              style: { maxHeight: "400px" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 hero-gradient-overlay",
              "aria-hidden": "true"
            }
          )
        ] }) })
      ]
    }
  );
}
function HowItWorksSection({ pageRef }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      id: "how-it-works",
      ref: pageRef,
      className: "relative py-24 px-6 overflow-hidden",
      style: {
        background: "linear-gradient(135deg, oklch(0.52 0.25 296) 0%, oklch(0.42 0.22 310) 100%)"
      },
      "data-ocid": "landing.how_it_works.section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 opacity-10 pointer-events-none",
            style: {
              backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)",
              backgroundSize: "60px 60px"
            },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-16 reveal", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block bg-white/20 text-white text-xs font-semibold uppercase tracking-wider rounded-full px-4 py-1.5 mb-4", children: "Simple Process" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                className: "font-display font-bold text-white mb-4",
                style: { fontSize: "clamp(32px, 5vw, 56px)" },
                children: "3 steps to your perfect meal"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-lg max-w-xl mx-auto", children: "No more endless scrolling. Get your perfect meal in seconds." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: HOW_STEPS.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "reveal bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 text-white",
              style: { transitionDelay: `${i * 0.15}s` },
              "data-ocid": `landing.how_step.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl font-display font-bold text-white mb-6", children: step.num }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-xl mb-2", children: step.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-sm mb-6 leading-relaxed", children: step.desc }),
                step.moods && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: step.moods.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-xs bg-white/20 rounded-full px-3 py-1 font-medium",
                    children: m
                  },
                  m
                )) }),
                step.preview && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: step.preview.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center justify-between bg-white/15 rounded-xl px-4 py-2.5",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: p.split(" — ")[0] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-white/90 bg-white/20 rounded-full px-2.5 py-0.5", children: p.split(" — ")[1] })
                    ]
                  },
                  p
                )) }),
                step.actions && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 bg-red-500/30 border border-red-400/40 rounded-2xl py-4 flex flex-col items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "✗" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-white/90", children: "Skip" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-lg shadow-lg", children: "🥘" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 bg-green-500/30 border border-green-400/40 rounded-2xl py-4 flex flex-col items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "❤️" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-white/90", children: "Like" })
                  ] })
                ] })
              ]
            },
            step.num
          )) })
        ] })
      ]
    }
  );
}
function SwipeSection({ pageRef }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      ref: pageRef,
      className: "py-24 px-6 bg-background",
      "data-ocid": "landing.swipe.section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-16 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "reveal-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider rounded-full px-4 py-1.5 mb-6", children: "Swipe System" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "h2",
            {
              className: "font-display font-bold leading-tight mb-6",
              style: { fontSize: "clamp(32px, 4.5vw, 52px)" },
              children: [
                "It's like Tinder",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-primary", children: "for food 🔥" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 p-4 bg-card border border-border rounded-2xl shadow-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0", children: "➡️" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Swipe right" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: '"I like this" — adds to your taste profile' })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 p-4 bg-card border border-border rounded-2xl shadow-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center shrink-0", children: "⬅️" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Swipe left" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: `"I don't want this" — filters it out` })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-relaxed mb-8 text-base", children: [
            "Every swipe trains your personal AI. After just",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "5 swipes" }),
            ", Tastee knows your taste better than you do. The more you swipe, the smarter it gets."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/signup",
              "data-ocid": "landing.swipe_cta",
              className: "inline-flex h-12 px-8 items-center bg-primary text-primary-foreground font-semibold rounded-xl cta-premium shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              children: "Try it now →"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "reveal-right flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-72 sm:w-80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute top-4 left-4 right-4 bottom-0 bg-primary/20 rounded-3xl rotate-3",
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute top-2 left-2 right-2 bottom-0 bg-primary/10 rounded-3xl rotate-1",
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-card border-2 border-primary/30 rounded-3xl overflow-hidden shadow-hero", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-primary/10 to-primary/5 p-8 flex flex-col items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-2xl bg-primary/15 flex items-center justify-center text-5xl shadow-card", children: "🍛" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-xl text-foreground", children: "Butter Chicken" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Punjabi · Restaurant Grade" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mt-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full", children: "₹280" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full", children: "96% match" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 py-5 border-t border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "w-14 h-14 rounded-full bg-red-50 border-2 border-red-200 flex items-center justify-center text-2xl transition-smooth hover:bg-red-100 hover:scale-110 shadow-card",
                  "aria-label": "Skip",
                  children: "✗"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium", children: "Swipe or tap" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "w-14 h-14 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center text-2xl transition-smooth hover:bg-green-100 hover:scale-110 shadow-card",
                  "aria-label": "Like",
                  children: "❤️"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-3 -right-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-elevated animate-pulse-subtle", children: "🤖 AI Pick" })
        ] }) })
      ] }) })
    }
  );
}
function FeaturesSection({ pageRef }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      id: "features",
      ref: pageRef,
      className: "py-24 px-6",
      style: { background: "oklch(0.97 0.01 263)" },
      "data-ocid": "landing.features.section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-16 reveal", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider rounded-full px-4 py-1.5 mb-4", children: "Everything included" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              className: "font-display font-bold text-foreground mb-4",
              style: { fontSize: "clamp(32px, 5vw, 56px)" },
              children: "Everything you need to eat better"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-lg mx-auto", children: "No subscriptions, no complexity. Just smart food decisions." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: FEATURES.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "reveal bg-card rounded-2xl border border-border p-6 feature-card-hover cursor-default",
            style: { transitionDelay: `${i * 0.08}s` },
            "data-ocid": `landing.feature.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl mb-5 shadow-card", children: f.emoji }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-lg mb-2", children: f.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: f.desc })
            ]
          },
          f.title
        )) })
      ] })
    }
  );
}
function TestimonialsSection({ pageRef }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      id: "testimonials",
      ref: pageRef,
      className: "py-24 px-6",
      style: { background: "oklch(0.96 0.02 290)" },
      "data-ocid": "landing.testimonials.section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-16 reveal", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider rounded-full px-4 py-1.5 mb-4", children: "Social Proof" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              className: "font-display font-bold text-foreground mb-4",
              style: { fontSize: "clamp(32px, 5vw, 56px)" },
              children: "Real people, real meals"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg", children: "Join 1,200+ people making better food decisions every day." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: TESTIMONIALS.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "reveal bg-card border border-border rounded-3xl p-8 shadow-card feature-card-hover",
            style: { transitionDelay: `${i * 0.15}s` },
            "data-ocid": `landing.testimonial.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 mb-6 text-yellow-400 text-lg", children: "⭐⭐⭐⭐⭐" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-foreground text-sm leading-relaxed mb-6 italic", children: [
                '"',
                t.quote,
                '"'
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-sm shadow-card`,
                    children: t.initials
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: t.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Verified user" })
                ] })
              ] })
            ]
          },
          t.name
        )) })
      ] })
    }
  );
}
function FinalCTASection({ pageRef }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      ref: pageRef,
      className: "py-32 px-6 text-center relative overflow-hidden",
      style: {
        background: "linear-gradient(135deg, oklch(0.52 0.25 296) 0%, oklch(0.38 0.22 315) 100%)"
      },
      "data-ocid": "landing.final_cta.section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-0 left-0 w-64 h-64 rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2 pointer-events-none",
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute bottom-0 right-0 w-80 h-80 rounded-full bg-white/5 translate-x-1/2 translate-y-1/2 pointer-events-none",
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto relative z-10 reveal", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl mb-6 animate-float", children: "🍛" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              className: "font-display font-bold text-white leading-tight mb-6",
              style: { fontSize: "clamp(36px, 6vw, 68px)" },
              children: "Ready to eat smarter?"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/75 text-xl mb-10 max-w-xl mx-auto leading-relaxed", children: "Join thousands of food lovers who've stopped wondering what to eat. Let AI do the thinking." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/signup",
              "data-ocid": "landing.final_cta_button",
              className: "inline-flex h-16 px-14 items-center justify-center bg-white text-primary font-display font-bold text-lg rounded-2xl cta-premium shadow-hero focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
              children: "Start for Free →"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-white/50 text-sm", children: "No credit card required · Works instantly · 100% free" })
        ] })
      ]
    }
  );
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "footer",
    {
      className: "bg-card border-t border-border py-10 px-6",
      "data-ocid": "landing.footer",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-display font-bold text-primary", children: "🍴 Tastee" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground text-center", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          ". Built with love using",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-primary hover:underline",
              children: "caffeine.ai"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/login",
              className: "text-sm text-muted-foreground hover:text-foreground transition-smooth",
              children: "Login"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/signup",
              className: "text-sm text-primary font-semibold hover:underline transition-smooth",
              children: "Sign Up"
            }
          )
        ] })
      ] })
    }
  );
}
function LandingPage() {
  const howRef = useReveal();
  const swipeRef = useReveal();
  const featuresRef = useReveal();
  const testimonialsRef = useReveal();
  const ctaRef = useReveal();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background",
      "data-ocid": "landing.page",
      style: { scrollBehavior: "smooth" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StickyNav, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSection, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(HowItWorksSection, { pageRef: howRef }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SwipeSection, { pageRef: swipeRef }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FeaturesSection, { pageRef: featuresRef }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TestimonialsSection, { pageRef: testimonialsRef }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FinalCTASection, { pageRef: ctaRef }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
      ]
    }
  );
}
export {
  LandingPage as default
};
