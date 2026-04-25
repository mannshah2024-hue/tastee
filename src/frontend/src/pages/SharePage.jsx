import { Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { apiGetSharedPick } from "../api/backend";
import Badge from "../components/ui/Badge";
import { formatDeliveryTime, formatINR } from "../utils/formatters";

export default function SharePage() {
  const { shareId } = useParams({ from: "/share/$shareId" });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    apiGetSharedPick(shareId)
      .then(setData)
      .catch(() => setErr("This shared pick could not be found."))
      .finally(() => setLoading(false));
  }, [shareId]);

  return (
    <div
      className="min-h-screen bg-background flex flex-col"
      data-ocid="share.page"
    >
      <header className="fixed top-0 left-0 right-0 z-40 h-14 bg-card border-b border-border shadow-card">
        <div className="max-w-lg mx-auto h-full flex items-center px-4">
          <span className="text-xl font-display font-bold text-primary tracking-tight">
            Tastee
          </span>
        </div>
      </header>

      <main className="flex-1 pt-20 pb-8 max-w-lg mx-auto w-full px-4">
        {loading && (
          <div
            data-ocid="share.loading_state"
            className="flex flex-col items-center justify-center h-64 gap-3"
          >
            <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            <p className="text-sm text-muted-foreground">
              Loading shared pick...
            </p>
          </div>
        )}

        {err && (
          <div
            data-ocid="share.error_state"
            className="flex flex-col items-center justify-center h-64 gap-4 text-center"
          >
            <span className="text-4xl">😕</span>
            <p className="text-foreground font-medium">{err}</p>
            <Link to="/" className="text-sm text-primary hover:underline">
              ← Back to home
            </Link>
          </div>
        )}

        {data && (
          <div className="animate-slide-up">
            <div className="text-center mb-6">
              <p className="text-sm text-muted-foreground">
                Someone shared their Tastee pick with you! 🎉
              </p>
              <h1 className="text-2xl font-display font-bold text-foreground mt-1">
                {data.food.name}
              </h1>
            </div>

            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-card">
              <div className="h-48 bg-primary/10 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-6xl font-display font-bold text-primary">
                    {data.food.name.charAt(0)}
                  </span>
                  <p className="text-3xl mt-2">🍽️</p>
                </div>
              </div>
              <div className="p-5">
                <h2 className="font-display font-semibold text-foreground text-xl">
                  {data.food.name}
                </h2>
                <p className="text-muted-foreground text-sm mt-0.5">
                  {data.food.restaurant}
                </p>

                <div className="flex items-center gap-3 mt-3 flex-wrap">
                  <span className="font-semibold text-foreground">
                    {formatINR(data.food.price)}
                  </span>
                  <span className="text-muted-foreground text-xs">•</span>
                  <span className="text-xs text-muted-foreground">
                    ⏱ {formatDeliveryTime(data.food.deliveryTime)}
                  </span>
                  <span className="text-muted-foreground text-xs">•</span>
                  <span className="text-xs text-amber-600 font-medium">
                    ⭐ {data.food.rating}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                  {data.food.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {data.food.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="muted">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="mt-5 p-4 bg-primary/5 rounded-xl border border-primary/10 text-center">
                  <p className="text-sm text-primary font-medium">
                    Want personalized picks like this?
                  </p>
                  <Link
                    to="/signup"
                    data-ocid="share.signup_cta"
                    className="mt-2 inline-flex h-10 px-6 text-sm font-medium bg-primary text-primary-foreground rounded-lg items-center justify-center hover:bg-primary/90 transition-smooth shadow-card"
                  >
                    Try Tastee free →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
