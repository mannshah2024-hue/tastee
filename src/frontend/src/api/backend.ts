/**
 * Backend API wrappers for all Tastee Motoko canister methods.
 * All calls go through the actor with token-based auth.
 * This is a mock layer that mirrors the canister interface.
 * Real actor calls will replace these once bindgen is updated.
 */

import type {
  AuthResponse,
  UserPublic,
  UserPreferences,
  HistoryEntry,
  DecisionResult,
  SwipeRecord,
  ShareRecord,
} from "../types";

// ─── Mock Data ────────────────────────────────────────────────────────────────

export const MOCK_FOODS = [
  {
    id: "f1",
    name: "Butter Chicken",
    restaurant: "Punjab Grill",
    cuisine: "North Indian",
    price: 350,
    deliveryTime: 30,
    rating: 4.8,
    imageUrl: "",
    tags: ["popular", "creamy", "non-veg"],
    description: "Rich, creamy tomato-based curry with tender chicken pieces",
    isVeg: false,
    spiceLevel: "medium" as const,
    mealType: "dinner" as const,
  },
  {
    id: "f2",
    name: "Masala Dosa",
    restaurant: "Udupi Palace",
    cuisine: "South Indian",
    price: 120,
    deliveryTime: 20,
    rating: 4.6,
    imageUrl: "",
    tags: ["crispy", "breakfast", "veg"],
    description: "Crispy rice crepe stuffed with spiced potato filling",
    isVeg: true,
    spiceLevel: "mild" as const,
    mealType: "breakfast" as const,
  },
  {
    id: "f3",
    name: "Biryani",
    restaurant: "Dum Pukht",
    cuisine: "Mughlai",
    price: 450,
    deliveryTime: 40,
    rating: 4.9,
    imageUrl: "",
    tags: ["aromatic", "celebration", "non-veg"],
    description: "Slow-cooked basmati rice with tender mutton and whole spices",
    isVeg: false,
    spiceLevel: "hot" as const,
    mealType: "lunch" as const,
  },
  {
    id: "f4",
    name: "Palak Paneer",
    restaurant: "Spice Route",
    cuisine: "North Indian",
    price: 280,
    deliveryTime: 25,
    rating: 4.5,
    imageUrl: "",
    tags: ["healthy", "veg", "protein"],
    description: "Cottage cheese cubes in velvety spinach gravy",
    isVeg: true,
    spiceLevel: "medium" as const,
    mealType: "dinner" as const,
  },
  {
    id: "f5",
    name: "Pav Bhaji",
    restaurant: "Mumbai Street",
    cuisine: "Street Food",
    price: 150,
    deliveryTime: 15,
    rating: 4.7,
    imageUrl: "",
    tags: ["street food", "quick", "veg"],
    description: "Spiced vegetable mash served with buttered soft bread rolls",
    isVeg: true,
    spiceLevel: "medium" as const,
    mealType: "snack" as const,
  },
  {
    id: "f6",
    name: "Chole Bhature",
    restaurant: "Punjabi Dhaba",
    cuisine: "North Indian",
    price: 180,
    deliveryTime: 20,
    rating: 4.6,
    imageUrl: "",
    tags: ["hearty", "breakfast", "veg"],
    description: "Spiced chickpea curry with fluffy deep-fried bread",
    isVeg: true,
    spiceLevel: "hot" as const,
    mealType: "breakfast" as const,
  },
  {
    id: "f7",
    name: "Chicken Tikka",
    restaurant: "Tandoor Tales",
    cuisine: "North Indian",
    price: 320,
    deliveryTime: 35,
    rating: 4.7,
    imageUrl: "",
    tags: ["grilled", "smoky", "non-veg"],
    description: "Marinated chicken chunks cooked in clay oven",
    isVeg: false,
    spiceLevel: "hot" as const,
    mealType: "dinner" as const,
  },
  {
    id: "f8",
    name: "Idli Sambar",
    restaurant: "Saravana Bhavan",
    cuisine: "South Indian",
    price: 90,
    deliveryTime: 15,
    rating: 4.5,
    imageUrl: "",
    tags: ["light", "healthy", "veg"],
    description: "Steamed rice cakes with lentil soup and coconut chutney",
    isVeg: true,
    spiceLevel: "mild" as const,
    mealType: "breakfast" as const,
  },
  {
    id: "f9",
    name: "Dal Makhani",
    restaurant: "Bukhara",
    cuisine: "North Indian",
    price: 300,
    deliveryTime: 30,
    rating: 4.8,
    imageUrl: "",
    tags: ["creamy", "comfort", "veg"],
    description: "Black lentils slow-cooked overnight with butter and cream",
    isVeg: true,
    spiceLevel: "mild" as const,
    mealType: "dinner" as const,
  },
  {
    id: "f10",
    name: "Fish Curry",
    restaurant: "Kerala Kitchen",
    cuisine: "South Indian",
    price: 380,
    deliveryTime: 35,
    rating: 4.6,
    imageUrl: "",
    tags: ["coastal", "tangy", "non-veg"],
    description: "Fresh fish in coconut milk-based tangy curry",
    isVeg: false,
    spiceLevel: "hot" as const,
    mealType: "lunch" as const,
  },
  {
    id: "f11",
    name: "Samosa",
    restaurant: "Haldiram's",
    cuisine: "Street Food",
    price: 60,
    deliveryTime: 10,
    rating: 4.4,
    imageUrl: "",
    tags: ["crispy", "snack", "veg"],
    description: "Deep-fried pastry filled with spiced potatoes and peas",
    isVeg: true,
    spiceLevel: "medium" as const,
    mealType: "snack" as const,
  },
  {
    id: "f12",
    name: "Rajma Chawal",
    restaurant: "Home Bites",
    cuisine: "North Indian",
    price: 200,
    deliveryTime: 25,
    rating: 4.5,
    imageUrl: "",
    tags: ["comfort", "wholesome", "veg"],
    description: "Red kidney beans in thick gravy served with steamed rice",
    isVeg: true,
    spiceLevel: "medium" as const,
    mealType: "lunch" as const,
  },
  {
    id: "f13",
    name: "Hyderabadi Biryani",
    restaurant: "Paradise",
    cuisine: "Hyderabadi",
    price: 420,
    deliveryTime: 45,
    rating: 4.9,
    imageUrl: "",
    tags: ["royal", "spicy", "non-veg"],
    description: "Authentic dum biryani with saffron-infused basmati rice",
    isVeg: false,
    spiceLevel: "hot" as const,
    mealType: "lunch" as const,
  },
  {
    id: "f14",
    name: "Aloo Paratha",
    restaurant: "Dhaba Express",
    cuisine: "North Indian",
    price: 140,
    deliveryTime: 20,
    rating: 4.6,
    imageUrl: "",
    tags: ["hearty", "breakfast", "veg"],
    description: "Whole wheat flatbread stuffed with spiced potato filling",
    isVeg: true,
    spiceLevel: "mild" as const,
    mealType: "breakfast" as const,
  },
  {
    id: "f15",
    name: "Paneer Tikka",
    restaurant: "Tandoor Stories",
    cuisine: "North Indian",
    price: 290,
    deliveryTime: 30,
    rating: 4.7,
    imageUrl: "",
    tags: ["grilled", "starter", "veg"],
    description: "Marinated cottage cheese grilled to perfection in clay oven",
    isVeg: true,
    spiceLevel: "medium" as const,
    mealType: "dinner" as const,
  },
];

