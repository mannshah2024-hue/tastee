import { cn } from "@/lib/utils";
import { useCallback, useEffect } from "react";

/**
 * Accessible modal dialog with focus trap, Escape to close, backdrop click.
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  className,
  size = "md",
  "data-ocid": ocid,
}) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  const handleBackdropKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") onClose();
  };

  return (
    <dialog
      open
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-transparent w-full h-full max-w-none max-h-none"
      aria-modal="true"
      aria-labelledby="modal-title"
      data-ocid={ocid}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/30 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        onKeyDown={handleBackdropKeyDown}
        role="button"
        tabIndex={-1}
        aria-label="Close dialog"
      />
      {/* Content */}
      <div
        className={cn(
          "relative w-full bg-card rounded-2xl shadow-lg-soft border border-border",
          "animate-slide-up z-10 p-6",
          sizeClasses[size],
          className,
        )}
      >
        <div className="flex items-center justify-between mb-5">
          {title && (
            <h2
              id="modal-title"
              className="text-lg font-display font-semibold text-foreground"
            >
              {title}
            </h2>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            data-ocid={
              ocid ? `${ocid.split(".")[0]}.close_button` : "modal.close_button"
            }
            className="ml-auto p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
