import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import AuthenticatedLayout from "../components/layout/AuthenticatedLayout";
import Button from "../components/ui/Button";
import { haptic } from "../utils/haptic";

const BUDGET_PRESETS = [
  { label: "Under ₹150", value: 150, emoji: "💸" },
  { label: "₹150–₹300", value: 300, emoji: "💰" },
  { label: "₹300–₹500", value: 500, emoji: "💵" },
  { label: "No limit", value: null, emoji: "♾️" },
];

export default function BudgetPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(undefined);
  const [custom, setCustom] = useState("");

  function handleContinue() {
    const budget =
      selected !== undefined
        ? selected
        : custom
          ? Number.parseInt(custom, 10)
          : null;
    haptic(10);
    localStorage.setItem(
      "tastee_pending_budget",
      budget !== null ? String(budget) : "",
    );
    navigate({ to: "/loading" });
  }

  return (
    <AuthenticatedLayout>
      <div className="px-4 pt-6 animate-fade-in" data-ocid="budget.page">
        <button
          type="button"
          onClick={() => navigate({ to: "/decide" })}
          className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6 hover:text-foreground transition-smooth focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded"
          data-ocid="budget.back_button"
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

        <h1 className="text-2xl font-display font-bold text-foreground">
          Set your budget
        </h1>
        <p className="text-sm text-muted-foreground mt-1 mb-6">
          How much do you want to spend today?
        </p>

        <div className="grid grid-cols-2 gap-3">
          {BUDGET_PRESETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => {
                setSelected(preset.value);
                setCustom("");
                haptic(8);
              }}
              data-ocid={`budget.preset.${preset.label.toLowerCase().replace(/[^a-z0-9]/g, "_")}`}
              className={`p-4 rounded-xl border text-left transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95 ${
                selected === preset.value && !custom
                  ? "border-primary bg-primary/10 shadow-card"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <span className="text-2xl block mb-1">{preset.emoji}</span>
              <span className="text-sm font-semibold text-foreground">
                {preset.label}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-4">
          <p className="text-xs text-muted-foreground mb-2 font-medium">
            Or enter a custom amount:
          </p>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
              ₹
            </span>
            <input
              type="number"
              placeholder="Enter amount"
              value={custom}
              onChange={(e) => {
                setCustom(e.target.value);
                setSelected(undefined);
              }}
              min={50}
              max={5000}
              id="budget-custom"
              data-ocid="budget.custom_input"
              className="w-full h-11 pl-8 pr-4 border border-input rounded-xl bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-smooth"
            />
          </div>
        </div>

        <Button
          variant="hero"
          size="lg"
          className="w-full mt-6"
          onClick={handleContinue}
          data-ocid="budget.continue_button"
        >
          Find my food 🍛
        </Button>
      </div>
    </AuthenticatedLayout>
  );
}
