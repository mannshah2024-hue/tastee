import BottomNav from "./BottomNav";
import Header from "./Header";

/**
 * Layout wrapper for all authenticated pages.
 * Includes Header (top), BottomNav (bottom), and main content area.
 * ToastContainer is rendered once at the App root — do NOT add it here.
 */
export default function AuthenticatedLayout({ children }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main
        className="flex-1 pt-14 pb-16 max-w-lg mx-auto w-full"
        id="main-content"
      >
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
