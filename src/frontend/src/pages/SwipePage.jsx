import { useNavigate } from "@tanstack/react-router";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  MOCK_FOODS,
  apiRecordSwipe,
  apiSavePick,
  apiUndoLastSwipe,
} from "../api/backend";
import AuthenticatedLayout from "../components/layout/AuthenticatedLayout";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { useSession } from "../hooks/useSession";
import { formatINR } from "../utils/formatters";
import {
  haptic,
  hapticError,
  hapticSuccess,
  hapticSwipe,
} from "../utils/haptic";

// ─── Constants ────────────────────────────────────────────────────────────────

const DRAG_THRESHOLD = 100;
const TOTAL_CARDS = 10;

const CRAVING_QUOTES = [
  "You deserve something comforting today 🍛",
  "This will hit just right 🤤",
  "Hot, fresh, and satisfying 🔥",
  "Perfect for your mood right now ✨",
  "Once you see it, you'll want it 😍",
  "Crispy, golden, and made for you 🧡",
  "Your taste buds are calling 📞",
  "The one you've been waiting for 💫",
  "Rich, bold flavors await 🌶️",
  "A little indulgence never hurt 🍽️",
];

const FOOD_EMOJIS = {
  f1: "🍛",
  f2: "🥞",
  f3: "🍚",
  f4: "🥬",
  f5: "🍞",
  f6: "🫘",
  f7: "🍗",
  f8: "🥣",
  f9: "🫕",
  f10: "🐟",
  f11: "🥟",
  f12: "🍲",
  f13: "🍛",
  f14: "🫓",
  f15: "🧀",
};

const FOOD_COLORS = {
  f1: "from-orange-100 to-red-50",
  f2: "from-amber-50 to-yellow-100",
  f3: "from-yellow-100 to-amber-50",
  f4: "from-green-50 to-emerald-100",
  f5: "from-orange-50 to-amber-100",
  f6: "from-yellow-50 to-orange-50",
  f7: "from-red-50 to-orange-100",
  f8: "from-stone-50 to-amber-50",
  f9: "from-orange-100 to-amber-50",
  f10: "from-teal-50 to-cyan-100",
  f11: "from-yellow-50 to-amber-100",
  f12: "from-red-50 to-orange-50",
  f13: "from-yellow-100 to-orange-100",
  f14: "from-amber-100 to-yellow-50",
  f15: "from-green-50 to-lime-100",
};

// ─── Build swipe deck ─────────────────────────────────────────────────────────

function buildDeck(sessionItems) {
  const base = sessionItems?.length ? sessionItems : [];
  const extras = MOCK_FOODS.filter((f) => !base.find((b) => b.id === f.id));
  const merged = [...base, ...extras];
  const picked = merged.slice(0, TOTAL_CARDS);
  return picked.map((food, i) => ({
    ...food,
    cravingQuote: CRAVING_QUOTES[i % CRAVING_QUOTES.length],
  }));
}

// ─── Single Swipe Card ────────────────────────────────────────────────────────

