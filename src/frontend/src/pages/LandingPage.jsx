import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

/* ---------- Data ---------- */
const FLOATING_CARDS = [
  {
    emoji: "🍛",
    name: "Butter Chicken",
    price: "₹280",
    delay: "0s",
    pos: "top-32 left-8 sm:left-16",
  },
  {
    emoji: "🥘",
    name: "Dal Makhani",
    price: "₹180",
    delay: "0.8s",
    pos: "top-48 right-6 sm:right-20",
  },
  {
    emoji: "🫓",
    name: "Pav Bhaji",
    price: "₹120",
    delay: "1.6s",
    pos: "bottom-40 left-4 sm:left-24",
  },
  {
    emoji: "🍚",
    name: "Biryani",
    price: "₹320",
    delay: "0.4s",
    pos: "bottom-52 right-4 sm:right-16",
  },
];

const BADGES = [
  { icon: "🤖", label: "AI-Powered" },
  { icon: "🎯", label: "Personalized" },
  { icon: "⚡", label: "Instant" },
  { icon: "🇮🇳", label: "Indian Food" },
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
      "❄️ Light",
    ],
  },
  {
    num: "2",
    title: "AI picks for you",
    desc: "3 perfect options scored just for you",
    preview: [
      "🍛 Butter Chicken — 96%",
      "🥘 Dal Makhani — 91%",
      "🍚 Biryani — 87%",
    ],
  },
  {
    num: "3",
    title: "Swipe to train",
    desc: "Every swipe teaches the AI your taste",
    actions: true,
  },
];

const FEATURES = [
  {
    emoji: "🤖",
    title: "AI Decision Engine",
    desc: "Smart scoring that learns from every choice",
  },
  {
    emoji: "🎯",
    title: "Personalized Picks",
    desc: "Tailored to your taste, mood, and budget",
  },
  {
    emoji: "₹",
    title: "Budget Friendly",
    desc: "Always within your ₹ budget range",
  },
  {
    emoji: "🍽️",
    title: "15+ Indian Dishes",
    desc: "Curated selection of the best Indian cuisine",
  },
  {
    emoji: "📊",
    title: "Swipe Training",
    desc: "The more you swipe, the smarter it gets",
  },
  { emoji: "⚡", title: "Instant Results", desc: "Pick in under 10 seconds" },
];

const TESTIMONIALS = [
  {
    initials: "PS",
    name: "Priya S.",
    quote:
      "Tastee saved me from ordering the same boring takeout every day. It actually knows what I want!",
    color: "bg-violet-500",
  },
  {
    initials: "RM",
    name: "Rahul M.",
    quote:
      "The swipe system is addictive — it actually learns what I like! My recommendations get better every day.",
    color: "bg-purple-600",
  },
  {
    initials: "SK",
    name: "Sneha K.",
    quote:
      "Finally an app that gets Indian food right. The AI suggestions are spot on for my budget too.",
    color: "bg-fuchsia-600",
  },
];

