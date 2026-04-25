import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { apiUpdatePreferences } from "../api/backend";
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
  { value: "mild", label: "Mild 🌿", desc: "No heat at all" },
  { value: "medium", label: "Medium 🌶️", desc: "Mild warmth" },
  { value: "hot", label: "Hot 🔥", desc: "Bring the heat" },
  { value: "extra_hot", label: "Extra Hot 💥", desc: "I can handle it" },
];

export default function OnboardingPage() {
  const { token, user, setUser } = useAuth();
  const { setPreferences } = usePreferences();
  const { success } = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [spiceLevel, setSpiceLevel] = useState(null);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);

  function toggleCuisine(c) {
    setSelectedCuisines((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
    );
  }

  async function handleFinish() {
    setLoading(true);
    const prefs = {
      budget: budget ? Number.parseInt(budget, 10) : null,
      dietaryRestrictions: [],
      cuisinePreferences: selectedCuisines,
      mealTypes: [],
      spiceLevel: spiceLevel,
      notificationsEnabled: false,
    };
    try {
      const updated = await apiUpdatePreferences(token, prefs);
      setUser(updated);
      setPreferences(prefs);
      haptic(15);
      success("Preferences saved! Let's find your food!");
      navigate({ to: "/decide" });
    } catch {
      navigate({ to: "/decide" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen bg-background flex flex-col items-center justify-center px-4"
      data-ocid="onboarding.page"
    >
      <div className="w-full max-w-sm">
        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-smooth ${s <= step ? "bg-primary" : "bg-border"}`}
            />
          ))}
        </div>

        {step === 1 && (
          <div className="animate-fade-in">
            <div className="text-3xl mb-4">👋</div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              Welcome, {user?.name?.split(" ")[0]}!
            </h1>
            <p className="text-muted-foreground mt-2 mb-8 text-sm">
              Let's set up your taste profile in 3 quick steps.
            </p>
            <h2 className="font-display font-semibold text-foreground mb-4">
              How spicy do you like it?
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {SPICE_LEVELS.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => {
                    setSpiceLevel(s.value);
                    haptic(8);
                  }}
                  data-ocid={`onboarding.spice_${s.value}`}
                  className={`p-3 rounded-xl border text-left transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95 ${
                    spiceLevel === s.value
                      ? "border-primary bg-primary/10 shadow-card"
                      : "border-border bg-card hover:border-primary/40"
                  }`}
                >
                  <p className="font-medium text-sm text-foreground">
                    {s.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {s.desc}
                  </p>
                </button>
              ))}
            </div>
            <Button
              variant="primary"
              size="lg"
              className="w-full mt-6"
              onClick={() => {
                setStep(2);
                haptic(8);
              }}
              data-ocid="onboarding.step1_next"
            >
              Continue →
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              Favorite cuisines?
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Select all that you enjoy
            </p>
            <div className="grid grid-cols-2 gap-2">
              {CUISINES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    toggleCuisine(c);
                    haptic(6);
                  }}
                  data-ocid={`onboarding.cuisine_${c.toLowerCase().replace(/\s+/g, "_")}`}
                  className={`p-3 rounded-xl border text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95 ${
                    selectedCuisines.includes(c)
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card text-foreground hover:border-primary/40"
                  }`}
                >
                  {selectedCuisines.includes(c) && "✓ "}
                  {c}
                </button>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                variant="secondary"
                size="md"
                onClick={() => setStep(1)}
                className="flex-1"
                data-ocid="onboarding.step2_back"
              >
                ← Back
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  setStep(3);
                  haptic(8);
                }}
                className="flex-1"
                data-ocid="onboarding.step2_next"
              >
                Continue →
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              Daily food budget?
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              We'll show options within your range
            </p>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">
                ₹
              </span>
              <input
                type="number"
                placeholder="500"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                min={50}
                max={5000}
                id="onboarding-budget"
                data-ocid="onboarding.budget_input"
                className="w-full h-12 pl-8 pr-4 border border-input rounded-xl bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-smooth"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Leave empty to see all options
            </p>
            <div className="flex gap-3 mt-6">
              <Button
                variant="secondary"
                size="md"
                onClick={() => setStep(2)}
                className="flex-1"
                data-ocid="onboarding.step3_back"
              >
                ← Back
              </Button>
              <Button
                variant="hero"
                size="md"
                loading={loading}
                onClick={handleFinish}
                className="flex-1"
                data-ocid="onboarding.finish_button"
              >
                Let's eat! 🍛
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
