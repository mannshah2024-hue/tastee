# Design Brief: Tastee

## Purpose & Context
AI-powered Indian food decision app eliminating decision fatigue. Full-screen, wow-factor landing hero with editorial grandeur. Users select food preferences, mood, budget → get three curated food options with pricing, ratings. Light mode, accessible, high-fidelity interactions. Landing page prioritizes premium visual impact and smooth entrance animations.

## Visual Tone
Premium tech meets editorial elegance. Full-height hero section with layered depth, bold display typography, and purple accent sophistication. Clean, generously spaced, never cluttered. No dark mode. Accessibility-first (WCAG 2.1 AA). Focus: landing page visual grandeur with smooth scroll-triggered card reveals.

## Color Palette

| Token | OKLCH | Hex | Usage |
|-------|-------|-----|-------|
| Primary | 0.58 0.25 296 | #7C3AED | CTAs, active states, selected cards, accent overlays |
| Foreground | 0.25 0.02 263 | #374151 | Body text, primary content |
| Muted | 0.54 0.02 265 | #6B7280 | Secondary text, hints, timestamps |
| Background | 0.99 0 0 | #FFFFFF | Page background |
| Card | 0.98 0.01 263 | #FAFBFC | Card/popover surfaces |
| Border | 0.91 0.01 263 | #E5E7EB | Subtle dividers, input borders |
| Destructive | 0.55 0.22 25 | #DC2626 | Delete, error states |
| Success | 0.72 0.18 24 | Chart-2 | Completed actions, badges |

## Typography

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Display | General Sans | 600–700 | Page titles (H1 40px), section headers (H2 28px), hero text |
| Body | DM Sans | 400–500 | Paragraph text, card content, labels, features |
| Mono | Geist Mono | 400–500 | Code, timestamps, INR prices |

**Type Scale:** H1 (40px landing), H2 (28px), H3 (20px), Body (16px), Small (14px), Xs (12px). Line-height 1.2–1.6 (generous for landing).

## Elevation & Depth

| Surface | Shadow | Radius | Use |
|---------|--------|--------|-----|
| Card | `shadow-card` (1px/2px soft) | 8px (lg) | Feature cards, modals |
| Elevated | `shadow-elevated` (4px/6px) | 8px (lg) | Hover state, floating actions |
| Hero | `shadow-hero` (20px/40px deep) | 8px (lg) | Landing hero section, premium cards |
| Soft | `shadow-lg-soft` (10px/15px subtle) | 8px (lg) | Overlays, popovers |
| Flat | None | 4px (md) / 0 (sm) | Inputs, buttons, tertiary elements |

## Structural Zones

| Zone | Background | Border | Padding | Purpose |
|------|-----------|--------|---------|---------|
| Hero | `bg-background` + gradient overlay | None | 4rem vertical | Full-height landing section, CTA |
| Feature Cards | `bg-card` | `border-b border-border` (subtle) | 2rem | Three-column feature showcase |
| Header | `bg-card` | `border-b border-border` | 1rem | App branding, nav, session info |
| Main Content | `bg-background` | None | 2rem | Food cards, decision flow, results |
| Footer | `bg-muted/5` | `border-t border-border` | 1.5rem | Footer links, help, legal |

## Component Patterns

- **Hero Section:** Full viewport (80–100vh), centered typography, large H1 (40px), subheading (20px body), purple CTA button (padding 16px 32px, uppercase, weight 600).
- **Feature Cards:** 3-column grid, `bg-card`, `shadow-card`, hover elevates with `shadow-elevated` + `-translate-y-1`. Icon (24px), heading (H3), description (body).
- **Buttons:** Primary (purple fill, white text, uppercase 12px, `cta-premium` hover), Secondary (transparent, purple border), Tertiary (ghost, muted text).
- **Cards:** Food cards show image, name, cuisine, price, rating, action buttons. Rounded lg, soft shadow, hover elevation.
- **Inputs:** Subtle border, focus ring (2px purple), error state red.
- **Badges:** Small pills, semantic colors.
- **Empty States:** Centered illustration + call-to-action.

## Motion & Animation

- **Entrance:** Hero text: fade-in (600ms) + slide-up (24px offset). Feature cards: staggered slide-up (400ms, 100ms delay each).
- **Scroll Trigger:** Cards fade-in and lift on scroll-into-view (Intersection Observer pattern).
- **Interaction:** Button hover: `shadow-hero` lift + `animate-scale-in` on click. Card hover: `shadow-elevated` + `-translate-y-1`.
- **Floating Elements:** Optional decorative elements use `animate-float` (3s ease-in-out).
- **Feedback:** Button active state scales to 95%; card selection adds purple border outline; vibration API on swipes/taps.
- **Haptic:** Vibration on CTA taps, swipe actions, meal-time notifications (graceful fallback).
- **Reduced Motion:** Animations disabled if `prefers-reduced-motion: reduce`; fade-only fallback.

## Spacing & Rhythm

- **Grid:** 8px baseline. Hero: 4rem (64px) vertical padding, 2rem (32px) horizontal. Feature cards: 2rem gutter. Card padding: 1.5rem–2rem.
- **Content Padding:** 2rem (32px) page margins, 1.5rem (24px) card internal padding, 1rem (16px) component spacing.
- **Type Rhythm:** 1.4–1.6 line-height (hero text generous), 1.5 body, 1.2 labels. Letter-spacing: +0.02em for headlines, 0 for body.

## Constraints & Anti-Patterns

- ❌ No dark mode. Light mode only across all pages.
- ❌ No bootstrap-blue defaults or generic Tailwind shadows. All colors OKLCH tokens.
- ❌ No arbitrary color classes (`bg-[#123]`). Semantic tokens exclusively.
- ❌ No uniform rounded-lg everywhere; vary by context (buttons sm, cards lg, full for badges).
- ❌ No full-page color gradients. Use gradient overlays only sparingly on hero section.
- ❌ No bouncy animations. Smooth cubic-bezier curves only.

## Signature Detail

**Purple gradient accent on hero & CTAs:** Hero section features a subtle purple gradient overlay (opacity 0.06) for premium depth. Every decision point (landing CTA, food selection buttons, refine actions) uses purple fills and elevated shadows. This creates a decision-centric visual language distinct from commodity food apps. Landing page especially emphasizes this through large-scale typography and full-viewport hero.

## Accessibility Targets

- **Contrast:** All text ≥ 4.5:1 (AA) on all backgrounds. Purple text on white: 5.2:1. Charcoal text on white: 10.5:1.
- **Keyboard Navigation:** Full tab/shift+tab support, visible focus rings (purple outline, 2px).
- **ARIA:** Cards have `role="button"`, swipe actions have `aria-label`, loader has `aria-live="polite"`. Hero section uses semantic `<section role="banner">`.
- **Motion:** Reduced-motion query respected; animations disabled if `prefers-reduced-motion: reduce`.
- **Color Alone:** Food badges + status states use icons + color (never color alone).

## Landing Page Special (Wow-Factor)

Hero section spans 80–100vh, full-width centered text hierarchy (H1 headline, subheading, CTA). Gradient overlay adds depth without clutter. Feature cards below hero (3-column) with icon, heading, body. Staggered entrance animations on scroll. Smooth transitions throughout. No ads, no noise, just premium first impression.