/* ---------- Reveal Hook ---------- */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
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
      { threshold: 0.12 },
    );
    const nodes = el.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    for (const n of nodes) observer.observe(n);
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ---------- Sticky Nav ---------- */
function StickyNav() {
  const navRef = useRef(null);
  useEffect(() => {
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

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-smooth"
      style={{
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(14px)",
      }}
      data-ocid="landing.nav"
    >
      <div className="max-w-6xl mx-auto h-16 flex items-center justify-between px-6">
        <span className="text-2xl font-display font-bold text-primary tracking-tight select-none">
          🍴 Tastee
        </span>
        <nav className="hidden sm:flex items-center gap-8">
          <a
            href="#how-it-works"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
          >
            How it works
          </a>
          <a
            href="#features"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
          >
            Features
          </a>
          <a
            href="#testimonials"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
          >
            Reviews
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            data-ocid="landing.login_button"
            className="h-9 px-5 text-sm font-medium text-foreground border border-border rounded-xl flex items-center hover:border-primary hover:text-primary transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Login
          </Link>
          <Link
            to="/signup"
            data-ocid="landing.signup_button"
            className="h-9 px-5 text-sm font-semibold bg-primary text-primary-foreground rounded-xl flex items-center cta-premium shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Sign Up →
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ---------- Hero Section ---------- */
function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16"
      data-ocid="landing.hero.section"
    >
      {/* Radial gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, oklch(0.58 0.25 296 / 0.08) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 80% 80%, oklch(0.58 0.25 296 / 0.05) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      {/* Floating food cards — desktop only */}
      {FLOATING_CARDS.map((card) => (
        <div
          key={card.name}
          className={`absolute hidden lg:flex items-center gap-2 bg-card border border-border rounded-2xl px-4 py-3 shadow-hero animate-float select-none pointer-events-none ${card.pos}`}
          style={{ animationDelay: card.delay }}
          aria-hidden="true"
        >
          <span className="text-2xl">{card.emoji}</span>
          <div>
            <p className="text-xs font-semibold text-foreground leading-tight">
              {card.name}
            </p>
            <p className="text-xs text-primary font-bold">{card.price}</p>
          </div>
        </div>
      ))}

      {/* Main hero content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6 animate-fade-in">
        {/* Top badge */}
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-8">
          <span
            className="w-2 h-2 rounded-full bg-primary animate-pulse-subtle inline-block"
            aria-hidden="true"
          />
          <span className="text-xs font-semibold text-primary tracking-wide uppercase">
            AI-Powered Food Decisions
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-display font-bold leading-[1.05] tracking-tight mb-6"
          style={{ fontSize: "clamp(44px, 7vw, 84px)" }}
        >
          Stop wondering.
          <br />
          <span className="text-gradient-primary">Start eating.</span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed mb-10"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Tastee learns your taste and picks the perfect Indian meal — every
          single time. Powered by AI that gets smarter with every swipe.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Link
            to="/signup"
            data-ocid="landing.hero_cta"
            className="w-full sm:w-auto h-14 px-10 text-base font-display font-semibold bg-primary text-primary-foreground rounded-2xl flex items-center justify-center cta-premium shadow-hero focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Get Started Free →
          </Link>
          <a
            href="#how-it-works"
            data-ocid="landing.hero_secondary_cta"
            className="w-full sm:w-auto h-14 px-10 text-base font-medium text-primary border-2 border-primary/30 rounded-2xl flex items-center justify-center hover:bg-primary/5 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            See how it works ↓
          </a>
        </div>

        {/* Social proof */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[
                "bg-violet-500",
                "bg-purple-400",
                "bg-fuchsia-500",
                "bg-indigo-400",
              ].map((color) => (
                <div
                  key={color}
                  className={`w-8 h-8 rounded-full ${color} border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-sm`}
                  aria-hidden="true"
                />
              ))}
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-foreground">
                Join 1,200+ food lovers
              </p>
              <div className="flex items-center gap-1">
                <span className="text-yellow-400 text-sm">⭐⭐⭐⭐⭐</span>
                <span className="text-xs text-muted-foreground">4.9/5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Badge row */}
        <div
          className="flex flex-wrap items-center justify-center gap-3"
          data-ocid="landing.badge_row"
        >
          {BADGES.map((b) => (
            <span
              key={b.label}
              className="inline-flex items-center gap-1.5 bg-card border border-border rounded-full px-4 py-1.5 text-sm font-medium text-foreground shadow-card"
            >
              <span>{b.icon}</span>
              {b.label}
            </span>
          ))}
        </div>
      </div>

      {/* Hero image */}
      <div className="relative z-10 mt-16 w-full max-w-3xl mx-auto px-6">
        <div className="relative rounded-3xl overflow-hidden shadow-hero border border-border/50">
          <img
            src="/assets/generated/hero-food-illustration.dim_900x700.png"
            alt="Tastee AI food recommendation interface"
            className="w-full object-cover"
            style={{ maxHeight: "400px" }}
          />
          <div
            className="absolute inset-0 hero-gradient-overlay"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- How It Works ---------- */
function HowItWorksSection({ pageRef }) {
  return (
    <section
      id="how-it-works"
      ref={pageRef}
      className="relative py-24 px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.52 0.25 296) 0%, oklch(0.42 0.22 310) 100%)",
      }}
      data-ocid="landing.how_it_works.section"
    >
      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 reveal">
          <span className="inline-block bg-white/20 text-white text-xs font-semibold uppercase tracking-wider rounded-full px-4 py-1.5 mb-4">
            Simple Process
          </span>
          <h2
            className="font-display font-bold text-white mb-4"
            style={{ fontSize: "clamp(32px, 5vw, 56px)" }}
          >
            3 steps to your perfect meal
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            No more endless scrolling. Get your perfect meal in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HOW_STEPS.map((step, i) => (
            <div
              key={step.num}
              className="reveal bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 text-white"
              style={{ transitionDelay: `${i * 0.15}s` }}
              data-ocid={`landing.how_step.item.${i + 1}`}
            >
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl font-display font-bold text-white mb-6">
                {step.num}
              </div>
              <h3 className="font-display font-bold text-xl mb-2">
                {step.title}
              </h3>
              <p className="text-white/70 text-sm mb-6 leading-relaxed">
                {step.desc}
              </p>

              {step.moods && (
                <div className="flex flex-wrap gap-2">
                  {step.moods.map((m) => (
                    <span
                      key={m}
                      className="text-xs bg-white/20 rounded-full px-3 py-1 font-medium"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              )}
              {step.preview && (
                <div className="space-y-3">
                  {step.preview.map((p) => (
                    <div
                      key={p}
                      className="flex items-center justify-between bg-white/15 rounded-xl px-4 py-2.5"
                    >
                      <span className="text-sm font-medium">
                        {p.split(" — ")[0]}
                      </span>
                      <span className="text-xs font-bold text-white/90 bg-white/20 rounded-full px-2.5 py-0.5">
                        {p.split(" — ")[1]}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              {step.actions && (
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex-1 bg-red-500/30 border border-red-400/40 rounded-2xl py-4 flex flex-col items-center gap-1">
                    <span className="text-2xl">✗</span>
                    <span className="text-xs font-semibold text-white/90">
                      Skip
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-lg shadow-lg">
                    🥘
                  </div>
                  <div className="flex-1 bg-green-500/30 border border-green-400/40 rounded-2xl py-4 flex flex-col items-center gap-1">
                    <span className="text-2xl">❤️</span>
                    <span className="text-xs font-semibold text-white/90">
                      Like
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Swipe Feature ---------- */
function SwipeSection({ pageRef }) {
  return (
    <section
      ref={pageRef}
      className="py-24 px-6 bg-background"
      data-ocid="landing.swipe.section"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div className="reveal-left">
            <span className="inline-block bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider rounded-full px-4 py-1.5 mb-6">
              Swipe System
            </span>
            <h2
              className="font-display font-bold leading-tight mb-6"
              style={{ fontSize: "clamp(32px, 4.5vw, 52px)" }}
            >
              It's like Tinder
              <br />
              <span className="text-gradient-primary">for food 🔥</span>
            </h2>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-2xl shadow-card">
                <span className="text-2xl w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                  ➡️
                </span>
                <div>
                  <p className="font-semibold text-foreground">Swipe right</p>
                  <p className="text-sm text-muted-foreground">
                    "I like this" — adds to your taste profile
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-2xl shadow-card">
                <span className="text-2xl w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
                  ⬅️
                </span>
                <div>
                  <p className="font-semibold text-foreground">Swipe left</p>
                  <p className="text-sm text-muted-foreground">
                    "I don't want this" — filters it out
                  </p>
                </div>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-8 text-base">
              Every swipe trains your personal AI. After just{" "}
              <strong className="text-foreground">5 swipes</strong>, Tastee
              knows your taste better than you do. The more you swipe, the
              smarter it gets.
            </p>
            <Link
              to="/signup"
              data-ocid="landing.swipe_cta"
              className="inline-flex h-12 px-8 items-center bg-primary text-primary-foreground font-semibold rounded-xl cta-premium shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Try it now →
            </Link>
          </div>

          {/* Right: Mock swipe card */}
          <div className="reveal-right flex justify-center">
            <div className="relative w-72 sm:w-80">
              {/* Background stacked cards */}
              <div
                className="absolute top-4 left-4 right-4 bottom-0 bg-primary/20 rounded-3xl rotate-3"
                aria-hidden="true"
              />
              <div
                className="absolute top-2 left-2 right-2 bottom-0 bg-primary/10 rounded-3xl rotate-1"
                aria-hidden="true"
              />

              {/* Main card */}
              <div className="relative bg-card border-2 border-primary/30 rounded-3xl overflow-hidden shadow-hero">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 flex flex-col items-center gap-4">
                  <div className="w-24 h-24 rounded-2xl bg-primary/15 flex items-center justify-center text-5xl shadow-card">
                    🍛
                  </div>
                  <div className="text-center">
                    <p className="font-display font-bold text-xl text-foreground">
                      Butter Chicken
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Punjabi · Restaurant Grade
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-3">
                      <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">
                        ₹280
                      </span>
                      <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                        96% match
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center justify-between px-6 py-5 border-t border-border">
                  <button
                    type="button"
                    className="w-14 h-14 rounded-full bg-red-50 border-2 border-red-200 flex items-center justify-center text-2xl transition-smooth hover:bg-red-100 hover:scale-110 shadow-card"
                    aria-label="Skip"
                  >
                    ✗
                  </button>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground font-medium">
                      Swipe or tap
                    </p>
                  </div>
                  <button
                    type="button"
                    className="w-14 h-14 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center text-2xl transition-smooth hover:bg-green-100 hover:scale-110 shadow-card"
                    aria-label="Like"
                  >
                    ❤️
                  </button>
                </div>
              </div>

              {/* AI badge */}
              <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-elevated animate-pulse-subtle">
                🤖 AI Pick
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Features Grid ---------- */
function FeaturesSection({ pageRef }) {
  return (
    <section
      id="features"
      ref={pageRef}
      className="py-24 px-6"
      style={{ background: "oklch(0.97 0.01 263)" }}
      data-ocid="landing.features.section"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <span className="inline-block bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider rounded-full px-4 py-1.5 mb-4">
            Everything included
          </span>
          <h2
            className="font-display font-bold text-foreground mb-4"
            style={{ fontSize: "clamp(32px, 5vw, 56px)" }}
          >
            Everything you need to eat better
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            No subscriptions, no complexity. Just smart food decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="reveal bg-card rounded-2xl border border-border p-6 feature-card-hover cursor-default"
              style={{ transitionDelay: `${i * 0.08}s` }}
              data-ocid={`landing.feature.item.${i + 1}`}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl mb-5 shadow-card">
                {f.emoji}
              </div>
              <h3 className="font-display font-bold text-foreground text-lg mb-2">
                {f.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */
function TestimonialsSection({ pageRef }) {
  return (
    <section
      id="testimonials"
      ref={pageRef}
      className="py-24 px-6"
      style={{ background: "oklch(0.96 0.02 290)" }}
      data-ocid="landing.testimonials.section"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <span className="inline-block bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider rounded-full px-4 py-1.5 mb-4">
            Social Proof
          </span>
          <h2
            className="font-display font-bold text-foreground mb-4"
            style={{ fontSize: "clamp(32px, 5vw, 56px)" }}
          >
            Real people, real meals
          </h2>
          <p className="text-muted-foreground text-lg">
            Join 1,200+ people making better food decisions every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className="reveal bg-card border border-border rounded-3xl p-8 shadow-card feature-card-hover"
              style={{ transitionDelay: `${i * 0.15}s` }}
              data-ocid={`landing.testimonial.item.${i + 1}`}
            >
              <div className="flex items-center gap-1 mb-6 text-yellow-400 text-lg">
                ⭐⭐⭐⭐⭐
              </div>
              <p className="text-foreground text-sm leading-relaxed mb-6 italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-sm shadow-card`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">Verified user</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Final CTA ---------- */
function FinalCTASection({ pageRef }) {
  return (
    <section
      ref={pageRef}
      className="py-32 px-6 text-center relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.52 0.25 296) 0%, oklch(0.38 0.22 315) 100%)",
      }}
      data-ocid="landing.final_cta.section"
    >
      {/* Decorative circles */}
      <div
        className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-white/5 translate-x-1/2 translate-y-1/2 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-3xl mx-auto relative z-10 reveal">
        <div className="text-6xl mb-6 animate-float">🍛</div>
        <h2
          className="font-display font-bold text-white leading-tight mb-6"
          style={{ fontSize: "clamp(36px, 6vw, 68px)" }}
        >
          Ready to eat smarter?
        </h2>
        <p className="text-white/75 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
          Join thousands of food lovers who've stopped wondering what to eat.
          Let AI do the thinking.
        </p>
        <Link
          to="/signup"
          data-ocid="landing.final_cta_button"
          className="inline-flex h-16 px-14 items-center justify-center bg-white text-primary font-display font-bold text-lg rounded-2xl cta-premium shadow-hero focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          Start for Free →
        </Link>
        <p className="mt-6 text-white/50 text-sm">
          No credit card required · Works instantly · 100% free
        </p>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer
      className="bg-card border-t border-border py-10 px-6"
      data-ocid="landing.footer"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xl font-display font-bold text-primary">
          🍴 Tastee
        </span>
        <p className="text-sm text-muted-foreground text-center">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
        <div className="flex items-center gap-6">
          <Link
            to="/login"
            className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-sm text-primary font-semibold hover:underline transition-smooth"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Main Page ---------- */
export default function LandingPage() {
  const howRef = useReveal();
  const swipeRef = useReveal();
  const featuresRef = useReveal();
  const testimonialsRef = useReveal();
  const ctaRef = useReveal();

  return (
    <div
      className="min-h-screen bg-background"
      data-ocid="landing.page"
      style={{ scrollBehavior: "smooth" }}
    >
      <StickyNav />
      <HeroSection />
      <HowItWorksSection pageRef={howRef} />
      <SwipeSection pageRef={swipeRef} />
      <FeaturesSection pageRef={featuresRef} />
      <TestimonialsSection pageRef={testimonialsRef} />
      <FinalCTASection pageRef={ctaRef} />
      <Footer />
    </div>
  );
}
