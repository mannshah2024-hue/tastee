import { r as reactExports } from "./index-d7ywnqEL.js";
import { g as getTodayKey } from "./formatters-DO6xeKaZ.js";
const SESSION_PREFIX = "tastee_session_";
function useSession() {
  const todayKey = getTodayKey();
  const storageKey = `${SESSION_PREFIX}${todayKey}`;
  const loadSession = reactExports.useCallback(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (data.dateKey !== todayKey) return null;
      return data;
    } catch {
      return null;
    }
  }, [storageKey, todayKey]);
  const [session, setSessionState] = reactExports.useState(loadSession);
  const saveSession = reactExports.useCallback(
    (results, selectedFoodId) => {
      const data = {
        results,
        selectedFoodId: selectedFoodId ?? null,
        dateKey: todayKey
      };
      try {
        localStorage.setItem(storageKey, JSON.stringify(data));
        setSessionState(data);
      } catch {
      }
    },
    [storageKey, todayKey]
  );
  const clearSession = reactExports.useCallback(() => {
    localStorage.removeItem(storageKey);
    setSessionState(null);
  }, [storageKey]);
  reactExports.useEffect(() => {
    const now = /* @__PURE__ */ new Date();
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
    results: (session == null ? void 0 : session.results) ?? null,
    selectedFoodId: (session == null ? void 0 : session.selectedFoodId) ?? null,
    hasResults: (session == null ? void 0 : session.results) != null,
    saveSession,
    clearSession
  };
}
export {
  useSession as u
};
