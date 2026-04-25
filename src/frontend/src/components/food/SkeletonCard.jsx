import { cn } from "@/lib/utils";
import { memo } from "react";

/**
 * Shimmer skeleton placeholder matching FoodCard dimensions.
 */
const SkeletonCard = memo(function SkeletonCard({ className }) {
  return (
    <div
      className={cn(
        "bg-card rounded-2xl border border-border overflow-hidden shadow-card",
        className,
      )}
      aria-hidden="true"
      role="presentation"
    >
      {/* Image skeleton */}
      <div className="h-44 bg-secondary animate-pulse" />

      {/* Body */}
      <div className="p-4 space-y-3">
        {/* Name */}
        <div className="h-5 bg-secondary rounded-lg animate-pulse w-3/4" />
        {/* Restaurant */}
        <div className="h-4 bg-secondary rounded-lg animate-pulse w-1/2" />

        {/* Meta row */}
        <div className="flex gap-3 mt-2">
          <div className="h-4 bg-secondary rounded-lg animate-pulse w-16" />
          <div className="h-4 bg-secondary rounded-lg animate-pulse w-16" />
          <div className="h-4 bg-secondary rounded-lg animate-pulse w-20" />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <div className="h-3 bg-secondary rounded animate-pulse w-full" />
          <div className="h-3 bg-secondary rounded animate-pulse w-4/5" />
        </div>

        {/* Reason box */}
        <div className="h-10 bg-primary/5 rounded-xl animate-pulse" />

        {/* Tags */}
        <div className="flex gap-2">
          <div className="h-5 bg-secondary rounded-full animate-pulse w-14" />
          <div className="h-5 bg-secondary rounded-full animate-pulse w-16" />
          <div className="h-5 bg-secondary rounded-full animate-pulse w-12" />
        </div>

        {/* Button */}
        <div className="h-9 bg-secondary rounded-lg animate-pulse w-full" />
      </div>
    </div>
  );
});

export default SkeletonCard;
