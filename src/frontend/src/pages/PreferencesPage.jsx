import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { apiUpdatePreferences } from "../api/backend";
import AuthenticatedLayout from "../components/layout/AuthenticatedLayout";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { usePreferences } from "../context/PreferencesContext";
import { useToast } from "../context/ToastContext";
import { haptic } from "../utils/haptic";

const CUISINES = [
  "North Indian",
  "South Indian",
  "Street Food",
  "Mughlai",
  "Hyderabadi",
  "Chinese",
];
const SPICE_LEVELS = [
  { value: "mild", label: "Mild 🌿" },
  { value: "medium", label: "Medium 🌶️" },
  { value: "hot", label: "Hot 🔥" },
  { value: "extra_hot", label: "Extra Hot 💥" },
];
const MEAL_TYPES = [
  { value: "breakfast", label: "🌅 Breakfast" },
  { value: "lunch", label: "☀️ Lunch" },
  { value: "dinner", label: "🌙 Dinner" },
  { value: "snack", label: "🍿 Snack" },
];

export default function PreferencesPage() {
  const { token, setUser } = useAuth();
  const { preferences, setPreferences } = usePreferences();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const [spiceLevel, setSpiceLevel] = useState(preferences?.spiceLevel ?? null);
  const [cuisines, setCuisines] = useState(
    preferences?.cuisinePreferences ?? [],
  );
  const [mealTypes, setMealTypes] = useState(preferences?.mealTypes ?? []);
  const [budget, setBudget] = useState(
    preferences?.budget ? String(preferences.budget) : "",
  );
  const [notifications, setNotifications] = useState(
    preferences?.notificationsEnabled ?? false,
  );
  const [loading, setLoading] = useState(false);

  function toggleArr(arr, setter, val) {
    setter(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
    haptic(6);
  }

  async function handleSave() {
    setLoading(true);
    const prefs = {
      budget: budget ? Number.parseInt(budget, 10) : null,
      dietaryRestrictions: [],
      cuisinePreferences: cuisines,
      mealTypes,
      spiceLevel,
      notificationsEnabled: notifications,
    };
    try {
      const updated = await apiUpdatePreferences(token, prefs);
      setUser(updated);
      setPreferences(prefs);
      haptic(15);
      success("Preferences saved!");
      navigate({ to: "/profile" });
    } catch {
      error("Could not save preferences.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthenticatedLayout>
      <div
        className="px-4 pt-6 pb-6 animate-fade-in"
        data-ocid="preferences.page"
      >
        <button
          type="button"
          onClick={() => navigate({ to: "/profile" })}
          className="flex items-center gap-1.5 text-sm text-muted-foreground mb-5 hover:text-foreground transition-smooth focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded"
          data-ocid="preferences.back_button"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>

        <h1 className="text-2xl font-display font-bold text-foreground mb-6">
          Preferences
        </h1>

        {/* Budget */}
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-foreground mb-3">
            Daily Budget
          </h2>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
              ₹
            </span>
            <input
              type="number"
              placeholder="No limit"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              min={50}
              max={5000}
              id="prefs-budget"
              data-ocid="preferences.budget_input"
              className="w-full h-11 pl-8 pr-4 border border-input rounded-xl bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-smooth"
            />
          </div>
        </section>

        {/* Spice level */}
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-foreground mb-3">
            Spice Level
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {SPICE_LEVELS.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => {
                  setSpiceLevel(s.value);
                  haptic(6);
                }}
                data-ocid={`preferences.spice_${s.value}`}
                className={`h-10 rounded-xl border text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95 ${
                  spiceLevel === s.value
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-foreground hover:border-primary/40"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </section>

        {/* Cuisines */}
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-foreground mb-3">
            Favorite Cuisines
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {CUISINES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => toggleArr(cuisines, setCuisines, c)}
                data-ocid={`preferences.cuisine_${c.toLowerCase().replace(/\s+/g, "_")}`}
                className={`h-10 rounded-xl border text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95 ${
                  cuisines.includes(c)
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-foreground hover:border-primary/40"
                }`}
              >
                {cuisines.includes(c) && "✓ "}
                {c}
              </button>
            ))}
          </div>
        </section>

        {/* Meal types */}
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-foreground mb-3">
            Meal Types
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {MEAL_TYPES.map((m) => (
              <button
                key={m.value}
                type="button"
                onClick={() => toggleArr(mealTypes, setMealTypes, m.value)}
                data-ocid={`preferences.meal_${m.value}`}
                className={`h-10 rounded-xl border text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95 ${
                  mealTypes.includes(m.value)
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-foreground hover:border-primary/40"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </section>

        {/* Notifications */}
        <section className="mb-8">
          <div className="flex items-center justify-between p-4 bg-card border border-border rounded-xl">
            <div>
              <p className="text-sm font-medium text-foreground">
                Meal-time reminders
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Get nudged at breakfast, lunch & dinner
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={notifications}
              onClick={() => {
                setNotifications(!notifications);
                haptic(8);
              }}
              data-ocid="preferences.notifications_switch"
              className={`relative inline-flex h-6 w-11 rounded-full transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                notifications ? "bg-primary" : "bg-border"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-background shadow-xs transition-transform duration-200 mt-0.5 ${
                  notifications ? "translate-x-5" : "translate-x-0.5"
                }`}
                aria-hidden="true"
              />
            </button>
          </div>
        </section>

        <Button
          variant="primary"
          size="lg"
          loading={loading}
          className="w-full"
          onClick={handleSave}
          data-ocid="preferences.save_button"
        >
          Save preferences
        </Button>
      </div>
    </AuthenticatedLayout>
  );
}
