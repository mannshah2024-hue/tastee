import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import type { UserPreferences } from "../types";

interface PreferencesContextValue {
  preferences: UserPreferences | null;
  setPreferences: (prefs: UserPreferences) => void;
  clearPreferences: () => void;
}

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

const DEFAULT_PREFS: UserPreferences = {
  budget: null,
  dietaryRestrictions: [],
  cuisinePreferences: [],
  mealTypes: [],
  spiceLevel: null,
  notificationsEnabled: false,
};

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferencesState] = useState<UserPreferences | null>(
    () => {
      try {
        const raw = localStorage.getItem("tastee_preferences");
        if (!raw) return null;
        return JSON.parse(raw) as UserPreferences;
      } catch {
        return null;
      }
    },
  );

  const setPreferences = useCallback((prefs: UserPreferences) => {
    localStorage.setItem("tastee_preferences", JSON.stringify(prefs));
    setPreferencesState(prefs);
  }, []);

  const clearPreferences = useCallback(() => {
    localStorage.removeItem("tastee_preferences");
    setPreferencesState(null);
  }, []);

  return (
    <PreferencesContext.Provider
      value={{
        preferences: preferences ?? DEFAULT_PREFS,
        setPreferences,
        clearPreferences,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx)
    throw new Error("usePreferences must be used within PreferencesProvider");
  return ctx;
}
