import { cn } from "@/lib/utils";
import { memo } from "react";
import { useToast } from "../../context/ToastContext";

const iconMap = {
  success: (
    <svg
      className="w-4 h-4 text-green-600 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg
      className="w-4 h-4 text-destructive shrink-0"
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
  ),
  info: (
    <svg
      className="w-4 h-4 text-primary shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
};

const bgMap = {
  success: "bg-green-50 border-green-200",
  error: "bg-red-50 border-red-200",
  info: "bg-blue-50 border-blue-200",
};

function ToastItem({ toast }) {
  const { removeToast } = useToast();

  return (
    <output
      aria-live="polite"
      data-ocid="toast"
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl border shadow-elevated",
        "min-w-[280px] max-w-[360px] animate-slide-up",
        bgMap[toast.type],
      )}
    >
      {iconMap[toast.type]}
      <p className="text-sm font-medium text-foreground flex-1 min-w-0">
        {toast.message}
      </p>
      <button
        type="button"
        onClick={() => removeToast(toast.id)}
        aria-label="Dismiss notification"
        className="p-0.5 rounded-lg text-muted-foreground hover:text-foreground transition-smooth focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        <svg
          className="w-3.5 h-3.5"
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
    </output>
  );
}

export const ToastContainer = memo(function ToastContainer() {
  const { toasts } = useToast();
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-20 right-4 z-50 flex flex-col gap-2 items-end"
      aria-label="Notifications"
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} />
      ))}
    </div>
  );
});

export default ToastContainer;
