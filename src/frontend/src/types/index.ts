// ─── Core Domain Types ────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: number;
  preferences: UserPreferences;
}

export interface UserPublic {
  id: string;
  name: string;
  email: string;
  preferences: UserPreferences;
}

export interface AuthResponse {
  token: string;
  user: UserPublic;
}

export interface UserPreferences {
  budget: number | null;
  dietaryRestrictions: string[];
  cuisinePreferences: string[];
  mealTypes: string[];
  spiceLevel: "mild" | "medium" | "hot" | "extra_hot" | null;
  notificationsEnabled: boolean;
}

export interface FoodItem {
  id: string;
  name: string;
  restaurant: string;
  cuisine: string;
  price: number;
  deliveryTime: number;
  rating: number;
  imageUrl: string;
  tags: string[];
  description: string;
  isVeg: boolean;
  spiceLevel: "mild" | "medium" | "hot" | "extra_hot";
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
}

export interface HistoryEntry {
  id: string;
  userId: string;
  foodId: string;
  food: FoodItem;
  feedback: "loved" | "liked" | "disliked" | "skipped";
  savedAt: number;
}

export interface SwipeRecord {
  id: string;
  userId: string;
  foodId: string;
  direction: "left" | "right";
  timestamp: number;
}

export interface DecisionRequest {
  budget?: number;
  mood?: string;
}

export interface DecisionResult {
  items: FoodItem[];
  sessionId: string;
  reasons: Record<string, string>;
  badges: Record<string, string>;
}

export interface ShareRecord {
  id: string;
  shareId: string;
  userId: string;
  foodId: string;
  food: FoodItem;
  createdAt: number;
}

// ─── UI Types ────────────────────────────────────────────────────────────────

export type ToastType = "success" | "error" | "info";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

export type FeedbackType = "loved" | "liked" | "disliked" | "skipped";
