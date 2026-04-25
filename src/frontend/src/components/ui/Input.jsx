import { cn } from "@/lib/utils";
import { forwardRef, useState } from "react";

function EyeIcon({ open }) {
  if (open) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

/**
 * Input field with label, error message, left icon support,
 * and show/hide password toggle when type="password".
 */
const Input = forwardRef(function Input(
  { className, label, error, icon, id, type = "text", ...props },
  ref,
) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  const isPassword = type === "password";
  const [showPassword, setShowPassword] = useState(false);
  const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          type={resolvedType}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={cn(
            "w-full h-11 bg-background border border-input rounded-lg px-4",
            "text-sm text-foreground placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary",
            "transition-smooth disabled:opacity-50 disabled:cursor-not-allowed",
            icon && "pl-10",
            isPassword && "pr-10",
            error && "border-destructive focus:ring-destructive",
            className,
          )}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            tabIndex={0}
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            <EyeIcon open={showPassword} />
          </button>
        )}
      </div>
      {error && (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="text-xs text-destructive mt-0.5"
          data-ocid={`${inputId}.field_error`}
        >
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";
export default Input;
