import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import type { UserPublic } from "../types";

const TOKEN_KEY = "tastee_token";
const USER_KEY = "tastee_user";

interface AuthContextValue {
  token: string | null;
  user: UserPublic | null;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  setUser: (user: UserPublic) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function loadFromStorage<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_KEY),
  );
  const [user, setUserState] = useState<UserPublic | null>(() =>
    loadFromStorage<UserPublic>(USER_KEY),
  );

  const setToken = useCallback((newToken: string) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    setTokenState(newToken);
  }, []);

  const setUser = useCallback((newUser: UserPublic) => {
    localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    setUserState(newUser);
  }, []);

  const logout = useCallback(() => {
    // Clear all tastee_ prefixed keys
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k?.startsWith("tastee_")) keysToRemove.push(k);
    }
    for (const k of keysToRemove) localStorage.removeItem(k);
    setTokenState(null);
    setUserState(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token && !!user,
        setToken,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
