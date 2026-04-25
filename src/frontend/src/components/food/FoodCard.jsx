import { cn } from "@/lib/utils";
import { memo, useState } from "react";
import { formatDeliveryTime, formatINR } from "../../utils/formatters";
import Badge from "../ui/Badge";

/**
 * Star rating display (read-only).
 */
function StarRating({ rating }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={cn(
            "w-3 h-3",
            star <= Math.round(rating) ? "text-amber-400" : "text-border",
          )}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-muted-foreground ml-1 font-medium">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

/**
 * Image with fallback to styled div showing food name initial.
 */
function FoodImage({ name, imageUrl, className }) {
  const [failed, setFailed] = useState(!imageUrl);

  if (failed || !imageUrl) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center bg-primary/10 text-primary select-none",
          className,
        )}
        aria-hidden="true"
      >
        <span className="text-4xl font-display font-bold leading-none">
          {name?.charAt(0)?.toUpperCase() ?? "?"}
        </span>
        <span className="text-2xl mt-1">🍽️</span>
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={name}
      onError={() => setFailed(true)}
      className={cn("object-cover", className)}
      loading="lazy"
    />
  );
}

/**
 * Full FoodCard with image, name, restaurant, price, delivery, rating, reason, badge.
 */
const FoodCard = memo(function FoodCard({
  food,
  reason,
  badge,
  onSave,
  onShare,
  selected,
  index = 1,
  className,
}) {
  return (
    <article
      className={cn(
        "bg-card rounded-2xl border overflow-hidden transition-smooth",
        selected
          ? "border-primary shadow-elevated ring-2 ring-primary/20"
          : "border-border shadow-card hover:shadow-elevated hover:-translate-y-0.5",
        "animate-slide-up",
        className,
      )}
      aria-label={`${food.name} from ${food.restaurant}`}
      data-ocid={`food_card.item.${index}`}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <FoodImage
          name={food.name}
          imageUrl={food.imageUrl}
          className="w-full h-full"
        />
        {/* Veg/Non-veg badge */}
        <span
          className={cn(
            "absolute top-3 left-3 w-5 h-5 rounded border-2 flex items-center justify-center bg-background",
            food.isVeg ? "border-green-600" : "border-red-600",
          )}
          aria-label={food.isVeg ? "Vegetarian" : "Non-vegetarian"}
        >
          <span
            className={cn(
              "w-2.5 h-2.5 rounded-sm",
              food.isVeg ? "bg-green-600" : "bg-red-600",
            )}
            aria-hidden="true"
          />
        </span>
        {/* Badge overlay */}
        {badge && (
          <Badge variant="primary" className="absolute top-3 right-3 text-xs">
            {badge}
          </Badge>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="font-display font-semibold text-foreground text-lg leading-tight truncate">
          {food.name}
        </h3>
        <p className="text-sm text-muted-foreground truncate mt-0.5">
          {food.restaurant}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-3 mt-2.5 flex-wrap">
          <span className="text-sm font-semibold text-foreground">
            {formatINR(food.price)}
          </span>
          <span className="text-muted-foreground text-xs">•</span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {formatDeliveryTime(food.deliveryTime)}
          </span>
          <span className="text-muted-foreground text-xs">•</span>
          <StarRating rating={food.rating} />
        </div>

        {/* Description */}
        <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
          {food.description}
        </p>

        {/* Reason */}
        {reason && (
          <div className="mt-3 px-3 py-2 rounded-xl bg-primary/5 border border-primary/10">
            <p className="text-xs text-primary font-medium leading-snug">
              💡 {reason}
            </p>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {food.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="muted" className="text-[10px]">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        {(onSave || onShare) && (
          <div className="flex items-center gap-2 mt-4">
            {onSave && (
              <button
                type="button"
                onClick={() => onSave(food)}
                data-ocid={`food_card.save_button.${index}`}
                className="flex-1 h-9 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center gap-1.5 transition-smooth hover:bg-primary/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={`Save ${food.name}`}
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
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
                Save
              </button>
            )}
            {onShare && (
              <button
                type="button"
                onClick={() => onShare(food)}
                data-ocid={`food_card.share_button.${index}`}
                className="h-9 w-9 rounded-lg bg-secondary border border-border text-muted-foreground flex items-center justify-center transition-smooth hover:text-foreground hover:bg-secondary/80 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={`Share ${food.name}`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  );
});

export default FoodCard;
