import { r as reactExports, j as jsxRuntimeExports, c as cn } from "./index-d7ywnqEL.js";
const variantClasses = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-elevated active:scale-[0.98]",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border",
  ghost: "text-foreground hover:bg-secondary hover:text-foreground",
  outline: "border border-primary text-primary bg-transparent hover:bg-primary/5",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  hero: "bg-primary text-primary-foreground shadow-lg-soft hover:bg-primary/90 hover:shadow-elevated active:scale-[0.97] font-display text-base tracking-wide"
};
const sizeClasses = {
  sm: "h-8 px-3 text-sm rounded-md",
  md: "h-10 px-5 text-sm rounded-lg",
  lg: "h-12 px-7 text-base rounded-xl",
  icon: "h-10 w-10 rounded-lg"
};
const Button = reactExports.forwardRef(function Button2({
  className,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  children,
  ...props
}, ref) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      ref,
      disabled: disabled || loading,
      className: cn(
        "inline-flex items-center justify-center gap-2 font-body font-medium",
        "transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:pointer-events-none select-none",
        variantClasses[variant],
        sizeClasses[size],
        className
      ),
      ...props,
      children: [
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "inline-block h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin",
            "aria-hidden": "true"
          }
        ) : null,
        children
      ]
    }
  );
});
Button.displayName = "Button";
export {
  Button as B
};
