import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { apiRunDecision } from "../api/backend";
import SkeletonCard from "../components/food/SkeletonCard";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { useSession } from "../hooks/useSession";

const LOADING_MESSAGES = [
  "Analysing your taste preferences...",
  "Checking today's popular picks...",
  "Running the Tastee Decision Engine...",
  "Almost there, finding your matches...",
];

export default function LoadingDecisionPage() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { saveSession } = useSession();
  const { error } = useToast();

  useEffect(() => {
    const budget = localStorage.getItem("tastee_pending_budget");
    const mood = localStorage.getItem("tastee_pending_mood") ?? "general";

    async function runDecision() {
      try {
        const result = await apiRunDecision(
          token,
          budget ? Number.parseInt(budget, 10) : undefined,
          mood,
        );
        saveSession(result);
        localStorage.removeItem("tastee_pending_budget");
        localStorage.removeItem("tastee_pending_mood");
        navigate({ to: "/results" });
      } catch {
        error("Failed to get recommendations. Please try again.");
        navigate({ to: "/decide" });
      }
    }

    const t = setTimeout(runDecision, 600);
    return () => clearTimeout(t);
  }, [token, navigate, saveSession, error]);

  return (
    <div
      className="min-h-screen bg-background flex flex-col pt-14"
      data-ocid="loading_decision.page"
    >
      {/* Mini header */}
      <div className="fixed top-0 left-0 right-0 z-40 h-14 bg-card border-b border-border flex items-center px-4">
        <span className="text-xl font-display font-bold text-primary">
          Tastee
        </span>
      </div>

      <div className="flex-1 max-w-lg mx-auto w-full px-4 pt-6">
        {/* Spinner header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl mx-auto mb-4 animate-scale-in">
            🧠
          </div>
          <h1 className="text-xl font-display font-bold text-foreground">
            Finding your perfect dish
          </h1>
          <p
            className="text-sm text-muted-foreground mt-1 animate-pulse"
            data-ocid="loading_decision.loading_state"
          >
            {
              LOADING_MESSAGES[
                Math.floor(Math.random() * LOADING_MESSAGES.length)
              ]
            }
          </p>
        </div>

        {/* Skeleton cards */}
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
