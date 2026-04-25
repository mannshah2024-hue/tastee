import { useCallback, useEffect, useState } from "react";
import type { DecisionResult } from "../types";
import { getTodayKey } from "../utils/formatters";

const SESSION_PREFIX = "tastee_session_";

interface SessionData {
  results: DecisionResult | null;
  selectedFoodId: string | null;
  dateKey: string;
}

/**
 * Manages today's decision results in localStorage.
 * Auto-clears at midnight.
 */
export function useSession() {
  const todayKey = getTodayKey();
  const storageKey = `${SESSION_PREFIX}${todayKey}`;

  const loadSession = useCallback((): SessionData | null => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return null;
      const data = JSON.parse(raw) as SessionData;
      if (data.dateKey !== todayKey) return null;
      return data;
    } catch {
      return null;
    }
  }, [storageKey, todayKey]);

  const [session, setSessionState] = useState<SessionData | null>(loadSession);

  const saveSession = useCallback(
    (results: DecisionResult, selectedFoodId?: string) => {
      const data: SessionData = {
        results,
        selectedFoodId: selectedFoodId ?? null,
        dateKey: todayKey,
      };
      try {
        localStorage.setItem(storageKey, JSON.stringify(data));
        setSessionState(data);
      } catch {
        // Storage full or blocked
      }
    },
    [storageKey, todayKey],
  );

  const clearSession = useCallback(() => {
    localStorage.removeItem(storageKey);
    setSessionState(null);
  }, [storageKey]);

  // Auto-clear at midnight
  useEffect(() => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setDate(midnight.getDate() + 1);
    midnight.setHours(0, 0, 0, 0);
    const msUntilMidnight = midnight.getTime() - now.getTime();

    const timer = setTimeout(() => {
      clearSession();
    }, msUntilMidnight);

    return () => clearTimeout(timer);
  }, [clearSession]);

  return {
    session,
    results: session?.results ?? null,
    selectedFoodId: session?.selectedFoodId ?? null,
    hasResults: session?.results != null,
    saveSession,
    clearSession,
  };
}
