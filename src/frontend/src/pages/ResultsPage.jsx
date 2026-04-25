import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
  apiCreateShareLink,
  apiRefineDecision,
  apiSavePick,
} from "../api/backend";
import FoodCard from "../components/food/FoodCard";
import SkeletonCard from "../components/food/SkeletonCard";
import AuthenticatedLayout from "../components/layout/AuthenticatedLayout";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { useSession } from "../hooks/useSession";
import { haptic, hapticSuccess, hapticSwipe } from "../utils/haptic";

const REFINE_OPTIONS = [
  { value: "veg", label: "🌿 Veg only" },
  { value: "non-veg", label: "🍗 Non-veg only" },
  { value: "budget", label: "💸 Lower budget" },
  { value: "popular", label: "⭐ Most popular" },
];

/** Animated pulsing dot indicator used during refinement */
function PulsingDots() {
  return (
    <span className="inline-flex gap-1 ml-1" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="inline-block w-1.5 h-1.5 rounded-full bg-purple-500"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1.2,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.2,
          }}
        />
      ))}
    </span>
  );
}

export default function ResultsPage() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { results, saveSession } = useSession();
  const { success, error } = useToast();

  const [savedIds, setSavedIds] = useState(new Set());
  const [refining, setRefining] = useState(false);
  const [shareLoading, setShareLoading] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);

  if (!results) {
    return (
      <AuthenticatedLayout>
        <div
          className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 px-4 pt-16 flex flex-col items-center gap-5"
          data-ocid="results.empty_state"
        >
          <motion.span
            className="text-6xl"
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            🍽️
          </motion.span>
          <h2 className="text-2xl font-display font-bold text-foreground text-center">
            No picks yet!
          </h2>
          <p className="text-sm text-muted-foreground text-center max-w-xs">
            Start by telling us your mood and budget — we'll find the perfect
            meal for you.
          </p>
          <Button
            variant="primary"
            onClick={() => navigate({ to: "/decide" })}
            data-ocid="results.decide_cta"
            className="rounded-full px-8 py-3 shadow-xl active:scale-95 transition-smooth"
          >
            Get recommendations →
          </Button>
        </div>
      </AuthenticatedLayout>
    );
  }

  async function handleSave(food) {
    if (savedIds.has(food.id)) return;
    hapticSuccess();
    setSavedIds((prev) => new Set([...prev, food.id]));
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

  return (
    <AuthenticatedLayout>
      {/* Full page gradient background */}
      <div
        className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50"
        data-ocid="results.page"
      >
        <div className="px-4 pt-6 pb-10 max-w-lg mx-auto">
          {/* ── Page Header ── */}
          <motion.div
            className="flex items-center gap-3 mb-1"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <button
              type="button"
              onClick={() => navigate({ to: "/decide" })}
              data-ocid="results.back_button"
              aria-label="Go back"
              className="flex-shrink-0 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-foreground hover:shadow-lg active:scale-90 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-display font-bold text-foreground leading-tight">
                Your Perfect Picks 🍽️
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Based on your taste &amp; mood
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate({ to: "/swipe" })}
              data-ocid="results.swipe_button"
              className="flex-shrink-0 text-xs font-medium text-purple-700 border border-purple-200 bg-purple-50 rounded-full px-3 py-1.5 hover:bg-purple-100 active:scale-95 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Swipe mode ✦
            </button>
          </motion.div>

          {/* ── Refinement loading text (aria-live) ── */}
          <div
            aria-live="polite"
            aria-atomic="true"
            className="h-8 flex items-center mb-3"
          >
            {refining && (
              <motion.p
                className="text-sm text-purple-600 font-medium flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Finding better matches
                <PulsingDots />
              </motion.p>
            )}
          </div>

          {/* ── Food Cards ── */}
          <AnimatePresence mode="wait">
            {refining ? (
              <motion.div
                key="skeletons"
                className="flex flex-col gap-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {[1, 2, 3].map((i) => (
                  <SkeletonCard key={i} className="rounded-2xl shadow-xl" />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="cards"
                className="flex flex-col gap-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {results.items.map((food, i) => {
                  const isBestPick = i === 0;

                  return (
                    <motion.div
                      key={food.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: i * 0.15,
                        duration: 0.45,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                      className={isBestPick ? "relative" : undefined}
                      data-ocid={`results.card_wrapper.${i + 1}`}
                    >
                      {/* Best pick decorations */}
                      {isBestPick && (
                        <>
                          {/* Ambient glow behind card */}
                          <div
                            className="absolute inset-0 rounded-3xl pointer-events-none"
                            style={{
                              boxShadow:
                                "0 0 48px 8px rgba(124, 58, 237, 0.22)",
                              zIndex: 0,
                            }}
                            aria-hidden="true"
                          />
                          {/* Badge above card */}
                          <div className="flex justify-center mb-2.5 relative z-10">
                            <motion.span
                              className="inline-flex items-center gap-1.5 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md"
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{
                                delay: 0.1,
                                type: "spring",
                                stiffness: 280,
                              }}
                            >
                              ✨ Best Match for You
                            </motion.span>
                          </div>
                        </>
                      )}

                      {/* Card wrapper with hover lift */}
                      <motion.div
                        className={
                          isBestPick
                            ? "relative z-10 rounded-3xl shadow-2xl overflow-hidden"
                            : "rounded-2xl shadow-xl overflow-hidden"
                        }
                        whileHover={{ y: -4 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                        style={
                          isBestPick
                            ? {
                                transform: "scale(1.02)",
                                transformOrigin: "center",
                              }
                            : undefined
                        }
                      >
                        {/* Float animation wrapper for best pick */}
                        {isBestPick ? (
                          <motion.div
                            animate={{ y: [0, -6, 0] }}
                            transition={{
                              duration: 3,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "easeInOut",
                            }}
                          >
                            <FoodCard
                              food={food}
                              reason={results.reasons?.[food.id]}
                              badge={
                                savedIds.has(food.id)
                                  ? "✓ Saved"
                                  : results.badges?.[food.id]
                              }
                              onSave={
                                !savedIds.has(food.id) ? handleSave : undefined
                              }
                              onShare={
                                shareLoading !== food.id
                                  ? handleShare
                                  : undefined
                              }
                              index={i + 1}
                              selected
                            />
                          </motion.div>
                        ) : (
                          <FoodCard
                            food={food}
                            reason={results.reasons?.[food.id]}
                            badge={
                              savedIds.has(food.id)
                                ? "✓ Saved"
                                : results.badges?.[food.id]
                            }
                            onSave={
                              !savedIds.has(food.id) ? handleSave : undefined
                            }
                            onShare={
                              shareLoading !== food.id ? handleShare : undefined
                            }
                            index={i + 1}
                          />
                        )}
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Refine Filters ── */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <p className="text-sm font-semibold text-foreground mb-3">
              Not quite right? Refine picks:
            </p>
            <div
              className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none"
              style={{ scrollbarWidth: "none" }}
            >
              {REFINE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleRefine(opt.value)}
                  disabled={refining}
                  data-ocid={`results.refine_${opt.value}`}
                  aria-pressed={activeFilter === opt.value}
                  className={[
                    "flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-smooth active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none",
                    activeFilter === opt.value
                      ? "bg-purple-600 text-white shadow-md"
                      : "bg-white text-foreground border border-border hover:border-purple-300 hover:text-purple-700 shadow-sm",
                  ].join(" ")}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* ── Primary CTA ── */}
          <motion.div
            className="mt-7"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.4 }}
          >
            <button
              type="button"
              onClick={() => navigate({ to: "/decide" })}
              data-ocid="results.new_decision_button"
              className="w-full bg-purple-600 text-white font-semibold rounded-full px-8 py-4 shadow-xl hover:shadow-2xl hover:bg-purple-700 active:scale-95 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              🔄 Try New Options
            </button>
          </motion.div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
