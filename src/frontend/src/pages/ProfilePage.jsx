import { useNavigate } from "@tanstack/react-router";
import AuthenticatedLayout from "../components/layout/AuthenticatedLayout";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { usePreferences } from "../context/PreferencesContext";
import { useToast } from "../context/ToastContext";
import { formatINR, getInitials } from "../utils/formatters";
import { haptic } from "../utils/haptic";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { preferences } = usePreferences();
  const { success } = useToast();

  function handleLogout() {
    haptic(15);
    logout();
    success("Logged out. See you soon!");
    navigate({ to: "/" });
  }

  if (!user) return null;

  return (
    <AuthenticatedLayout>
      <div className="px-4 pt-6 pb-6 animate-fade-in" data-ocid="profile.page">
        {/* Avatar + name */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-display font-bold shadow-lg-soft mb-3">
            {getInitials(user.name)}
          </div>
          <h1 className="text-xl font-display font-bold text-foreground">
            {user.name}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">{user.email}</p>
        </div>

        {/* Preferences summary */}
        <div className="bg-card border border-border rounded-2xl p-5 mb-4 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-foreground">
              Taste Profile
            </h2>
            <button
              type="button"
              onClick={() => navigate({ to: "/preferences" })}
              data-ocid="profile.edit_preferences_button"
              className="text-xs font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded"
            >
              Edit →
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Daily budget
              </span>
              <span className="text-sm font-medium text-foreground">
                {preferences?.budget
                  ? formatINR(preferences.budget)
                  : "No limit"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Spice level</span>
              <span className="text-sm font-medium text-foreground capitalize">
                {preferences?.spiceLevel ?? "Not set"}
              </span>
            </div>
            {preferences?.cuisinePreferences &&
              preferences.cuisinePreferences.length > 0 && (
                <div>
                  <span className="text-sm text-muted-foreground block mb-2">
                    Favorite cuisines
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {preferences.cuisinePreferences.map((c) => (
                      <Badge key={c} variant="primary">
                        {c}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-card mb-6">
          {[
            {
              label: "My Picks History",
              path: "/history",
              emoji: "📋",
              ocid: "profile.history_link",
            },
            {
              label: "Food Preferences",
              path: "/preferences",
              emoji: "⚙️",
              ocid: "profile.preferences_link",
            },
            {
              label: "Get Recommendations",
              path: "/decide",
              emoji: "🍛",
              ocid: "profile.decide_link",
            },
          ].map((item, i) => (
            <button
              key={item.path}
              type="button"
              onClick={() => navigate({ to: item.path })}
              data-ocid={item.ocid}
              className={`w-full flex items-center gap-3 px-5 py-4 hover:bg-secondary/30 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset text-left ${
                i > 0 ? "border-t border-border" : ""
              }`}
            >
              <span className="text-xl w-8 h-8 flex items-center justify-center bg-primary/10 rounded-xl">
                {item.emoji}
              </span>
              <span className="text-sm font-medium text-foreground flex-1">
                {item.label}
              </span>
              <svg
                className="w-4 h-4 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          ))}
        </div>

        {/* Logout */}
        <Button
          variant="outline"
          size="lg"
          className="w-full border-destructive text-destructive hover:bg-red-50"
          onClick={handleLogout}
          data-ocid="profile.logout_button"
        >
          Log out
        </Button>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
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
      </div>
    </AuthenticatedLayout>
  );
}
