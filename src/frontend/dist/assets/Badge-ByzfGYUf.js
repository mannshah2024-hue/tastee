import { j as jsxRuntimeExports, c as cn } from "./index-d7ywnqEL.js";
const variantClasses = {
  default: "bg-secondary text-secondary-foreground border border-border",
  primary: "bg-primary/10 text-primary border border-primary/20",
  success: "bg-green-50 text-green-700 border border-green-200",
  warning: "bg-amber-50 text-amber-700 border border-amber-200",
  destructive: "bg-red-50 text-destructive border border-destructive/20",
  muted: "bg-muted/30 text-muted-foreground border border-border"
};
function Badge({
  variant = "default",
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium leading-tight",
        variantClasses[variant],
        className
      ),
      ...props,
      children
    }
  );
}
export {
  Badge as B
};
