import { cn } from "@/lib/utils";

/**
 * Card component with elevated, flat, and interactive variants.
 */
export function Card({ className, children, onClick, ...props }) {
  const isInteractive = !!onClick;
  return (
    <div
      onClick={onClick}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onKeyDown={
        isInteractive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") onClick(e);
            }
          : undefined
      }
      className={cn(
        "bg-card rounded-2xl border border-border overflow-hidden",
        "shadow-card",
        isInteractive &&
          "cursor-pointer hover:shadow-elevated hover:-translate-y-0.5 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div className={cn("p-5 pb-3", className)} {...props}>
      {children}
    </div>
  );
}

export function CardBody({ className, children, ...props }) {
  return (
    <div className={cn("px-5 py-3", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "px-5 py-4 border-t border-border bg-secondary/30",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
