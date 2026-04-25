import { Link, useNavigate } from "@tanstack/react-router";
import { memo } from "react";
import { useAuth } from "../../context/AuthContext";
import { getInitials } from "../../utils/formatters";

/**
 * Fixed top header with Tastee wordmark and user avatar.
 */
const Header = memo(function Header() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 h-14 bg-card border-b border-border shadow-card"
      data-ocid="header"
    >
      <div className="max-w-lg mx-auto h-full flex items-center justify-between px-4">
        {/* Wordmark */}
        <Link
          to={isAuthenticated ? "/decide" : "/"}
          className="flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
          data-ocid="header.link"
        >
          <span className="text-xl font-display font-bold text-primary tracking-tight">
            Tastee
          </span>
          <span
            className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-0.5"
            aria-hidden="true"
          />
        </Link>

        {/* User Avatar */}
        {isAuthenticated && user ? (
          <button
            type="button"
            onClick={() => navigate({ to: "/profile" })}
            aria-label={`${user.name}'s profile`}
            data-ocid="header.profile_button"
            className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-display font-semibold shadow-card hover:shadow-elevated transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-95"
          >
            {getInitials(user.name)}
          </button>
        ) : (
          <div className="w-9" aria-hidden="true" />
        )}
      </div>
    </header>
  );
});

export default Header;
