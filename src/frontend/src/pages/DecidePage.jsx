import { useNavigate } from "@tanstack/react-router";
import AuthenticatedLayout from "../components/layout/AuthenticatedLayout";
import Button from "../components/ui/Button";
import { useSession } from "../hooks/useSession";
import { haptic } from "../utils/haptic";

const MOODS = [
  { value: "comfort", label: "Comfort Food", emoji: "🤗" },
  { value: "healthy", label: "Healthy", emoji: "🥗" },
  { value: "spicy", label: "Spicy Craving", emoji: "🌶️" },
  { value: "quick", label: "Quick Bite", emoji: "⚡" },
  { value: "festive", label: "Celebrate", emoji: "🎉" },
  { value: "general", label: "Surprise Me", emoji: "🎲" },
];

export default function DecidePage() {
  const navigate = useNavigate();
  const { hasResults } = useSession();

  function handleMood(mood) {
    haptic(10);
    localStorage.setItem("tastee_pending_mood", mood);
    navigate({ to: "/budget" });
  }

  return (
    <AuthenticatedLayout>
      <div className="px-4 pt-6 pb-4 animate-fade-in" data-ocid="decide.page">
        {/* Today's restore banner */}
        {hasResults && (
          <button
            type="button"
            onClick={() => navigate({ to: "/results" })}
            data-ocid="decide.restore_results_banner"
            className="w-full mb-5 px-4 py-3 bg-primary/10 border border-primary/20 rounded-xl text-sm text-primary font-medium flex items-center justify-between hover:bg-primary/15 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span>📋 You have today's picks — view results</span>
            <span aria-hidden="true">→</span>
          </button>
        )}

        <h1 className="text-2xl font-display font-bold text-foreground">
          What's your vibe today?
        </h1>
        <p className="text-sm text-muted-foreground mt-1 mb-6">
          Pick a mood and we'll find the perfect dish for you
        </p>

        {/* Mood grid */}
        <div className="grid grid-cols-2 gap-3">
          {MOODS.map((mood, i) => (
            <button
              key={mood.value}
              type="button"
              onClick={() => handleMood(mood.value)}
              data-ocid={`decide.mood.item.${i + 1}`}
              className="p-4 bg-card border border-border rounded-2xl text-left hover:border-primary/50 hover:shadow-elevated hover:-translate-y-0.5 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95"
              aria-label={`${mood.label} mood`}
            >
              <span className="text-3xl block mb-2">{mood.emoji}</span>
              <span className="text-sm font-display font-semibold text-foreground">
                {mood.label}
              </span>
            </button>
          ))}
        </div>

        {/* Quick decide */}
        <div className="mt-6">
          <Button
            variant="hero"
            size="lg"
            className="w-full"
            onClick={() => handleMood("general")}
            data-ocid="decide.quick_decide_button"
          >
            🎲 Decide for me now
          </Button>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