function SwipeCard({ food, onSwipe, isTop, stackIndex }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-18, 0, 18]);
  const likeOpacity = useTransform(x, [20, 80], [0, 1]);
  const nopeOpacity = useTransform(x, [-80, -20], [1, 0]);

  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset > DRAG_THRESHOLD || velocity > 500) {
      onSwipe("right");
    } else if (offset < -DRAG_THRESHOLD || velocity < -500) {
      onSwipe("left");
    }
  };

  const scale = isTop ? 1 : stackIndex === 1 ? 0.97 : 0.94;
  const yOffset = isTop ? 0 : stackIndex === 1 ? 8 : 16;

  return (
    <motion.div
      className="absolute w-full"
      style={{
        x: isTop ? x : undefined,
        rotate: isTop ? rotate : undefined,
        scale,
        y: yOffset,
        zIndex: isTop ? 30 : stackIndex === 1 ? 20 : 10,
        cursor: isTop ? "grab" : "default",
        transformOrigin: "bottom center",
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={isTop ? handleDragEnd : undefined}
      whileDrag={isTop ? { cursor: "grabbing" } : undefined}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      data-ocid={isTop ? "swipe.card" : undefined}
      aria-label={isTop ? `${food.name} from ${food.restaurant}` : undefined}
    >
      {/* Like overlay */}
      {isTop && (
        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-start pl-8 rounded-3xl pointer-events-none"
          style={{
            backgroundColor: "rgba(34,197,94,0.35)",
            opacity: likeOpacity,
          }}
        >
          <div className="border-4 border-green-500 rounded-2xl px-5 py-2 rotate-[-18deg]">
            <span className="text-green-500 text-4xl font-black leading-none">
              ✓
            </span>
          </div>
        </motion.div>
      )}

      {/* Nope overlay */}
      {isTop && (
        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-end pr-8 rounded-3xl pointer-events-none"
          style={{
            backgroundColor: "rgba(239,68,68,0.35)",
            opacity: nopeOpacity,
          }}
        >
          <div className="border-4 border-red-500 rounded-2xl px-5 py-2 rotate-[18deg]">
            <span className="text-red-500 text-4xl font-black leading-none">
              ✗
            </span>
          </div>
        </motion.div>
      )}

      {/* Card body */}
      <div
        className="bg-white rounded-3xl overflow-hidden shadow-2xl select-none touch-none"
        style={{ height: "65vh", maxHeight: 520, minHeight: 400 }}
      >
        {/* Food image area */}
        <div
          className={`relative w-full bg-gradient-to-br ${FOOD_COLORS[food.id] || "from-purple-50 to-pink-50"} flex items-center justify-center`}
          style={{ height: "55%" }}
        >
          {/* Veg/Non-veg dot */}
          <div className="absolute top-4 left-4 z-10">
            <div
              className={`w-7 h-7 rounded-full border-2 border-white flex items-center justify-center shadow-md ${food.isVeg ? "bg-green-500" : "bg-red-500"}`}
              title={food.isVeg ? "Vegetarian" : "Non-Vegetarian"}
            >
              <span className="text-white text-xs font-bold">
                {food.isVeg ? "V" : "N"}
              </span>
            </div>
          </div>

          {/* Rating badge */}
          <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1 shadow-sm">
            <span className="text-amber-400 text-xs">⭐</span>
            <span className="text-xs font-semibold text-gray-800">
              {food.rating}
            </span>
          </div>

          {/* Emoji */}
          <div className="flex flex-col items-center gap-2">
            <span
              className="text-8xl drop-shadow-sm"
              role="img"
              aria-hidden="true"
            >
              {FOOD_EMOJIS[food.id] || "🍽️"}
            </span>
            <span className="text-xs font-medium text-gray-500 bg-white/70 rounded-full px-3 py-0.5">
              {food.cuisine}
            </span>
          </div>
        </div>

        {/* Glass info panel */}
        <div className="p-5 bg-white h-[45%] flex flex-col justify-between">
          <div>
            <h2 className="font-display font-bold text-2xl text-gray-900 leading-tight truncate">
              {food.name}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">{food.restaurant}</p>
            <p className="text-sm italic text-purple-500 mt-1 leading-snug">
              {food.cravingQuote}
            </p>
          </div>

          <div>
            {/* Price + delivery row */}
            <div className="flex items-center gap-3 mt-2">
              <span className="font-bold text-gray-900 text-base">
                {formatINR(food.price)}
              </span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500">
                ⏱ {food.deliveryTime} min
              </span>
              <span className="text-xs text-gray-400">•</span>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${food.spiceLevel === "hot" ? "bg-red-50 text-red-600" : food.spiceLevel === "mild" ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"}`}
              >
                {food.spiceLevel === "hot"
                  ? "🌶️ Hot"
                  : food.spiceLevel === "mild"
                    ? "🌿 Mild"
                    : "🔥 Medium"}
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {food.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-purple-50 text-purple-600 rounded-full px-2.5 py-0.5 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SwipePage() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { results } = useSession();
  const { success, info } = useToast();

  const [deck] = useState(() => buildDeck(results?.items));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipedCount, setSwipedCount] = useState(0);
  const [swipeHistory, setSwipeHistory] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [exitDirection, setExitDirection] = useState(null);
  const [cardKey, setCardKey] = useState(0);

  const currentFood = deck[currentIndex] ?? null;
  const isDone = currentIndex >= deck.length;

  // Keyboard support
  useEffect(() => {
    function handleKeyDown(e) {
      if (isAnimating || isDone) return;
      if (e.key === "ArrowRight") triggerSwipe("right");
      else if (e.key === "ArrowLeft") triggerSwipe("left");
      else if ((e.metaKey || e.ctrlKey) && e.key === "z") handleUndo();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  // Auto-navigate when all done
  useEffect(() => {
    if (isDone && deck.length > 0) {
      info("All done! Here are your best matches 🍽️");
      const t = setTimeout(() => navigate({ to: "/results" }), 800);
      return () => clearTimeout(t);
    }
  }, [isDone, deck.length, info, navigate]);

  function triggerSwipe(direction) {
    if (isAnimating || !currentFood || isDone) return;
    hapticSwipe();
    if (direction === "right") hapticSuccess();
    else hapticError();

    setIsAnimating(true);
    setExitDirection(direction);

    // Record swipe
    apiRecordSwipe(token, currentFood.id, direction).catch(() => {});
    if (direction === "right") {
      apiSavePick(token, currentFood.id)
        .then(() => success(`❤️ Saved ${currentFood.name}!`))
        .catch(() => {});
    }

    // Push to history
    setSwipeHistory((prev) => [
      ...prev,
      { index: currentIndex, food: currentFood, direction },
    ]);

    setTimeout(() => {
      setCurrentIndex((i) => i + 1);
      setSwipedCount((c) => c + 1);
      setIsAnimating(false);
      setExitDirection(null);
      setCardKey((k) => k + 1);
    }, 350);
  }

  async function handleUndo() {
    if (swipeHistory.length === 0 || isAnimating) return;
    haptic(10);
    try {
      await apiUndoLastSwipe(token);
      const last = swipeHistory[swipeHistory.length - 1];
      setSwipeHistory((prev) => prev.slice(0, -1));
      setCurrentIndex(last.index);
      setSwipedCount((c) => Math.max(0, c - 1));
      setCardKey((k) => k + 1);
    } catch {
      // Silently ignore
    }
  }

  const progressPercent = isDone ? 100 : (swipedCount / deck.length) * 100;
  const visibleCards = deck.slice(currentIndex, currentIndex + 3);

  if (!results || deck.length === 0) {
    return (
      <AuthenticatedLayout>
        <div
          className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4"
          data-ocid="swipe.empty_state"
        >
          <span className="text-6xl animate-float">🃏</span>
          <h2 className="text-xl font-display font-bold text-foreground">
            No cards to swipe
          </h2>
          <p className="text-sm text-gray-500">Get recommendations first!</p>
          <button
            type="button"
            className="bg-primary text-white px-6 py-3 rounded-full font-semibold shadow-elevated transition-smooth active:scale-95"
            onClick={() => navigate({ to: "/decide" })}
            data-ocid="swipe.decide_cta"
          >
            Get picks →
          </button>
        </div>
      </AuthenticatedLayout>
    );
  }

  return (
    <AuthenticatedLayout>
      {/* Page background gradient */}
      <div className="min-h-[calc(100vh-120px)] bg-gradient-to-b from-purple-50 via-white to-pink-50 flex flex-col">
        {/* Header bar */}
        <div className="px-4 pt-5 pb-2">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-lg font-display font-bold text-gray-900 leading-tight">
                Swipe to decide
              </h1>
              <p className="text-xs text-gray-400 mt-0.5">
                ← → keys or drag the card
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-display font-black text-primary">
                {Math.min(swipedCount + 1, deck.length)}
              </span>
              <span className="text-sm text-gray-400 font-medium">
                {" "}
                / {deck.length}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-1.5 bg-purple-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-400 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* ARIA live region */}
        <div
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
          id="swipe-live-region"
        >
          {currentFood
            ? `Card ${swipedCount + 1} of ${deck.length}: ${currentFood.name} from ${currentFood.restaurant}`
            : "All cards swiped"}
        </div>

        {/* Card stack area */}
        <section
          className="flex-1 flex flex-col items-center justify-center px-4 py-2"
          aria-label="Swipe card stack"
          data-ocid="swipe.page"
        >
          <AnimatePresence mode="popLayout">
            {isDone ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 text-center"
              >
                <span className="text-7xl">🎉</span>
                <h2 className="text-2xl font-display font-bold text-gray-900">
                  All done!
                </h2>
                <p className="text-gray-500">
                  Taking you to your best matches…
                </p>
                <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              </motion.div>
            ) : (
              <div
                className="relative w-full max-w-sm"
                style={{ height: "65vh", maxHeight: 520, minHeight: 400 }}
              >
                {/* Render stack: bottom to top */}
                {[...visibleCards].reverse().map((food, reverseIdx) => {
                  const stackIndex = visibleCards.length - 1 - reverseIdx;
                  const isTop = stackIndex === 0;

                  return (
                    <AnimatePresence
                      key={`${food.id}-${cardKey}-${stackIndex}`}
                      mode="popLayout"
                    >
                      {isTop && exitDirection ? (
                        <motion.div
                          key={`exit-${cardKey}`}
                          className="absolute w-full"
                          style={{ zIndex: 30 }}
                          initial={{ x: 0, rotate: 0, opacity: 1 }}
                          animate={{
                            x: exitDirection === "right" ? 600 : -600,
                            rotate: exitDirection === "right" ? 30 : -30,
                            opacity: 0,
                          }}
                          transition={{ duration: 0.32, ease: "easeIn" }}
                        >
                          <div
                            className="bg-white rounded-3xl shadow-2xl overflow-hidden"
                            style={{
                              height: "65vh",
                              maxHeight: 520,
                              minHeight: 400,
                            }}
                          >
                            <div
                              className={`w-full bg-gradient-to-br ${FOOD_COLORS[food.id] || "from-purple-50 to-pink-50"} flex items-center justify-center`}
                              style={{ height: "55%" }}
                            >
                              <span className="text-8xl">
                                {FOOD_EMOJIS[food.id] || "🍽️"}
                              </span>
                            </div>
                            <div className="p-5">
                              <h2 className="font-bold text-2xl text-gray-900">
                                {food.name}
                              </h2>
                              <p className="text-sm italic text-purple-500 mt-1">
                                {food.cravingQuote}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <SwipeCard
                          key={`card-${food.id}-${cardKey}`}
                          food={food}
                          onSwipe={isTop ? triggerSwipe : undefined}
                          isTop={isTop}
                          stackIndex={stackIndex}
                        />
                      )}
                    </AnimatePresence>
                  );
                })}
              </div>
            )}
          </AnimatePresence>
        </section>

        {/* Action buttons */}
        {!isDone && (
          <div className="px-4 pb-4 flex flex-col items-center gap-3">
            {/* "See best match" button after 5+ swipes */}
            <AnimatePresence>
              {swipedCount >= 5 && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="bg-purple-600 text-white px-6 py-3 rounded-full shadow-xl font-semibold text-sm animate-bounce"
                  onClick={() => navigate({ to: "/results" })}
                  data-ocid="swipe.see_results_button"
                  aria-label="See your best matches"
                >
                  🍽️ See your best match
                </motion.button>
              )}
            </AnimatePresence>

            {/* Main swipe controls */}
            <div className="flex items-center justify-center gap-5">
              {/* Dislike */}
              <motion.button
                type="button"
                whileTap={{ scale: 0.85 }}
                whileHover={{ scale: 1.08 }}
                onClick={() => triggerSwipe("left")}
                data-ocid="swipe.dislike_button"
                aria-label="Skip this food"
                className="w-16 h-16 rounded-full bg-red-50 text-red-400 shadow-lg flex items-center justify-center text-2xl border-2 border-red-100 hover:bg-red-500 hover:text-white hover:border-red-500 transition-smooth"
              >
                ✗
              </motion.button>

              {/* Undo */}
              <AnimatePresence>
                {swipeHistory.length > 0 && (
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    whileTap={{ scale: 0.85 }}
                    onClick={handleUndo}
                    data-ocid="swipe.undo_button"
                    aria-label="Undo last swipe"
                    className="w-12 h-12 rounded-full bg-white border border-gray-200 text-gray-400 shadow flex items-center justify-center text-base hover:text-gray-700 hover:border-gray-300 transition-smooth"
                  >
                    ↩
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Like */}
              <motion.button
                type="button"
                whileTap={{ scale: 0.85 }}
                whileHover={{ scale: 1.08 }}
                onClick={() => triggerSwipe("right")}
                data-ocid="swipe.like_button"
                aria-label="Save this food"
                className="w-16 h-16 rounded-full bg-green-50 text-green-500 shadow-lg flex items-center justify-center text-2xl border-2 border-green-100 hover:bg-green-500 hover:text-white hover:border-green-500 transition-smooth"
              >
                ✓
              </motion.button>
            </div>

            <p className="text-center text-xs text-gray-400">
              ✗ skip · ✓ save to history · ↩ undo
            </p>
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
