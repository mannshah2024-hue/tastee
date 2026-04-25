import type { backendInterface } from "../backend";

const sampleFoodItem = {
  id: "food-1",
  name: "Butter Chicken",
  tags: ["popular", "creamy", "non-veg"],
  swipeCount: BigInt(120),
  cuisineType: "North Indian",
  deliveryTime: BigInt(30),
  isActive: true,
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/65/Chicken-biryani.jpg",
  rating: 4.5,
  price: BigInt(350),
  whyThis: "Perfect blend of spices and cream",
  restaurant: "Spice Garden",
  reason: "Top rated in your area",
};

const sampleFoodItem2 = {
  id: "food-2",
  name: "Paneer Tikka",
  tags: ["vegetarian", "grilled", "popular"],
  swipeCount: BigInt(95),
  cuisineType: "North Indian",
  deliveryTime: BigInt(25),
  isActive: true,
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/65/Chicken-biryani.jpg",
  rating: 4.3,
  price: BigInt(280),
  whyThis: "Smoky and flavorful",
  restaurant: "Tandoor House",
  reason: "Your preferred cuisine",
};

const sampleFoodItem3 = {
  id: "food-3",
  name: "Masala Dosa",
  tags: ["vegetarian", "South Indian", "crispy"],
  swipeCount: BigInt(80),
  cuisineType: "South Indian",
  deliveryTime: BigInt(20),
  isActive: true,
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/65/Chicken-biryani.jpg",
  rating: 4.2,
  price: BigInt(180),
  whyThis: "Light and satisfying",
  restaurant: "Dosa Corner",
  reason: "Budget-friendly option",
};

const sampleUser = {
  id: "user-1",
  name: "Rahul Sharma",
  createdAt: BigInt(Date.now()),
  email: "rahul@example.com",
  preferences: {
    notificationsEnabled: true,
    dietaryType: "non-veg",
    cuisines: ["North Indian", "South Indian"],
    budget: BigInt(500),
  },
};

const sampleAuthResponse = {
  token: "mock-token-123",
  user: sampleUser,
};

const sampleHistoryEntry = {
  id: "history-1",
  userId: "user-1",
  feedback: "loved",
  savedAt: BigInt(Date.now()),
  foodItem: sampleFoodItem,
};

const sampleSwipeRecord = {
  direction: "right",
  userId: "user-1",
  swipedAt: BigInt(Date.now()),
  foodId: "food-1",
};

const sampleShareRecord = {
  createdAt: BigInt(Date.now()),
  createdBy: "user-1",
  shareId: "share-abc123",
  foodItem: sampleFoodItem,
};

const sampleDecisionResult = {
  sessionId: "session-xyz",
  picks: [sampleFoodItem, sampleFoodItem2, sampleFoodItem3],
};

export const mockBackend: backendInterface = {
  addHistory: async (_token, _foodId, _feedback) => ({
    __kind__: "ok",
    ok: sampleHistoryEntry,
  }),
  createShareLink: async (_token, _foodId) => ({
    __kind__: "ok",
    ok: sampleShareRecord,
  }),
  getHistory: async (_token) => ({
    __kind__: "ok",
    ok: [sampleHistoryEntry, { ...sampleHistoryEntry, id: "history-2", foodItem: sampleFoodItem2 }],
  }),
  getProfile: async (_token) => ({
    __kind__: "ok",
    ok: sampleUser,
  }),
  getSharedPick: async (_shareId) => ({
    __kind__: "ok",
    ok: sampleShareRecord,
  }),
  login: async (_email, _password) => ({
    __kind__: "ok",
    ok: sampleAuthResponse,
  }),
  recordSwipe: async (_token, _foodId, _direction) => ({
    __kind__: "ok",
    ok: sampleSwipeRecord,
  }),
  refineDecision: async (_token, _sessionId, _excludeIds) => ({
    __kind__: "ok",
    ok: sampleDecisionResult,
  }),
  runDecision: async (_token, _req) => ({
    __kind__: "ok",
    ok: sampleDecisionResult,
  }),
  savePick: async (_token, _foodId) => ({
    __kind__: "ok",
    ok: sampleHistoryEntry,
  }),
  signup: async (_name, _email, _password) => ({
    __kind__: "ok",
    ok: sampleAuthResponse,
  }),
  undoLastSwipe: async (_token) => ({
    __kind__: "ok",
    ok: sampleSwipeRecord,
  }),
  updatePreferences: async (_token, _prefs) => ({
    __kind__: "ok",
    ok: sampleUser,
  }),
};