// ─── Simulated Network Delay ─────────────────────────────────────────────────

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function mockToken(email: string): string {
  return btoa(`tastee:${email}:${Date.now()}`);
}

// ─── API Wrappers ─────────────────────────────────────────────────────────────

export async function apiSignup(
  name: string,
  email: string,
  _password: string,
): Promise<AuthResponse> {
  await delay(800);
  const user: UserPublic = {
    id: `user_${Date.now()}`,
    name,
    email,
    preferences: {
      budget: null,
      dietaryRestrictions: [],
      cuisinePreferences: [],
      mealTypes: [],
      spiceLevel: null,
      notificationsEnabled: false,
    },
  };
  return { token: mockToken(email), user };
}

export async function apiLogin(
  email: string,
  _password: string,
): Promise<AuthResponse> {
  await delay(700);
  const user: UserPublic = {
    id: `user_${btoa(email).slice(0, 8)}`,
    name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    email,
    preferences: {
      budget: 500,
      dietaryRestrictions: [],
      cuisinePreferences: ["North Indian", "South Indian"],
      mealTypes: ["lunch", "dinner"],
      spiceLevel: "medium",
      notificationsEnabled: false,
    },
  };
  return { token: mockToken(email), user };
}

export async function apiGetProfile(token: string): Promise<UserPublic> {
  await delay(400);
  if (!token) throw new Error("Unauthorized");
  const stored = localStorage.getItem("tastee_user");
  if (stored) return JSON.parse(stored) as UserPublic;
  throw new Error("Profile not found");
}

export async function apiUpdatePreferences(
  _token: string,
  prefs: UserPreferences,
): Promise<UserPublic> {
  await delay(500);
  const stored = localStorage.getItem("tastee_user");
  if (!stored) throw new Error("User not found");
  const user = JSON.parse(stored) as UserPublic;
  const updated = { ...user, preferences: prefs };
  localStorage.setItem("tastee_user", JSON.stringify(updated));
  return updated;
}

