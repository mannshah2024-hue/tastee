import { useEffect, useState } from "react";
import { apiGetHistory } from "../api/backend";
import SkeletonCard from "../components/food/SkeletonCard";
import AuthenticatedLayout from "../components/layout/AuthenticatedLayout";
import Badge from "../components/ui/Badge";
import { useAuth } from "../context/AuthContext";
import { formatINR, formatRelativeTime } from "../utils/formatters";

const FEEDBACK_CONFIG = {
  loved: { emoji: "❤️", label: "Loved", variant: "success" },
  liked: { emoji: "👍", label: "Liked", variant: "primary" },
  disliked: { emoji: "👎", label: "Disliked", variant: "destructive" },
  skipped: { emoji: "⏭️", label: "Skipped", variant: "muted" },
};

export default function HistoryPage() {
  const { token } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiGetHistory(token)
      .then(setHistory)
      .catch(() => setError("Failed to load history"))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <AuthenticatedLayout>
      <div className="px-4 pt-6 pb-4 animate-fade-in" data-ocid="history.page">
        <h1 className="text-2xl font-display font-bold text-foreground mb-1">
          Your history
        </h1>
        <p className="text-sm text-muted-foreground mb-5">
          All the dishes you've saved
        </p>

        {loading && (
          <div
            className="flex flex-col gap-4"
            data-ocid="history.loading_state"
          >
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {error && (
          <div data-ocid="history.error_state" className="text-center py-12">
            <span className="text-4xl block mb-3">⚠️</span>
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {!loading && !error && history.length === 0 && (
          <div
            data-ocid="history.empty_state"
            className="flex flex-col items-center justify-center py-16 gap-4 text-center"
          >
            <span className="text-5xl">📋</span>
            <h2 className="text-xl font-display font-bold text-foreground">
              No history yet
            </h2>
            <p className="text-sm text-muted-foreground max-w-xs">
              Save your favorite food picks and they'll appear here for quick
              re-ordering.
            </p>
          </div>
        )}

        {!loading && history.length > 0 && (
          <div className="flex flex-col gap-3">
            {history.map((entry, i) => {
              const fc =
                FEEDBACK_CONFIG[entry.feedback] ?? FEEDBACK_CONFIG.liked;
              return (
                <div
                  key={entry.id}
                  className="bg-card border border-border rounded-2xl p-4 shadow-card animate-slide-up flex items-center gap-4"
                  style={{ animationDelay: `${i * 0.05}s` }}
                  data-ocid={`history.item.${i + 1}`}
                >
                  {/* Food initial avatar */}
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-xl font-display font-bold text-primary shrink-0">
                    {entry.food.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <h3 className="font-display font-semibold text-foreground truncate">
                        {entry.food.name}
                      </h3>
                      <Badge variant={fc.variant} className="shrink-0">
                        {fc.emoji} {fc.label}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {entry.food.restaurant}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-medium text-foreground">
                        {formatINR(entry.food.price)}
                      </span>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground">
                        {formatRelativeTime(entry.savedAt)}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    ⭐ {entry.food.rating}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
