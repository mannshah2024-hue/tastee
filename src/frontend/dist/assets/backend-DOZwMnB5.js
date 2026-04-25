const MOCK_FOODS = [
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
    spiceLevel: "medium",
    mealType: "dinner"
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
    spiceLevel: "mild",
    mealType: "breakfast"
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
    spiceLevel: "hot",
    mealType: "lunch"
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
    spiceLevel: "medium",
    mealType: "dinner"
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
    spiceLevel: "medium",
    mealType: "snack"
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
    spiceLevel: "hot",
    mealType: "breakfast"
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
    spiceLevel: "hot",
    mealType: "dinner"
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
    spiceLevel: "mild",
    mealType: "breakfast"
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
    spiceLevel: "mild",
    mealType: "dinner"
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
    spiceLevel: "hot",
    mealType: "lunch"
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
    spiceLevel: "medium",
    mealType: "snack"
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
    spiceLevel: "medium",
    mealType: "lunch"
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
    spiceLevel: "hot",
    mealType: "lunch"
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
    spiceLevel: "mild",
    mealType: "breakfast"
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
    spiceLevel: "medium",
    mealType: "dinner"
  }
];
function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
function mockToken(email) {
  return btoa(`tastee:${email}:${Date.now()}`);
}
async function apiSignup(name, email, _password) {
  await delay(800);
  const user = {
    id: `user_${Date.now()}`,
    name,
    email,
    preferences: {
      budget: null,
      dietaryRestrictions: [],
      cuisinePreferences: [],
      mealTypes: [],
      spiceLevel: null,
      notificationsEnabled: false
    }
  };
  return { token: mockToken(email), user };
}
async function apiLogin(email, _password) {
  await delay(700);
  const user = {
    id: `user_${btoa(email).slice(0, 8)}`,
    name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    email,
    preferences: {
      budget: 500,
      dietaryRestrictions: [],
      cuisinePreferences: ["North Indian", "South Indian"],
      mealTypes: ["lunch", "dinner"],
      spiceLevel: "medium",
      notificationsEnabled: false
    }
  };
  return { token: mockToken(email), user };
}
async function apiUpdatePreferences(_token, prefs) {
  await delay(500);
  const stored = localStorage.getItem("tastee_user");
  if (!stored) throw new Error("User not found");
  const user = JSON.parse(stored);
  const updated = { ...user, preferences: prefs };
  localStorage.setItem("tastee_user", JSON.stringify(updated));
  return updated;
}
async function apiGetHistory(_token) {
  await delay(500);
  const stored = localStorage.getItem("tastee_history");
  if (!stored) return [];
  return JSON.parse(stored);
}
async function apiAddHistory(_token, foodId, feedback) {
  await delay(300);
  const food = MOCK_FOODS.find((f) => f.id === foodId);
  if (!food) throw new Error("Food not found");
  const entry = {
    id: `hist_${Date.now()}`,
    userId: "current",
    foodId,
    food,
    feedback,
    savedAt: Date.now()
  };
  const existing = JSON.parse(
    localStorage.getItem("tastee_history") ?? "[]"
  );
  localStorage.setItem(
    "tastee_history",
    JSON.stringify([entry, ...existing])
  );
  return entry;
}
async function apiRunDecision(_token, budget, mood) {
  await delay(1200);
  let foods = [...MOCK_FOODS];
  if (budget) {
    foods = foods.filter((f) => f.price <= budget);
  }
  for (let i = foods.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [foods[i], foods[j]] = [foods[j], foods[i]];
  }
  const picks = foods.slice(0, 3);
  const moodText = mood ?? "general";
  const reasons = {};
  const badges = {};
  for (const f of picks) {
    reasons[f.id] = `Great choice for ${moodText} - highly rated in ${f.cuisine} cuisine!`;
    badges[f.id] = f.rating >= 4.8 ? "⭐ Top Pick" : f.isVeg ? "🌿 Pure Veg" : "🔥 Fan Favourite";
  }
  return {
    items: picks,
    sessionId: `sess_${Date.now()}`,
    reasons,
    badges
  };
}
async function apiRefineDecision(_token, filter, excludeIds) {
  await delay(900);
  let foods = MOCK_FOODS.filter((f) => !excludeIds.includes(f.id));
  if (filter === "veg") foods = foods.filter((f) => f.isVeg);
  if (filter === "non-veg") foods = foods.filter((f) => !f.isVeg);
  for (let i = foods.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [foods[i], foods[j]] = [foods[j], foods[i]];
  }
  const picks = foods.slice(0, 3);
  const reasons = {};
  const badges = {};
  for (const f of picks) {
    reasons[f.id] = `Refined pick based on your ${filter} preference!`;
    badges[f.id] = f.rating >= 4.8 ? "⭐ Top Pick" : "✨ Refined Choice";
  }
  return {
    items: picks,
    sessionId: `sess_${Date.now()}`,
    reasons,
    badges
  };
}
async function apiRecordSwipe(_token, foodId, direction) {
  await delay(200);
  return {
    id: `swipe_${Date.now()}`,
    userId: "current",
    foodId,
    direction,
    timestamp: Date.now()
  };
}
async function apiUndoLastSwipe(_token) {
  await delay(200);
  return {
    id: `swipe_undo_${Date.now()}`,
    userId: "current",
    foodId: "",
    direction: "left",
    timestamp: Date.now()
  };
}
async function apiSavePick(token, foodId) {
  return apiAddHistory(token, foodId, "loved");
}
async function apiCreateShareLink(_token, foodId) {
  await delay(400);
  const food = MOCK_FOODS.find((f) => f.id === foodId);
  if (!food) throw new Error("Food not found");
  const shareId = `share_${btoa(foodId).replace(/=/g, "").slice(0, 8)}`;
  const record = {
    id: `rec_${Date.now()}`,
    shareId,
    userId: "current",
    foodId,
    food,
    createdAt: Date.now()
  };
  localStorage.setItem(`tastee_share_${shareId}`, JSON.stringify(record));
  return record;
}
async function apiGetSharedPick(shareId) {
  await delay(400);
  const stored = localStorage.getItem(`tastee_share_${shareId}`);
  if (stored) return JSON.parse(stored);
  const food = MOCK_FOODS[0];
  return {
    id: `rec_${shareId}`,
    shareId,
    userId: "anonymous",
    foodId: food.id,
    food,
    createdAt: Date.now() - 36e5
  };
}
export {
  MOCK_FOODS as M,
  apiLogin as a,
  apiSignup as b,
  apiGetSharedPick as c,
  apiUpdatePreferences as d,
  apiRunDecision as e,
  apiSavePick as f,
  apiCreateShareLink as g,
  apiRefineDecision as h,
  apiRecordSwipe as i,
  apiUndoLastSwipe as j,
  apiGetHistory as k
};