export async function apiGetHistory(_token: string): Promise<HistoryEntry[]> {
  await delay(500);
  const stored = localStorage.getItem("tastee_history");
  if (!stored) return [];
  return JSON.parse(stored) as HistoryEntry[];
}

export async function apiAddHistory(
  _token: string,
  foodId: string,
  feedback: string,
): Promise<HistoryEntry> {
  await delay(300);
  const food = MOCK_FOODS.find((f) => f.id === foodId);
  if (!food) throw new Error("Food not found");
  const entry: HistoryEntry = {
    id: `hist_${Date.now()}`,
    userId: "current",
    foodId,
    food,
    feedback: feedback as HistoryEntry["feedback"],
    savedAt: Date.now(),
  };
  const existing = JSON.parse(
    localStorage.getItem("tastee_history") ?? "[]",
  ) as HistoryEntry[];
  localStorage.setItem(
    "tastee_history",
    JSON.stringify([entry, ...existing]),
  );
  return entry;
}

export async function apiRunDecision(
  _token: string,
  budget?: number,
  mood?: string,
): Promise<DecisionResult> {
  await delay(1200);
  let foods = [...MOCK_FOODS];
  if (budget) {
    foods = foods.filter((f) => f.price <= budget);
  }
  // Shuffle and pick 3
  for (let i = foods.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [foods[i], foods[j]] = [foods[j], foods[i]];
  }
  const picks = foods.slice(0, 3);
  const moodText = mood ?? "general";
  const reasons: Record<string, string> = {};
  const badges: Record<string, string> = {};
  for (const f of picks) {
    reasons[f.id] = `Great choice for ${moodText} - highly rated in ${f.cuisine} cuisine!`;
    badges[f.id] = f.rating >= 4.8 ? "⭐ Top Pick" : f.isVeg ? "🌿 Pure Veg" : "🔥 Fan Favourite";
  }
  return {
    items: picks,
    sessionId: `sess_${Date.now()}`,
    reasons,
    badges,
  };
}

export async function apiRefineDecision(
  _token: string,
  filter: string,
  excludeIds: string[],
): Promise<DecisionResult> {
  await delay(900);
  let foods = MOCK_FOODS.filter((f) => !excludeIds.includes(f.id));
  if (filter === "veg") foods = foods.filter((f) => f.isVeg);
  if (filter === "non-veg") foods = foods.filter((f) => !f.isVeg);
  for (let i = foods.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [foods[i], foods[j]] = [foods[j], foods[i]];
  }
  const picks = foods.slice(0, 3);
  const reasons: Record<string, string> = {};
  const badges: Record<string, string> = {};
  for (const f of picks) {
    reasons[f.id] = `Refined pick based on your ${filter} preference!`;
    badges[f.id] = f.rating >= 4.8 ? "⭐ Top Pick" : "✨ Refined Choice";
  }
  return {
    items: picks,
    sessionId: `sess_${Date.now()}`,
    reasons,
    badges,
  };
}

export async function apiRecordSwipe(
  _token: string,
  foodId: string,
  direction: string,
): Promise<SwipeRecord> {
  await delay(200);
  return {
    id: `swipe_${Date.now()}`,
    userId: "current",
    foodId,
    direction: direction as SwipeRecord["direction"],
    timestamp: Date.now(),
  };
}

export async function apiUndoLastSwipe(_token: string): Promise<SwipeRecord> {
  await delay(200);
  return {
    id: `swipe_undo_${Date.now()}`,
    userId: "current",
    foodId: "",
    direction: "left",
    timestamp: Date.now(),
  };
}

export async function apiSavePick(
  token: string,
  foodId: string,
): Promise<HistoryEntry> {
  return apiAddHistory(token, foodId, "loved");
}

export async function apiCreateShareLink(
  _token: string,
  foodId: string,
): Promise<ShareRecord> {
  await delay(400);
  const food = MOCK_FOODS.find((f) => f.id === foodId);
  if (!food) throw new Error("Food not found");
  const shareId = `share_${btoa(foodId).replace(/=/g, "").slice(0, 8)}`;
  const record: ShareRecord = {
    id: `rec_${Date.now()}`,
    shareId,
    userId: "current",
    foodId,
    food,
    createdAt: Date.now(),
  };
  localStorage.setItem(`tastee_share_${shareId}`, JSON.stringify(record));
  return record;
}

export async function apiGetSharedPick(shareId: string): Promise<ShareRecord> {
  await delay(400);
  const stored = localStorage.getItem(`tastee_share_${shareId}`);
  if (stored) return JSON.parse(stored) as ShareRecord;
  // Fallback mock
  const food = MOCK_FOODS[0];
  return {
    id: `rec_${shareId}`,
    shareId,
    userId: "anonymous",
    foodId: food.id,
    food,
    createdAt: Date.now() - 3600000,
  };
}
