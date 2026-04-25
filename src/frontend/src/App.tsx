import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { type ReactNode, Suspense, lazy } from "react";
import { ToastContainer } from "./components/ui/Toast";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { PreferencesProvider } from "./context/PreferencesContext";
import { ToastProvider } from "./context/ToastContext";

// ─── Lazy Pages ──────────────────────────────────────────────────────────────

const LandingPage = lazy(() => import("./pages/LandingPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const SharePage = lazy(() => import("./pages/SharePage"));
const OnboardingPage = lazy(() => import("./pages/OnboardingPage"));
const DecidePage = lazy(() => import("./pages/DecidePage"));
const LoadingDecisionPage = lazy(() => import("./pages/LoadingDecisionPage"));
const BudgetPage = lazy(() => import("./pages/BudgetPage"));
const ResultsPage = lazy(() => import("./pages/ResultsPage"));
const SwipePage = lazy(() => import("./pages/SwipePage"));
const HistoryPage = lazy(() => import("./pages/HistoryPage"));
const PreferencesPage = lazy(() => import("./pages/PreferencesPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));

// ─── Auth Guard ───────────────────────────────────────────────────────────────

function PageLoader() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        <span className="text-sm text-muted-foreground font-body">
          Loading...
        </span>
      </div>
    </div>
  );
}

function SuspensePage({ children }: { children: ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

function getToken(): string | null {
  return localStorage.getItem("tastee_token");
}

// ─── Routes ───────────────────────────────────────────────────────────────────

const rootRoute = createRootRoute({
  component: () => (
    <AuthProvider>
      <PreferencesProvider>
        <ToastProvider>
          <Outlet />
          <ToastContainer />
        </ToastProvider>
      </PreferencesProvider>
    </AuthProvider>
  ),
});

// Public routes
const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <SuspensePage>
      <LandingPage />
    </SuspensePage>
  ),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => (
    <SuspensePage>
      <LoginPage />
    </SuspensePage>
  ),
});

const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signup",
  component: () => (
    <SuspensePage>
      <SignupPage />
    </SuspensePage>
  ),
});

const forgotPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/forgot-password",
  component: () => (
    <SuspensePage>
      <ForgotPasswordPage />
    </SuspensePage>
  ),
});

const shareRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/share/$shareId",
  component: () => (
    <SuspensePage>
      <SharePage />
    </SuspensePage>
  ),
});

// Authenticated routes — redirect to / if no token
const onboardingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/onboarding",
  beforeLoad: () => {
    if (!getToken()) throw redirect({ to: "/" });
  },
  component: () => (
    <SuspensePage>
      <OnboardingPage />
    </SuspensePage>
  ),
});

const decideRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/decide",
  beforeLoad: () => {
    if (!getToken()) throw redirect({ to: "/" });
  },
  component: () => (
    <SuspensePage>
      <DecidePage />
    </SuspensePage>
  ),
});

const loadingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/loading",
  beforeLoad: () => {
    if (!getToken()) throw redirect({ to: "/" });
  },
  component: () => (
    <SuspensePage>
      <LoadingDecisionPage />
    </SuspensePage>
  ),
});

const budgetRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/budget",
  beforeLoad: () => {
    if (!getToken()) throw redirect({ to: "/" });
  },
  component: () => (
    <SuspensePage>
      <BudgetPage />
    </SuspensePage>
  ),
});

const resultsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/results",
  beforeLoad: () => {
    if (!getToken()) throw redirect({ to: "/" });
  },
  component: () => (
    <SuspensePage>
      <ResultsPage />
    </SuspensePage>
  ),
});

const swipeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/swipe",
  beforeLoad: () => {
    if (!getToken()) throw redirect({ to: "/" });
  },
  component: () => (
    <SuspensePage>
      <SwipePage />
    </SuspensePage>
  ),
});

const historyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/history",
  beforeLoad: () => {
    if (!getToken()) throw redirect({ to: "/" });
  },
  component: () => (
    <SuspensePage>
      <HistoryPage />
    </SuspensePage>
  ),
});

const preferencesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/preferences",
  beforeLoad: () => {
    if (!getToken()) throw redirect({ to: "/" });
  },
  component: () => (
    <SuspensePage>
      <PreferencesPage />
    </SuspensePage>
  ),
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  beforeLoad: () => {
    if (!getToken()) throw redirect({ to: "/" });
  },
  component: () => (
    <SuspensePage>
      <ProfilePage />
    </SuspensePage>
  ),
});

// ─── Router ───────────────────────────────────────────────────────────────────

const routeTree = rootRoute.addChildren([
  landingRoute,
  loginRoute,
  signupRoute,
  forgotPasswordRoute,
  shareRoute,
  onboardingRoute,
  decideRoute,
  loadingRoute,
  budgetRoute,
  resultsRoute,
  swipeRoute,
  historyRoute,
  preferencesRoute,
  profileRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
