import { cn } from "@/lib/utils";

/**
 * Badge component with multiple color variants.
 */
const variantClasses = {
  default: "bg-secondary text-secondary-foreground border border-border",
  primary: "bg-primary/10 text-primary border border-primary/20",
  success: "bg-green-50 text-green-700 border border-green-200",
  warning: "bg-amber-50 text-amber-700 border border-amber-200",
  destructive: "bg-red-50 text-destructive border border-destructive/20",
  muted: "bg-muted/30 text-muted-foreground border border-border",
};

export default function Badge({
  variant = "default",
  className,
  children,
  ...props
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium leading-tight",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
